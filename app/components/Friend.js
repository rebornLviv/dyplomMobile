import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import Button from './Button'
import PhotoPlaceholderItem from './PhotoPlaceholderItem'

const Friend = ({ item: { name, phone, photo }, isRequest }) => {
    const { container, contentContainer, contentSubtitle, contentTitle,
        photoContainer, rejectButtonCont, rejectButtonText, requestButtonCont, btnCommon } = styles
    return (
        <View style={container}>
            <PhotoPlaceholderItem containerStyles={photoContainer} />
            <View style={contentContainer}>
                <Text style={contentTitle}>{name}</Text>
                <Text style={contentSubtitle}>{phone}</Text>
                {isRequest && <View style={requestButtonCont}>
                    <Button btnStyle={btnCommon} title='Прийняти' btnTextStyle={{ fontWeight: '500' }} />
                    <Button btnStyle={{ ...btnCommon, ...rejectButtonCont }} btnTextStyle={rejectButtonText} title='Відхилити' />
                </View>}
            </View>

        </View>
    )
}

export default Friend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24
    },
    photoContainer: {
        width: 52,
        height: 52
    },
    contentContainer: {
        marginLeft: 16
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black2,
        paddingBottom: 4
    },
    contentSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.gray
    },
    requestButtonCont: {
        flexDirection: 'row',
        marginTop: 8
    },
    rejectButtonCont: {
        backgroundColor: '#DDDDDD'
    },
    rejectButtonText: {
        color: Colors.main,
        fontWeight: '500'
    },
    btnCommon: {
        width: 108,
        height: 32,
        marginRight: 8
    }
})
