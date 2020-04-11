import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import EventUserScore from './EventUserScore';
import {AppText} from '../common';
import Theme from '../../Theme';
import formatDate from '../../utils/formatDate';
class EventScoreYear extends React.Component {
  render() {
    const {date, interested, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <EventUserScore style={styles.score} interested={interested} />
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

EventScoreYear.propTypes = {
  event: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default EventScoreYear;
