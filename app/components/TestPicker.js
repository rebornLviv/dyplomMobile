import React from 'react'
import { TestsEnum } from '../constants/Subjects'
import AccordanceTest from './AccordanceTest'
import BooleanAnswerTest from './BooleanAnswerTest'
import MultiAnswerTest from './MultiAnswerTest'
import SingleAnswerTest from './SingleAnswerTest'

const TestPicker = (props) => {
    switch (props.content.type) {
        case TestsEnum.MULTI_ANSWER: return <MultiAnswerTest  {...props} />
        case TestsEnum.BOOLEAN: return <BooleanAnswerTest {...props} />
        case TestsEnum.ACCORDANCE: return <AccordanceTest {...props} />
        default:
            return <SingleAnswerTest {...props} />
    }
}

export default TestPicker

