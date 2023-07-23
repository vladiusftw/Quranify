import { useNavigation } from '@react-navigation/native'
import React, { useState, memo, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { AppContext } from '../../MyContext'
import { Image } from 'expo-image'

const RenderItem = ({ text, id, mine }) => {
    const navigation = useNavigation()
    const { blurhash } = useContext(AppContext)
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: hp(1.5),
                borderBottomColor: 'rgba(123, 128, 173, 0.35)',
                borderBottomWidth: 1,
                marginBottom: hp(1.5),
            }}
            onPress={() =>
                navigation.navigate('DuasInfo', {
                    subcategory: text,
                    mine: mine,
                })
            }
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/border.png')}
                    placeholder={blurhash}
                    style={{
                        width: wp(10),
                        height: hp(5),
                    }}
                    contentFit="contain"
                />
                <Text
                    style={{
                        position: 'absolute',
                        fontFamily: 'Poppins_500Medium',
                        color: '#EEEEEE',
                        fontSize: hp(1.4),
                        width: wp(8),
                        textAlign: 'center',
                        left: wp(1),
                        alignSelf: 'center',
                    }}
                >
                    {id}
                </Text>
                <View style={{ marginLeft: wp(4) }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins_500Medium',
                            color: '#EEEEEE',
                            fontSize: hp(1.6),
                            width: wp(74),
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RenderItem

const styles = StyleSheet.create({})
