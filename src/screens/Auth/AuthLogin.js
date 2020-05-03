import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {loginUser} from '../../actions';
import isIOS from '../../utils/isIOS';
import {AppButton, PageSpinner} from '../../components/common';
import LoginInput from '../../components/LoginInput';
import * as Animatable from 'react-native-animatable';
import {RESET_PASSWORD_URL} from '../../api/urls';
import {safeOpenURL} from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Validation from '../../utils/validators';
import Header from '../../components/Header';
class AuthLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validation: {
        username: {
          isValid: true,
          msg: '',
        },
        password: {
          isValid: true,
          msg: '',
        },
      },
    };
  }
  onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);

  onLoginPress = () => {
    const {username, password} = this.state;
    const validate = Validation.loginForm(username, password);
    this.setState({validation: validate});
    if (validate.username.isValid && validate.password.isValid) {
      this.props.loginUser({
        username: this.state.username,
        password: this.state.password,
      });
    }
  };

  render() {
    const {loading} = this.props;

    return (
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : null}
        style={styles.container}>
        <Header title="Нэвтрэх хэсэг" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
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
              label="Нэвтрэх нэр"
              style={styles.input}
              Icon={<Icon name="user-tie" size={20} color="black" />}
              textContentType="emailAddress"
              subtext={this.state.validation.username.msg}
              error={!this.state.validation.username.isValid}
              value={this.state.username}
              onChangeText={val => {
                this.setState({username: val});
              }}
            />
            <LoginInput
              secureTextEntry
              label="Нууц үг"
              Icon={<Icon name="lock" size={20} color="black" />}
              textContentType="password"
              style={styles.input}
              subtext={this.state.validation.password.msg}
              error={!this.state.validation.password.isValid}
              value={this.state.password}
              onChangeText={val => {
                this.setState({password: val});
              }}
            />
            <AppButton style={styles.loginButton} onPress={this.onLoginPress}>
              НЭВТРЭХ
            </AppButton>
            {/* <AppButton
              onlyText
              style={styles.forgotButton}
              color={Theme.gray.lighter}
              onPress={this.onForgotPress}>
              Forgot the password?
            </AppButton> */}
          </View>
        </TouchableWithoutFeedback>

        <PageSpinner visible={loading} />
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

export default connect(
  mapStateToProps,
  {
    loginUser,
  },
)(AuthLogin);
