import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Registration from '../screens/auth/Registration';
import Login from '../screens/auth/Login';
import Verification from '../screens/auth/Verification';
import CreateProfile from '../screens/auth/CreateProfile';
import {SafeAreaView, Text} from 'react-native';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import Statistics from '../screens/statistics/Statistics';
import HomeIcon from '../assets/HomeIcon';
import UserIcon from '../assets/UserIcon';
import Colors from '../constants/Colors';
import Tests from '../screens/tests/Tests';
import TestItem from '../screens/test/TestItem';
import StatisticIcon from '../assets/StatisticsIcon';
import EditProfile from '../screens/profile/EditProfile';

const Auth = createStackNavigator();
const HomeNav = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = createStackNavigator();
const SubjectTests = createStackNavigator();
const ProfileNav = createStackNavigator();
export const routeNames = {
  home: 'Home',
  profile: 'Profile',
  statisitics: 'Statistics',
  subject: 'Subject',
  test: 'Test',
  editProfile: 'EditProfile',
};
const tabIconOptions = (Icon, label) => ({
  tabBarIcon: ({focused}) => (
    <Icon color={focused ? Colors.main : Colors.dGrey} />
  ),
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? Colors.main : Colors.dGrey, fontSize: 10}}>
      {label}
    </Text>
  ),
});

const SubjectTestsStack = () => (
  <SubjectTests.Navigator screenOptions={{headerShown: false}}>
    <SubjectTests.Screen name={routeNames.subject} component={Tests} />
    <SubjectTests.Screen name={routeNames.test} component={TestItem} />
  </SubjectTests.Navigator>
);

const MainNavigator = () => (
  <Main.Navigator screenOptions={{headerShown: false}}>
    <Main.Screen name={routeNames.home} component={TabNavigation} />
    <Main.Screen name={routeNames.subject} component={SubjectTestsStack} />
  </Main.Navigator>
);

const ProfileStack = () => (
  <ProfileNav.Navigator screenOptions={{headerShown: false}}>
    <ProfileNav.Screen name={routeNames.profile} component={Profile} />
    <ProfileNav.Screen name={routeNames.editProfile} component={EditProfile} />
  </ProfileNav.Navigator>
);
const TabNavigation = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      options={tabIconOptions(UserIcon, 'Профіль')}
      name={routeNames.profile}
      component={ProfileStack}
    />
    <Tab.Screen
      options={tabIconOptions(HomeIcon, 'Предмети')}
      name={routeNames.home}
      component={HomeStack}
    />
    <Tab.Screen
      options={tabIconOptions(StatisticIcon, 'Статистика')}
      name={routeNames.statisitics}
      component={Statistics}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Auth.Navigator headerMode="none">
    <Auth.Screen component={Registration} name="register" />
    <Auth.Screen component={Login} name="login" />
    <Auth.Screen component={Verification} name="verification" />
    <Auth.Screen component={CreateProfile} name="createProfile" />
  </Auth.Navigator>
);

const HomeStack = () => (
  <HomeNav.Navigator headerMode="none">
    <HomeNav.Screen component={Home} name="content" />
  </HomeNav.Navigator>
);

export default Router = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        {props.token ? <MainNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};
