import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'


const MultiAnswerTest = ({ content, answerHandler, updateAnswerHandler, currentTest }) => {
    const onUpdateTest = (value) => {
        updateAnswerHandler(currentAnswers => {
            let answersToSet = [...currentAnswers]
            if (answersToSet[currentTest].selected) {
                if (answersToSet[currentTest].selected.findIndex(el => el.text === value.text) !== -1) {
                    answersToSet[currentTest].selected = answersToSet[currentTest].selected.filter(el => el.text !== value.text)
                    return answersToSet
                }
                answersToSet[currentTest].selected.push({ text: value.text, letter: value.letter })
                return answersToSet
            }
            else {
                answersToSet[currentTest].selected = []
                answersToSet[currentTest].selected.push({ text: value.text, letter: value.letter })
                return answersToSet
            }
        })
    }
    console.log('answerHandler', answerHandler)
    return (
        <View style={styles.contentContainer}>
            <FlatList
                data={content.options}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.testBlock, answerHandler?.selected && answerHandler?.selected?.findIndex(el => el.text === item.text) !== -1 && { backgroundColor: Colors.lGrey }]} onPress={() => onUpdateTest(item)} >
                        <View style={[styles.optionNumber, answerHandler?.selected && answerHandler?.selected?.findIndex(el => el.text === item.text) !== -1 && { backgroundColor: Colors.dGrey }]}>
                            <Text style={{ color: answerHandler?.selected && answerHandler?.selected?.findIndex(el => el.text === item.text) !== -1 ? 'white' : Colors.black2 }}>
                                {item.letter}
                            </Text>
                        </View>
                        <Text style={styles.optionText}>{item.text}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default MultiAnswerTest

const styles = StyleSheet.create({
    contentContainer: {

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
        borderRadius: 8,
        backgroundColor: Colors.lGrey,
        justifyContent: 'center',
        alignItems: 'center'

    },
    optionText: {
        fontWeight: '400',
        color: Colors.black2
    }


})
