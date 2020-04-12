import React, {useReducer, useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import {navigationRef} from './RootNavigation';
import Config from './Config';
import {connect} from 'react-redux';
import {View, StyleSheet, UIManager, Text} from 'react-native';
import {logOutUser, loadUserCheckByToken} from './actions';
import OpacityHeader from './components/OpacityHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import {
  getNavbarBrowseIcon,
  getNavbarExploreIcon,
  getNavbarLibraryIcon,
} from './utils/icons';
import {stGetUser, stGetUserToken} from './utils/storage';
import AuthWelcome from './screens/Auth/AuthWelcome';
import AuthLogin from './screens/Auth/AuthLogin';
import SignUp from './screens/Auth/SignUp';
import RouteNames from './RouteNames';

// import AuthWelcome from './screens/Auth/AuthWelcome';
// import AuthLogin from './screens/Auth/AuthLogin';
import Browse from './screens/Browse';
import Explore from './screens/Explore';
import Library from './screens/Library';
import Settings from './screens/Settings';
import EventListScreen from './screens/Event/EventListScreen';
import EventDetailsScreen from './screens/Event/EventDetailsScreen';
import EventMap from './screens/Event/EventMap';
import Notification from './screens/Notification';
import {getFontStyleObject} from './utils/font';
// import {fromRightWithFade} from './utils/navigation';
import Theme from './Theme';
import {getNoticationIcon} from './utils/icons';
const TabNames = {
  browse: 'Browse',
  explore: 'Explore',
  Profile: 'Profile',
  Notication: 'Notication',
};

const RootStack = ({user, loadUserCheckByToken, unreadMessagesCount}) => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const BrowseStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={'Browse.index'}
        component={Browse}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={RouteNames.EventListScreen}
        component={EventListScreen}
      />
      <Stack.Screen
        name={RouteNames.EventDetailsScreen}
        component={EventDetailsScreen}
        // options={({route}) => ({
        //   header: ({navigation}) => (
        //     <OpacityHeader
        //       navigation={navigation}
        //       absolute={true}
        //       //style={{height: 45, width: '100%', backgroundColor: 'red'}}
        //       route={route}
        //       opacity={0.4}
        //       // opacity={navigation.getParam('headerOpacity', 0)}
        //     />
        //   ),
        // })}
      />
      <Stack.Screen name={RouteNames.Map} component={EventMap} />
    </Stack.Navigator>
  );
  const ProfileStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={RouteNames.Settings}
        component={Settings}
        // options={({route}) => ({
        //   header: ({navigation}) => (
        //     <OpacityHeader
        //       navigation={navigation}
        //       absolute={false}
        //       //style={{height: 45, width: '100%', backgroundColor: 'red'}}
        //       route={route}
        //       opacity={0.4}
        //       // opacity={navigation.getParam('headerOpacity', 0)}
        //     />
        //   ),
        // })}
      />
      {/* <Stack.Screen name={RouteNames.Settings} component={Library} /> */}
      {/* <Stack.Screen
      name={RouteNames.MovieDetailsScreen}
      component={MovieDetailsScreen}
    /> */}
    </Stack.Navigator>
  );

  // [RouteNames.MovieListScreen]: MoviesListScreen,
  // [RouteNames.MovieDetailsScreen]: MovieDetailsScreen

  const BottomTabs = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Theme.colors.bottomNavbar,
        inactiveBackgroundColor: Theme.colors.bottomNavbar,
        activeTintColor: Theme.gray.lightest,
        showLabel: false,
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
        options={{
          tabBarLabel: 'Нүүр',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TabNames.explore}
        component={Explore}
        options={{
          tabBarLabel: 'Discount',
          tabBarIcon: ({color, size}) => (
            <Icon name="discount" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TabNames.Notication}
        component={Notification}
        options={{
          tabBarLabel: 'Нүүр',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <IconBadge
                MainElement={
                  <IconEntypo name="bell" color={color} size={size} />
                }
                BadgeElement={
                  <Text style={{color: '#FFFFFF', fontSize: 10}}>
                    {unreadMessagesCount}
                  </Text>
                }
                IconBadgeStyle={{
                  width: 20,
                  height: 20,
                  backgroundColor: Theme.colors.danger,
                  position: 'absolute',
                  right: -15,
                  top: -10,
                  zIndex: -1,
                }}
                Hidden={unreadMessagesCount == 0}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={TabNames.Profile}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Тохиргоо',
          tabBarIcon: ({color, size}) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const bootstrapAsync = async () => {
      this.configureLayoutAnimation();
      this.loadUser();
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
    console.log(user);
    if (user) {
      loadUserCheckByToken(user);
    }
    setLoading(false);
  };
  if (loading) {
    return <Splash />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none">
            {user ? (
              <Stack.Screen name={RouteNames.HomeStack} component={HomeStack} />
            ) : (
              <Stack.Screen name={RouteNames.AuthStack} component={AuthStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// export default RootStack;
const mapStateToProps = ({auth: {user, unreadMessagesCount}}) => ({
  user,
  unreadMessagesCount,
});

export default connect(
  mapStateToProps,
  {loadUserCheckByToken, logOutUser},
)(RootStack);
