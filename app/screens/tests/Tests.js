import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { routeNames } from '../../../navigation/navigator'
import { getTestsBySubject } from '../../../redux/subjetTests/subjectTests.actions'
import { setTest } from '../../../redux/test/test.actions'
import CustomHeader from '../../components/CustomHeader'
import LoadingWrapper from '../../components/LoadingWrapper'



const Tests = ({ navigation, route: { params } }) => {
    const dispatch = useDispatch()
    const { tests, testsLoading } = useSelector(state => state.subjectTest)
    const goToTest = (data) => {
        console.log('test to set', { data })
        dispatch(setTest(data))
        navigation.navigate(routeNames.test)
    }
    const TestListItem = useCallback(({ item, index }) => (
        <TouchableOpacity style={styles.testItemCont} onPress={() => goToTest(item)}>
            <Text> Тест {index + 1
            }</Text>
        </TouchableOpacity>
    ), [])
    useEffect(
        () => {
            dispatch(getTestsBySubject(params?.subject))
        }, []
    )
    return (
        <>
            <CustomHeader title={params?.title ?? 'Предмет'} />
            {!testsLoading ? <FlatList
                contentContainerStyle={{ alignSelf: 'center' }}
                data={tests}
                numColumns={2}
                renderItem={TestListItem}
            /> : <LoadingWrapper />}

        </>
    )
}

export default Tests

const styles = StyleSheet.create({
    testItemCont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 156,
        height: 156,
        borderRadius: 8,
        backgroundColor: 'white',
        margin: 10
    }
})
