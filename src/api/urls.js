export const ROOT_URL = 'http://192.168.8.105:5000';
const withKey = url => `${ROOT_URL}${url}`;
export const LOGIN_URL = withKey('/user/login');
export const SIGNUP_URL = withKey('/user/register');
export const USER_INFO = withKey('/user/info');

//EVENT ACTION

export const ChangeStatusInterested = withKey('/user/changeInterested');
export const GetMyInterestedEvents = withKey('/user/MyInterestEvents');
export const GetMyNotications = withKey('/user/MyNotification');
export const ACCOUNT_DETAILS = withKey('/account');
export const SEEN_NOTIF = withKey('/user/seenNotification');
// Images
const BASE_COVER_URL = `${ROOT_URL}/files/eventImage/`;
const BASE_GALLERY_URL = `${ROOT_URL}/files/gallery/`;
export const getEventImageUrl = imagePath => `${BASE_COVER_URL}${imagePath}`;
export const getGalleryEventImageUrl = imagePath => {
  console.log(`${BASE_GALLERY_URL}${imagePath}`);
  return `${BASE_GALLERY_URL}${imagePath}`;
};
// event Details
export const getDetailseventUrl = ({eventId}) => withKey(`/event/${eventId}`);
export const geteventAccountStateUrl = ({eventId, sessionId}) =>
  `${withKey(`/event/${eventId}/account_states`)}&session_id=${sessionId}`;
export const geteventRecommendationsUrl = ({eventId, page = 1}) =>
  `${withKey(`/event/${eventId}/recommendations`)}&page=${page}`;

// events Sections
export const getPopulareventsUrl = ({page = 1}) =>
  `${withKey('/event/popular')}&page=${page}`;
export const getTopRatedeventsUrl = ({page = 1}) =>
  `${withKey('/event/top_rated')}&page=${page}`;
export const getTrendingDailyeventsUrl = ({page = 1}) =>
  `${withKey('/trending/event/day')}&page=${page}`;

export const getEventUrlByCategory = ({page = 1, category}) =>
  `${withKey('/user/events')}?category=${category}&page=${page}`;
export const getSportEventUrl = ({page = 1}) =>
  `${withKey('/user/events')}?categoryName=Information technology&page=${page}`;
export const getMusicEventUrl = ({page = 1}) =>
  `${withKey('/user/events')}?categoryName=Music&page=${page}`;
export const getTrendingWeeklyeventsUrl = ({page = 1}) =>
  `${withKey('/trending/event/week')}&page=${page}`;

// events Account State

export const getMyInterestedEventsUrl = ({page = 1}) =>
  `${withKey('/user/MyInterested')}?page=${page}`;

// export const getMyNotificationUrl = ({page = 1}) =>
//   `${withKey('/user/MyNotification')}?page=${page}`;

export const getWatchlistUrl = ({accountId, sessionId, page = 1}) =>
  `${withKey(
    `/account/${accountId}/watchlist/events`,
  )}&session_id=${sessionId}&page=${page}`;
export const getAddToFavoriteUrl = ({accountId, sessionId}) =>
  `${withKey(`/account/${accountId}/favorite`)}&session_id=${sessionId}`;
export const getAddToWatchlistUrl = ({accountId, sessionId}) =>
  `${withKey(`/account/${accountId}/watchlist`)}&session_id=${sessionId}`;

// events Search
export const getSearchEventsUrl = ({page = 1, query}) =>
  `${withKey('/user/search/event')}?page=${page}&query=${query}`;

// Imdb
export const getImdbLink = imdbID => `https://www.imdb.com/title/${imdbID}`;
