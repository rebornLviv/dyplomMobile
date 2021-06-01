import React from 'react';
import {StyleSheet, View} from 'react-native';
import UserIcon from '../assets/UserIcon';

const PhotoPlaceholderItem = ({containerStyles}) => {
  const {photoContainer} = styles;
  return (
    <View style={[photoContainer, containerStyles]}>
      <UserIcon />
    </View>
  );
};

export default PhotoPlaceholderItem;

const styles = StyleSheet.create({
  photoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: Colors.lGrey,
  },
});
