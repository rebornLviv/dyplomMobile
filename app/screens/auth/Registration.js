import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View,TextInput } from 'react-native'
import { Button } from 'galio-framework';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { checkPhone, checkUserName, registerUser } from '../../../redux/auth/auth.actions';

const Registration = ({navigation:{navigate}}) => {
    const { screen, formContainer,input,loginBtn,toRegisterBtn,btnCont } = styles
    const dispatch = useDispatch()
    const toLogin = () => navigate('login')
    const regiser = async ({username,phone,password}) => {
        console.log(username,password,phone)
        phone && await  dispatch(checkPhone(phone))
       username && await dispatch(checkUserName(username))
       await dispatch(registerUser(username,phone,password))
    }
    const hadleUsername = (username) => {
    
        username &&    dispatch(checkUserName(username))
    }
    const handlePhone = (phone) => {
      phone &&  dispatch(checkPhone(phone))
    }
    return (
        <SafeAreaView style={screen}>
            <Formik
         isInitialValid={false}
         initialValues={
           {
             username: '',
             phone:'',
             password: ''
           }
         }
         onSubmit={regiser}
        >
            {
                ({handleChange,handleSubmit,values})=>(
        <View style={formContainer} > 
        <TextInput placeholder="username" style={input} value={values.username} onChangeText={handleChange('username')} onEndEditing={hadleUsername.bind(this,values.username)}/>
        <TextInput placeholder="phone" style={input} value={values.phone}  onChangeText={handleChange('phone')} onEndEditing={handlePhone.bind(this,values.phone)} />
        <TextInput placeholder="password" secureTextEntry={true} style={input} value={values.password} onChangeText={handleChange('password')} />
        <View style={btnCont}>
        <Button color="cyan" style={loginBtn} onPress={handleSubmit}>Register</Button>
        <Button color="blue" style={toRegisterBtn} onPress={toLogin} >toLogin</Button>
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

