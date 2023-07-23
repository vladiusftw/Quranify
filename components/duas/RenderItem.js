import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { AppContext } from '../../MyContext'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

const RenderItem = ({ img, text, mine }) => {
    const { blurhash } = useContext(AppContext)
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate('DuasCategory', {
                    category: text,
                    mine,
                })
            }
        >
            <Image
                source={img}
                style={styles.img}
                placeholder={blurhash}
                contentFit="contain"
            />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#460687',
        width: wp(26),
        height: hp(14),
        alignItems: 'center',

        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    img: {
        width: wp(12),
        height: hp(5),
        marginTop: hp(1.1),
        marginBottom: hp(1.1),
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#EEEEEE',
        fontSize: hp(1.6),
        textAlign: 'center',
    },
})
