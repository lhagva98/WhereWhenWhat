import {combineReducers} from 'redux';
import AuthReducer from './AuthReducers';
import NoticationReducer from './NoticationReducer';
export default combineReducers({
  auth: AuthReducer,
  notif: NoticationReducer,
});
