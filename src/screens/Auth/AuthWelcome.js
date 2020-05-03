import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet} from 'react-native';
import PageSpinner from '../../components/common/PageSpinner';
import ImageOpacityCycler from '../../components/ImageOpacityCycler';
import {AppButton, AppText} from '../../components/common';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import {createGuest} from '../../actions';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
const WELCOME_IMAGES = [
  require('../../assets/img/welcome_background_images/jurassic_world.jpg'),
  // require('../../assets/img/welcome_background_images/spider_man.jpg'),
  // require('../../assets/img/welcome_background_images/shutter_island.jpg'),
  // require('../../assets/img/welcome_background_images/bumblebee.jpg'),
  // require('../../assets/img/welcome_background_images/the_godfather.jpg'),
  // require('../../assets/img/welcome_background_images/the_sixth_sense.jpg'),
];

class AuthWelcome extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // this.onScreenFocused();
    });
  }

  onLoginPress = () => this.props.navigation.navigate(RouteNames.AuthLogin);
  onSignUpPress = () => this.props.navigation.navigate(RouteNames.SignUp);
  // onScreenFocused = () => this.props.clearLoginFields();
  onGuestLoginPress = () => {
    const {createGuest} = this.props;
    createGuest();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <ImageOpacityCycler
          style={StyleSheet.absoluteFill}
          images={WELCOME_IMAGES}
        /> */}
        <View style={styles.content}>
          <View>
            <FastImage
              style={styles.tmdbLogo}
              source={null}
              resizeMode="contain"
            />
            <AppText style={styles.welcomeText} type="title1">
              WHERNAT
            </AppText>
            <AppText style={styles.welcomeCaption} type="titleCaption">
              Арга хэмээний мэдээлэлийг нэг дороос
            </AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              solid
              toScale={true}
              style={styles.button}
              textStyle={styles.buttonText}
              color={Theme.colors.success}
              onPress={this.onLoginPress}>
              Нэвтрэх
            </AppButton>
            <AppButton
              solid
              toScale={false}
              style={styles.button}
              textStyle={styles.buttonText}
              color={Theme.colors.info}
              onPress={this.onSignUpPress}>
              Бүртгүүлэх
            </AppButton>
          </View>
          <AppButton
            onlyText
            style={styles.guestButton}
            color={Theme.gray.lighter}
            onPress={this.onGuestLoginPress}>
            Зочин эрхээр нэвтрэх
          </AppButton>
        </View>

        <PageSpinner visible={this.props.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 7,
    justifyContent: 'space-between',
  },
  tmdbLogo: {
    width: null,
    height: 100,
    marginTop: Theme.spacing.large * 2,
    marginBottom: Theme.spacing.large,
  },
  welcomeText: {
    textAlign: 'center',
  },
  welcomeCaption: {
    color: Theme.gray.lighter,
    textAlign: 'center',
  },
  guestButton: {
    height: 48,
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.base,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#000000',
    padding: 25,
    marginTop: 10,
  },
  button: {
    height: 80,
    flex: 1,
  },
  buttonText: {
    fontSize: 22,
  },
});

const mapStateToProps = ({auth}) => {
  const {loading} = auth;
  return {loading};
};

export default connect(
  mapStateToProps,
  {createGuest},
)(withDelayedLoading(AuthWelcome));
