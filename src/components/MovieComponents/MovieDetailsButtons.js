import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton} from '../common';
import withRefetch from '../hoc/withRefetch';
import {getImdbLink} from '../../api/urls';
import {safeOpenURL} from '../../utils/network';
import {Linking} from 'react-native';
import {
  getMyInterestedIcon,
  getAddToFavoritesIcon,
  getOpenImdbIcon,
  getEventMapIcon,
  getshareIcon,
  getCallIcon,
} from '../../utils/icons';
import {
  fetchMovieAccountState,
  changeMovieFavoriteStatus,
  changeMovieWatchlistStatus,
} from '../../api/movies';
import Theme from '../../Theme';

class MovieDetailsButtons extends React.PureComponent {
  state = {
    //   inWatchlist: false,
    isWatchlistFetching: false,
    // inFavorite: false,
    isFavoriteFetching: false,
  };

  componentDidMount() {
    // eslint-disable-next-line
    // requestAnimationFrame(() => this.initialMovieFetch());
  }

  onAddToWatchlist = async () => {
    const {movie, refetch} = this.props;
    const {inWatchlist} = this.state;

    this.setState({inWatchlist: !inWatchlist, isWatchlistFetching: true});
    try {
      await refetch.fetchSafe(() =>
        changeMovieWatchlistStatus({movie, watchlist: !inWatchlist}),
      );
      this.setState({inWatchlist: !inWatchlist});
    } catch (e) {
      this.setState({inWatchlist});
    } finally {
      this.setState({isWatchlistFetching: false});
    }
  };

  onAddInterested = async () => {
    const {movie, refetch} = this.props;
    const {inFavorite} = this.state;

    this.setState({inFavorite: !inFavorite, isFavoriteFetching: true});
    try {
      await refetch.fetchSafe(() =>
        changeMovieFavoriteStatus({movie, favorite: !inFavorite}),
      );
      this.setState({inFavorite: !inFavorite});
    } catch (e) {
      this.setState({inFavorite});
    } finally {
      this.setState({isFavoriteFetching: false});
    }
  };

  initialMovieFetch() {
    const {movie, isGuest, refetch} = this.props;
    if (isGuest) return;

    refetch
      .fetchUntilSuccess(() => fetchMovieAccountState({movie}))
      .then(({favorite, watchlist}) => {
        this.setState({inWatchlist: watchlist, inFavorite: favorite});
      });
  }

  openImdb = () => {
    const {detailedMovie} = this.props;
    safeOpenURL(getImdbLink(detailedMovie.imdb_id));
  };
  callCompany = () => {
    const phoneNumber = this.props.phoneNumber || 88122217;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  openMap = () => {
    alert(this.props.location);
  };
  isInterested = () => {
    const {user, id} = this.props;
    console.log(user);
    if (user === null) return false;
    else {
      const myInterested = user.data.interested;
      return myInterested.indexOf(id) !== -1;
    }
  };

  render() {
    const {isGuest} = this.props;
    const {
      inWatchlist,
      inFavorite,
      isFavoriteFetching,
      isWatchlistFetching,
    } = this.state;
    const isAuthenticated = !isGuest;
    const imdbDisabled = false;

    return (
      <View style={styles.container}>
        {isAuthenticated && (
          <IconButton
            disabled={isWatchlistFetching}
            style={styles.iconButton}
            onPress={this.onAddInterested}
            Icon={getMyInterestedIcon(this.isInterested())}
            text={this.isInterested() ? 'Сануулагдсан' : 'Надад сануул'}
          />
        )}
        {isAuthenticated && (
          <IconButton
            disabled={isFavoriteFetching}
            style={styles.iconButton}
            onPress={this.onAddToFavorites}
            Icon={getshareIcon()}
            text="Хуваалцах"
          />
        )}
        <IconButton
          disabled={isFavoriteFetching || isWatchlistFetching}
          style={styles.iconButton}
          onPress={this.openMap}
          Icon={getEventMapIcon()}
          text="Байршил"
        />
        <IconButton
          disabled={isFavoriteFetching || isWatchlistFetching}
          style={styles.iconButton}
          onPress={this.callCompany}
          Icon={getCallIcon()}
          text="Холбоо Барих"
        />
        {/* <Text
          onPress={() => {
            Linking.openURL('tel:119');
          }}
          style={{fontSize: 20}}>
          1192323
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    marginVertical: Theme.spacing.tiny,
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: Theme.spacing.xTiny,
  },
});

MovieDetailsButtons.propTypes = {
  location: PropTypes.array.isRequired,
  phoneNumber: PropTypes.number,
  detailedMovie: PropTypes.object,
};

const mapStateToProps = ({auth: {isGuest, user}}) => ({isGuest, user});

export default connect(mapStateToProps, {})(withRefetch(MovieDetailsButtons));
