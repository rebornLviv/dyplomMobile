import React from 'react'
import { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CameraIcon from '../../assets/CameraIcon'
import Button from '../../components/Button'
import CustomHeader from '../../components/CustomHeader'
import Input from '../../components/Input'
import PhotoPlaceholderItem from '../../components/PhotoPlaceholderItem'
import { launchImageLibrary } from 'react-native-image-picker';
import { useMemo } from 'react'
import Colors from '../../constants/Colors'
import { updateUserProfile } from '../../../redux/auth/auth.actions'
import { changeUserData } from '../../../api/userApi'

const EditProfile = () => {
    const { email, phone, avatar, username } = useSelector(state => state.auth)
    const [userImage, setUserImage] = useState(avatar)
    const [newEmail, setNewEmail] = useState(email)
    const dispatch = useDispatch()
    const updateProfile = () => {
        try {
            console.log('data', { avatar: userImage, email: newEmail })
            changeUserData({ avatar: userImage, email: newEmail }).then(
                res => console.log('setting user', res)
            )
                .catch(err => console.log('err', err))
        } catch (error) {
            console.log('Error changing user data', error)
        }

    }
    const hasChanges = useMemo(
        () => (newEmail !== email) || (avatar !== userImage), [email, newEmail, avatar]
    )
    const getNewPhotoFromLibrary = async () => {
        try {
            await launchImageLibrary({ includeBase64: true, quality: 0.5, mediaType: 'photo' }, (response) => {

                if (!response.didCancel) {
                    console.log('got Image', response.assets[0])
                    console.log('data set', `data:${response.assets[0].type};base64,${response.assets[0].base64}`)
                    setUserImage(`data:${response.assets[0].type};base64,${response.assets[0].base64}`)
                }
            })
        } catch (error) {

        }

    }
    return (
        <KeyboardAvoidingView style={styles.container}>

            <CustomHeader canGoBack title='Мої дані' />
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>


                <TouchableOpacity style={styles.photoBlock} onPress={getNewPhotoFromLibrary}>
                    {!userImage?.length > 0 ? <PhotoPlaceholderItem containerStyles={{ height: 120, width: 120 }} />

                        :
                        <Image source={{ uri: userImage }} style={styles.photoContainer} resizeMode='cover' />
                    }
                    <View style={styles.photoHolder}>
                        <CameraIcon />
                    </View>
                </TouchableOpacity>
                <Input mode='name' inputValue={username} notEditable />
                <Input mode='phone' inputValue={'+380' + phone} notEditable />
                <Input mode='email' inputValue={newEmail} setValue={setNewEmail} />
                <Button btnStyle={{ marginVertical: 20, backgroundColor: hasChanges ? Colors.main : Colors.gray }} title='Зберегти зміни' disabled={!hasChanges} action={updateProfile} />
            </ScrollView>


        </KeyboardAvoidingView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    photoHolder: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 8,
        position: 'absolute'

    },
    photoContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: Colors.lGrey
    }


})
