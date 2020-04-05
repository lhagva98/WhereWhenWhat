import validator from 'validator';

export default class Validation {
  static loginForm = (username, password) => {
    return {
      username: validateUsername(username),
      password: validatePassword(password),
    };
  };
  static signUpForm = (name, email, password) => {
    return {
      name: validateUsername(name),
      password: validatePassword(password),
      email: validateEmail(email),
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
    msg = 'Цахим шуудангаа оруулна уу';
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
