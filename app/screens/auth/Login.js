import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import Button from '../../components/Button'
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import AuthSwithcer from '../../components/AuthSwithcer';
import Styles from '../../constants/Styles';
import Welcoming from '../../components/Welcoming';
import { login } from '../../../redux/auth/auth.actions';
import { useState } from 'react';
import { transformPhone } from '../../../utils/helpers';


const Login = ({navigation:{navigate}}) => {
    const { screen,contentCont,
  restoreCont,restoreText,bottomContent
    } = styles
    const [phone,setPhone] = useState('')
    const [password,setPassword] =useState('')
    const dispatch = useDispatch()
    const toRegister= () => navigate('register')
    const loginHandler = () => {
        console.log('loggin in',{phone:transformPhone(phone),password})
        dispatch(login({phone:transformPhone(phone),password}))
    
    }
    
    return (
        <SafeAreaView style={screen}>
            <Welcoming 
            greet="з поверненням"
            head = "Вхід у профіль"
            />
                    <View style={contentCont}>
        <View style={Styles.formContainer} > 
        <Input mode="phone" setValue={setPhone} />
        <Input mode="password" setValue={setPassword} />
        <View style={restoreCont}>
        <Text style={restoreText}>Відновити пароль</Text>
        </View>
        {/* <TextInput placeholder="username" style={input} value={values.username} onChangeText={handleChange('username')}/>
        <TextInput placeholder="password" secureTextEntry={true} style={input} value={values.password} onChangeText={handleChange('password')}/>
        <View style={btnCont}>
        <Button color="cyan" style={loginBtn} onPress={handleSubmit}>Login</Button>
        <Button color="blue" style={toRegisterBtn} onPress={toRegister} >toRegister</Button>
        </View> */}
        
        </View>
        <View style={bottomContent}>

            <Button title="Увійти" action={loginHandler} />
            <AuthSwithcer mode="login" goTo={toRegister}/>
        </View>

                    </View>  
        </SafeAreaView>
        
    )
}

export default Login

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'

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
    },
    restoreCont:{
        alignSelf:'flex-start',
        paddingLeft:'9%'
    },
    restoreText:{
        color: Colors.main,
        fontSize:12,
        lineHeight:15,
        fontWeight:'bold',
        textAlign:'left'
    },
    bottomContent:{
    },
    contentCont:{
        height:"81%",
        justifyContent:'space-between',
    }
})
