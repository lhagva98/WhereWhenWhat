import {Auth} from './types';
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from '../utils/validators';
import {
  stSaveUser,
  stRemoveUser,
  stRemoveCurrentMovies,
} from '../utils/storage';
import {
  requestToCreateNewGuestUser,
  requestToCreateNewAuthenticatedUser,
} from '../api/auth';
import {getTmdbErrorMessage} from '../api/codes';
import RouteNames from '../RouteNames';
import Config from '../Config';

export const clearLoginFields = () => ({type: Auth.CLEAR_LOGIN_FIELDS});
export const loadUserIntoRedux = user => ({
  type: Auth.USER_LOADED,
  payload: user,
});
export const loginUsernameChanged = text => ({
  type: Auth.USERNAME_CHANGED,
  payload: text,
});
export const loginPasswordChanged = text => ({
  type: Auth.PASSWORD_CHANGED,
  payload: text,
});

export const logOutUser = navigation => dispatch => {
  stRemoveUser();
  stRemoveCurrentMovies();
  navigation.navigate(RouteNames.AuthStack);
  dispatch({type: Auth.LOG_OUT});
};

export const createGuest = ({showToast, onSuccess}) => async dispatch => {
  dispatch({type: Auth.ATTEMPING});
  try {
    const guest = {
      token: null,
      data: {
        name: 'Guest',
        email: 'guest@gmail.com',
      },
    };
    setTimeout(
      () =>
        dispatch({
          type: Auth.CREATE_GUEST_SESSION_SUCCESS,
          payload: createUser(guest),
        }),
      2000,
    );

    showToast && showToast('Амжилттай Нэвтэрлээ');
    onSuccess();
  } catch (error) {
    showToast && showToast('Алдаа гарлаа');
    dispatch({type: Auth.CREATE_GUEST_SESSION_FAIL});
  }
};

export const loginUser = ({
  username,
  password,
  showToast,
  onSuccess,
}) => async dispatch => {
  const usernameValidator = validateUsername(username);
  const passwordValidator = validatePassword(password);
  const isValidCredentials =
    usernameValidator.isValid && passwordValidator.isValid;

  if (!isValidCredentials) {
    dispatch({
      type: Auth.USERNAME_INCORRECT,
      payload: usernameValidator.message,
    });
    dispatch({
      type: Auth.PASSWORD_INCORRECT,
      payload: passwordValidator.message,
    });
    return;
  }

  dispatch({type: Auth.LOGIN_USER_ATTEMPT});

  try {
    const {accountId, sessionId} = await requestToCreateNewAuthenticatedUser({
      username,
      password,
    });

    dispatch({
      type: Auth.LOGIN_USER_SUCCESS,
      payload: createUser({accountId, username, sessionId}),
    });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({type: Auth.LOGIN_USER_FAIL, payload: errMessage});
    showToast(errMessage);
  }
};

export const RegisterAccount = ({
  fname,
  password,
  email,
  onSuccess,
}) => async dispatch => {
  dispatch({type: Auth.REGISTER_USER_ATTEMP});

  try {
    // const {accountId, sessionId} = await requestToCreateNewAuthenticatedUser({
    //   username,
    //   password,
    // });

    dispatch({
      type: Auth.REGISTER_USER_SUCCESS,
      payload: createUser({accountId, username, sessionId}),
    });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized
      ? getTmdbErrorMessage(error.response.data.status_code)
      : '';
    dispatch({type: Auth.LOGIN_USER_FAIL, payload: errMessage});
    showToast(errMessage);
  }
};

// Local functions
const createUser = ({token, data}) => {
  const isGuest = token !== null;
  const user = {token, data, isGuest};
  Config.logGeneral && console.log('Creating user: ', user);
  stSaveUser(user);
  return user;
};
