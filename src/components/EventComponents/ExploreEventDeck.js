import React from 'react';
import EventDeck from './EventDeck';
import withRefetch from '../hoc/withRefetch';
import {
  fetcheventToExplore,
  changeeventWatchlistStatus,
  changeeventFavoriteStatus,
} from '../../api/events';
import {
  getCurrentUsersAccountId,
  getCurrentUsersSessionId,
} from '../../utils/store';
import {
  stGetExploredEvents,
  stGetCurrentEvents,
  stGetRequests,
  stSaveRequests,
  stSaveCurrentevents,
  stSaveExploredevents,
} from '../../utils/storage';
import {eventKeyExtractor} from '../../utils/events';

class ExploreEventDeck extends React.PureComponent {
  state = {
    events: [],
  };

  componentDidMount = async () => {
    this.timerIds = [];
    this.isFillingExploreevents = false;
    this.isResolvingRequests = false;

    let eventsToExplore = null;
    [eventsToExplore, this.exploredevents, this.requests] = await Promise.all([
      stGetCurrentEvents(),
      stGetExploredEvents(),
      stGetRequests(),
    ]);

    eventsToExplore = eventsToExplore || [];
    this.exploredevents = this.exploredevents || {};
    this.requests = this.requests || [];

    this.setState({events: eventsToExplore});
    this.runtimeLaunch(this.checkeventsFullness);
    this.checkRequests();
  };

  componentWillUnmount() {
    this.timerIds.forEach(id => clearInterval(id));
  }

  onSwipedLeft = event => {
    this.addToExplored(event);
    this.skipTopevent();
  };

  onSwipedTop = event => {
    this.addRequest(event, 'favorite');
    this.skipTopevent();
  };

  onSwipedRight = event => {
    this.addRequest(event, 'watchlist');
    this.skipTopevent();
  };

  skipTopevent = () => {
    this.setState(
      prevState => ({
        events: prevState.events.slice(1, prevState.events.length),
      }),
      () => stSaveCurrentevents(this.state.events),
    );
  };

  addRequest = async (event, type) => {
    this.requests.push({
      type,
      event,
      accountId: getCurrentUsersAccountId(),
      sessionId: getCurrentUsersSessionId(),
    });

    await stSaveRequests(this.requests);
    this.checkRequests();
  };

  addToExplored = async event =>
    new Promise(async resolve => {
      this.exploredevents[eventKeyExtractor(event)] = true;
      await stSaveExploredevents(this.exploredevents);
      resolve();
    });

  iseventSeen = event => {
    const {events} = this.state;
    const key = eventKeyExtractor(event);
    const isInCurrentevents = !!events.find(
      cevent => eventKeyExtractor(cevent) === key,
    );
    const isInRequests = !!this.requests.find(
      ({rqevent}) => eventKeyExtractor(rqevent) === key,
    );
    const wasExplored = this.exploredevents[key];
    return isInCurrentevents || isInRequests || wasExplored;
  };

  checkRequests = () => {
    if (!this.isResolvingRequests && this.requests.length > 0) {
      this.isResolvingRequests = true;
      this.recursiveResolve(this.requests[0]);
    }
  };

  recursiveResolve = request => {
    const {
      refetch: {fetchUntilSuccess},
    } = this.props;

    fetchUntilSuccess(() => this.resolveRequest(request)).then(async () => {
      this.requests.splice(0, 1);
      await stSaveRequests(this.requests);
      await this.addToExplored(request.event);

      if (this.requests.length > 0) {
        this.recursiveResolve(this.requests[0]);
      } else {
        this.isResolvingRequests = false;
      }
    });
  };

  resolveRequest = request => {
    const {type, event, accountId, sessionId} = request;
    const rqFunction =
      type === 'watchlist'
        ? changeeventWatchlistStatus
        : changeeventFavoriteStatus;

    return rqFunction({
      event,
      watchlist: true,
      favorite: true,
      accountId,
      sessionId,
    });
  };

  checkeventsFullness = () => {
    this.state.events.length < 10 && this.filleventsToExplore();
  };

  filleventsToExplore = async () => {
    if (this.isFillingExploreevents) return;
    this.isFillingExploreevents = true;

    const {
      refetch: {fetchUntilSuccess},
    } = this.props;

    const toAddevents = await fetchUntilSuccess(() =>
      fetcheventToExplore(this.iseventSeen),
    );
    this.setState(
      prevState => ({events: [...prevState.events, ...toAddevents]}),
      () => stSaveCurrentevents(this.state.events),
    );
    this.isFillingExploreevents = false;
  };

  runtimeLaunch(functionToExecute, intervalTime = 1000) {
    functionToExecute();
    this.timerIds.push(setInterval(() => functionToExecute(), intervalTime));
  }

  render() {
    const {events} = this.state;

    return (
      <EventDeck
        events={events}
        onSwipedTop={this.onSwipedTop}
        onSwipedLeft={this.onSwipedLeft}
        onSwipedRight={this.onSwipedRight}
      />
    );
  }
}

export default withRefetch(ExploreEventDeck);
