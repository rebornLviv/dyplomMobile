import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../app/screens/auth/Login';
import Registration from '../app/screens/auth/Registration';
import Verification from '../app/screens/auth/Verification';
import CreateProfile from '../app/screens/auth/CreateProfile';
import { SafeAreaView, Text } from 'react-native';
import Home from '../app/screens/home/Home';
import Profile from '../app/screens/profile/Profile';
import Friends from '../app/screens/friends/Friends';
import HomeIcon from '../app/assets/HomeIcon';
import UserIcon from '../app/assets/UserIcon';
import FriendsIcon from '../app/assets/FriendsIcon';
import Colors from '../app/constants/Colors';
import Tests from '../app/screens/tests/Tests';
import TestItem from '../app/screens/test/TestItem';


const Auth = createStackNavigator()
const HomeNav = createStackNavigator()
const Tab = createBottomTabNavigator()
const Main = createStackNavigator()
const SubjectTests = createStackNavigator()
export const routeNames = {
    home: 'Home',
    profile: 'Profile',
    friends: 'Friends',
    subject: 'Subject',
    test: 'Test'


}
const tabIconOptions = (Icon, label) =>
({
    tabBarIcon: ({ focused }) => <Icon focused={focused} />,
    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? Colors.main : Colors.dGrey, fontSize: 10 }}>{label}</Text>
})


const SubjectTestsStack = () => (
    <SubjectTests.Navigator screenOptions={{ headerShown: false }}>
        <SubjectTests.Screen name={routeNames.subject} component={Tests} />
        <SubjectTests.Screen name={routeNames.test} component={TestItem} />
    </SubjectTests.Navigator>
)

const MainNavigator = () => (
    <Main.Navigator screenOptions={{ headerShown: false }}>
        <Main.Screen name={routeNames.home} component={TabNavigation} />
        <Main.Screen name={routeNames.subject} component={SubjectTestsStack} />
    </Main.Navigator>
)

const TabNavigation = () => (
    <Tab.Navigator
        initialRouteName='Home'
    >

        <Tab.Screen options={tabIconOptions(UserIcon, routeNames.profile)} name='Profile' component={Profile} />
        <Tab.Screen options={tabIconOptions(HomeIcon, routeNames.home)} name='Home' component={HomeStack} />
        <Tab.Screen options={tabIconOptions(FriendsIcon, routeNames.friends)} name='Friends' component={Friends} />
    </Tab.Navigator>
)

const AuthStack = () => (
    <Auth.Navigator headerMode="none" >
        <Auth.Screen component={Registration} name="register" />
        <Auth.Screen component={Login} name="login" />
        <Auth.Screen component={Verification} name="verification" />
        <Auth.Screen component={CreateProfile} name="createProfile" />
    </Auth.Navigator>
)

const HomeStack = () => (
    <HomeNav.Navigator headerMode="none" >
        <HomeNav.Screen component={Home} name="content" />
    </HomeNav.Navigator>
)


export default Router = (props) => {
    return <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
            {props.token ? <MainNavigator /> : <AuthStack />}
        </NavigationContainer>
    </SafeAreaView>

}