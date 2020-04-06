import React from 'react';
import {View, StyleSheet, LayoutAnimation} from 'react-native';
import {AppText} from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import MovieScoreYear from './MovieScoreYear';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';
import withRefetch from '../hoc/withRefetch';
import StartDay from './StartDay';
import TimeAndShortAddress from './TimeAndShortAddress';
import GalleryHorizontalFlatList from './GalleryHorizontalFlatList';
import {
  fetchMovieDetailedInfo,
  fetchMovieRecommendations,
} from '../../api/movies';
import Theme from '../../Theme';
import MoviePreview from './MoviePreview';

class MovieDetails extends React.PureComponent {
  componentDidMount() {
    // eslint-disable-next-line
    // requestAnimationFrame(() => this.loadDetailedInfo());
  }

  // loadDetailedInfo = async () => {
  //   const {
  //     movie,
  //     refetch: {fetchUntilSuccess},
  //   } = this.props;
  //   const detailedMovie = await fetchUntilSuccess(() =>
  //     fetchMovieDetailedInfo({movie}),
  //   );
  //   this.configureDetailsAnimation();
  //   this.setState({detailedMovie});

  //   const {movies: recommendedMovies} = await fetchUntilSuccess(() =>
  //     fetchMovieRecommendations({movie}),
  //   );
  //   this.configureRecommendationsAnimation();
  //   this.setState({recommendedMovies});
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

  render() {
    const {movie} = this.props;
    // const {detailedMovie, recommendedMovies} = this.state;
    // const noRecommendedMovies =
    //   recommendedMovies && recommendedMovies.length === 0;

    return (
      <View style={styles.container}>
        <MovieBackdropWithTitle movie={movie} />
        <View style={styles.mh}>
          <View style={styles.timeDetail}>
            <StartDay date={'2020-03-22'} />
            <TimeAndShortAddress event={movie} />
          </View>
          {/* {detailedMovie && (
            <MovieGenres style={styles.mb} detailedMovie={detailedMovie} />
          )} */}
          <MovieDetailsButtons
            id={movie._id}
            phoneNumber={movie.phoneNumber}
            location={movie.coordinates}
          />
          <AppText style={styles.mb} type="headline">
            Дэлгэрэнгүй
          </AppText>
          <AppText style={styles.overview}>{movie.description}</AppText>
          {movie.gallery.length > 0 ? (
            <AppText style={styles.recommendationsTitle} type="headline">
              Холбоотой зурагууд
            </AppText>
          ) : null}
        </View>

        {movie.gallery.length > 0 ? (
          <GalleryHorizontalFlatList
            images={movie.gallery || []}
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
  noMoviesContainer: {
    width: '100%',
    height: MoviePreview.getPreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withRefetch(MovieDetails);
