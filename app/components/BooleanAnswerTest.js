import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckIcon from '../assets/CheckIcon'
import CrossIcon from '../assets/CrossIcon'
import Colors from '../constants/Colors'

const BooleanAnswerTest = ({ content, answerHandler, updateAnswerHandler, currentTest }) => {
    const updateTest = (value) => {
        updateAnswerHandler(
            currentTests => {
                let testsToSet = [...currentTests]
                testsToSet[currentTest].selected = value
                return testsToSet
            }
        )
    }
    return (
        <View style={styles.booleanCont}>
            <TouchableOpacity style={[styles.booleanBlock, answerHandler?.selected === 1 && { backgroundColor: Colors.lGrey }]}
                onPress={() => updateTest(1)}
            >
                <View style={[styles.iconCont, answerHandler?.selected === 1 && { backgroundColor: Colors.dGrey }]}>
                    <CheckIcon selected={answerHandler?.selected === 1} />
                </View>
                <Text>Правильно</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.booleanBlock, answerHandler?.selected === 0 && { backgroundColor: Colors.lGrey }]} onPress={() => updateTest(0)}>
                <View style={[styles.iconCont, answerHandler?.selected === 0 && { backgroundColor: Colors.dGrey }]} >
                    <CrossIcon selected={answerHandler?.selected === 0} />
                </View>
                <Text>Неправильно</Text>
            </TouchableOpacity>

        </View>
    )
}

export default BooleanAnswerTest

const styles = StyleSheet.create({
    booleanCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    booleanBlock: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCont: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.lGrey,
        marginHorizontal: 8

    }
})
