import {Auth} from './types';
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from '../utils/validators';
import {
  stSaveToken,
  stSaveUser,
  stRemoveUser,
  stRemoveAll,
  stRemoveCurrentMovies,
} from '../utils/storage';
import {login, SignUp, userInfo} from '../api/auth';
import {getTmdbErrorMessage} from '../api/codes';
import RouteNames from '../RouteNames';
import Config from '../Config';
import chest from '../api/chest';
export const clearLoginFields = () => ({type: Auth.CLEAR_LOGIN_FIELDS});

export const updateInterested = interested => async dispatch => {
  console.log(interested);
  dispatch({
    type: Auth.UPDATE_INTERESTED,
    payload: interested,
  });
};

export const loadUserCheckByToken = user => async dispatch => {
  try {
    console.log(user);
    dispatch({
      type: Auth.USER_LOADED,
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
  userInfo()
    .then(res => {
      console.log(res.payload);
      dispatch({
        type: Auth.USER_INFO_UPDATE,
        payload: res.payload.user,
      });
      showToast('Welcome back');
    })
    .catch(err => {
      console.log(err);
      stRemoveAll();
      dispatch({type: Auth.LOGIN_USER_FAIL});
      showToast(err.message);
    });
};
const showToast = msg => chest.get('toast')(msg);
export const logOutUser = () => dispatch => {
  dispatch({type: Auth.LOG_OUT});
  stRemoveAll();
};

export const createGuest = () => async dispatch => {
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

    showToast('Амжилттай Нэвтэрлээ');
  } catch (error) {
    showToast && showToast('Алдаа гарлаа');
    dispatch({type: Auth.CREATE_GUEST_SESSION_FAIL});
  }
};

export const loginUser = ({
  username,
  password,
  //onSuccess,
}) => async dispatch => {
  dispatch({type: Auth.ATTEMPING});

  login({email: username, password: password})
    .then(res => {
      dispatch({
        type: Auth.LOGIN_USER_SUCCESS,
        payload: createUser({token: res.payload.token, data: res.payload.user}),
      });

      showToast('Амжилттай нэвтэрлээ');
      // onSuccess();
    })
    .catch(err => {
      console.log(err);
      dispatch({type: Auth.LOGIN_USER_FAIL});
      showToast(err.message);
    });

  // } catch (error) {
  //   const isUnauthorized = error.response && error.response.status === 401;
  //   if (!isUnauthorized && showToast) {
  //     showToast('Something went wrong. Please try again later.');
  //   }
  //   const errMessage = isUnauthorized
  //     ? getTmdbErrorMessage(error.response.data.status_code)
  //     : '';
  //   dispatch({type: Auth.LOGIN_USER_FAIL, payload: errMessage});
  //   showToast(errMessage);
  // }
};

export const RegisterAccount = ({
  name,
  password,
  email,
  onSuccess,
}) => async dispatch => {
  dispatch({type: Auth.ATTEMPING});

  SignUp({email: email, password: password, name: name})
    .then(res => {
      dispatch({
        type: Auth.REGISTER_USER_SUCCESS,
        payload: createUser({token: res.payload.token, data: res.payload.user}),
      });

      showToast('Амжилттай бүртгэгдлээ');
      // showToast1('Амжилттай бүртгэгдлээ');
      // showToast('Амжилттай бүртгэгдлээ');
      onSuccess();
    })
    .catch(err => {
      console.log(err);
      dispatch({type: Auth.LOGIN_USER_FAIL});
      showToast(err.message);
    });
};

// Local functions
const createUser = ({token, data}) => {
  Config.logGeneral && console.log('Creating user: ', user);
  const user = {token, data};
  stSaveUser(user);
  return user;
};
