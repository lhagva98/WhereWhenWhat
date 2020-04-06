import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import MovieUserScore from './MovieUserScore';
import {AppText} from '../common';
import Theme from '../../Theme';
import formatDate from '../../utils/formatDate';
class MovieScoreYear extends React.Component {
  render() {
    const {date, interested, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <MovieUserScore style={styles.score} interested={interested} />
        {/* <AppText style={styles.year}>{formatDate(date[0], 'mdhm')}</AppText> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  score: {
    marginRight: Theme.spacing.tiny,
  },
  year: {
    color: Theme.gray.lighter,
  },
});

MovieScoreYear.propTypes = {
  movie: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default MovieScoreYear;
