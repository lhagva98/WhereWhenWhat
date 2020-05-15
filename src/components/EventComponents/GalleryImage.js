import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableScale} from '../common';
import {getGalleryEventImageUrl} from '../../api/urls';
import Theme from '../../Theme';
const {width} = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.9;

class GalleryImage extends React.PureComponent {
  static getPreviewHeight = () =>
    PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  renderEvent() {
    const {image, highPriority} = this.props;

    const priority = highPriority
      ? FastImage.priority.high
      : FastImage.priority.normal;
    return (
      <FastImage
        style={styles.image}
        source={{
          uri: getGalleryEventImageUrl(image),
          priority,
        }}
      />
    );
  }

  renderEmptyeventView = () => <View style={styles.image} />;

  render() {
    const {image, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        {image ? this.renderEvent() : this.renderEmptyeventView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.tiny,
    width: PREVIEW_WIDTH,
  },
  image: {
    width: PREVIEW_WIDTH,
    height: 200,
    // aspectRatio: Theme.specifications.posterAspectRation,
    borderRadius: 0,
    backgroundColor: Theme.colors.transparentBlack,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
});

GalleryImage.propTypes = {
  event: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any,
};

export default GalleryImage;
