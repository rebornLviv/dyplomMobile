import React from 'react'
import BiologyIocn from '../assets/BiologyIcon'
import HistoryIcon from '../assets/HistoryIcon'
import { SubjectEnum } from '../constants/Subjects'

export const SubjectIconPicker = ({ name }) => {

    switch (name) {
        case SubjectEnum.HISTORY_OF_UKRAINE:
            return <HistoryIcon />
        case SubjectEnum.BIOLOGY:
            return <BiologyIocn />

        default:
            return <BiologyIocn />
    }
}


