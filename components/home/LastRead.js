import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../MyContext'
import { Image } from 'expo-image'

const LastRead = () => {
    const navigation = useNavigation()
    const { bookmarks, blurhash } = useContext(AppContext)

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate('QuranInfo', {
                    page_number: bookmarks[0].page_number,
                })
            }}
            disabled={bookmarks.length == 0}
        >
            <Image
                source={require('../../assets/last-read-bg.png')}
                placeholder={blurhash}
                style={styles.bgImg}
                contentFit="contain"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/last-read.png')}
                    placeholder={blurhash}
                    style={styles.lastRead}
                    contentFit="contain"
                />
                <Text style={styles.lastReadText}>Last Read</Text>
            </View>
            <Text style={styles.chapter}>
                {bookmarks.length != 0
                    ? bookmarks[0].chapter_name
                    : 'No Bookmark Yet'}
            </Text>
            {bookmarks.length != 0 ? (
                <Text
                    style={styles.verseNum}
                >{`Ayah No: ${bookmarks[0].verse_number}`}</Text>
            ) : (
                <></>
            )}
        </TouchableOpacity>
    )
}

export default LastRead

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#460687',
        borderRadius: 10,
        paddingTop: hp(1),
        paddingBottom: hp(2),
        paddingHorizontal: wp(4),
        marginTop: hp(2),
    },
    bgImg: {
        width: wp(44),
        height: hp(10),
        position: 'absolute',
        right: wp(0),
        bottom: hp(0),
    },
    lastRead: {
        width: wp(6),
        height: hp(4),
        marginRight: wp(2),
    },
    lastReadText: {
        fontFamily: 'Poppins_500Medium',
        color: '#EEEEEE',
        fontSize: hp(1.4),
    },
    chapter: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#EEEEEE',
        fontSize: hp(1.8),
        marginTop: hp(1),
    },
    verseNum: {
        fontFamily: 'Poppins_500Medium',
        color: 'rgba(161, 156, 197, 0.8)',
        fontSize: hp(1.4),
        marginTop: hp(0.5),
    },
})
