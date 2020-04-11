export const REGISTRATION_URL = 'https://www.theeventdb.org/account/signup';
export const RESET_PASSWORD_URL =
  'https://www.theeventdb.org/account/reset-password';

export const ROOT_URL = 'http://10.0.2.2:5000';
const withKey = url => `${ROOT_URL}${url}`;

// Account
// export const NEW_SESSION = withKey('/authentication/session/new');
// export const NEW_GUEST_SESSION = withKey('/authentication/guest_session/new');
// export const NEW_REQUEST_TOKEN = withKey('/authentication/token/new');
export const LOGIN_URL = withKey('/user/login');
export const SIGNUP_URL = withKey('/user/register');
export const USER_INFO = withKey('/user/info');

//EVENT ACTION

export const ChangeStatusInterested = withKey('/user/changeInterested');

export const VALIDATE_TOKEN_WITH_LOGIN = withKey(
  '/authentication/token/validate_with_login',
);
export const ACCOUNT_DETAILS = withKey('/account');

// Images
const BASE_IMAGE_URL = `${ROOT_URL}/files/eventImage/`;

export const getEventImageUrl = imagePath => `${BASE_IMAGE_URL}${imagePath}`;

export const getW45ImageUrl = imagePath => `${BASE_IMAGE_URL}w45${imagePath}`;
export const getW92ImageUrl = imagePath => `${BASE_IMAGE_URL}w92${imagePath}`;
export const getW185ImageUrl = imagePath => `${BASE_IMAGE_URL}w185${imagePath}`;
export const getW300ImageUrl = imagePath => `${BASE_IMAGE_URL}w300${imagePath}`;
export const getW500ImageUrl = imagePath => `${BASE_IMAGE_URL}w500${imagePath}`;
export const getW780ImageUrl = imagePath => `${BASE_IMAGE_URL}w780${imagePath}`;
export const getW1280ImageUrl = imagePath =>
  `${BASE_IMAGE_URL}w1280${imagePath}`;

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
  `${withKey('/user/events')}?categoryName=Sport&page=${page}`;
export const getMusicEventUrl = ({page = 1}) =>
  `${withKey('/user/events')}?categoryName=Music&page=${page}`;

export const getTrendingWeeklyeventsUrl = ({page = 1}) =>
  `${withKey('/trending/event/week')}&page=${page}`;

// events Account State
export const getFavoriteeventUrl = ({accountId, sessionId, page = 1}) =>
  `${withKey(
    `/account/${accountId}/favorite/events`,
  )}&session_id=${sessionId}&page=${page}`;
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
