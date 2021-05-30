import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackArrowIcon from '../assets/BackArrow'

const GoBack = () => {
    const {goBack} = useNavigation()
    return (
        <TouchableOpacity onPress={goBack}>
            <BackArrowIcon />
        </TouchableOpacity>
    )
}

export default GoBack

const styles = StyleSheet.create({})
