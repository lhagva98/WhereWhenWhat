import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import EventInlinePreview from './EventInlinePreview';
import {eventKeyExtractor} from '../../utils/events';
import {geteventListEmptyIcon} from '../../utils/icons';
import Header from '../../components/Header';
class EventList extends React.PureComponent {
  renderEmptyDefault = () => {
    const {emptyText, emptySubtext} = this.props;
    return (
      <InfoAbsoluteBlock
        Icon={geteventListEmptyIcon()}
        text={emptyText}
        subtext={emptySubtext}
      />
    );
  };

  renderEmpty = () => {
    const {renderEmptyComponent} = this.props;
    return renderEmptyComponent
      ? renderEmptyComponent()
      : this.renderEmptyDefault();
  };

  renderevent = ({item: event}) => {
    return <EventInlinePreview event={event} />;
  };

  rendereventList = () => {
    const {events, title, ...props} = this.props;
    return (
      <View style={{flex: 1, width: '100%'}}>
        <Header title={title} backButton />
        <FlatList
          data={events}
          style={styles.list}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          renderItem={this.renderevent}
          keyExtractor={eventKeyExtractor}
          {...props}
        />
      </View>
    );
  };

  render() {
    const {events} = this.props;
    return events.length === 0 ? this.renderEmpty() : this.rendereventList();
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  renderEmptyComponent: PropTypes.func,
  emptyText: PropTypes.string,
  emptySubtext: PropTypes.string,
};

EventList.defaultProps = {
  emptyText: 'This list is empty',
};

export default EventList;
