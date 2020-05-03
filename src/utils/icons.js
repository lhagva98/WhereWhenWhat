import React from 'react';
import {View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../Theme';

const {
  smallIconSize,
  iconSize,
  largeIconSize,
  hugeIconSize,
} = Theme.specifications;
const {primary: primaryColor} = Theme.colors;
const {
  lightest: lightestColor,
  lighter: lighterColor,
  light: lightColor,
  darkest: darkestColor,
} = Theme.gray;
const {tiny} = Theme.spacing;

// ------------------------------------------------------
// MovieDetailsButtons
// ------------------------------------------------------
export const getMyInterestedIcon = interested => (
  <IconMaterialIcons
    name={interested ? 'playlist-add-check' : 'playlist-add'}
    color={interested ? primaryColor : lightestColor}
    size={iconSize}
  />
);
export const getNoticationIcon = ({color, size, unreadMessagesCount}) => {
  <View style={{flex: 1, backgroundColor: 'red'}}>
    <IconFeather name="user" color={'red'} size={20} />
  </View>;
};
export const getLogoutIcon = () => (
  <IconFeather name="log-out" color={lightestColor} size={smallIconSize} />
);
export const getPasswordIcon = () => (
  <IconFeather name="key" color={lightestColor} size={smallIconSize} />
);

export const getCallIcon = () => (
  <IconMaterialIcons name={'call'} color={lightestColor} size={iconSize} />
);
export const getEventMapIcon = () => (
  <IconMaterialIcons name={'map'} color={lightestColor} size={iconSize} />
);
export const getMoreIcon = () => (
  <IconFontAwesome name={'ellipsis-h'} color={lightestColor} size={20} />
);

export const emptyList = () => (
  <IconFontAwesome name={'ellipsis-h'} color={lightestColor} size={20} />
);
export const getshareIcon = () => (
  <IconMaterialIcons name={'share'} color={lightestColor} size={iconSize} />
);
export const getAddToFavoritesIcon = ({inFavorite}) => (
  <IconMaterialIcons
    name={inFavorite ? 'favorite' : 'favorite-border'}
    color={inFavorite ? primaryColor : lightestColor}
    size={iconSize}
  />
);

export const getOpenImdbIcon = ({disabled}) => (
  <IconMaterialCommunityIcons
    name="movie-roll"
    color={disabled ? lightColor : lightestColor}
    size={iconSize}
  />
);

// ------------------------------------------------------
// MovieSearchResults
// ------------------------------------------------------
export const getEmptySearchIcon = () => (
  <IconFeather name="alert-circle" color={lightestColor} size={hugeIconSize} />
);

export const getInitialSearchIcon = () => (
  <IconEvilIcons name="search" color={lightestColor} size={hugeIconSize} />
);

// ------------------------------------------------------
// GuestInfo
// ------------------------------------------------------
export const getGuestInfoIcon = () => (
  <IconFeather name="user" color={lightestColor} size={hugeIconSize} />
);

// ------------------------------------------------------
// SearchInput
// ------------------------------------------------------
export const getSearchInputBackIcon = ({style}) => (
  <IconEntypo
    name="chevron-thin-left"
    size={smallIconSize}
    color={darkestColor}
    style={style}
  />
);

export const getSearchInputLabelIcon = () => (
  <IconFeather
    name="search"
    color={darkestColor}
    size={smallIconSize * 1.1}
    style={{paddingHorizontal: tiny}}
  />
);

export const getSearchInputCloseIcon = () => (
  <IconAntDesign name="close" color={darkestColor} size={smallIconSize * 1.2} />
);

// ------------------------------------------------------
// EventList
// ------------------------------------------------------
export const getMovieListEmptyIcon = () => (
  <IconAntDesign name="smileo" color={lightestColor} size={hugeIconSize} />
);

// ------------------------------------------------------
// EventCard
// ------------------------------------------------------
export const getMovieCardChevron = isChevronUp => (
  <IconEntypo
    name={isChevronUp ? 'chevron-up' : 'chevron-down'}
    size={largeIconSize * 0.95}
    color={lightestColor}
  />
);

// ------------------------------------------------------
// Library
// ------------------------------------------------------

export const getLibraryWatchlistIcon = () => (
  <IconMaterialIcons
    name="watch-later"
    color={lightColor}
    size={iconSize * 0.8}
  />
);

export const getLibraryFavoriteIcon = () => (
  <IconMaterialCommunityIcons
    name="heart-multiple"
    color={lightColor}
    size={iconSize * 0.8}
  />
);

// ------------------------------------------------------
// Header
// ------------------------------------------------------
export const getHeaderBackIcon = () => (
  <IconEntypo
    name="chevron-left"
    color={lightestColor}
    size={iconSize}
    style={{padding: Theme.spacing.tiny}}
  />
);

// ------------------------------------------------------
// Routes
// ------------------------------------------------------
export const getNavbarBrowseIcon = ({tintColor}) => (
  <IconEntypo name="home" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarExploreIcon = ({tintColor}) => (
  <IconMaterialIcons
    name="photo-library"
    color={tintColor}
    size={iconSize * 0.9}
  />
);

export const getNavbarLibraryIcon = ({tintColor}) => (
  <IconEntypo name="folder-video" color={tintColor} size={iconSize * 0.85} />
);
