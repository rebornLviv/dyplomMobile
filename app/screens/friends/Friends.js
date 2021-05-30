import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import Friend from '../../components/Friend'
import Colors from '../../constants/Colors'

const mockFriends = [{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},
{
    phone: '+380964480999',
    name: 'Донна Полсон'
},

].map((el, idx) => ({ ...el, id: idx }))
const mockFriendsRequests = [{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
},
{
    phone: '+380964480123',
    name: 'Едгар По'
}
].map((el, idx) => ({ ...el, id: idx }))

const Friends = () => {
    const { topTabsCont, tabText } = styles
    const [selectedTab, setSelectedTab] = useState(0)
    const listLayout = useCallback(
        () => (
            <FlatList
                data={selectedTab === 0 ? mockFriends : mockFriendsRequests}
                renderItem={selectedTab === 0 ? Friend : ({ item }) => <Friend item={item} isRequest />}
                keyExtractor={f => f.id.toString()}
            />
        )

        , [selectedTab]
    )
    return (
        <View>
            <CustomHeader title='Друзі' mode='friends' />
            <View style={topTabsCont}>
                <TouchableOpacity onPress={() => setSelectedTab(0)} disabled={selectedTab === 0}>
                    <Text style={{ ...tabText, color: selectedTab === 0 ? Colors.main : Colors.black2 }}>Друзі ({mockFriends.length ?? 0}) </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab(1)} disabled={selectedTab === 1} >
                    <Text style={{ ...tabText, color: selectedTab === 1 ? Colors.main : Colors.black2 }}>Запити ({mockFriendsRequests.length ?? 0}) </Text>
                </TouchableOpacity>
            </View>
            {listLayout()}
        </View>
    )
}

const styles = StyleSheet.create({
    topTabsCont: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginVertical: 21,
    },
    tabText: {
        fontSize: 14,
        marginRight: 32
    }
})

export default Friends
