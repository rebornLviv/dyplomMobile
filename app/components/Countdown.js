import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
const Countdown = ({setCountdown}) => {
        const [seconds,setSeconds] = useState(40)    
    useEffect(
        () => {
            const timer = setTimeout(
                () => {
                    if(seconds === 0) {
                        console.log('no seconds, return ')
                            setCountdown(false)
                        return
                    
                    }
                    setSeconds( s => s--)
                    console.log('going on',seconds)
                },1000
            )
            return  () => {
                clearTimeout(timer)
            }
        },
    )
return  <Text>{seconds}</Text>
   
}

export default Countdown

const styles = StyleSheet.create({})
