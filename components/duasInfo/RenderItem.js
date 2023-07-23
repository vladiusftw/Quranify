import { useNavigation } from '@react-navigation/native'
import React, { useState, memo, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { AppContext } from '../../MyContext'
import { Image } from 'expo-image'

const RenderItem = ({ item }) => {
    const navigation = useNavigation()
    const { blurhash, setBookmarks2 } = useContext(AppContext)
    return (
        <View style={styles.container}>
            <Text style={styles.ar}>{item?.ar}</Text>
            <Text style={styles.en}>{item?.en}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.source}>{item?.source}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setBookmarks2((prev) => [...prev, item])
                        alert('Dua Added!')
                    }}
                >
                    <Image
                        source={require('../../assets/bookmark-white.png')}
                        style={styles.img}
                        contentFit="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#460687',
        marginBottom: hp(3),
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        borderRadius: 10,
    },
    ar: {
        fontFamily: 'Poppins_500Medium',
        fontSize: hp(1.8),
        writingDirection: 'rtl',
        color: '#EEEEEE',
        marginBottom: hp(2),
        lineHeight: 24,
    },
    en: {
        fontFamily: 'Poppins_500Medium',
        fontSize: hp(1.8),
        color: '#EEEEEE',
        marginBottom: hp(2),
        lineHeight: 24,
    },
    source: {
        fontFamily: 'Poppins_500Medium',
        fontSize: hp(1.6),
        color: '#A19CC5',
    },
    img: {
        width: 20,
        height: 28,
    },
})
