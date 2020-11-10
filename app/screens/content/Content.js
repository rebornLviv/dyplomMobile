import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/auth/auth.actions'
const Content = () => {

    const dispatch= useDispatch()
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <Button title="LOGOUT" onPress={ () => dispatch(logoutUser()) } />
            
        </View>
    )
}


export default Content

const styles = StyleSheet.create({})
