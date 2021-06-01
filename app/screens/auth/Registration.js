import React, { useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import Button from '../../components/Button'
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { checkPhone, register } from '../../../redux/auth/auth.actions';
import Styles from '../../constants/Styles';
import Input from '../../components/Input';
import AuthSwithcer from '../../components/AuthSwithcer';
import { checkValidity, sendSms } from '../../../api/authApi';
import { transformPhone } from '../../../utils/helpers';

const Register = ({ navigation: { navigate } }) => {
    const { screen, formContainer, input, loginBtn, toRegisterBtn, btnCont, infoCont, contentCont } = styles
    const dispatch = useDispatch()
    const toLogin = () => navigate('login')
    const [phoneNumber, setPhone] = useState('')
    const regiserHanler = async ({ username, phone, password }) => {
        console.log(username, password, phone)
        phone && await dispatch(checkPhone(phone))
        username && await dispatch(checkUserName(username))
        await dispatch(register(username, phone, password))
    }
    const phoneHandler = async () => {
        try {
            const phoneToSend = transformPhone(phoneNumber)
            console.log('pts', phoneToSend)
            const { valid } = await checkValidity('phone', phoneToSend)
            if (!valid) {
                alert('Такий номер телефону уже існує!')
                return
            }
            const { code } = await sendSms(phoneToSend)
            console.log('got code', code)
            navigate('verification', { phone: phoneNumber, code: code.toString(), phoneToSend })
        } catch (error) {
            console.log('got Error', { error })
            alert('Server Error')
        }

    }
    const hadleUsername = (username) => {

        username && dispatch(checkUserName(username))
    }
    const handlePhone = (phone) => {
        phone && dispatch(checkPhone(phone))
    }
    return (
        <View style={screen}>

            <View style={infoCont}>
                <Text style={{ ...Styles.heading, marginBottom: 12 }}>Номер телефону</Text>
                <Text style={Styles.secondaryText}>На цей номер буде надіслано код підтвердження</Text>
            </View>
            <Formik
                isInitialValid={false}
                initialValues={
                    {
                        username: '',
                        phone: '',
                        password: ''
                    }
                }
                onSubmit={regiserHanler}
            >
                {
                    ({ handleChange, handleSubmit, values }) => (
                        <View style={contentCont}>
                            <View style={formContainer} >
                                <Input mode="phone" setValue={setPhone} />
                                {/* <TextInput placeholder="username" style={input} value={values.username} onChangeText={handleChange('username')} onEndEditing={hadleUsername.bind(this,values.username)}/>
        <TextInput placeholder="phone" style={input} value={values.phone}  onChangeText={handleChange('phone')} onEndEditing={handlePhone.bind(this,values.phone)} />
        <TextInput placeholder="password" secureTextEntry={true} style={input} value={values.password} onChangeText={handleChange('password')} />
        <View style={btnCont}>
        <Button color="cyan" style={loginBtn} onPress={handleSubmit}>Register</Button>
        <Button color="blue" style={toRegisterBtn} onPress={toLogin} >toLogin</Button>
        </View> */}

                            </View>

                            <View>
                                <Button title="Далі" action={phoneHandler} />
                                <AuthSwithcer goTo={toLogin} />
                            </View>
                        </View>
                    )
                }

            </Formik>


        </View>

    )
}

export default Register

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: '3%',
        borderRadius: 15,
        backgroundColor: 'white'
    },
    loginBtn: {
        width: '30%'
    },
    toRegisterBtn: {
        width: '30%'
    },
    btnCont: {
        flexDirection: 'row'
    },
    infoCont: {
        marginTop: 48,
        paddingHorizontal: 16
    },
    contentCont: {
        height: '86%',
        justifyContent: 'space-between'
    }

})

