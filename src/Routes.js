import React, {useReducer, useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import axios from 'axios';
import Config from './Config';
import {connect} from 'react-redux';
import {View, StyleSheet, UIManager, Text} from 'react-native';
import {loadUserIntoRedux, logOutUser} from './actions';
import {
  getNavbarBrowseIcon,
  getNavbarExploreIcon,
  getNavbarLibraryIcon,
} from './utils/icons';
import {stGetUser} from './utils/storage';
import AuthWelcome from './screens/Auth/AuthWelcome';
import AuthLogin from './screens/Auth/AuthLogin';
import SignUp from './screens/Auth/SignUp';
import RouteNames from './RouteNames';

// import AuthWelcome from './screens/Auth/AuthWelcome';
// import AuthLogin from './screens/Auth/AuthLogin';
import Browse from './screens/Browse';
import Explore from './screens/Explore';
import Library from './screens/Library';
// import Settings from './screens/Settings';
import MoviesListScreen from './screens/Movie/MoviesListScreen';
import MovieDetailsScreen from './screens/Movie/MovieDetailsScreen';

// import NavbarWrapper from './components/NavbarWrapper';
// import NavbarButtonWrapper from './components/NavbarButtonWrapper';
// import Header from './components/Header';
// import {
//   getNavbarBrowseIcon,
//   getNavbarExploreIcon,
//   getNavbarLibraryIcon,
// } from './utils/icons';
import {getFontStyleObject} from './utils/font';
// import {fromRightWithFade} from './utils/navigation';
import Theme from './Theme';

// const defaultHeaderObject = {
//   header: props => <Header scene={props.scene} />,
// };

// const createDefaultStackNavigator = (screensObject, customOptions) =>
//   createStackNavigator(screensObject, {
//     defaultNavigationOptions: {...defaultHeaderObject},
//     cardStyle: {
//       backgroundColor: '#000',
//     },
//     headerMode: 'screen',
//     transitionConfig: () => fromRightWithFade(),
//     ...customOptions,
//   });

// // Navigation

// const HomeStack = createStackNavigator(
//   {[RouteNames.BottomTabs]: {screen: BottomTabs}},
//   {defaultNavigationOptions: () => ({header: null})},
// );

const TabNames = {
  browse: 'Browse',
  explore: 'Explore',
  library: 'Library',
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BrowseStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={'Browse.index'} component={Browse} />
    <Stack.Screen
      name={RouteNames.MovieListScreen}
      component={MoviesListScreen}
    />
    <Stack.Screen
      name={RouteNames.MovieDetailsScreen}
      component={MovieDetailsScreen}
    />
  </Stack.Navigator>
);
const LibraryStack = () => {
  <Stack.Navigator headerMode="none">
    {/* <Stack.Screen name={RouteNames.Settings} component={Settings} /> */}
    <Stack.Screen name={RouteNames.MovieListScreen} component={Library} />
    {/* <Stack.Screen
      name={RouteNames.MovieDetailsScreen}
      component={MovieDetailsScreen}
    /> */}
  </Stack.Navigator>;
};

// [RouteNames.MovieListScreen]: MoviesListScreen,
// [RouteNames.MovieDetailsScreen]: MovieDetailsScreen

const BottomTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: {...getFontStyleObject()},
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar,
      },
    }}>
    <Tab.Screen
      name={TabNames.browse}
      component={BrowseStack}
      // options={{
      //   tabBarLabel: 'Home',
      //   tabBarIcon: ({color, size}) => (
      //     <Icon name="home" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen
      name={TabNames.explore}
      component={Explore}
      // options={{
      //   tabBarLabel: 'Home',
      //   tabBarIcon: ({color, size}) => (
      //     <Icon name="home" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen
      name={TabNames.library}
      component={Library}
      // options={{
      //   tabBarLabel: 'Home',
      //   tabBarIcon: ({color, size}) => (
      //     <Icon name="home" color={color} size={size} />
      //   ),
      // }}
    />

    {/* <Tab.Screen
      name="EventStack"
      component={EventStack}
      options={{
        tabBarLabel: "Events",
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="MyEventStack"
      component={MyEventStack}
      options={{
        tabBarLabel: "My Events",
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        )
      }}
    /> */}
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={RouteNames.AuthWelcome} component={AuthWelcome} />
    <Stack.Screen name={RouteNames.AuthLogin} component={AuthLogin} />
    <Stack.Screen name={RouteNames.SignUp} component={SignUp} />
  </Stack.Navigator>
);
const HomeStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={RouteNames.BottomTabs} component={BottomTabs} />
  </Stack.Navigator>
);
const RootStack = ({user, loadUserIntoRedux}) => {
  const [loading, setLoading] = useState(true);
  // const [state, dispatch] = useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case 'RESTORE_TOKEN':
  //         return {
  //           ...prevState,
  //           isAuthenticated: action.isAuthenticated,
  //           data: action.data,
  //           isLoading: false,
  //         };
  //       case 'SIGN_IN':
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           isAuthenticated: true,
  //         };
  //       case 'SIGN_OUT':
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           isAuthenticated: false,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     isAuthenticated: false,
  //     data: {},
  //   },
  // );
  useEffect(() => {
    const bootstrapAsync = async () => {
      this.configureLayoutAnimation();
      // // this.configureAxios();
      this.loadUser();
      // let userToken, isAuthenticated;
      // try {
      //   //alert("aa")
      //   // AsyncStorage.clear();
      //   userToken = await AsyncStorage.getItem("userToken");
      //   isAuthenticated = userToken ? true : false;
      //   //  alert(userToken);
      // } catch (e) {
      //   // Restoring token failed
      // }
      // let data = {};
      // let rootData = {};
      // let events = await db.collection("events").get();
      // let categories = await db.collection("categories").get();
      // categories.forEach(doc => {
      //   const item = doc.data();
      //   data[doc.id] = {
      //     info: item,
      //     content: []
      //   };
      // });
      // events.forEach(doc => {
      //   const eventItem = doc.data();
      //   data[eventItem.category].content.push(eventItem);
      // });
      // Object.keys(data).forEach(key => {
      //   let item = data[key];
      //   if (rootData[item.info.parent] == null) {
      //     rootData[item.info.parent] = {
      //       count: 0,
      //       content: []
      //     };
      //   } else {
      //     rootData[item.info.parent].content.push(item);
      //     rootData[item.info.parent].count += item.content.length;
      //   }
      // });
      // const parents = ["sport", "music"];
      // parents.map((key, index) => {
      //   if (rootData[key] == null) {
      //     rootData[key] = {
      //       count: 0,
      //       content: []
      //     };
      //   }
      // });
      // subscribeToAuthChanges(this.onAuthStateChanged);
      // dispatch({
      //   type: "RESTORE_TOKEN",
      //   isAuthenticated: isAuthenticated,
      //   data: rootData
      // });
    };

    bootstrapAsync();
  }, []);

  configureLayoutAnimation = () => {
    if (Config.isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  };
  loadUser = async () => {
    const user = await stGetUser();
    if (user) {
      loadUserIntoRedux(user);
    }
    setLoading(false);
  };

  // configureAxios = () => {
  //   // const {navigation, logOutUser} = this.props;

  //   axios.interceptors.response.use(
  //     response => response,
  //     error => {
  //       if (error.response && error.response.status === 401) {
  //         Config.logGeneral &&
  //           console.log('Unauthorized request, logging out ...');
  //         // logOutUser(navigation);
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
  // };
  if (loading) {
    return <Splash />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {user ? (
            <Stack.Screen name={RouteNames.HomeStack} component={HomeStack} />
          ) : (
            <Stack.Screen name={RouteNames.AuthStack} component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// export default RootStack;
const mapStateToProps = ({auth: {user}}) => ({user});

export default connect(mapStateToProps, {loadUserIntoRedux, logOutUser})(
  RootStack,
);
