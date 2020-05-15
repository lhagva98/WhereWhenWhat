import {EVENT} from '../actions/types';

const INITIAL_STATE = {
  myInterestedEvents: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT.SET_EVENT_DATA:
      return {
        ...state,
        myInterestedEvents: action.payload,
      };

    default:
      return {...state};
  }
};
