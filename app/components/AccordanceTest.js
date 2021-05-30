import React from 'react'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ukrAlphabet } from '../../utils/helpers'
import Colors from '../constants/Colors'


const AccordanceTest = ({ content, answerHandler, updateAnswerHandler, currentTest }) => {
    const answers = [...content.oArray].reverse().sort((a, b) => b + a)
    const [currentOption, setCurrentOption] = useState(0)
    const onUpdateTest = (value) => {
        updateAnswerHandler(currentAnswers => {
            let answersToSet = [...currentAnswers]
            if (!answersToSet[currentTest].selected)
                answersToSet[currentTest].selected = {}
            answersToSet[currentTest].selected[content.qArray[currentOption]] = value
            return answersToSet
        })
        setCurrentOption(o => o + 1)
    }

    console.log('answerHandler', answerHandler)
    const getLetterForAcc = (key) => {
        if (answerHandler?.selected && Object.keys(answerHandler?.selected).length) {
            if (answerHandler?.selected[key]) {
                return answerHandler?.selected[key].letter
            }
        }
        return ''
    }
    return (
        <View style={styles.contentContainer}>
            <FlatList
                contentContainerStyle={{ marginBottom: 40 }}
                data={content.qArray}
                renderItem={({ item, index }) =>
                    <View style={[styles.testBlock, currentOption === index && { backgroundColor: Colors.lGrey }]} >
                        <View style={[styles.optionNumber, currentOption === index && { backgroundColor: Colors.dGrey }]}>
                            <Text style={{ color: currentOption === index ? 'white' : Colors.black2 }}>
                                {(1 + index).toString()}
                            </Text>
                        </View>
                        <View style={[styles.optionHolder, currentOption === index && { backgroundColor: Colors.dGrey }]}>
                            <Text>
                                {getLetterForAcc(item)}
                            </Text>
                        </View>
                        <Text style={styles.optionText}>{item}</Text>
                    </View>
                }
            />
            <FlatList
                data={answers}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.testBlock]} onPress={() => onUpdateTest(item)} disabled={answerHandler?.selected && Object.values(answerHandler?.selected).includes(item)} >
                        <View style={[styles.answerHolder, answerHandler?.selected && Object.values(answerHandler?.selected).includes(item) && { borderStyle: 'solid', borderWidth: 0 }]}>
                            <Text style={{ color: Colors.black2 }}>
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

export default AccordanceTest

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
    },
    optionHolder: {
        borderWidth: 1,
        borderRadius: 8,
        width: 34,
        height: 34,
        marginRight: 10,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerHolder: {
        width: 34,
        height: 34,
        marginLeft: 19,
        marginRight: 8,
        borderRadius: 8,
        borderStyle: 'dashed',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }



})
