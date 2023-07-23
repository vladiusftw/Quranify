import React, { useContext, useState } from 'react'
import {
    FlatList,
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
import data from '../chapters.json'
import pages from '../quran.json'
import juz from '../juz.json'
import RenderItem from '../components/quran/RenderItem'
import { FlashList } from '@shopify/flash-list'
import { AppContext } from '../MyContext'
import { Image } from 'expo-image'

const Quran = ({ navigation }) => {
    const { blurhash } = useContext(AppContext)
    const [currTab, setCurrTab] = useState('Surah')
    const [search, setSearch] = useState('')
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 0.88 }}>
                <View style={{ paddingHorizontal: wp(6), paddingTop: hp(1) }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Quranify</Text>
                        <TouchableOpacity
                            style={styles.bookmark}
                            onPress={() =>
                                navigation.push('Bookmark', { type: 'hide' })
                            }
                        >
                            <Image
                                source={require('../assets/bookmark.png')}
                                placeholder={blurhash}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder="Search..."
                        style={styles.input}
                        placeholderTextColor={'#A19CC5'}
                        onChangeText={(newText) => setSearch(newText)}
                        keyboardType={
                            currTab == 'Surah' ? 'default' : 'number-pad'
                        }
                        returnKeyType={'done'}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: hp(3),
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                styles.tabContainer,
                                {
                                    borderBottomColor:
                                        currTab == 'Surah'
                                            ? '#A44AFF'
                                            : 'rgba(135, 137, 163, 0.1)',
                                },
                            ]}
                            onPress={() => setCurrTab('Surah')}
                        >
                            <Text style={styles.tab}>Surah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabContainer,
                                {
                                    borderBottomColor:
                                        currTab == 'Juz'
                                            ? '#A44AFF'
                                            : 'rgba(135, 137, 163, 0.1)',
                                },
                            ]}
                            onPress={() => setCurrTab('Juz')}
                        >
                            <Text style={styles.tab}>Juz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabContainer,
                                {
                                    borderBottomColor:
                                        currTab == 'Page'
                                            ? '#A44AFF'
                                            : 'rgba(135, 137, 163, 0.1)',
                                },
                            ]}
                            onPress={() => setCurrTab('Page')}
                        >
                            <Text style={styles.tab}>Page</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            height: hp(62),
                            marginTop: hp(2),
                        }}
                    >
                        {currTab == 'Surah' ? (
                            <FlashList
                                data={data.filter((a) =>
                                    search.length != 0
                                        ? a.name_simple
                                              .toLocaleLowerCase()
                                              .includes(search.toLowerCase())
                                        : a
                                )}
                                renderItem={({ item, index }) => (
                                    <RenderItem
                                        item={item}
                                        index={index}
                                        type={'Surah'}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                estimatedItemSize={hp(6)}
                            />
                        ) : (
                            <></>
                        )}

                        {currTab == 'Juz' ? (
                            <FlashList
                                data={juz.filter((a) =>
                                    search.length != 0
                                        ? (a.id + '').startsWith(search)
                                        : a
                                )}
                                renderItem={({ item, index }) => (
                                    <RenderItem
                                        item={item}
                                        index={index}
                                        type={'Juz'}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                estimatedItemSize={hp(6)}
                            />
                        ) : (
                            <></>
                        )}

                        {currTab == 'Page' ? (
                            <FlashList
                                data={pages.filter((a) =>
                                    search.length != 0
                                        ? (a.id + '').startsWith(search)
                                        : a
                                )}
                                renderItem={({ item, index }) => (
                                    <RenderItem
                                        item={item}
                                        index={index}
                                        type={'Page'}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                estimatedItemSize={hp(6)}
                            />
                        ) : (
                            <></>
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
                            style={{ width: '100%', height: '100%' }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quran}>
                        <Image
                            source={require('../assets/quran-icon-purple.png')}
                            placeholder={blurhash}
                            style={{ width: '100%', height: '100%' }}
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
                    <TouchableOpacity
                        style={styles.dua}
                        onPress={() => navigation.navigate('Duas')}
                    >
                        <Image
                            source={require('../assets/dua-icon-grey.png')}
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

export default Quran

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
    bookmark: {
        width: wp(5),
        height: hp(4),
    },
    input: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#A44AFF',
        borderRadius: 5,
        paddingVertical: hp(1.5),
        marginTop: hp(3),
        paddingHorizontal: wp(3),
        color: '#A19CC5',
    },
    tabContainer: {
        flex: 1,
        borderBottomWidth: 3,
        paddingBottom: hp(1),
    },
    tab: {
        fontFamily: 'Poppins_500Medium',
        color: '#A19CC5',
        fontSize: hp(1.6),
        width: '100%',
        textAlign: 'center',
    },
})
