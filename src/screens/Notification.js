import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import GuestInfo from '../components/GuestInfo';
import Theme from '../Theme';
import MyNotification from '../components/Notification/myNotification';
const Notification = ({isGuest}) => {
  return (
    <View style={styles.container}>
      {isGuest ? <GuestInfo /> : <MyNotification />}
    </View>
  );
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
