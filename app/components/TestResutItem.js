import React from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { TestsEnum } from '../constants/Subjects'
import { styles as testStyles } from './SingleAnswerTest'
const TestResutItem = ({ originalTest, answeredTest, index }) => {
    console.log('data in test', { originalTest, answeredTest, index })
    const handleAnswerCorrect = useMemo(
        () => {
            switch (originalTest.content.type) {
                case TestsEnum.SINGLE_ANSWER:
                    if (answeredTest.selectedLetter === originalTest.content.answer.letter) {
                        return {
                            isCorrect: true
                        }
                    }
                    else {
                        return {
                            isCorrect: false,
                            answer: { ...originalTest.content.answer }
                        }
                    }

                case TestsEnum.MULTI_ANSWER:
                    let hasWrong = false
                    if (answeredTest.selected) {

                        originalTest.content.answers.forEach(
                            el => {
                                if (!hasWrong)
                                    hasWrong = !answeredTest.selected.find(a => a.letter === el.letter)
                            }
                        )
                    }

                    return {
                        isCorrect: !hasWrong
                    }
                case TestsEnum.ACCORDANCE:
                    let isNotCorrect = false
                    let resultaArray = []
                    let correctResultArray = []
                    if (!answeredTest.selected) {
                        correctResultArray = originalTest.content.oArray.map((el, idx) => ({ ...el, index: idx + 1 }))
                        return {
                            isCorrect: !isNotCorrect,
                            resultaArray,
                            correctResultArray

                        }
                    }
                    for (const key in originalTest.content.accordancies) {
                        let answ = originalTest.content.accordancies[key] === answeredTest?.selected[key]?.text
                        console.log('has incorrect', answ)
                        if (!isNotCorrect)
                            isNotCorrect = answ
                        if (!answeredTest?.selected[key])
                            return {
                                isCorrect: false,
                                resultaArray: [],
                                correctResultArray: originalTest.content.oArray.map((el, idx) => ({ ...el, index: idx + 1 })),
                                isSkipped: true
                            }
                        if (answeredTest?.selected[key])
                            resultaArray.push({ correct: answ, letter: answeredTest.selected[key].letter, text: answeredTest.selected[key].text })
                    }
                    resultaArray = resultaArray.map((el, idx) => ({ ...el, index: idx + 1 }))

                    if (resultaArray.find(el => el.correct === false)) {
                        let wrongAnsws = resultaArray.filter(el => !el.correct)
                        correctResultArray = originalTest.content.oArray.map((el, idx) => ({ ...el, index: idx + 1 }))
                            .filter(el => wrongAnsws.find(w => w.letter === el.letter))
                    }
                    console.log('not correct', isNotCorrect)
                    console.log('resulting', {
                        isCorrect: resultaArray.find(el => el.correct === false),
                        resultaArray,
                        correctResultArray
                    })
                    return {
                        isCorrect: !resultaArray.find(el => el.correct === false) || resultaArray.length !== originalTest.content.oArray.length,
                        resultaArray,
                        correctResultArray
                    }
                default:

                    if (!!answeredTest.selected === originalTest.content.answer) {
                        return {
                            isCorrect: true
                        }
                    }
                    else {
                        return {
                            isCorrect: false,
                            answer: originalTest.content.answer
                        }
                    }
            }

        }, [originalTest, answeredTest]
    )
    const renderLayout = useCallback(
        () => {
            switch (originalTest.content.type) {
                case TestsEnum.SINGLE_ANSWER:
                    return <View style={styles.resultCont}>
                        <Text style={styles.resultQuestion}>
                            {`${index + 1}. ${originalTest.title.text}`}
                        </Text>
                        <Text style={styles.yourAnswer} >твоя відповідь</Text>
                        {answeredTest.skipped && <Text style={styles.skippedQuestion}>Пропущено</Text>}
                        {!answeredTest.skipped && <View style={[testStyles.testBlock]} >
                            <View style={[testStyles.optionNumber, { backgroundColor: handleAnswerCorrect.isCorrect ? Colors.success : Colors.error, borderRadius: 8 }]}>
                                <Text style={{ color: 'white' }}>{answeredTest.selectedLetter}</Text>
                            </View>
                            <Text style={[testStyles.optionText]}>{answeredTest.selected}</Text>
                        </View>}

                        {(!handleAnswerCorrect.isCorrect || answeredTest.skipped) && <>
                            <Text style={{ ...styles.yourAnswer, paddingTop: 12 }} >правильна відповідь</Text>
                            <View style={[testStyles.testBlock]} >
                                <View style={[testStyles.optionNumber, { backgroundColor: Colors.success, borderRadius: 8 }]}>
                                    <Text style={{ color: 'white' }}>{handleAnswerCorrect.answer.letter}</Text>
                                </View>
                                <Text style={[testStyles.optionText]}>{handleAnswerCorrect.answer.text}</Text>
                            </View>
                        </>
                        }
                    </View>
                case TestsEnum.MULTI_ANSWER:
                    return <View style={styles.resultCont}>
                        <Text style={styles.resultQuestion}>
                            {`${index + 1}. ${originalTest.title.text}`}
                        </Text>
                        <Text style={styles.yourAnswer} >твоя відповідь</Text>
                        {answeredTest.skipped && <Text style={styles.skippedQuestion}>Пропущено</Text>}
                        {!answeredTest.skipped &&
                            answeredTest.selected.map(
                                el =>
                                    <View style={[testStyles.testBlock]} >
                                        <View style={[testStyles.optionNumber, { backgroundColor: originalTest.content.answers.find(a => a.letter === el.letter) ? Colors.success : Colors.error, borderRadius: 8 }]}>
                                            <Text style={{ color: 'white' }}>{el.letter}</Text>
                                        </View>
                                        <Text style={[testStyles.optionText]}>{el.text}</Text>
                                    </View>
                            )
                        }

                        {(!handleAnswerCorrect.isCorrect || answeredTest.skipped) && <>
                            <Text style={{ ...styles.yourAnswer, paddingTop: 12 }} >правильна відповідь</Text>
                            {
                                originalTest.content.answers.map(
                                    el => (
                                        <View style={[testStyles.testBlock]} >
                                            <View style={[testStyles.optionNumber, { backgroundColor: Colors.success, borderRadius: 8 }]}>
                                                <Text style={{ color: 'white' }}>{el.letter}</Text>
                                            </View>
                                            <Text style={[testStyles.optionText]}>{el.text}</Text>
                                        </View>
                                    )
                                )

                            }

                        </>
                        }
                    </View>
                case TestsEnum.ACCORDANCE:
                    console.log('result array', handleAnswerCorrect.resultaArray)
                    return <View style={styles.resultCont}>
                        <Text style={styles.resultQuestion}>
                            {`${index + 1}. ${originalTest.title.text}`}
                        </Text>
                        <Text style={styles.yourAnswer} >твоя відповідь</Text>
                        {(answeredTest.skipped || handleAnswerCorrect.isSkipped || !handleAnswerCorrect.resultaArray.length) && <Text style={styles.skippedQuestion}>Пропущено</Text>}
                        {!answeredTest.skipped && !handleAnswerCorrect.isSkipped &&
                            handleAnswerCorrect.resultaArray.map(
                                (el) =>
                                    <View style={[testStyles.testBlock]} >
                                        <View style={[testStyles.optionNumber, { backgroundColor: el.correct ? Colors.success : Colors.error, borderRadius: 8 }]}>
                                            <Text style={{ color: 'white' }}>{el.index}</Text>
                                        </View>
                                        <View style={[testStyles.optionNumber, { backgroundColor: el.correct ? Colors.success : Colors.error, borderRadius: 8 }]}>
                                            <Text style={{ color: 'white' }}>{el.letter}</Text>
                                        </View>
                                        <Text style={[testStyles.optionText]}>{el.text}</Text>
                                    </View>
                            )
                        }
                        {(!handleAnswerCorrect.isCorrect || answeredTest.skipped || handleAnswerCorrect.isSkipped) && <>
                            <Text style={{ ...styles.yourAnswer, paddingTop: 12 }} >правильна відповідь</Text>
                            {
                                handleAnswerCorrect.correctResultArray.map(
                                    el => (
                                        <View style={[testStyles.testBlock]} >
                                            <View style={[testStyles.optionNumber, { backgroundColor: Colors.success, borderRadius: 8 }]}>
                                                <Text style={{ color: 'white' }}>{el.index}</Text>
                                            </View>
                                            <View style={[testStyles.optionNumber, { backgroundColor: Colors.success, borderRadius: 8 }]}>
                                                <Text style={{ color: 'white' }}>{el.letter}</Text>
                                            </View>
                                            <Text style={[testStyles.optionText]}>{el.text}</Text>
                                        </View>
                                    )
                                )

                            }

                        </>
                        }
                    </View>
                default:
                    return <View style={styles.resultCont}>
                        <Text style={styles.resultQuestion}>
                            {`${index + 1}. ${originalTest.title.text}`}
                        </Text>
                        <Text style={styles.yourAnswer} >твоя відповідь</Text>
                        {answeredTest.skipped && <Text style={styles.skippedQuestion}>Пропущено</Text>}
                        {!answeredTest.skipped && <Text style={{ ...styles.skippedQuestion, color: handleAnswerCorrect.isCorrect ? Colors.success : Colors.error, fontWeight: 'bold' }}>{answeredTest.selected ? 'Правильно' : 'Неправильно'}</Text>}

                        {(!handleAnswerCorrect.isCorrect || answeredTest.skipped) && <>
                            <Text style={{ ...styles.yourAnswer, paddingTop: 12 }} >правильна відповідь</Text>
                            <Text style={{ ...styles.skippedQuestion, color: Colors.success, fontWeight: 'bold', paddingBottom: 20 }}>{originalTest.content.answer ? 'Правильно' : 'Неправильно'}</Text>
                        </>
                        }
                    </View>



            }
        }, [originalTest, answeredTest]
    )
    return renderLayout()
}

export default TestResutItem

const styles = StyleSheet.create({
    resultCont: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 15
    },
    resultQuestion: {
        color: Colors.black2,
        fontWeight: '600',
        fontSize: 14,
        padding: 16
    },
    yourAnswer: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.gray,
        paddingLeft: 16,
        paddingBottom: 11
    },
    skippedQuestion: {
        paddingBottom: 11,
        color: Colors.error,
        paddingLeft: 30,
        fontSize: 16
    }
})
