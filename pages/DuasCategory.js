import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { AppContext } from '../MyContext'
import { FlashList } from '@shopify/flash-list'
import RenderItem from '../components/duasCategory/RenderItem'
import data from '../duas.json'

const DuasCategory = ({ navigation, route }) => {
    const { category, mine } = route.params
    const { blurhash, bookmarks2 } = useContext(AppContext)
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: hp(4),
                    }}
                >
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../assets/back.png')}
                            placeholder={blurhash}
                            style={{ width: '60%', height: '60%' }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>{category}</Text>
                </View>
            </View>
            <View style={{ height: hp(80), paddingHorizontal: wp(6) }}>
                <FlashList
                    data={[
                        ...new Set(
                            mine
                                ? bookmarks2
                                      .filter(
                                          (item) => item.category === category
                                      )
                                      .map((item) => item.subcategory)
                                : data
                                      .filter(
                                          (item) => item.category === category
                                      )
                                      .map((item) => item.subcategory)
                        ),
                    ]}
                    renderItem={({ item, index }) => (
                        <RenderItem
                            key={index}
                            text={item}
                            id={index + 1}
                            mine={mine}
                        />
                    )}
                    estimatedItemSize={70}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default DuasCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040C23',
    },
    topBar: {
        backgroundColor: '#121931',
        paddingTop: hp(3),
        paddingBottom: hp(2),
        paddingHorizontal: wp(6),
        marginBottom: hp(2),
    },
    back: {
        width: wp(10),
        height: hp(4),
        justifyContent: 'center',
        zIndex: 1,
    },
    title: {
        position: 'absolute',
        left: 0,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Scheherazade_700Bold',
        fontSize: hp(3.6),
        color: '#EEEEEE',
    },
})
