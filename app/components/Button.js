import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'
const Button = ({ action, title, btnStyle, btnTextStyle, disabled }) => {

    const { buttonCont, buttonText } = styles
    return (
        <TouchableOpacity style={[buttonCont, btnStyle]} onPress={action} disabled={disabled}>
            <Text style={[buttonText, btnTextStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonCont: {
        width: 328,
        height: 52,
        backgroundColor: Colors.main,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22
    }

})
