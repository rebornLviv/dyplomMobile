import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import PhoneIcon from '../assets/PhoneIcon'
import LockIcon from '../assets/LockIcon'
import EmailIcon from '../assets/EmailIcon'
import UserIcon from '../assets/UserIcon'
import EyeIcon from '../assets/EyeIcon'
import FriendsIcon from '../assets/FriendsIcon'

const Input = ({ mode, setValue, inputValue, notEditable }) => {

    const { cont, leftIcon, phoneCont, labelCont, inputCont, label, input, rightIcon, eye } = styles
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const togglePassVisibility = () => setPasswordVisible(p => !p)
    const iLabel = () => {
        switch (mode) {
            case 'phone': {
                return 'Номер телефону'
            }
            case 'password': {
                return 'Пароль'
            }

            case 'email': {
                return 'Ел. пошта'
            }

            case 'username': {
                return 'Ім’я користувача'
            }

            case 'referal': {
                return 'Ім’я реферала'
            }

            default:
                return 'Ім’я користувача'
        }
    }

    const lIcon = () => {
        switch (mode) {
            case 'phone': {
                return <PhoneIcon />
            }
            case 'password': {
                return <LockIcon />
            }

            case 'email': {
                return <EmailIcon />
            }

            case 'username': {
                return <UserIcon />
            }

            case 'referal': {
                return <FriendsIcon />
            }

            default:
                return <UserIcon />


        }
    }


    const numberHandler = (text) => {
        console.log('lngth', text.length)
        if (text.length > 14) return
        if (!text) return
        console.log('text', text)
        if (phoneNumber[4] === ")" && !text[4]) {
            console.log('slice', text.slice(0, 3))
            setPhoneNumber(text.slice(0, 3))
            return
        }
        console.log('text.length', text.length)
        if (text.length === 2) {
            setPhoneNumber('')
            return
        }
        console.log('text', text)
        let textToHandle = text && text.replace(/ /g, "").replace("(", "").replace(")", "")
        if (!textToHandle) return
        if (textToHandle.length > 9) return
        let [a, b, c, d, e, f, g, h, k] = textToHandle
        let result = `${a ? ` (${a}` : ''}${b ? `${b})` : ''}${c ? " " + c : ''}${d ? d : ''}${e ? e : ''}${f ? f : ''}${g ? " " + g : ''}${h ? h : ''}${k ? k : ''}`
        console.log('result', result)
        setPhoneNumber(result)
        { setValue && setValue(result) }
    }
    return (
        <View style={cont}>
            <View style={leftIcon}>
                {lIcon()}
            </View>
            <View style={phoneCont}>
                <View style={labelCont}>
                    <Text style={label}>{iLabel()}</Text>
                </View>
                <View style={inputCont}>
                    {mode === "phone" && (
                        <>
                            {!notEditable && <Text>+380</Text>}
                            <TextInput value={inputValue} style={input} onChangeText={numberHandler} keyboardType="number-pad" editable={!notEditable} placeholder="(67) 2345 221" />
                        </>


                    )}
                    {mode === "password" && (
                        <>
                            <TextInput style={input} value={inputValue} onChangeText={setValue} keyboardType="default" placeholder="введіть пароль" secureTextEntry={passwordVisible} />
                        </>


                    )}
                    {mode === 'referal' && <TextInput value={inputValue} style={input} onChangeText={setValue} placeholder="Введіть ім'я" />

                    }
                    {mode === 'email' && <TextInput value={inputValue} style={input} onChangeText={setValue} placeholder="Ваш емейл" />}
                    {mode === 'name' && <TextInput value={inputValue} style={input} onChangeText={setValue} placeholder="Ваше ім'я" editable={!notEditable} />}

                </View>

            </View>
            {mode === "password" && <View style={rightIcon}>
                <TouchableOpacity style={eye} onPress={togglePassVisibility}>
                    <EyeIcon />
                </TouchableOpacity>


            </View>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    cont: {
        height: 60,
        width: 328,
        backgroundColor: "#F8F8F8",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16
    },
    leftIcon: {
        marginHorizontal: 16
    },
    phoneCont: {
        width: "60%",
    },
    labelCont: {
        height: 15,
        paddingTop: 10
    },
    inputCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '500',
        color: '#848A9D'
    },
    input: {
    },
    rightIcon: {
        alignContent: "center",
        width: '26%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',

    },
    eye: {
        marginRight: 22
    }

})
