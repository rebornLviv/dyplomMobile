import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { calculateTestResult } from '../../../utils/helpers'
import CrossIcon from '../../assets/CrossIcon'
import ResetIcon from '../../assets/ResetIcon'
import Button from '../../components/Button'
import CustomHeader from '../../components/CustomHeader'
import TestPicker from '../../components/TestPicker'
import TestResutItem from '../../components/TestResutItem'
import Colors from '../../constants/Colors'

const TestItem = () => {
    const navigation = useNavigation()
    const { sequenceContainer, container, testTitle } = styles
    const { test } = useSelector(state => state.test)
    const [answerHandler, updateAnswerHandler] = useState(test.tests.map(el => ({ type: el.content.type, selected: null })))
    const [currentTest, setCurrentTest] = useState(0)
    const isLastTest = useMemo(() => currentTest + 1 > test?.tests?.length - 1, [currentTest])
    const [showResults, setShowResults] = useState(false)
    const [finalResults, setFinalResults] = useState(null)

    const resetTestState = () => {
        setCurrentTest(0)
        setShowResults(false)
        setFinalResults(null)
        updateAnswerHandler(test.tests.map(el => ({ type: el.content.type, selected: null })))
    }
    const handleNextSteps = useCallback(
        () => {
            if (!isLastTest) {
                console.log('next test')
                setCurrentTest(currentTest + 1)
            }
            else {
                try {
                    setShowResults(true)
                    let results = calculateTestResult(test.tests, answerHandler)
                    console.log('got results', { results })
                    setFinalResults(results)
                } catch (error) {
                    console.log('got error in calc', error)
                }

            }
        }, [isLastTest, currentTest]
    )
    console.log('got test', answerHandler, test)
    return (
        <View>
            { !showResults &&
                <>
                    <CustomHeader title={'Test'} />
                    <View style={styles.mainTestBody}>
                        <View style={sequenceContainer}>
                            <Text>{`${currentTest + 1}`}/{test?.tests?.length?.toString()}</Text>
                            <Text adjustsFontSizeToFit style={testTitle}>
                                {test.tests[currentTest].title.text}
                            </Text>
                        </View>

                        <ScrollView style={{ height: '65%', overflow: 'scroll' }}>
                            <TestPicker content={test.tests[currentTest].content} answerHandler={answerHandler[currentTest]} currentTest={currentTest} updateAnswerHandler={updateAnswerHandler} />
                        </ScrollView>
                        <View style={{ alignSelf: 'center', paddingTop: 10 }}>
                            <Button title={isLastTest ? 'Завершити' : "Далі"} action={handleNextSteps} />
                        </View>
                    </View>
                </>}

            {showResults && <>
                <View style={styles.resultsBlock}>
                    <View style={styles.resultUppperContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <CrossIcon selected />
                        </TouchableOpacity>
                        <Text style={styles.upperText}>
                            Тест
                         </Text>
                        <TouchableOpacity onPress={resetTestState}>
                            <ResetIcon />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.resultContent}>
                        <Text style={styles.yourResults}>Твій результат</Text>
                        <Text style={styles.yourScore} >{`${finalResults.score}/${finalResults.maxScore}`}</Text>
                    </View>
                    <View style={styles.resultsStats}>
                        <View style={styles.resultsStatsItem}>
                            <Text style={styles.statItemLabel}>Правильні</Text>
                            <Text style={styles.statItemScore}>{finalResults.score}</Text>
                        </View>
                        <View style={styles.resultsStatsItem}>
                            <Text style={styles.statItemLabel}>Неправильні</Text>
                            <Text style={styles.statItemScore}>{finalResults.wrongAnswers}</Text>
                        </View>
                        <View style={styles.resultsStatsItem}>
                            <Text style={styles.statItemLabel}>Пропущені</Text>
                            <Text style={styles.statItemScore}>{finalResults.skippedTests}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.explanationBlock}>
                    <FlatList
                        data={test.tests}
                        renderItem={({ item, index }) => <TestResutItem originalTest={item} answeredTest={answerHandler[index]} index={index} />}
                    />
                </View>


            </>}


        </View>
    )
}

export default TestItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sequenceContainer: {
        marginTop: 27,
        alignItems: 'center',
        height: '12%'
    },
    testTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 24
    },
    mainTestBody: {
    },
    explanationBlock: {
        marginTop: 30,
        height: '65%'
    },
    resultsBlock: {
        backgroundColor: '#191744',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    resultUppperContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 42,
        paddingHorizontal: 16,
    },
    upperText: {
        width: '85%',
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center'
    },
    resultContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 24
    },
    yourResults: {
        color: 'gray',
        fontSize: 12
    },
    yourScore: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600'
    },
    resultsStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 24

    },
    statItemLabel: {
        color: 'gray',
        fontSize: 12,
        paddingBottom: 8
    },
    statItemScore: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600'
    }

})
