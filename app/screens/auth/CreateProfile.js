import React, { useState } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/auth/auth.actions'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Welcoming from '../../components/Welcoming'
import Styles from '../../constants/Styles'

const CreateProfile = ({route:{params}}) => {
    const {contentCont,passTip,mentionRef,policyCont,highlited} = styles
    const [hasReferal,setHasReferal] = useState(false)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPasswordPassword] = useState('')
    const [referal,setReferal] = useState('')
    const toggleReferal = () => setHasReferal(v => !v)
    const dispatch = useDispatch()
    const registerUser = async () => {
        try {
            const registerBody= {
                email,
                        otpnum: params?.code,
                        password,
                        phone:params?.phone,
                        username,
            }
            console.log('creAting',{registerBody})
          await  dispatch(register(registerBody))            
        } catch (error) {
            console.log('error while regg ',error)
        }

    }
    return (
        <View style={Styles.screen}>
          <Welcoming greet='привіт' 
          head ="Вхід у профіль"
          />
            <View style={contentCont}>
                    <View style={Styles.formContainer}>
                    <Input mode ="name"  setValue={setUsername}/>
                    <Input mode ="email" setValue={setEmail} />
                    <Input mode ="password" setValue={setPasswordPassword}/>
                    <View style={passTip}>
                    <Text style={Styles.secondaryText}>Має містити 6+ символів</Text>
                    </View>
                    {
                        hasReferal && <Input mode="referal" setValue={referal} />
                    }   

                    { !hasReferal && <TouchableOpacity style={mentionRef} onPress={toggleReferal} >
                        <Text style={Styles.actionText}> Вказати реферала</Text>
                    </TouchableOpacity>}
                    </View>
                    <View>
                        <Button title = "Створити" action={registerUser} />
                        <View style={policyCont}>
                            <View style={Styles.row}>
                            <View style={highlited}><Text style={Styles.secondaryText}>Продовжуючи, ти погоджуєшся з </Text></View>
                            <TouchableOpacity style={highlited}><Text style={Styles.actionText}>Політикою </Text></TouchableOpacity>
                            </View>
                            <View style={Styles.row}>
                            <TouchableOpacity style={highlited}><Text style={Styles.actionText}>конфідеційності </Text></TouchableOpacity>
                            <View style={highlited}><Text style={Styles.secondaryText}>та </Text></View>
                            <TouchableOpacity style={highlited}><Text style={Styles.actionText}>Умовами використання</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    
            </View>
            
        </View>
    )
}

export default CreateProfile

const styles = StyleSheet.create({

    contentCont:{
        height:'80%',
        justifyContent:'space-between'
    },
    passTip:{
            width:'100%',
            paddingHorizontal:34,
            marginBottom:16
    },
    mentionRef:{
        marginTop:32
    },
    policyCont:{
        marginVertical:16,
        justifyContent:'center',
        alignItems:'center',
    },
    highlited:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    }
})
