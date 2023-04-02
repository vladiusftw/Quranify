import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const LastRead = () => {
  const navigation = useNavigation();
  const [bookmarks, setBookmarks] = useState([]);
  const getBookmark = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("quranify-bookmark");
      var temp = [];
      if (jsonValue != null)
        temp.push({ ...jsonValue, bookmark_name: "Khitmah Completion" });
      const jsonValue2 = await AsyncStorage.getItem("quranify-bookmarks");
      if (jsonValue2 != null) temp = [...temp, ...jsonValue2];
      setBookmarks([...temp]);
    } catch (e) {
      // error reading value
      alert("An error has occured!");
    }
  };
  useEffect(() => {
    getBookmark();
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (item != undefined && item != null)
          navigation.navigate("QuranInfo", { page_number: item.page_number });
      }}
    >
      <Image
        source={require("../../assets/last-read-bg.png")}
        style={styles.bgImg}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/last-read.png")}
          style={styles.lastRead}
        />
        <Text style={styles.lastReadText}>Last Read</Text>
      </View>
      <Text style={styles.chapter}>
        {bookmarks.length != 0 && bookmarks[0].bookmark_name != "Khitmah"
          ? item.chapter_name
          : "No Bookmark Yet"}
      </Text>
      {item != undefined && item != null ? (
        <Text style={styles.verseNum}>{`Ayah No: ${item.verse_number}`}</Text>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default LastRead;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#460687",
    borderRadius: 10,
    paddingTop: hp(1),
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
  bgImg: {
    width: wp(44),
    height: hp(10),
    resizeMode: "contain",
    position: "absolute",
    right: wp(0),
    bottom: hp(0),
  },
  lastRead: {
    width: wp(6),
    height: hp(4),
    resizeMode: "contain",
    marginRight: wp(2),
  },
  lastReadText: {
    fontFamily: "Poppins_500Medium",
    color: "#EEEEEE",
    fontSize: hp(1.4),
  },
  chapter: {
    fontFamily: "Poppins_600SemiBold",
    color: "#EEEEEE",
    fontSize: hp(1.8),
    marginTop: hp(1),
  },
  verseNum: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(161, 156, 197, 0.8)",
    fontSize: hp(1.4),
    marginTop: hp(0.5),
  },
});
