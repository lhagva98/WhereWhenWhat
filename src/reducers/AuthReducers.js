import {Auth} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  isGuest: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.ATTEMPING:
      return {...state, loading: true};
    case Auth.LOGIN_USER_SUCCESS:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.REGISTER_USER_SUCCESS:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case Auth.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case Auth.CREATE_GUEST_SESSION_SUCCESS:
      return {...INITIAL_STATE, isGuest: true, user: action.payload};
    case Auth.CREATE_GUEST_SESSION_FAIL:
      return {...INITIAL_STATE};
    case Auth.USER_LOADED:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.LOG_OUT:
      return {...INITIAL_STATE};
    default:
      return {...state};
  }
};
