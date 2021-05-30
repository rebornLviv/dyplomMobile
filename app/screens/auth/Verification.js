import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GoBack from '../../components/GoBack'
import Styles from '../../constants/Styles'
import {
    CodeField,
    useBlurOnFulfill,
    useClearByFocusCell
  } from 'react-native-confirmation-code-field';
import Colors from '../../constants/Colors';
import { sendSmsToPhone } from '../../../redux/auth/auth.actions';

const Cell = ({cellCont,idx,symbol,focused,getOnLayout,cellFocused,cellText}) =>
<View style={[cellCont, focused && cellFocused, idx === 2 && {marginRight:24}]}>
<Text onLayout={getOnLayout(idx)} style={cellText} >{symbol}</Text>
</View>

  
const Verification = ({navigation:{navigate},route:{params:{phone,code,phoneToSend}}}) => {
    const {infoCont,arrowCont,codeCont,cellCont,cellFocused,cellText,cellsCont,sendAgain,sendInActive,codeActions} = styles
    const [value, setValue] = useState(code??'');
    const ref = useBlurOnFulfill({value, cellCount: 6});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(
      () => {
          setTimeout(() => {
            navigate('createProfile',{code,phone:phoneToSend})
          }, 2500);
      },[]
  )
    return (
        <View style={Styles.screen}>
            <View style={infoCont}>
                <View style={arrowCont}>
                    <GoBack />
                </View>
                <Text style={{...Styles.heading,marginBottom:12}}>Код підтвердження</Text>
                <Text style={Styles.secondaryText}>На цей номер буде надіслано код підтвердження</Text>
                <Text style={{...Styles.secondaryText,fontWeight:'bold'}}>+380{phone}</Text>
            
            </View>
            <View style={codeCont}>
            <CodeField
                cellCount={6}
                value={value}
                {...props}
                rootStyle={cellsCont}
                onChangeText={setValue}
                ref={ref}
                renderCell={
                    ({index, symbol, isFocused}) =>
                      <Cell 
                      cellCont={cellCont} 
                      idx={index} symbol={symbol}
                      focused={isFocused} 
                      getOnLayout={getCellOnLayoutHandler}
                      cellFocused={cellFocused}  
                      cellText={cellText}
                        />
                }
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                
                
                />    
            </View>
            <TouchableOpacity style={codeActions} onPress={()=>{
                navigate('createProfile')
            }}>
            <Text style={[sendAgain,sendInActive]}>Надіслати код ще раз</Text>
            </TouchableOpacity>
           
            
            
            
        </View>
    )
}

export default Verification

const styles = StyleSheet.create({
    infoCont:{
        marginTop:8,
        paddingHorizontal:16
    },
    arrowCont:{
        marginBottom:20,
    },
    codeCont:{
        marginTop:65
    },
    cellCont:{
        width: 32,
        height: 48,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: 'rgba(132, 138, 157, 0.3)',
        textAlign: 'center',
    },
    cellFocused:{
        borderBottomColor:Colors.main
    },
    cellText:{
        fontSize:20,
        lineHeight:24.2,
        color:Colors.black2,
        textAlign:'center'
    },
    cellsCont:{
        paddingHorizontal:52
    },
    sendAgain:{
         textAlign:'center',
        color:Colors.main,
        fontWeight:'bold',
        fontSize:12,
        lineHeight:14.52
    },
    sendInActive:{

    },
    codeActions:{
        marginTop:126
    },


})
