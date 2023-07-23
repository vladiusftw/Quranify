import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import quranData from './quran.json'

export const AppContext = createContext()

const MyContext = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([])
    const [bookmarks2, setBookmarks2] = useState([])
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

    const getBookmarks = async () => {
        try {
            let tempBookmarks = []
            const jsonValue = await AsyncStorage.getItem('quranify-bookmark')
            if (jsonValue != null) {
                const khitmahBookmark = {
                    ...JSON.parse(jsonValue),
                    bookmark_name: 'Khitmah',
                }
                tempBookmarks.push(khitmahBookmark)
            } else {
                const khitmahBookmark = {
                    ...quranData[0].verses[0],
                    bookmark_name: 'Khitmah',
                }
                tempBookmarks.push(khitmahBookmark)
            }

            try {
                const jsonValue2 = await AsyncStorage.getItem(
                    'quranify-bookmarks'
                )
                if (jsonValue2 != null) {
                    tempBookmarks = [
                        ...tempBookmarks,
                        ...JSON.parse(jsonValue2),
                    ]
                }
                setBookmarks([...tempBookmarks])
            } catch (e) {
                // error reading value
                alert('An error has occured!')
            }
        } catch (e) {
            // error reading value
            alert('An error has occured!')
        }
    }

    const saveBookmarks = async () => {
        if (bookmarks.length > 0) {
            try {
                const jsonValue = JSON.stringify(bookmarks[0])
                await AsyncStorage.setItem('quranify-bookmark', jsonValue)
                if (bookmarks.length > 1) {
                    try {
                        const jsonValue2 = JSON.stringify(bookmarks.slice(1))
                        await AsyncStorage.setItem(
                            'quranify-bookmarks',
                            jsonValue2
                        )
                    } catch (e) {
                        // saving error
                        alert('An error has occured!2')
                    }
                }
            } catch (e) {
                // saving error

                alert('An error has occured!1')
            }
        }
    }

    useEffect(() => {
        getBookmarks()
    }, [])

    useEffect(() => {
        saveBookmarks()
    }, [bookmarks])

    const getBookmarks2 = async () => {
        try {
            let tempBookmarks = []
            try {
                const jsonValue2 = await AsyncStorage.getItem(
                    'quranify-bookmarks2'
                )
                if (jsonValue2 != null) {
                    tempBookmarks = [
                        ...tempBookmarks,
                        ...JSON.parse(jsonValue2),
                    ]
                }
                setBookmarks2([...tempBookmarks])
            } catch (e) {
                // error reading value
                alert('An error has occured!')
            }
        } catch (e) {
            // error reading value
            alert('An error has occured!')
        }
    }

    const saveBookmarks2 = async () => {
        if (bookmarks2.length > 0) {
            try {
                const jsonValue2 = JSON.stringify(bookmarks2)
                await AsyncStorage.setItem('quranify-bookmarks2', jsonValue2)
            } catch (e) {
                // saving error
                alert('An error has occured!2')
            }
        }
    }

    useEffect(() => {
        getBookmarks2()
    }, [])

    useEffect(() => {
        saveBookmarks2()
    }, [bookmarks2])

    return (
        <AppContext.Provider
            value={{
                bookmarks,
                setBookmarks,
                blurhash,
                bookmarks2,
                setBookmarks2,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default MyContext

const styles = StyleSheet.create({})
