import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View,TextInput } from 'react-native'
import { Button } from 'galio-framework';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/auth/auth.actions';

const Registration = ({navigation:{navigate}}) => {
    const { screen, formContainer,input,loginBtn,toRegisterBtn,btnCont } = styles
    const dispatch = useDispatch()
    const toRegister= () => navigate('register')
    const login = ({username,phone,password}) => {
        console.log(username,password,phone)
        dispatch(loginUser(username,password))
    }
    return (
        <SafeAreaView style={screen}>
            <Formik
         isInitialValid={false}
         initialValues={
           {
             username: '',
             password: ''
           }
         }
         onSubmit={login}
        >
            {
                ({handleChange,handleSubmit,values})=>(
        <View style={formContainer} > 
        <TextInput placeholder="username" style={input} value={values.username} onChangeText={handleChange('username')}/>
        <TextInput placeholder="password" secureTextEntry={true} style={input} value={values.password} onChangeText={handleChange('password')}/>
        <View style={btnCont}>
        <Button color="cyan" style={loginBtn} onPress={handleSubmit}>Login</Button>
        <Button color="blue" style={toRegisterBtn} onPress={toRegister} >toRegister</Button>
        </View>
        
        </View>
                    
                )
            }
            
        </Formik>
        

        </SafeAreaView>
        
    )
}

export default Registration

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    formContainer:{
        height:Dimensions.get('screen').height/4.5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
        
    },
    input:{
        width:'80%',
        borderWidth:1,
        borderColor:'gray',
        marginBottom:'3%',
        borderRadius:15,
        backgroundColor:'white'
    },
    loginBtn:{
        width:'30%'
    },
    toRegisterBtn:{
        width:'30%'
    },
    btnCont:{
        flexDirection:'row'
    }
})
