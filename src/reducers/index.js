import {combineReducers} from 'redux';
import AuthReducer from './AuthReducers';
import NoticationReducer from './NoticationReducer';
import MainReducer from './MainReducers';
export default combineReducers({
  auth: AuthReducer,
  notif: NoticationReducer,
  main: MainReducer,
});
