import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import {getMyNotification} from '../../api/events';
import {seenNotification} from '../../actions/NotifActions';
import {eventKeyExtractor} from '../../utils/events';
import RouteNames from '../../RouteNames';
import * as RootNavigation from '../../RootNavigation';
import moment from 'moment';
import Header from '../../components/Header';

import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import {connect} from 'react-redux';
import {emptyList, getEmptySearchIcon} from '../../utils/icons';
import Theme from '../../Theme';
class MyNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notifications: [],
    };
  }
  componentDidMount() {
    getMyNotification()
      .then(data => {
        console.log(data);
        setTimeout(() => {
          this.setState({
            isLoading: false,
            notifications: data.payload.notification,
          });
          this.props.seenNotification();
        }, 500);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  componentWillUnmount() {}

  renderLoading = () => (
    <InfoAbsoluteBlock
      Icon={<CircleLoadingIndicator color={Theme.gray.lightest} />}
      text="Ачаалалж байна"
      subtext=" "
    />
  );
  renderNotification = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.containerRender}
        onPress={() =>
          RootNavigation.navigate(RouteNames.EventDetailsScreen, {
            event: item.event,
          })
        }>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.text}>
              <Text style={styles.name}>{item.event.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text style={styles.timeAgo}>
              {moment(item.dateCreated).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {isLoading, notifications} = this.state;

    return (
      <View style={styles.container}>
        {isLoading && this.renderLoading()}
        <Header title="Мэдэгдэл" />
        <FlatList
          data={notifications}
          // style={styles.lis}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          renderItem={this.renderNotification}
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
  description: {
    color: 'white',
  },
  root: {
    backgroundColor: '#FFFFFF',
  },
  containerRender: {
    padding: 16,
    flexDirection: 'row',
    // borderBottomWidth: 0.4,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    // marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({auth}) => auth;

export default connect(
  mapStateToProps,
  {
    seenNotification,
  },
)(MyNotification);
