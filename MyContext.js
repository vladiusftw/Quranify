import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import quranData from "./quran.json";

export const AppContext = createContext();

const MyContext = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmarks = async () => {
    try {
      var tempBookmarks = [];
      const jsonValue = await AsyncStorage.getItem("quranify-bookmark");
      if (jsonValue != null) {
        const khitmahBookmark = {
          ...JSON.parse(jsonValue),
          bookmark_name: "Khitmah",
        };
        tempBookmarks.push(khitmahBookmark);
      } else {
        const khitmahBookmark = {
          ...quranData[0].verses[0],
          bookmark_name: "Khitmah",
        };
        tempBookmarks.push(khitmahBookmark);
      }

      try {
        const jsonValue2 = await AsyncStorage.getItem("quranify-bookmarks");
        if (jsonValue2 != null) {
          tempBookmarks = [...tempBookmarks, ...JSON.parse(jsonValue2)];
        }
        setBookmarks([...tempBookmarks]);
      } catch (e) {
        // error reading value
        alert("An error has occured!");
      }
    } catch (e) {
      // error reading value
      alert("An error has occured!");
    }
  };

  const saveBookmarks = async () => {
    if (bookmarks.length > 0) {
      try {
        const jsonValue = JSON.stringify(bookmarks[0]);
        await AsyncStorage.setItem("quranify-bookmark", jsonValue);
        if (bookmarks.length > 1) {
          try {
            const jsonValue2 = JSON.stringify(bookmarks.slice(1));
            await AsyncStorage.setItem("quranify-bookmarks", jsonValue2);
          } catch (e) {
            // saving error
            alert("An error has occured!2");
          }
        }
      } catch (e) {
        // saving error

        alert("An error has occured!1");
      }
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  useEffect(() => {
    saveBookmarks();
  }, [bookmarks]);
  return (
    <AppContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </AppContext.Provider>
  );
};

export default MyContext;

const styles = StyleSheet.create({});
