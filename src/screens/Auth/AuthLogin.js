import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {loginUser} from '../../actions';
import isIOS from '../../utils/isIOS';
import {AppButton, PageSpinner} from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import * as Animatable from 'react-native-animatable';
import TouchAble from '../../components/TouchAble';
import {RESET_PASSWORD_URL} from '../../api/urls';
import {safeOpenURL} from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
const zoomOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.5: {
    opacity: 0.5,
    scale: 0.3,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};
class AuthLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
  // onUsernameTextChange = text => this.props.loginUsernameChanged(text);
  // onPasswordTextChange = text => this.props.loginPasswordChanged(text);

  onLoginPress = () => {
    const {navigation} = this.props;
    this.props.loginUser({
      username: this.state.username,
      password: this.state.password,
      showToast: this.showToast,
      onSuccess: () => {
        navigation.navigate(RouteNames.HomeStack);
      },
    });
  };

  showToast = message => this.toast.show(message, 2000);

  render() {
    const {
      loginUsername,
      loginUsernameError,
      loginPassword,
      loginPasswordError,
      loginIsLoading,
    } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : null}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Animatable.Image
                animation={zoomOut}
                source={require('../../assets/img/logo.png')}
                style={styles.logo}
              />
              <View style={{flexDirection: 'row', paddingHorizontal: 0}}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'white',
                    height: 50,
                    padding: 10,
                    margin: 5,
                    borderRightWidth: 0,
                  }}>
                  <Animatable.Text
                    duration={2000}
                    iterationCount="infinite"
                    animation="bounceIn"
                    style={styles.logoText}>
                    ХЭЗЭЭ
                  </Animatable.Text>
                </View>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'white',
                    height: 50,
                    padding: 10,
                    margin: 5,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                  }}>
                  <Animatable.Text
                    duration={2000}
                    iterationCount="infinite"
                    delay={200}
                    animation="bounceInDown"
                    style={styles.logoText}>
                    ХААНА
                  </Animatable.Text>
                </View>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'white',
                    height: 50,
                    padding: 10,
                    margin: 5,
                    borderLeftWidth: 0,
                  }}>
                  <Animatable.Text
                    duration={2000}
                    iterationCount="infinite"
                    delay={400}
                    animation="bounceInRight"
                    style={styles.logoText}>
                    ЮУ
                  </Animatable.Text>
                </View>
              </View>
            </View>
            <LoginInput
              label="Username"
              style={styles.input}
              subtext={loginUsernameError}
              error={loginUsernameError.length > 0}
              value={this.state.username}
              onChangeText={val => {
                this.setState({username: val});
              }}
            />
            <LoginInput
              secureTextEntry
              label="Password"
              textContentType="password"
              style={styles.input}
              subtext={loginPasswordError}
              error={loginPasswordError.length > 0}
              value={this.state.password}
              onChangeText={val => {
                this.setState({password: val});
              }}
            />
            <AppButton style={styles.loginButton} onPress={this.onLoginPress}>
              LOG IN
            </AppButton>
            <AppButton
              onlyText
              style={styles.forgotButton}
              color={Theme.gray.lighter}
              onPress={this.onForgotPress}>
              Forgot the password?
            </AppButton>
          </View>
        </TouchableWithoutFeedback>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={loginIsLoading} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.small,
    flex: 1,
  },
  input: {
    marginTop: Theme.spacing.tiny,
  },
  loginButton: {
    alignSelf: 'stretch',
    marginVertical: Theme.spacing.tiny,
  },
  forgotButton: {
    paddingVertical: Theme.spacing.tiny,
    paddingHorizontal: Theme.spacing.small,
  },
  logoText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 32,
    marginBottom: 25,
  },
});

const mapStateToProps = ({auth}) => auth;

export default connect(mapStateToProps, {
  loginUser,
})(AuthLogin);
