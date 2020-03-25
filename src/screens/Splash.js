import React from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
// import {loadUserIntoRedux, logOutUser} from '../actions';
// import {stGetUser} from '../utils/storage';
// import RouteNames from '../RouteNames';
// import Config from '../Config';
import Theme from '../Theme';
class Splash extends React.Component {
  componentDidMount() {
    // this.configureLayoutAnimation();
    // this.configureAxios();
    // this.loadUser();
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default Splash;
