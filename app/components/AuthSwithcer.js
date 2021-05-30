import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'

const AuthSwithcer = ({mode,goTo}) => {
    const {cont,kText,mText} = styles
    const mainText = mode === "login" ? 'Ще не маєш профілю?' : 'Вже маєш профіль?'
    const keyWord = mode === "login" ? 'Створити' : 'Увійти'
    return (
        <View style={cont}>
            <View>
    <Text style={mText}>{mainText}</Text>
            </View>
            <TouchableOpacity onPress={goTo}>
    <Text style={kText}>{keyWord}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthSwithcer

const styles = StyleSheet.create({
    cont:{
        backgroundColor:Colors.lGrey,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:48,
        marginTop:16
    },
    mText:{
        fontSize:12,
        marginRight:8
    },
    kText:{
        color:Colors.main,
        fontWeight:"bold"
    }

})
