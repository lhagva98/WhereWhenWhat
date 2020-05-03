import {Notication} from './types';
export const updateUnreadMessagesCount = count => async dispatch => {
  dispatch({
    type: Notication.UPDATE_COUNT,
    payload: count,
  });
};
