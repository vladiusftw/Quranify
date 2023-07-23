import React, { useContext, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import duas from '../duas.json'
import { AppContext } from '../MyContext'
import { Image } from 'expo-image'
import RenderItem from '../components/duas/RenderItem'
import { FlashList } from '@shopify/flash-list'

const Duas = ({ navigation }) => {
    const { blurhash, bookmarks2 } = useContext(AppContext)
    const [tab, setTab] = useState('category')
    const categories = [...new Set(duas.map((item) => item.category))]
    const imgs = {
        'all duas': require('../assets/duas.png'),
        'daily routine': require('../assets/time.png'),
        'sleep & wake up': require('../assets/sleep.png'),
        'food & drink': require('../assets/food.png'),
        'dua in joy': require('../assets/smile.png'),
        'dua in distress': require('../assets/sad.png'),
        travel: require('../assets/airplane.png'),
        'prayer & masjid': require('../assets/mosque.png'),
        'praise allah': require('../assets/allah.png'),
        'hajj & umrah': require('../assets/kabah.png'),
        'dua in sickness': require('../assets/hospital.png'),
        'death & funeral': require('../assets/death.png'),
        'entering & exiting': require('../assets/door.png'),
        'protection from evil': require('../assets/protection.png'),
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 0.88 }}>
                <View style={{ paddingHorizontal: wp(6), paddingTop: hp(1) }}>
                    <Text style={styles.title}>Quranify</Text>
                    <View style={{ flexDirection: 'row', marginTop: hp(2.8) }}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                {
                                    borderBottomColor:
                                        tab == 'category'
                                            ? 'rgba(164, 74, 255, 1)'
                                            : 'rgba(135, 137, 163, 0.1)',
                                },
                            ]}
                            onPress={() => setTab('category')}
                        >
                            <Text style={styles.tabText}>Categories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                {
                                    borderBottomColor:
                                        tab == 'my duas'
                                            ? 'rgba(164, 74, 255, 1)'
                                            : 'rgba(135, 137, 163, 0.1)',
                                },
                            ]}
                            onPress={() => setTab('my duas')}
                        >
                            <Text style={styles.tabText}>My Duas</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: hp(68), marginTop: hp(2.5) }}>
                        {tab === 'category' ? (
                            <FlashList
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                estimatedItemSize={hp(16)}
                                data={categories}
                                renderItem={({ item, index }) => (
                                    <RenderItem
                                        img={imgs[item.toLowerCase()]}
                                        key={index}
                                        text={item}
                                        mine={false}
                                    />
                                )}
                            />
                        ) : (
                            <FlashList
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                estimatedItemSize={hp(16)}
                                data={[
                                    ...new Set(
                                        bookmarks2.map((item) => item.category)
                                    ),
                                ]}
                                renderItem={({ item, index }) => (
                                    <RenderItem
                                        img={imgs[item.toLowerCase()]}
                                        key={index}
                                        text={item}
                                        mine={true}
                                    />
                                )}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.bottomBar}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp(-2),
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={styles.home}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image
                            source={require('../assets/home-icon-grey.png')}
                            placeholder={blurhash}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quran}
                        onPress={() => navigation.navigate('Quran')}
                    >
                        <Image
                            source={require('../assets/quran-icon-grey.png')}
                            placeholder={blurhash}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tasbih}
                        onPress={() => navigation.navigate('Tasbih')}
                    >
                        <Image
                            source={require('../assets/tasbih.png')}
                            placeholder={blurhash}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dua}>
                        <Image
                            source={require('../assets/dua-icon-purple.png')}
                            placeholder={blurhash}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Duas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040C23',
    },
    bottomBar: {
        flex: 0.12,
        backgroundColor: '#121931',
        justifyContent: 'center',
        paddingHorizontal: wp(6),
    },
    home: {
        width: wp(12),
        height: hp(6),
    },
    quran: {
        width: wp(12),
        height: hp(6),
    },
    tasbih: {
        width: wp(12),
        height: hp(6),
    },
    dua: {
        width: wp(10),
        height: hp(6),
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        color: '#EEEEEE',
        fontSize: hp(2.8),
    },
    tab: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp(1.5),
        borderBottomColor: 'rgba(135, 137, 163, 0.1)',
        borderBottomWidth: 2,
    },
    tabText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: hp(1.6),
        color: '#EEEEEE',
    },
})
