import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BackArrowIcon from '../assets/BackArrow';
import CrossIcon from '../assets/CrossIcon';
import SearchIcon from '../assets/SearchIcon';
import StatisticsIcon from '../assets/StatisticsIcon';
import Colors from '../constants/Colors';

const CustomHeader = ({title, mode, canGoBack, isTest, goToStats}) => {
  const {headerContainer, headerTitle, friendsCont, leftIcon} = styles;
  const {goBack} = useNavigation();
  return (
    <>
      {!mode && (
        <View
          style={[
            headerContainer,
            goToStats && {justifyContent: 'space-between'},
          ]}>
          {canGoBack && (
            <TouchableOpacity style={leftIcon} onPress={goBack}>
              {isTest ? <CrossIcon /> : <BackArrowIcon />}
            </TouchableOpacity>
          )}
          <Text
            ellipsizeMode="clip"
            style={[
              headerTitle,
              goToStats && {paddingLeft: 0},
              isTest && {maxWidth: '90%'},
            ]}>
            {title}
          </Text>
          {goToStats && (
            <TouchableOpacity onPress={goToStats} style={{paddingRight: 20}}>
              <StatisticsIcon color={Colors.black2} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {mode === 'friends' && (
        <View style={[headerContainer, friendsCont]}>
          <Text style={headerTitle}>{title}</Text>
          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 20,
    maxWidth: '60%',
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 80,
  },
  leftIcon: {
    paddingLeft: 20,
  },
  friendsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
