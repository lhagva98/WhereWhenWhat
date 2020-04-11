import axios from 'axios';
import fetchHandler from '../network/fetchHandler';
import {
  getCurrentUsersSessionId,
  getCurrentUsersAccountId,
} from '../utils/store';
import {
  getAddToFavoriteUrl,
  getAddToWatchlistUrl,
  getSearchEventsUrl,
  getFavoriteEventUrl,
  getWatchlistUrl,
  getEventAccountStateUrl,
  getDetailsEventUrl,
  getEventRecommendationsUrl,
  getPopularEventsUrl,
  ChangeStatusInterested,
} from '../api/urls';
import {parseEventsArray} from '../utils/events';
import Config from '../Config';
import headers from '../api/headers';
// ------------------------------------------------------
// Event details
// ------------------------------------------------------
export const fetchEventAccountState = ({Event}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getEventAccountStateUrl({
      EventId: Event.id,
      sessionId: getCurrentUsersSessionId(),
    });

    try {
      const {data} = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchEventDetailedInfo = ({Event}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getDetailsEventUrl({EventId: Event.id});

    try {
      const {data} = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchEventRecommendations = ({Event, page = 1}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getEventRecommendationsUrl({EventId: Event.id, page});

    try {
      const {data} = await axios.get(url, reqParams);
      addParsedEventsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Event actions
// ------------------------------------------------------

export const changeEventInterestedStatus = (id, status) => {
  console.log(id, status);
  return fetchHandler(ChangeStatusInterested, {
    method: 'post',
    headers: headers(true),
    body: JSON.stringify({id, status}),
  });
  // new Promise(async (resolve, reject) => {
  //   try {
  //     // const {data} = await axios.get(url, reqParams);
  //     console.log(id, status);
  //     console.log(ChangeStatusInterested);
  //     const data = await
  //     console.log(data);
  //     //  console.log(data.payload.results);
  //     // addParsedEventsToData(data);
  //     resolve(data);
  //   } catch (error) {
  //     Config.logNetworkErrors && console.log(error);
  //     reject(error);
  //     console.log('error');
  //     console.log(error);
  //   }
  // });
};

export const changeEventFavoriteStatus = (
  {Event, favorite, accountId, sessionId},
  reqParams = {},
) =>
  new Promise(async (resolve, reject) => {
    const postData = {media_type: 'Event', media_id: Event.id, favorite};
    const url = getAddToFavoriteUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId(),
    });

    try {
      const {data} = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const changeEventWatchlistStatus = (
  {Event, watchlist, accountId, sessionId},
  reqParams = {},
) =>
  new Promise(async (resolve, reject) => {
    const postData = {media_type: 'Event', media_id: Event.id, watchlist};
    const url = getAddToWatchlistUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId(),
    });

    try {
      const {data} = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Events lists
// ------------------------------------------------------
export const getSectionFetchFunctionFromUrlGetter = urlGetter => (
  params,
  reqParams,
) => {
  return fetchSectionEvents(urlGetter, params, reqParams);
};

export const getSearchFetchFunctionFromQuery = query => ({page}) =>
  fetchSearchEvents({page, query});

export const fetchSectionEvents = (urlGetter, {page}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = urlGetter({page});
    try {
      // const {data} = await axios.get(url, reqParams);
      const data = await fetchHandler(url, {
        method: 'get',
        headers: headers(true),
        body: JSON.stringify(reqParams),
      });

      console.log(data.payload.results);
      // addParsedEventsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
      console.log('error');
      console.log(error);
    }
  });

export const fetchSearchEvents = ({page, query}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSearchEventsUrl({page, query});
    console.log(url);
    try {
      const data = await fetchHandler(url, {
        method: 'get',
        headers: headers(true),
      });
      console.log(data.payload.results);
      //  addParsedEventsToData(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchFavoriteEvents = ({page}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getFavoriteEventUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId(),
    });

    try {
      const {data} = await axios.get(url, reqParams);
      addParsedEventsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchWatchlistEvents = ({page}, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getWatchlistUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId(),
    });

    try {
      const {data} = await axios.get(url, reqParams);
      addParsedEventsToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Explore Events
// ------------------------------------------------------
export const fetchEventToExplore = isEventSeen =>
  new Promise(async (resolve, reject) => {
    const EventsToExplore = [];
    const minFillAmount = 35;
    let page = 1;

    try {
      while (EventsToExplore.length < minFillAmount) {
        const {Events} = await fetchSectionEvents(getPopularEventsUrl, {page});
        Events.forEach(Event => {
          if (!isEventSeen(Event)) {
            EventsToExplore.push(Event);
          }
        });

        page++;
      }
      resolve(EventsToExplore);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// Local functions
const addParsedEventsToData = data =>
  (data.Events = parseEventsArray(data.results));
