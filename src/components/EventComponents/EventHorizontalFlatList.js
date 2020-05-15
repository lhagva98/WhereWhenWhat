import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EventPreview from './EventPreview';
import {eventKeyExtractor} from '../../utils/events';
import Theme from '../../Theme';

class EventsHorizontalList extends React.PureComponent {
  renderPreview = ({item, index}) => (
    <EventPreview event={item} highPriority={index < 5} />
  );
  renderEmptyContainer = () =>
    _.times(4).map((r, i) => <EventPreview key={i} />);
  renderHeader = () => (
    <View style={{width: this.props.paddingLeft - Theme.spacing.tiny}} />
  );

  render() {
    const {events, paddingLeft} = this.props;
    console.log(events);
    const isEmpty = events.length === 0;

    return (
      <FlatList
        horizontal
        data={events}
        scrollEnabled={!isEmpty}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={paddingLeft && this.renderHeader}
        ListEmptyComponent={this.renderEmptyContainer}
        keyExtractor={eventKeyExtractor}
        renderItem={this.renderPreview}
      />
    );
  }
}

EventsHorizontalList.propTypes = {
  events: PropTypes.array.isRequired,
  paddingLeft: PropTypes.number,
};

export default EventsHorizontalList;
