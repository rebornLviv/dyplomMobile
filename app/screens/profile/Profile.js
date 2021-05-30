import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/auth/auth.reducer'
import UserIcon from '../../assets/UserIcon'
import Button from '../../components/Button'
import CustomHeader from '../../components/CustomHeader'
import Input from '../../components/Input'
import PhotoPlaceholderItem from '../../components/PhotoPlaceholderItem'
import Colors from '../../constants/Colors'

const Profile = () => {
    const dispatch = useDispatch()
    const { photoContainer, container } = styles
    const { email, username, phone } = useSelector(state => state.auth)
    return (
        <>
            <CustomHeader title='Профіль' />
            <View style={container}>
                <PhotoPlaceholderItem />
                <Input mode="name" inputValue={username} />
                <Input mode="phone" inputValue={phone} />
                <Input mode="email" inputValue={email} />
            </View>
            <Button btnStyle={{ marginBottom: '15%' }} title='Вийти' action={() => dispatch(logoutUser())} />
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '15%'
    },

})