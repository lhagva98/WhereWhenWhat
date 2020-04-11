import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import EventUserScore from './EventUserScore';
import {AppText} from '../common';
import Theme from '../../Theme';
import formatDate from '../../utils/formatDate';

class TimeAndShortAddress extends React.Component {
  render() {
    const {event, style} = this.props;
    // const month = new Date(date).getMonth();
    // const day = new Date(date).getDate();
    return (
      <View style={[styles.container, style]}>
        <View style={styles.general}>
          <AppText style={styles.time}>
            {formatDate(event.time[0], 'h:m')}
          </AppText>
          <AppText style={styles.shortAddress}>{event.shortAddress}</AppText>
        </View>
        <View>
          <AppText>300 хэрэглэгч бүртгүүлсэн</AppText>
        </View>

        {/* <EventUserScore style={styles.score} event={event} />
        <AppText style={styles.month}>{getMonthName(month)}</AppText>
        <AppText style={styles.day}>{day}</AppText> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
    flex: 1,
    paddingLeft: 10,
  },
  general: {
    flexDirection: 'row',
  },
  time: {
    fontWeight: 'bold',
  },
  shortAddress: {
    paddingLeft: 10,
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

TimeAndShortAddress.propTypes = {
  event: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default TimeAndShortAddress;
