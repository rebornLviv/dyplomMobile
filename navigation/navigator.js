import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../app/screens/auth/Login';
import Registration from '../app/screens/auth/Registration';
import Content from '../app/screens/content/Content';


const Auth = createStackNavigator()
const Contents = createStackNavigator()
const AuthStack  = () =>(

    <Auth.Navigator headerMode="none" >
        <Auth.Screen component={Registration} name="register" />
        <Auth.Screen component={Login} name="login"/>
    </Auth.Navigator>
)

const ContentsStack = () => (
    <Contents.Navigator headerMode="none" >
        <Contents.Screen component={Content} name ="content" />
    </Contents.Navigator>
)


export default  Router =  (props) => {
  return  <NavigationContainer>
      
       { props.user ?  <ContentsStack />  : <AuthStack/> }
    </NavigationContainer>

}