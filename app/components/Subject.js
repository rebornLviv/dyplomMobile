import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {routeNames} from '../navigation/navigator';
import Colors from '../constants/Colors';
import {SubjectIconPicker} from './SubjectIconPicker';

const Subject = ({item: {title, subject}}) => {
  const navigation = useNavigation();
  const {container, subjectTitle} = styles;
  return (
    <TouchableOpacity
      style={container}
      onPress={() =>
        navigation.navigate(routeNames.subject, {
          screen: routeNames.subject,
          params: {subject, title},
        })
      }>
      <SubjectIconPicker name={subject} />
      <Text adjustsFontSizeToFit style={subjectTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: {
    width: 156,
    height: 156,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  subjectTitle: {
    color: Colors.black2,
    fontWeight: '600',
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'center',
  },
});
