import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {AppText} from '../common';
import ProgressiveImage from '../ProgressiveImage';
import InnerShadow from '../InnerShadow';
import {
  getW185ImageUrl,
  getW1280ImageUrl,
  getEventImageUrl,
} from '../../api/urls';
import Theme from '../../Theme';

class EventBackdropWithTitle extends React.PureComponent {
  render() {
    const {event} = this.props;

    return (
      <View>
        <ProgressiveImage
          resizeMode="cover"
          style={styles.image}
          source={{uri: getEventImageUrl(event.image)}}
          thumbnailSource={{uri: getEventImageUrl(event.image)}}
        />
        <InnerShadow
          hexColor={Theme.colors.background}
          startOpacity={1}
          size={140}
          bottom
        />
        <View style={styles.titleWrapper}>
          <AppText type="title2">{event.name}</AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '110%',
    aspectRatio: Theme.specifications.backdropAspectRation,
    backgroundColor: Theme.colors.transparentBlack,
  },
  titleWrapper: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: Theme.spacing.small,
    paddingVertical: Theme.spacing.tiny,
  },
});

EventBackdropWithTitle.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventBackdropWithTitle;
