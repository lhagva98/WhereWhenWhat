import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import MoviesHorizontalFlatList from './EventHorizontalFlatList';
import {AppText, AppButton} from '../common';
import RouteNames from '../../RouteNames';
import {getFontStyleObject} from '../../utils/font';
import Theme from '../../Theme';
import {getMoreIcon} from '../../utils/icons';
import TouchAble from '../../components/TouchAble';
import * as RootNavigation from '../../RootNavigation';
class EventHorizontalScroll extends React.PureComponent {
  onMorePress = () => {
    const {title, fetchFunction} = this.props;
    RootNavigation.navigate(RouteNames.EventListScreen, {title, fetchFunction});
  };

  render() {
    const {title, events, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.topWrapper}>
          <AppText style={styles.title} type="title2">
            {title}
          </AppText>
          <TouchAble style={styles.moreButton} onPress={this.onMorePress}>
            {getMoreIcon()}
          </TouchAble>
          {/* <AppButton
            onlyText
            style={styles.moreButton}
            textStyle={styles.moreButtonText}
            onPress={this.onMorePress}>
            ...
          </AppButton> */}
        </View>
        <MoviesHorizontalFlatList
          events={events}
          paddingLeft={styles.title.marginLeft}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.tiny,
    marginBottom: Theme.spacing.base,
    width: '100%',
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: Theme.spacing.small,
    marginVertical: Theme.spacing.tiny,
  },
  moreButton: {
    padding: Theme.spacing.tiny,
  },
  moreButtonText: {
    fontSize: 30,
    ...getFontStyleObject({weight: 'SemiBold'}),
  },
});

EventHorizontalScroll.propTypes = {
  movies: PropTypes.array.isRequired,
  title: PropTypes.string,
  fetchFunction: PropTypes.func,
};

export default EventHorizontalScroll;
