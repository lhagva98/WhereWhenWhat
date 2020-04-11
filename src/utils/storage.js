import AsyncStorage from '@react-native-community/async-storage';
import {getCurrentUsersAccountId} from '../utils/store';

// User
const stUserKey = 'user';
const stUserTokenKey = 'token';
export const stGetUser = () =>
  getJsonObjectFromStorage(stUserKey, {onJsonParseError: stRemoveAll});
export const stGetUserToken = () =>
  getJsonObjectFromStorage(stUserTokenKey, {onJsonParseError: stRemoveAll});

export const stSaveUser = user =>
  AsyncStorage.setItem(stUserKey, JSON.stringify(user));
export const stSaveToken = token =>
  AsyncStorage.setItem(stUserTokenKey, JSON.stringify(token));
export const stRemoveAll = () => AsyncStorage.clear();

// Current events
const stCurrentEventsKey = 'currentEvents';
export const stGetCurrentEvents = () =>
  getJsonObjectFromStorage(stCurrentEventsKey);
export const stSaveCurrentEvents = Events =>
  AsyncStorage.setItem(stCurrentEventsKey, JSON.stringify(Events));
export const stRemoveCurrentEvents = () =>
  AsyncStorage.removeItem(stCurrentEventsKey);

// Requests
const stRequestsKey = 'requests';
export const stGetRequests = () => getJsonObjectFromStorage(stRequestsKey);
export const stSaveRequests = requests =>
  AsyncStorage.setItem(stRequestsKey, JSON.stringify(requests));

// Explore events
const getExploredEventsKey = () =>
  `user:${getCurrentUsersAccountId()}:explored`;
export const stGetExploredEvents = () =>
  getJsonObjectFromStorage(getExploredEventsKey());
export const stSaveExploredEvents = Events =>
  AsyncStorage.setItem(getExploredEventsKey(), JSON.stringify(Events));

// Local functions
const getJsonObjectFromStorage = (key, params = {}) =>
  new Promise(async resolve => {
    const {onJsonParseError} = params;
    try {
      const dataJson = await AsyncStorage.getItem(key);
      if (!dataJson) resolve(null);
      const data = JSON.parse(dataJson);
      resolve(data);
    } catch (e) {
      onJsonParseError && onJsonParseError();
      resolve(null);
    }
  });
