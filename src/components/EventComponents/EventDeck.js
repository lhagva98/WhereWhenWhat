import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Deck from '../Deck';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import EventCard from './EventCard';
import EventSwipeImageLabel from './EventSwipeImageLabel';
import withRefetch from '../hoc/withRefetch';
import {getW780ImageUrl} from '../../api/urls';
import {prefetchImage} from '../../utils/network';
import {eventKeyExtractor} from '../../utils/events';
import Theme from '../../Theme';

class EventDeck extends React.PureComponent {
  state = {
    loadedCount: 0,
  };

  componentDidMount() {
    this.loadingId = 0;
    this.toLoadevents = [];
    this.loadedeventsIds = {};
    this.starteventsLoading();
  }

  componentWillUpdate(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.updateeventsLoading(nextProps.events);
      this.starteventsLoading(nextProps.events);
    }
  }

  starteventsLoading(events) {
    this.fillToLoadevents(events);
    this.recursiveImageLoad(this.toLoadevents[0]);
  }

  updateeventsLoading(events) {
    this.loadingId++;

    const newLoadedImagesIds = {};
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const key = eventKeyExtractor(event);
      if (!this.loadedeventsIds[key]) break;
      newLoadedImagesIds[key] = true;
    }
    this.loadedeventsIds = newLoadedImagesIds;

    const loadedCount = Object.keys(newLoadedImagesIds).length;
    this.setState({loadedCount});
  }

  fillToLoadevents(forceevents) {
    const {events} = this.props;
    const currentevents = forceevents || events;

    this.toLoadevents = currentevents.filter(
      event => !this.loadedeventsIds[eventKeyExtractor(event)],
    );
  }

  recursiveImageLoad = event => {
    const {
      refetch: {fetchUntilSuccess},
    } = this.props;
    const {loadedCount} = this.state;

    if (event && loadedCount < 12) {
      const eventPosterUrl = getW780ImageUrl(event.poster_path);
      const loadingId = this.loadingId;

      fetchUntilSuccess(() => prefetchImage(eventPosterUrl)).then(() => {
        if (loadingId !== this.loadingId) return;

        this.loadedeventsIds[eventKeyExtractor(event)] = true;
        this.toLoadevents.splice(0, 1);
        this.setState(prevState => ({loadedCount: prevState.loadedCount + 1}));
        this.recursiveImageLoad(this.toLoadevents[0]);
      });
    }
  };

  renderNoMoreCards = () => (
    <InfoAbsoluteBlock
      Icon={<CircleLoadingIndicator color={Theme.gray.lightest} />}
      text="Loading events"
      subtext="Please wait"
    />
  );

  rendereventCard = (event, isTopCard) => (
    <EventCard
      event={event}
      disabled={!isTopCard}
      sourceUrlGetter={getW780ImageUrl}
    />
  );

  renderCardSwipeLabels = ({toLeftOpacity, toRightOpacity, toTopOpacity}) => {
    const horizontalMargin = 40;
    const verticalMargin = 60;
    const rotationDegrees = 15;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Opacity has to be applied on Animated.View wrapper */}
        <Animated.View style={{opacity: toRightOpacity}}>
          <EventSwipeImageLabel
            style={{
              top: verticalMargin,
              left: horizontalMargin,
              transform: [{rotate: `-${rotationDegrees}deg`}],
            }}
            type="save"
          />
        </Animated.View>
        <Animated.View style={{opacity: toLeftOpacity}}>
          <EventSwipeImageLabel
            style={{
              top: verticalMargin,
              right: horizontalMargin,
              transform: [{rotate: `${rotationDegrees}deg`}],
            }}
            type="skip"
          />
        </Animated.View>
        <Animated.View style={{opacity: toTopOpacity, flex: 1}}>
          <EventSwipeImageLabel
            style={{
              alignSelf: 'center',
              bottom: verticalMargin * 1.5,
            }}
            type="like"
          />
        </Animated.View>
      </View>
    );
  };

  render() {
    const {loadedCount} = this.state;
    const {events, ...props} = this.props;
    const sliceLength = Math.min(loadedCount, 2);
    const loadedevents = events.slice(0, sliceLength);

    return (
      <Deck
        data={loadedevents}
        style={styles.deck}
        useDeckIndex={false}
        renderCard={this.rendereventCard}
        renderCardSwipeLabels={this.renderCardSwipeLabels}
        renderNoMoreCards={this.renderNoMoreCards}
        keyExtractor={eventKeyExtractor}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    margin: 14,
  },
});

export default withRefetch(EventDeck);
