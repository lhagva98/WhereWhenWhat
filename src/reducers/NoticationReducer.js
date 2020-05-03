import {Notication} from '../actions/types';

const INITIAL_STATE = {
  unreadMessagesCount: 0,
  notification: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Notication.UPDATE_COUNT:
      return {
        ...state,
        unreadMessagesCount: action.payload,
      };
    default:
      return {...state};
  }
};
