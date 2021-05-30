import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchIcon from '../assets/SearchIcon'
import Colors from '../constants/Colors'

const CustomHeader = ({ title, mode }) => {
    const { headerContainer, headerTitle, friendsCont } = styles
    return (
        <>
            { !mode && <View style={headerContainer}>
                <Text style={headerTitle}>{title}</Text>
            </View>}
            {mode === 'friends' &&
                <View style={[headerContainer, friendsCont]}>
                    <Text style={headerTitle}>{title}</Text>
                    <TouchableOpacity >
                        <SearchIcon />
                    </TouchableOpacity>

                </View>

            }

        </>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        paddingLeft: 20,
    },
    headerContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.07)'
    },
    friendsCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 0,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
})
