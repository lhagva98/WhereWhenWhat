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
import AppToast from '../../components/AppToast';
import {AppButton, PageSpinner} from '../../components/common';
import Theme from '../../Theme';
import SignUpInput from '../../components/SignUpInput';
const SignUp = props => {
  const [fname, setFname] = useState('');
  const [isValidated, setValidate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const fnameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const toastRef = useRef();
  const [validation, setValidation] = useState({
    fname: false,
    email: false,
    password: false,
  });

  registerAccount = async () => {
    props.RegisterAccount({
      fname: fname,
      password: password,
      email: email,
      onSuccess: () => {
        alert('Success');
      },
    });
    // setLoader(false)
  };
  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior={isIOS ? 'padding  ' : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <SignUpInput
            label="Хэрэглэгчийн нэр"
            textContentType="text"
            style={styles.input}
            error={false}
            value={fname}
            onChangeText={val => {
              setFname(val);
            }}
          />
          <SignUpInput
            label="Цахим шуудан"
            textContentType="text"
            style={styles.input}
            error={false}
            value={fname}
            onChangeText={val => {
              setEmail(val);
            }}
          />
          <SignUpInput
            secureTextEntry
            label="Нууц үг"
            textContentType="password"
            style={styles.input}
            subtext={'aa'}
            error={false}
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
      <AppToast ref={toastRef} />
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
