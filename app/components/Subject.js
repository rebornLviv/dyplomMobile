import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { routeNames } from '../../navigation/navigator'
import Colors from '../constants/Colors'
import { SubjectIconPicker } from './SubjectIconPicker'

const Subject = ({ item: { title, subject, testNum } }) => {
    const navigation = useNavigation()
    const { container, subjectTitle, testNumber } = styles
    return (
        <TouchableOpacity style={container} onPress={() => navigation.navigate(routeNames.subject, {
            screen: routeNames.subject,
            params: { subject, title },
        })}>
            <SubjectIconPicker name={subject} />
            <Text style={subjectTitle}>{title}</Text>
            {/* <Text style={testNumber}>{testNum} тестів</Text> */}
        </TouchableOpacity>
    )
}

export default Subject

const styles = StyleSheet.create({
    container: {
        width: 156,
        height: 156,
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10

    },
    subjectTitle: {
        color: Colors.black2,
        fontWeight: '600',
        fontSize: 16,
        paddingTop: 10
    },
    testNumber: {
        paddingTop: 10,
        color: Colors.black2
    }
})
