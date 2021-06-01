import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from '../../api/userApi';
import {routeNames} from '../../navigation/navigator';
import {logoutUser} from '../../redux/auth/auth.reducer';
import LogoutIcon from '../../assets/LogoutIcon';
import SettingsIcon from '../../assets/SettingsIcon';
import PhotoPlaceholderItem from '../../components/PhotoPlaceholderItem';
import Colors from '../../constants/Colors';

const Profile = () => {
  const dispatch = useDispatch();
  const {
    container,
    iconsBlock,
    profileHeader,
    userInfo,
    userName,
    userPhoneNumber,
    imageBlock,
  } = styles;
  const {navigate} = useNavigation();
  const {username, phone, avatar} = useSelector((state) => state.auth);
  React.useEffect(() => {
    getUserData()
      .then((res) => console.log('result getting userData', res))
      .catch((err) => console.log('Error getting User data', err));
  }, []);
  return (
    <View style={container}>
      <View style={profileHeader}>
        <View style={iconsBlock}>
          <TouchableOpacity onPress={() => dispatch(logoutUser())}>
            <LogoutIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(routeNames.editProfile)}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={userInfo}>
          {avatar?.length > 0 && (
            <View style={imageBlock}>
              <Image source={{uri: avatar}} />
            </View>
          )}
          <PhotoPlaceholderItem containerStyles={imageBlock} />
          <Text style={userName}>{username}</Text>
          <Text style={userPhoneNumber}>+380{phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    marginTop: 19,
    marginBottom: 19,
    justifyContent: 'space-between',
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black2,
    paddingBottom: 12,
    textAlign: 'center',
  },
  userPhoneNumber: {
    color: Colors.dGrey,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageBlock: {
    width: 126,
    height: 126,
    borderRadius: 12,
  },
});
