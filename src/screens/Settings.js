import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import {logOutUser} from '../actions/AuthActions';
import {AppText} from '../components/common';
import BlockButton from '../components/BlockButton';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Theme from '../Theme';
import isIOS from '../../src/utils/isIOS';
import Header from '../components/Header';
import {
  getLibrarySettingsIcon,
  getLibraryWatchlistIcon,
  getLibraryFavoriteIcon,
  getPasswordIcon,
  getLogoutIcon,
} from '../utils/icons';
class Settings extends React.Component {
  onSignOutPress = () => {
    const {logOutUser} = this.props;
    logOutUser();
  };

  render() {
    const {user, isGuest} = this.props;
    return (
      <View style={styles.container}>
        <Header title="Хувийн Мэдээлэл" />
        <ScrollView>
          <BlockButton
            style={styles.button}
            Icon={getPasswordIcon()}
            text="Нууц үг солих"
            onPress={this.onWatchlistPressed}
          />
          <BlockButton
            Icon={getLogoutIcon()}
            onPress={this.onWatchlistPressed}
            text="Гарах"
            onPress={this.onSignOutPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  button: {
    height: 64,
  },
  sectionTitle: {
    //marginLeft: Theme.spacing.base,
    //  marginVertical: Theme.spacing.tiny,
    paddingLeft: Theme.spacing.base,
    paddingVertical: Theme.spacing.tiny,
    width: '100%',
    fontSize: 20,
    backgroundColor: 'black',
    height: Theme.specifications.headerHeight,
  },
});

const mapStateToProps = ({auth}) => ({user: auth.user, isGuest: auth.isGuest});

export default connect(
  mapStateToProps,
  {logOutUser},
)(withDelayedLoading(Settings));
