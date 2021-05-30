import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'


const SingleAnswerTest = ({ content, answerHandler, updateAnswerHandler, currentTest }) => {
    const onUpdateSingleTest = (value) => {
        updateAnswerHandler(
            currentAnswers => {
                let answersToSet = [...currentAnswers]
                answersToSet[currentTest].selected = value.text
                answersToSet[currentTest].selectedLetter = value.letter
                return answersToSet
            }
        )
    }
    return (
        <View style={styles.contentContainer}>
            <FlatList
                data={content.options}
                renderItem={({ item, index }) =>
                    <TouchableOpacity style={[styles.testBlock, answerHandler?.selected === item.text && { backgroundColor: Colors.lGrey }]} onPress={() => onUpdateSingleTest(item)} >
                        <View style={[styles.optionNumber, answerHandler?.selected === item.text && { backgroundColor: Colors.dGrey }]}>
                            <Text style={{ color: answerHandler?.selected === item.text ? 'white' : Colors.black2 }}>{item.letter}</Text>
                        </View>
                        <Text adjustsFontSizeToFit style={[styles.optionText]}>{item.text}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default SingleAnswerTest

export const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'center'
    },
    testBlock: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 68,
        marginBottom: 5,
        borderRadius: 8
    },
    optionNumber: {
        width: 34,
        height: 34,
        marginLeft: 19,
        marginRight: 8,
        borderRadius: 24,
        backgroundColor: Colors.lGrey,
        justifyContent: 'center',
        alignItems: 'center'

    },
    optionText: {
        fontWeight: '400',
        color: Colors.black2,
        width: '80%',
    }


})
