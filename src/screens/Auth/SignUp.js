import React, {Component, useRef, useState, useEffect} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import isIOS from '../../utils/isIOS';
import TouchAble from '../../components/TouchAble';
import {RegisterAccount} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AppButton, PageSpinner} from '../../components/common';
import Theme from '../../Theme';
import SignUpInput from '../../components/SignUpInput';
import Validation from '../../utils/validators';
const SignUp = props => {
  const [name, setName] = useState('');
  const [isValidated, setValidate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [validation, setValidation] = useState({
    name: {
      isValid: true,
      msg: '',
    },
    email: {
      isValid: true,
      msg: '',
    },
    password: {
      isValid: true,
      msg: '',
    },
  });

  registerAccount = async () => {
    const {navigation} = props;
    const validate = Validation.signUpForm(name, email, password);
    setValidation(validate);
    console.log(validate);
    if (validate.name.isValid && validate.password.isValid) {
      props.RegisterAccount({
        name: name,
        password: password,
        email: email,
        onSuccess: () => {
          navigation.navigate(RouteNames.HomeStack);
        },
      });
      // setLoader(false)
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior={isIOS ? 'padding  ' : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <SignUpInput
            label="Өөрийн нэр"
            textContentType="nickname"
            style={styles.input}
            subtext={validation.name.msg}
            error={!validation.name.isValid}
            value={name}
            onChangeText={val => {
              setName(val);
            }}
          />
          <SignUpInput
            label="Нэвтрэх нэр"
            textContentType="emailAddress"
            style={styles.input}
            subtext={validation.email.msg}
            error={!validation.email.isValid}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
          />
          <SignUpInput
            secureTextEntry
            label="Нууц үг"
            textContentType="password"
            style={styles.input}
            subtext={validation.password.msg}
            error={!validation.password.isValid}
            value={password}
            onChangeText={val => {
              setPassword(val);
            }}
          />
          <AppButton
            style={styles.signUpButton}
            onPress={() => {
              registerAccount();
            }}>
            БҮРТГҮҮЛЭХ
          </AppButton>
        </View>
      </TouchableWithoutFeedback>
      <PageSpinner visible={loader} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  formContainer: {
    marginHorizontal: Theme.spacing.small,
    marginTop: 100,
  },
  signUpButton: {
    alignSelf: 'stretch',
    marginVertical: Theme.spacing.tiny,
  },
});

const mapStateToProps = ({auth}) => auth;

export default connect(mapStateToProps, {RegisterAccount})(SignUp);
