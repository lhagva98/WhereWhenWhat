import React from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MoviePreview from './MoviePreview';
import GalleryImage from './GalleryImage';
import {movieKeyExtractor} from '../../utils/movies';
import Theme from '../../Theme';

class GalleryHorizontalFlatList extends React.PureComponent {
  renderPreview = ({item, index}) => (
    <GalleryImage key={index} image={item} highPriority={index < 5} />
  );
  renderEmptyContainer = () =>
    _.times(4).map((r, i) => <MoviePreview key={i} />);
  renderHeader = () => (
    <GalleryImage
      style={{width: this.props.paddingLeft - Theme.spacing.tiny}}
    />
  );

  render() {
    const {images, paddingLeft} = this.props;
    const isEmpty = images.length === 0;
    return (
      <FlatList
        horizontal
        data={images}
        scrollEnabled={!isEmpty}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={paddingLeft && this.renderHeader}
        ListEmptyComponent={this.renderEmptyContainer}
        // keyExtractor={movieKeyExtractor}
        renderItem={this.renderPreview}
      />
    );
  }
}

GalleryHorizontalFlatList.propTypes = {
  images: PropTypes.array.isRequired,
  paddingLeft: PropTypes.number,
};

export default GalleryHorizontalFlatList;
