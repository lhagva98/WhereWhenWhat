import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableScale} from '../common';
import * as RootNavigation from '../../RootNavigation';
//import MovieDetailsScreen from '../../screens/Movie/MovieDetailsScreen';
import RouteNames from '../../RouteNames';
import {getEventImageUrl} from '../../api/urls';
import Theme from '../../Theme';
import StartDay from './StartDay';
import Overview from './Overview';
const {width} = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.7;

class MoviePreview extends React.PureComponent {
  static getPreviewHeight = () =>
    PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  onPress = () => {
    const {movie} = this.props;
    // navigation.push(RouteNames.MovieDetailsScreen, {movie});
    // navigation.navigate(RouteNames.MovieDetailsScreen, { movie }, null, id);
    RootNavigation.navigate(RouteNames.MovieDetailsScreen, {movie: movie});
  };

  renderEvent() {
    const {movie, highPriority} = this.props;
    console.log(movie);
    const priority = highPriority
      ? FastImage.priority.high
      : FastImage.priority.normal;
    return (
      <>
        <FastImage
          style={styles.image}
          source={{
            uri: getEventImageUrl(movie.image),
            priority,
          }}
        />
        <View style={styles.footer}>
          <StartDay date={movie.time[0]} />
          <Overview
            style={{flex: 1}}
            name={movie.name}
            date={movie.time[0]}
            interested={false}
          />
        </View>
      </>
    );
  }

  renderEmptyMovieView = () => <View style={styles.image} />;

  render() {
    const {movie, style} = this.props;

    return (
      <TouchableScale
        disabled={!movie}
        scaleFactor={0.97}
        style={[styles.container, style]}
        onPress={this.onPress}>
        {movie ? this.renderEvent() : this.renderEmptyMovieView()}
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

MoviePreview.propTypes = {
  movie: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any,
};

export default MoviePreview;
