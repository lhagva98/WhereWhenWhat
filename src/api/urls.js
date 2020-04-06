export const REGISTRATION_URL = 'https://www.themoviedb.org/account/signup';
export const RESET_PASSWORD_URL =
  'https://www.themoviedb.org/account/reset-password';

export const ROOT_URL = 'http://10.0.2.2:5000';
const withKey = (url) => `${ROOT_URL}${url}`;

// Account
// export const NEW_SESSION = withKey('/authentication/session/new');
// export const NEW_GUEST_SESSION = withKey('/authentication/guest_session/new');
// export const NEW_REQUEST_TOKEN = withKey('/authentication/token/new');
export const LOGIN_URL = withKey('/user/login');
export const SIGNUP_URL = withKey('/user/register');
export const VALIDATE_TOKEN_WITH_LOGIN = withKey(
  '/authentication/token/validate_with_login',
);
export const ACCOUNT_DETAILS = withKey('/account');

// Images
const BASE_IMAGE_URL = `${ROOT_URL}/files/eventImage/`;

export const getEventImageUrl = (imagePath) => `${BASE_IMAGE_URL}${imagePath}`;

export const getW45ImageUrl = (imagePath) => `${BASE_IMAGE_URL}w45${imagePath}`;
export const getW92ImageUrl = (imagePath) => `${BASE_IMAGE_URL}w92${imagePath}`;
export const getW185ImageUrl = (imagePath) =>
  `${BASE_IMAGE_URL}w185${imagePath}`;
export const getW300ImageUrl = (imagePath) =>
  `${BASE_IMAGE_URL}w300${imagePath}`;
export const getW500ImageUrl = (imagePath) =>
  `${BASE_IMAGE_URL}w500${imagePath}`;
export const getW780ImageUrl = (imagePath) =>
  `${BASE_IMAGE_URL}w780${imagePath}`;
export const getW1280ImageUrl = (imagePath) =>
  `${BASE_IMAGE_URL}w1280${imagePath}`;

// Movie Details
export const getDetailsMovieUrl = ({movieId}) => withKey(`/movie/${movieId}`);
export const getMovieAccountStateUrl = ({movieId, sessionId}) =>
  `${withKey(`/movie/${movieId}/account_states`)}&session_id=${sessionId}`;
export const getMovieRecommendationsUrl = ({movieId, page = 1}) =>
  `${withKey(`/movie/${movieId}/recommendations`)}&page=${page}`;

// Movies Sections
export const getPopularMoviesUrl = ({page = 1}) =>
  `${withKey('/movie/popular')}&page=${page}`;
export const getTopRatedMoviesUrl = ({page = 1}) =>
  `${withKey('/movie/top_rated')}&page=${page}`;
export const getTrendingDailyMoviesUrl = ({page = 1}) =>
  `${withKey('/trending/movie/day')}&page=${page}`;

export const getEventUrlByCategory = ({page = 1, category}) =>
  `${withKey('/user/events')}?category=${category}&page=${page}`;
export const getSportEventUrl = ({page = 1}) =>
  `${withKey('/user/events')}?categoryName=Sport&page=${page}`;
export const getMusicEventUrl = ({page = 1}) =>
  `${withKey('/user/events')}?categoryName=Music&page=${page}`;

export const getTrendingWeeklyMoviesUrl = ({page = 1}) =>
  `${withKey('/trending/movie/week')}&page=${page}`;

// Movies Account State
export const getFavoriteMovieUrl = ({accountId, sessionId, page = 1}) =>
  `${withKey(
    `/account/${accountId}/favorite/movies`,
  )}&session_id=${sessionId}&page=${page}`;
export const getWatchlistUrl = ({accountId, sessionId, page = 1}) =>
  `${withKey(
    `/account/${accountId}/watchlist/movies`,
  )}&session_id=${sessionId}&page=${page}`;
export const getAddToFavoriteUrl = ({accountId, sessionId}) =>
  `${withKey(`/account/${accountId}/favorite`)}&session_id=${sessionId}`;
export const getAddToWatchlistUrl = ({accountId, sessionId}) =>
  `${withKey(`/account/${accountId}/watchlist`)}&session_id=${sessionId}`;

// Movies Search
export const getSearchMoviesUrl = ({page = 1, query}) =>
  `${withKey('/search/movie')}&page=${page}&query=${query}`;

// Imdb
export const getImdbLink = (imdbID) => `https://www.imdb.com/title/${imdbID}`;
