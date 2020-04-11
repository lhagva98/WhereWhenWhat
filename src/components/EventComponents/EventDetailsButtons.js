import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton} from '../common';
import withRefetch from '../hoc/withRefetch';
import {getImdbLink} from '../../api/urls';
import {safeOpenURL} from '../../utils/network';
import {Linking} from 'react-native';
import {updateInterested} from '../../actions';
import RouteNames from '../../RouteNames';

import * as RootNavigation from '../../RootNavigation';
import {
  getMyInterestedIcon,
  getAddToFavoritesIcon,
  getOpenImdbIcon,
  getEventMapIcon,
  getshareIcon,
  getCallIcon,
} from '../../utils/icons';
import {
  fetcheventAccountState,
  changeeventFavoriteStatus,
  changeeventWatchlistStatus,
  changeEventInterestedStatus,
} from '../../api/events';
import Theme from '../../Theme';

class EventDetailsButtons extends React.PureComponent {
  state = {
    //   inWatchlist: false,
    isWatchlistFetching: false,
    // inFavorite: false,
    isFavoriteFetching: false,
  };

  componentDidMount() {
    // eslint-disable-next-line
    // requestAnimationFrame(() => this.initialeventFetch());
  }

  onAddToWatchlist = async () => {
    const {event, refetch} = this.props;
    const {inWatchlist} = this.state;

    this.setState({inWatchlist: !inWatchlist, isWatchlistFetching: true});
    try {
      await refetch.fetchSafe(() =>
        changeeventWatchlistStatus({event, watchlist: !inWatchlist}),
      );

      this.setState({inWatchlist: !inWatchlist});
    } catch (e) {
      this.setState({inWatchlist});
    } finally {
      this.setState({isWatchlistFetching: false});
    }
  };

  onAddInterested = async () => {
    const {refetch, id, interested} = this.props;

    this.setState({isFavoriteFetching: true});
    try {
      // refetch
      //   .fetchSafe(() =>
      changeEventInterestedStatus(id, !interested).then(res => {
        console.log(res);
        this.props.updateInterested(res.payload.interested);
      });
    } catch (e) {
      console.log('yes');
      // this.setState({inFavorite});
    } finally {
      this.setState({isFavoriteFetching: false});
    }
  };

  initialeventFetch() {
    const {event, isGuest, refetch} = this.props;
    if (isGuest) return;
    refetch
      .fetchUntilSuccess(() => fetcheventAccountState({event}))
      .then(({favorite, watchlist}) => {
        this.setState({inWatchlist: watchlist, inFavorite: favorite});
      });
  }

  openImdb = () => {
    const {detailedevent} = this.props;
    safeOpenURL(getImdbLink(detailedevent.imdb_id));
  };
  callCompany = () => {
    const phoneNumber = this.props.phoneNumber || 88122217;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  openMap = () => {
    RootNavigation.navigate(RouteNames.Map, {location: this.props.location});
  };
  // isInterested = () => {
  //   const {user, id} = this.props;
  //   console.log(user);
  //   if (user === null) return false;
  //   else {
  //     const myInterested = user.data.interested;
  //     return myInterested.indexOf(id) !== -1;
  //   }
  // };

  render() {
    const {isGuest, interested} = this.props;
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
            Icon={getMyInterestedIcon(interested)}
            text={interested ? 'Сануулагдсан' : 'Надад сануул'}
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

EventDetailsButtons.propTypes = {
  location: PropTypes.array.isRequired,
  phoneNumber: PropTypes.number,
  detailedevent: PropTypes.object,
};

const mapStateToProps = ({auth: {isGuest, user}}) => ({isGuest, user});

export default connect(
  mapStateToProps,
  {updateInterested},
)(withRefetch(EventDetailsButtons));
