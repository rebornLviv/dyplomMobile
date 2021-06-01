import React from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {routeNames} from '../../navigation/navigator';
import {getTestsBySubject} from '../../redux/subjetTests/subjectTests.actions';
import {setTest} from '../../redux/test/test.actions';
import CustomHeader from '../../components/CustomHeader';
import LoadingWrapper from '../../components/LoadingWrapper';
import Colors from '../../constants/Colors';

const Tests = ({navigation, route: {params}}) => {
  const dispatch = useDispatch();
  const {tests, testsLoading} = useSelector((state) => state.subjectTest);
  const goToTest = (data) => {
    console.log('test to set', {data});
    dispatch(setTest(data));
    navigation.navigate(routeNames.test);
  };
  const TestListItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        style={styles.testItemCont}
        onPress={() => goToTest(item)}>
        <Text style={styles.testItemText}> {item.title}</Text>
        <Text style={styles.testItemCount}>
          Кількість запитань {item?.tests?.length ?? 0}
        </Text>
      </TouchableOpacity>
    ),
    [],
  );
  const goToStats = () =>
    navigation.navigate(routeNames.statisitics, {
      subject: params.subject,
    });
  useEffect(() => {
    dispatch(getTestsBySubject(params?.subject));
  }, []);
  return (
    <>
      <CustomHeader
        title={params?.title ?? 'Предмет'}
        canGoBack
        goToStats={goToStats}
      />
      {!testsLoading ? (
        <FlatList
          contentContainerStyle={{alignSelf: 'center'}}
          data={tests}
          renderItem={TestListItem}
        />
      ) : (
        <LoadingWrapper />
      )}
    </>
  );
};

export default Tests;

const styles = StyleSheet.create({
  testItemCont: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    height: 200,
    backgroundColor: 'white',
    margin: 10,
  },
  testItemText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  testItemCount: {
    textAlign: 'center',
    paddingTop: 20,
    color: Colors.dGrey,
  },
});
