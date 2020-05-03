import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import GuestInfo from '../components/GuestInfo';
import Theme from '../Theme';
const Notification = ({isGuest}) => {
  return <View style={styles.container}>{isGuest ? <GuestInfo /> : null}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

const mapStateToProps = ({auth: {isGuest}}) => ({isGuest});

export default connect(
  mapStateToProps,
  {},
)(Notification);
