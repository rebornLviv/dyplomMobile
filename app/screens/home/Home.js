import React from 'react'
import { useEffect } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/auth/auth.reducer'
import { getAllSubjects } from '../../../redux/subjetTests/subjectTests.actions'
import CustomHeader from '../../components/CustomHeader'
import LoadingWrapper from '../../components/LoadingWrapper'
import Subject from '../../components/Subject'
import { SubjectEnum } from '../../constants/Subjects'


const mockArray = [
    {
        title: 'Історія України',
        eTitle: SubjectEnum.HISTORY_OF_UKRAINE,
        testNum: '12'
    },
    {
        title: 'Географія',
        eTitle: SubjectEnum.GEOGRAPHY,
        testNum: '15'
    },
    {
        title: 'Українська мова',
        eTitle: SubjectEnum.UKRAINIAN_LANGUAGE,
        testNum: '13'
    },
    {
        title: 'Укр. література',
        eTitle: SubjectEnum.UKRAINIAN_LITERATURE,
        testNum: '5'
    },
    {
        title: 'Біологія',
        eTitle: SubjectEnum.BIOLOGY,
        testNum: '22'
    },
    {
        title: 'Фізика',
        eTitle: SubjectEnum.PHYSICS,
        testNum: '13'
    },
].map((el, idx) => ({ ...el, id: idx.toString() }))

const Home = () => {
    const { container } = styles
    const dispatch = useDispatch()
    const { subjects, loading } = useSelector(state => state.subjectTest)
    useEffect(
        () => {
            dispatch(getAllSubjects())
        }, []
    )
    return (
        <>
            <CustomHeader title='Предмети' />
            { !loading ? <View style={container}>

                <FlatList
                    data={subjects}
                    keyExtractor={s => s.id}
                    renderItem={({ item }) => <Subject item={item} />}
                    numColumns={2}
                />

            </View>
                : <LoadingWrapper />

            }
        </>
    )
}


export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
