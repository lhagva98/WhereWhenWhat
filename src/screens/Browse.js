import React from 'react';
import {connect} from 'react-redux';
// import {withNavigationFocus} from 'react-navigation';
import {
  View,
  FlatList,
  StyleSheet,
  PanResponder,
  RefreshControl,
  Alert,
} from 'react-native';
import SearchBlock from '../components/SearchBlock';
import EventHorizontalScroll from '../components/EventComponents/EventHorizontalScroll';
import MovieSearchResults from '../components/EventComponents/EventSearchResults';
import withRefetch from '../components/hoc/withRefetch';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import {
  getSectionFetchFunctionFromUrlGetter as getFetchFunction,
  getSearchFetchFunctionFromQuery,
} from '../api/events';
import {getSportEventUrl, getMusicEventUrl} from '../api/urls';
import Theme from '../Theme';

const BROWSE_SECTIONS = [
  {
    title: 'Мэдээллийн технологи',
    fetchFunction: getFetchFunction(getSportEventUrl),
  },
  // {
  //   title: 'Дуу хөгжим',
  //   fetchFunction: getFetchFunction(getMusicEventUrl),
  // },
  // {
  //   title: 'Trending Weekly',
  //   fetchFunction: getFetchFunction(getTrendingWeeklyMoviesUrl),
  // },
  // {title: 'Popular', fetchFunction: getFetchFunction(getPopularMoviesUrl)},
  // {title: 'Top Rated', fetchFunction: getFetchFunction(getTopRatedMoviesUrl)},
];

class Browse extends React.Component {
  constructor(props) {
    super(props);
    console.log('categories');
    console.log(props.categories);
    const sectionsEvents = BROWSE_SECTIONS.reduce((obj, section) => {
      obj[section.title] = []; // eslint-disable-line
      return obj;
    }, {});
    console.log(sectionsEvents);
    this.state = {
      isInitialSearch: true,
      isSearchBlockFocused: false,
      refreshing: false,
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(''),
      searchText: '',
      sectionsEvents,
    };

    this.createKeyboardDismissResponder();
  }

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.initialSectionsFetch());

    if (this.props.isGuest)
      setTimeout(() => {
        Alert.alert(
          'WHERNAT',
          'Хэрвээ та системд бүргүүлэж хэрэглэгч болсоноор илүү их боломжыг хүртэх болно. Таньд амжилт хүсье',
          [{text: 'OK'}],
        );
      }, 3000);
  }
  onSearchBlockFocus = () => this.setState({isSearchBlockFocused: true});
  onSearchBlockBlur = () => this.setState({isSearchBlockFocused: false});
  onSearchTextInputRef = ref => (this.searchTextInput = ref);
  onSearchTextChange = text => {
    const additionalProps = text.length === 0 ? {isInitialSearch: true} : {};
    this.setState({searchText: text, ...additionalProps});
  };

  onDelayedInput = async () => {
    const {searchText} = this.state;
    this.setState({
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(searchText),
      isInitialSearch: false,
    });
  };

  createKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchTextInput.blur();
      return false;
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder,
    });
  }

  initialSectionsFetch() {
    const {
      refetch: {fetchUntilSuccess},
    } = this.props;

    BROWSE_SECTIONS.forEach(section =>
      fetchUntilSuccess(() => section.fetchFunction({page: 1})).then(data => {
        const {sectionsEvents} = this.state;
        const newSections = {
          ...sectionsEvents,
          [section.title]: data.payload.results,
        };
        this.setState({sectionsEvents: newSections});
      }),
    );
  }

  renderMoviesScrollSection = ({item: {title, fetchFunction}}) => {
    const {sectionsEvents} = this.state;
    return (
      <EventHorizontalScroll
        fetchFunction={fetchFunction}
        events={sectionsEvents[title]}
        title={title}
      />
    );
  };
  refresh = () => {
    this.setState({refreshing: true}, () => {
      this.initialSectionsFetch();
      setTimeout(() => {
        this.setState({
          refreshing: false,
        });
      }, 1000);
    });
  };
  renderBrowseSections() {
    const {sectionsEvents} = this.state;
    const keyExtractor = section => section.title;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            title="Шинэчлэгдэж байна"
            titleColor="white"
            colors="white"
            tintColor="white"
            refreshing={this.state.refreshing}
            onRefresh={() => this.refresh()}
          />
        }
        data={BROWSE_SECTIONS}
        extraData={sectionsEvents}
        keyExtractor={keyExtractor}
        renderItem={this.renderMoviesScrollSection}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  render() {
    const {
      searchText,
      searchResultsFetchFunction,
      isInitialSearch,
      isSearchBlockFocused,
    } = this.state;

    return (
      <View style={styles.container}>
        <SearchBlock
          value={searchText}
          style={styles.search}
          inputRef={this.onSearchTextInputRef}
          onBlockBlur={this.onSearchBlockBlur}
          onBlockFocus={this.onSearchBlockFocus}
          onChangeText={this.onSearchTextChange}
          onDelayedInput={this.onDelayedInput}
          navigation={this.props.navigation}
        />
        <View style={styles.bottomContainer} {...this.panResponder.panHandlers}>
          {this.renderBrowseSections()}
          {isSearchBlockFocused && (
            <MovieSearchResults
              initialSearch={isInitialSearch}
              fetchFunction={searchResultsFetchFunction}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  search: {
    marginVertical: Theme.spacing.tiny,
  },
  bottomContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({auth, main}) => ({
  user: auth.user,
  isGuest: auth.isGuest,
  categories: main.categories,
});

export default connect(
  mapStateToProps,
  {},
)(withRefetch(withDelayedLoading(Browse)));
