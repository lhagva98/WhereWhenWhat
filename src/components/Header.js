import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Animated} from 'react-native';
import {AppText, TouchableScale} from './common';
import {getHeaderBackIcon} from '../utils/icons';
import {useNavigation} from '@react-navigation/native';
import Theme from '../Theme';
const Header = props => {
  const {backButton, title, activeOpacity} = props;
  const navigation = useNavigation();
  return (
    <View style={[styles.container, activeOpacity && styles.activeOpacity]}>
      <Animated.View style={[styles.background]} />
      <View style={styles.headerWrapper}>
        <View style={styles.leftContainer}>
          {backButton && (
            <TouchableScale
              activeOpacity={0.7}
              onPress={() => {
                // alert('aa');
                navigation.goBack();
              }}>
              {getHeaderBackIcon()}
            </TouchableScale>
          )}
        </View>
        <View style={styles.titleContainer}>
          <AppText numberOfLines={1} type="header">
            {title ?? ''}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Theme.specifications.headerHeight,
    zIndex: 100,
  },
  // activeOpacity: {
  //   width: '100%',
  //   opacity: 0.3,
  //   position: 'absolute',
  //   top: 0,
  // },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.header,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: Theme.specifications.statusBarHeight,
  },
  leftContainer: {
    marginLeft: Theme.spacing.tiny,
    // overflow: 'hidden',
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // left: '30%',
  },
  rightContainer: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row-reverse',
  },
});

Header.propTypes = {
  backgroundStyle: PropTypes.any,
};

export default Header;
