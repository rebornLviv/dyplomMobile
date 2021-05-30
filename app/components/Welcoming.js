import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Welcoming = ({greet,head}) => {
    const {welcome1,welcome1Text, welcome2,welcome2Text,welcomeCont} = styles
    return (
        <View style={welcomeCont}>
                <View style={welcome1}>
                <Text style={welcome1Text}> {greet} </Text>

                </View>
           <View style={welcome2}>
           <Text style={welcome2Text}  >{head}</Text>
           </View>
           
            </View>
    )
}

export default Welcoming

const styles = StyleSheet.create({

    welcomeCont:{
        marginTop:45,
        paddingLeft:16,
        marginBottom:51
    },
    welcome1:{
        height:15,
    },
    welcome1Text:{
        fontSize:12,
        fontWeight:"500",
        lineHeight:15,
        color:"#848A9D"
    },
    welcome2:{
        height:36,
        marginTop:4
    },
    welcome2Text:{
        fontSize:30,
        fontWeight:'bold',
        lineHeight:36,
        color:"#191744"
    },
})
