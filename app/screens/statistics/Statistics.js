import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllStats,
  getStatsBySubject,
} from '../../redux/statistics/statistics.actions';
import WriteHandIcon from '../../assets/WriteTextIcon';
import CustomHeader from '../../components/CustomHeader';
import LoadingWrapper from '../../components/LoadingWrapper';
import Colors from '../../constants/Colors';

const StatsItem = ({item}) => (
  <View style={styles.statBlock}>
    <Text style={styles.statBlocktTitle}>{item.testTitle}</Text>
    <View style={styles.statBlockResults}>
      <Text style={styles.statBlockSubtitle}>
        Правильних відповідей{' '}
        <Text style={{color: Colors.success}}>{item.correct}</Text>/
        <Text style={{color: Colors.dGrey}}>{item.total}</Text>
      </Text>
      <WriteHandIcon />
    </View>
  </View>
);

const Statistics = ({route, navigation}) => {
  const {stats, loading} = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.subject) {
        dispatch(getStatsBySubject(route?.params?.subject));
      } else {
        dispatch(getAllStats());
      }
    });

    return unsubscribe;
  }, [navigation, route]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.setParams({subject: null});
    });

    return unsubscribe;
  }, [navigation, route]);
  return (
    <>
      <CustomHeader title="Статистика" canGoBack={route?.params?.subject} />
      {!loading ? (
        <View style={styles.statCont}>
          <FlatList
            data={stats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={StatsItem}
          />
        </View>
      ) : (
        <LoadingWrapper />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  statCont: {
    flex: 1,
    marginTop: 19,
  },
  statBlock: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 19,
    paddingBottom: 9,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  statBlocktTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.black2,
  },
  statBlockSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray,
  },
  statBlockResults: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Statistics;
