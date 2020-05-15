import {Notication} from './types';
import {seenNotif} from '../api/events';
export const updateUnreadMessagesCount = count => async dispatch => {
  dispatch({
    type: Notication.UPDATE_COUNT,
    payload: count,
  });
};

export const seenNotification = () => async dispatch => {
  try {
    seenNotif()
      .then(res => {
        dispatch({
          type: Notication.SEEN,
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
