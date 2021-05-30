import { TestsEnum } from "../app/constants/Subjects"

export const transformPhone = (phone) => phone.replace(/[-\s.,$_)(]/g, '').toString().substring(0)

export const ukrAlphabet = [
    'а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'
].map(l => l.toUpperCase())

export const mapLettersToTests = (tests) => {
    return tests.map(
        test => {
            switch (test.content.type) {
                case TestsEnum.SINGLE_ANSWER:
                case TestsEnum.MULTI_ANSWER:
                    let newTest = { ...test, content: { ...test.content, options: test.content.options.map((t, tId) => ({ letter: ukrAlphabet[tId], text: t })) } }
                    if (test.content.type === TestsEnum.SINGLE_ANSWER) {
                        const answerIndex = newTest.content.options.findIndex(t => t.text === newTest.content.answer)
                        console.log('state', { answerIndex, newTest })
                        newTest.content.answer = { text: newTest.content.answer, letter: newTest.content.options[answerIndex].letter }
                    }
                    else {
                        newTest.content.answers = newTest.content.answers.map(a => ({ text: a, letter: newTest.content.options.find(el => el.text === a).letter }))
                    }
                    return newTest
                case TestsEnum.ACCORDANCE:
                    return {
                        ...test, content: {
                            ...test.content,
                            qArray: Object.keys(test.content.accordancies),
                            oArray: Object.values(test.content.accordancies).map((o, oId) => ({ letter: ukrAlphabet[oId], text: o }))
                        }
                    }
                default:
                    return test
            }
        }
    )
}


export const calculateTestResult = (tests, answers) => {
    let score = 0
    let maxScore = 0
    let skippedTests = 0
    let wrongAnswers = 0
    let resultsExplanationArray = []
    tests.forEach((element, index) => {
        if (answers[index].selected === null) {
            skippedTests += 1
            answers[index].skipped = true


        }
        switch (element.content.type) {
            case TestsEnum.SINGLE_ANSWER:
                maxScore += 1
                if (!answers[index]?.skipped)
                    if (answers[index]?.selected === element.content.answer.text) {
                        score += 1
                    }
                    else {
                        wrongAnswers += 1
                    }
                break;
            case TestsEnum.MULTI_ANSWER:
                maxScore += element.content.answers.length

                if (!answers[index].skipped) {
                    let scoreFromMulti = 0
                    let wrongArray = []
                    answers[index].selected.forEach(
                        (el) => {
                            if (element.content.answers.find(a => a.text === el.text)) {
                                scoreFromMulti += 1
                            }
                            else {
                                wrongArray.push(el)
                            }
                        }
                    )
                    scoreFromMulti -= wrongArray.length
                    wrongAnswers += wrongArray.length
                    score = scoreFromMulti > 0 ? score + scoreFromMulti : score
                }

                break
            case TestsEnum.ACCORDANCE:
                maxScore += Object.keys(element.content.accordancies).length

                answers[index].selected && Object.keys(element.content.accordancies).forEach(
                    key => {
                        if (answers[index]?.selected[key]?.text === element.content.accordancies[key]) {
                            score += 1
                        } else {
                            wrongAnswers += 1
                        }
                    }
                )
                break

            default:
                maxScore += 1
                if (!answers[index].skipped)
                    if (!!answers[index].selected === element.content.answer)
                        score += 1
                    else {
                        wrongAnswers += 1
                    }
        }
    });

    return { score, maxScore, skippedTests, wrongAnswers }


}