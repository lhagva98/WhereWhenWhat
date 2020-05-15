import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import EventUserScore from './EventUserScore';
import {AppText} from '../common';
import Theme from '../../Theme';
import {getMonthName} from '../../utils/consts';
import {threeDot} from '../../utils/text';
class OverView extends React.Component {
  render() {
    const {name, date, company, interested, style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <AppText style={styles.name}>{threeDot(name)}</AppText>
        {/* <EventUserScore style={styles.score} event={event} />
        <AppText style={styles.month}>{getMonthName(month)}</AppText>
        <AppText style={styles.day}>{day}</AppText> */}
        {/* <View style={styles.seperator}></View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // padding: 5,
    paddingRight: 0,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: Theme.colors.info,
    ...Theme.typography.title3,
    // fontWeight: 'bold',
  },
  day: {
    color: Theme.gray.lighter,
  },
  seperator: {
    width: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    marginLeft: 10,
  },
});

OverView.propTypes = {
  date: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default OverView;
