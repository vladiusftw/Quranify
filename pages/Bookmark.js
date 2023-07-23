import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Overlay } from '@rneui/base'
import { AppContext } from '../MyContext'
import { FlashList } from '@shopify/flash-list'
import RenderItem from '../components/bookmark/RenderItem'
import { Image } from 'expo-image'

const Bookmark = ({ route, navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isVisible2, setIsVisible2] = useState(false)
    const [bookmarkItem, setBookmarkItem] = useState()
    const { type, moreInfoItem } = route.params
    const { bookmarks, setBookmarks, blurhash } = useContext(AppContext)
    const [input, setInput] = useState('')

    const addNewBookmark = () => {
        if (input.length != 0) {
            if (
                !bookmarks.find(
                    (a) => a.bookmark_name.toLowerCase() == input.toLowerCase()
                )
            ) {
                setBookmarks([
                    ...bookmarks,
                    { ...moreInfoItem, bookmark_name: input },
                ])
                setIsVisible(false)
            } else alert('Bookmark name already exists!')
        } else alert("Bookmark name can't be empty!")
    }

    const modifyBookmark = () => {
        const temp = bookmarks
        const index = temp.findIndex(
            (a) => a.bookmark_name == bookmarkItem.bookmark_name
        )
        temp[index] = {
            bookmark_name: bookmarkItem.bookmark_name,
            ...moreInfoItem,
        }
        setBookmarks([...temp])
        setIsVisible2(false)
    }

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
                            style={{
                                width: '60%',
                                height: '60%',
                            }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {type == 'hide' ? 'Bookmarks' : 'Modify Bookmarks'}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            { display: type == 'hide' ? 'none' : 'flex' },
                        ]}
                        onPress={() => setIsVisible(true)}
                    >
                        <Image
                            source={require('../assets/addButton.png')}
                            placeholder={blurhash}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: hp(80), paddingHorizontal: wp(6) }}>
                <FlashList
                    data={bookmarks}
                    renderItem={({ item, index }) => (
                        <RenderItem
                            item={item}
                            index={index}
                            type={type}
                            setBookmarkItem={setBookmarkItem}
                            setIsVisible2={setIsVisible2}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    extraData={bookmarks}
                    estimatedItemSize={58}
                />
            </View>

            <Overlay
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                overlayStyle={{
                    backgroundColor: '#460687',
                    borderRadius: 10,
                    paddingVertical: hp(2),
                    width: wp(95),
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInput
                        style={{
                            flex: 0.96,
                            borderColor: '#EEEEEE',
                            borderWidth: 1,
                            height: hp(4),
                            paddingHorizontal: wp(2),
                            fontFamily: 'Poppins_700Bold',
                            fontSize: hp(1.6),
                            color: '#EEEEEE',
                        }}
                        onChangeText={(newText) => setInput(newText)}
                        placeholder={'Enter Bookmark Title...'}
                        placeholderTextColor={'#EEEEEE'}
                        maxLength={40}
                        onSubmitEditing={addNewBookmark}
                    />
                    <TouchableOpacity onPress={addNewBookmark}>
                        <Text
                            style={{
                                fontFamily: 'Poppins_700Bold',
                                color: '#EEEEEE',
                            }}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <Overlay
                isVisible={isVisible2}
                onBackdropPress={() => setIsVisible2(false)}
                overlayStyle={{
                    backgroundColor: '#460687',
                    borderRadius: 10,
                    paddingVertical: hp(2),
                    width: wp(95),
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins_500Medium',
                            textAlign: 'center',
                            fontSize: hp(2.2),
                            color: '#EEEEEE',
                        }}
                    >
                        Are you sure you would like to overwrite this bookmark?
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: hp(1),
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#A19CC5',
                                borderRadius: 5,
                                width: wp(12),
                                height: hp(4),
                                marginRight: wp(4),
                            }}
                            onPress={modifyBookmark}
                        >
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#A19CC5',
                                borderRadius: 5,
                                width: wp(12),
                                height: hp(4),
                            }}
                            onPress={() => setIsVisible2(false)}
                        >
                            <Text>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        </View>
    )
}

export default Bookmark

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040C23',
    },
    topBar: {
        backgroundColor: '#121931',
        paddingVertical: hp(3),
        paddingHorizontal: wp(6),
        marginBottom: hp(2),
    },
    back: {
        width: wp(10),
        height: hp(4),
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        left: wp(8.5),
        paddingLeft: wp(2),
        textAlign: 'center',
        fontFamily: 'Scheherazade_700Bold',
        fontSize: hp(3.6),
        color: '#EEEEEE',
        width: wp(70),
    },
    addButton: {
        width: wp(8),
        height: hp(4),
        position: 'absolute',
        right: wp(0),
    },
})
