import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Overlay } from "@rneui/base";

const Bookmark = ({ route, navigation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { type, moreInfoItem } = route.params;
  const [bookmarks, setBookmarks] = useState([]);
  const getBookmarks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("quranify-bookmark");
      var temp = [];
      if (jsonValue != null) temp.push(jsonValue);
      const jsonValue2 = await AsyncStorage.getItem("quranify-bookmarks");
      if (jsonValue2 != null) temp = [...temp, ...jsonValue2];
      setBookmarks([...temp]);
    } catch (e) {
      // error reading value
      alert("An error has occured!");
    }
  };

  const saveBookmark = async () => {
    try {
      const jsonValue = JSON.stringify([...bookmarks, moreInfoItem]);
      await AsyncStorage.setItem("quranify-bookmarks", jsonValue);
    } catch (e) {
      // save error
      alert("An error has occured!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: hp(4),
          }}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/back.png")}
              style={{ width: "60%", height: "60%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{"Bookmarks"}</Text>
          <TouchableOpacity
            style={[
              styles.addButton,
              { display: type == "hide" ? "none" : "flex" },
            ]}
          >
            <Image
              source={require("../assets/addButton.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        overlayStyle={{
          backgroundColor: "#460687",
          borderRadius: 10,
          paddingVertical: hp(2),
          width: wp(95),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              flex: 0.96,
              borderColor: "#EEEEEE",
              borderWidth: 1,
              height: hp(4),
              paddingHorizontal: wp(2),
            }}
          />
          <TouchableOpacity>
            <Text style={{ fontFamily: "Poppins_700Bold", color: "#EEEEEE" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040C23",
  },
  topBar: {
    backgroundColor: "#121931",
    paddingVertical: hp(3),
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
  },
  back: {
    width: wp(10),
    height: hp(4),
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    left: wp(8.5),
    paddingLeft: wp(2),
    textAlign: "center",
    fontFamily: "Scheherazade_700Bold",
    fontSize: hp(3.6),
    color: "#EEEEEE",
    width: wp(70),
  },
  addButton: {
    width: wp(8),
    height: hp(4),
    position: "absolute",
    right: wp(0),
  },
});
