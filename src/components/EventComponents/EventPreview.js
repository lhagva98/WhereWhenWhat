import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableScale} from '../common';
import * as RootNavigation from '../../RootNavigation';
//import eventDetailsScreen from '../../screens/event/eventDetailsScreen';
import RouteNames from '../../RouteNames';
import {getEventImageUrl} from '../../api/urls';
import Theme from '../../Theme';
import StartDay from './StartDay';
import Overview from './Overview';
const {width} = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.7;

class EventPreview extends React.PureComponent {
  static getPreviewHeight = () =>
    PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  onPress = () => {
    const {event} = this.props;
    // navigation.push(RouteNames.eventDetailsScreen, {event});
    // navigation.navigate(RouteNames.eventDetailsScreen, { event }, null, id);
    RootNavigation.navigate(RouteNames.EventDetailsScreen, {event: event});
  };

  renderEvent() {
    const {event, highPriority} = this.props;
    console.log(event);
    const priority = highPriority
      ? FastImage.priority.high
      : FastImage.priority.normal;
    return (
      <>
        <FastImage
          style={styles.image}
          source={{
            uri: getEventImageUrl(event.image),
            priority,
          }}
        />
        <View style={styles.footer}>
          <StartDay date={event.time[0]} />
          <Overview
            style={{flex: 1}}
            name={event.name}
            date={event.time[0]}
            interested={false}
          />
        </View>
      </>
    );
  }

  renderEmptyeventView = () => <View style={styles.image} />;

  render() {
    const {event, style} = this.props;

    return (
      <TouchableScale
        disabled={!event}
        scaleFactor={0.97}
        style={[styles.container, style]}
        onPress={this.onPress}>
        {event ? this.renderEvent() : this.renderEmptyeventView()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.tiny,
    width: PREVIEW_WIDTH,
  },
  image: {
    width: PREVIEW_WIDTH,
    height: 200,
    // aspectRatio: Theme.specifications.posterAspectRation,
    borderRadius: 0,
    backgroundColor: Theme.colors.transparentBlack,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
});

EventPreview.propTypes = {
  event: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any,
};

export default EventPreview;
