import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet} from 'react-native';
import {AppText, TouchableHighlightView} from '../common';
import {getEventImageUrl} from '../../api/urls';
import * as RootNavigation from '../../RootNavigation';
import RouteNames from '../../RouteNames';
import StartDay from './StartDay';
import Overview from './Overview';
import Theme from '../../Theme';

class EventInlinePreview extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  onPress = () => {
    const {event} = this.props;
    RootNavigation.navigate(RouteNames.EventDetailsScreen, {event: event});
  };

  render() {
    const {event} = this.props;
    return (
      <TouchableHighlightView
        scaleFactor={0.98}
        contentStyle={styles.container}
        onPress={this.onPress}>
        <FastImage
          style={styles.poster}
          source={{uri: getEventImageUrl(event.image)}}
        />
        <View style={styles.textWrapper}>
          {/* <AppText type="headline" numberOfLines={1} style={styles.title}>
            {event.name}
          </AppText>
          <EventScoreYear event={event} /> */}
          <StartDay date={event.time[0]} />
          <Overview
            style={{flex: 1}}
            name={event.name}
            date={event.time[0]}
            interested={false}
          />
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    paddingVertical: Theme.spacing.xTiny,
    // flex: 1,
  },
  poster: {
    // height: '100%',
    // resizeMode: 'contain',
    // width: '50%',
    // aspectRatio: Theme.specifications.posterAspectRation,
    flex: 1,
    marginHorizontal: Theme.spacing.tiny,
    backgroundColor: Theme.gray.dark,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

EventInlinePreview.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventInlinePreview;
