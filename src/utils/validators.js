import validator from 'validator';

export default class Validation {
  static loginForm = (username, password) => {
    return {
      username: validateUsername(username),
      password: validatePassword(password),
    };
  };
}

const validateUsername = username => {
  let isValid = false;
  let msg = '';
  if (validator.isEmpty(username)) {
    msg = 'Нэвтрэх нэрээ оруулна уу';
  } else {
    isValid = true;
  }
  return {isValid, msg};
};

const validateEmail = email => {
  let isValid = false;
  let msg = '';
  if (validator.isEmail(email)) {
    msg = 'Please enter your email.';
  } else {
    isValid = true;
  }
  return {isValid, msg};
};
const validatePassword = password => {
  let isValid = false;
  let msg = '';

  if (validator.isEmpty(password)) {
    msg = 'Please enter your password.';
  } else if (password.length < 4) {
    msg = 'Password is too short.';
  } else {
    isValid = true;
  }

  return {isValid, msg};
};
