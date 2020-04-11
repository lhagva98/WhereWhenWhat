import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import EventUserScore from './EventUserScore';
import {AppText} from '../common';
import Theme from '../../Theme';
import {getMonthName} from '../../utils/consts';

class StartDay extends React.Component {
  render() {
    const {date, style} = this.props;
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return (
      <View style={[styles.container, style]}>
        {/* <EventUserScore style={styles.score} event={event} /> */}
        <AppText style={styles.month}>{getMonthName(month)}</AppText>
        <AppText style={styles.day}>{day}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
    ...Theme.position.posCenter,
  },
  month: {
    color: Theme.colors.danger,
    ...Theme.typography.title3,
    fontWeight: 'bold',
  },
  day: {
    color: Theme.gray.lighter,
    ...Theme.typography.title2,
  },
});

StartDay.propTypes = {
  date: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default StartDay;
