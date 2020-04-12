import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Animated} from 'react-native';
import Header from './Header';
import InnerShadow from './InnerShadow';
import Theme from '../Theme';

class OpacityHeader extends React.PureComponent {
  render() {
    const {navigation,route, opacity, absolute, ...props} = this.props;
    const animatedOpacity =
      typeof opacity === 'number' ? new Animated.Value(opacity) : opacity;

    return (
      <View>
        <View style={[styles.headerContainer,absolute && {position:'absolute'}]}>
          {/* <InnerShadow
            top
            style={styles.innerShadow}
            size={Theme.specifications.headerHeight}
          /> */}
          <Header
            navigation={navigation}
            route={route}
            backgroundStyle={{opacity: animatedOpacity}}
            {...props}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    top: 0,
  },
  innerShadow: {
    marginTop: Theme.specifications.statusBarHeight,
  },
});

OpacityHeader.propTypes = {
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

OpacityHeader.defaultProps = {
  opacity: 0,
};

export default OpacityHeader;
