import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import {getMyInterestedEvents} from '../../api/events';
import {eventKeyExtractor} from '../../utils/events';
import EventInlinePreview from './EventInlinePreview';
import Header from '../../components/Header';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import {emptyList, getEmptySearchIcon} from '../../utils/icons';
import Theme from '../../Theme';
class EventMyInterestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      myInterestedEvents: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.fetData(),
    );
    this.fetData();
  }

  fetData = () => {
    getMyInterestedEvents()
      .then(data => {
        console.log(data);
        setTimeout(() => {
          this.setState({
            isLoading: false,
            myInterestedEvents: data.payload.event,
          });
        }, 500);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  renderLoading = () => (
    <InfoAbsoluteBlock
      Icon={<CircleLoadingIndicator color={Theme.gray.lightest} />}
      text="Ачаалалж байна"
      subtext=" "
    />
  );
  renderevent = ({item: event}) => <EventInlinePreview event={event} />;
  render() {
    const {isLoading, myInterestedEvents} = this.state;

    return (
      <View style={styles.container}>
        {isLoading && this.renderLoading()}
        <Header title="Миний төлөвлөгөө" />
        {/* {this.state.myInterestedEvents.length == 0 && this.renderEmptyResults()} */}
        <FlatList
          data={myInterestedEvents}
          style={styles.list}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          renderItem={this.renderevent}
          keyExtractor={eventKeyExtractor}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventMyInterestedList;
