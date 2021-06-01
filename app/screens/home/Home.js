import React from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllSubjects} from '../../redux/subjetTests/subjectTests.actions';
import CustomHeader from '../../components/CustomHeader';
import LoadingWrapper from '../../components/LoadingWrapper';
import Subject from '../../components/Subject';

const Home = () => {
  const {container} = styles;
  const dispatch = useDispatch();
  const {subjects, loading} = useSelector((state) => state.subjectTest);
  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);
  return (
    <>
      <CustomHeader title="Предмети" />
      {!loading ? (
        <View style={container}>
          <FlatList
            data={subjects}
            keyExtractor={(s) => s.id}
            renderItem={({item}) => <Subject item={item} />}
            numColumns={2}
          />
        </View>
      ) : (
        <LoadingWrapper />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
