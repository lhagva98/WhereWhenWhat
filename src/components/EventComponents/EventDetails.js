import React from 'react';
import {View, StyleSheet, LayoutAnimation} from 'react-native';
import {AppText} from '../common';
import {connect} from 'react-redux';
import EventBackdropWithTitle from './EventBackdropWithTitle';
import EventDetailsButtons from './EventDetailsButtons';
import EventGenres from './EventGenres';
import EventScoreYear from './EventScoreYear';
import eventsHorizontalFlatList from './EventHorizontalFlatList';
import withRefetch from '../hoc/withRefetch';
import StartDay from './StartDay';
import TimeAndShortAddress from './TimeAndShortAddress';
import GalleryHorizontalFlatList from './GalleryHorizontalFlatList';
import {
  fetcheventDetailedInfo,
  fetcheventRecommendations,
} from '../../api/events';
import Theme from '../../Theme';
import EventPreview from './EventPreview';

class EventDetails extends React.PureComponent {
  componentDidMount() {
    // eslint-disable-next-line
    // requestAnimationFrame(() => this.loadDetailedInfo());
  }

  // loadDetailedInfo = async () => {
  //   const {
  //     event,
  //     refetch: {fetchUntilSuccess},
  //   } = this.props;
  //   const detailedevent = await fetchUntilSuccess(() =>
  //     fetcheventDetailedInfo({event}),
  //   );
  //   this.configureDetailsAnimation();
  //   this.setState({detailedevent});

  //   const {events: recommendedevents} = await fetchUntilSuccess(() =>
  //     fetcheventRecommendations({event}),
  //   );
  //   this.configureRecommendationsAnimation();
  //   this.setState({recommendedevents});
  // };

  configureDetailsAnimation() {
    const {scaleY} = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      update: {type, property: scaleY},
    });
  }

  configureRecommendationsAnimation() {
    const {opacity} = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      create: {type, property: opacity},
      delete: {type, property: opacity},
    });
  }
  isInterested = id => {
    const {user, isGuest} = this.props;
    console.log(user);
    if (user === null || isGuest == true) return false;
    else {
      const myInterested = user.data.interested;
      return myInterested.indexOf(id) !== -1;
    }
  };

  render() {
    const {event} = this.props;

    // const {detailedevent, recommendedevents} = this.state;
    // const noRecommendedevents =
    //   recommendedevents && recommendedevents.length === 0;
    return (
      <View style={styles.container}>
        <EventBackdropWithTitle event={event} />
        <View style={styles.mh}>
          <View style={styles.timeDetail}>
            <StartDay date={event.time[0]} />
            <TimeAndShortAddress event={event} />
          </View>
          {/* {detailedevent && (
            <EventGenres style={styles.mb} detailedevent={detailedevent} />
          )} */}
          <EventDetailsButtons
            interested={this.isInterested(event._id)}
            id={event._id}
            phoneNumber={event.phoneNumber}
            location={event.coordinates}
          />
          <AppText style={styles.mb} type="headline">
            Дэлгэрэнгүй
          </AppText>
          <AppText style={styles.overview}>{event.description}</AppText>
          {event.gallery.length > 0 ? (
            <AppText style={styles.recommendationsTitle} type="headline">
              Холбоотой зурагууд
            </AppText>
          ) : null}
        </View>

        {event.gallery.length > 0 ? (
          <GalleryHorizontalFlatList
            images={event.gallery || []}
            paddingLeft={styles.mh.marginHorizontal}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.small,
  },
  recommendationsTitle: {
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.tiny,
  },
  overview: {
    color: Theme.gray.lighter,
  },
  mb: {
    marginBottom: Theme.spacing.xTiny,
  },
  mh: {
    marginHorizontal: Theme.spacing.small,
  },
  timeDetail: {
    flexDirection: 'row',
    flex: 1,
  },
  noeventsContainer: {
    width: '100%',
    height: EventPreview.getPreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({auth: {isGuest, user}}) => ({isGuest, user});

export default connect(
  mapStateToProps,
  {},
)(withRefetch(EventDetails));
