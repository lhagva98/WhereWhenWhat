import {MAIN} from '../actions/types';

const INITIAL_STATE = {
  categories: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAIN.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return {...state};
  }
};
