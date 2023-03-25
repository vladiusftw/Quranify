import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Page from "../components/quranInfo/Page";
import data from "../quran.json";
import { FlashList } from "@shopify/flash-list";
import { Overlay } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuranInfo = ({ navigation, route }) => {
  const [currItem, setCurrItem] = useState(data[0]);
  const [currVerse, setCurrVerse] = useState({
    page_num: 0,
    verse_key: "0:0",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [moreInfoItem, setMoreInfoItem] = useState();
  const [bookmark, setBookmark] = useState();
  const { page_number } = route.params;
  const ref = useRef();
  const saveBookmark = async () => {
    try {
      const jsonValue = JSON.stringify(moreInfoItem);
      await AsyncStorage.setItem("quranify-bookmark", jsonValue);
      setBookmark(moreInfoItem);
      setIsVisible(false);
    } catch (e) {
      // saving error
      alert("An error has occured!");
    }
  };
  const getBookmark = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("quranify-bookmark");
      setBookmark(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      // error reading value
      alert("An error has occured!");
    }
  };
  useEffect(() => {
    getBookmark();
  }, []);
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
          <Text style={styles.title}>
            {currItem.verses[0].chapter_name_arabic}
          </Text>
          <View style={styles.tracker}>
            <Text
              style={styles.trackerText}
            >{`P ${currItem.id}   J ${currItem.verses[0].juz_number}`}</Text>
          </View>
        </View>
      </View>
      <FlashList
        ref={ref}
        initialScrollIndex={page_number - 1}
        onScrollToIndexFailed={(info) => {
          console.log("error");
          const wait = new Promise((resolve) => setTimeout(resolve, 200));
          wait.then(() => {
            ref.current?.scrollToIndex({
              index: page_number - 1,
              animated: true,
            });
          });
        }}
        data={data}
        renderItem={({ item, index }) => (
          <Page
            item={item}
            index={index}
            currVerse={currVerse}
            setCurrVerse={setCurrVerse}
            setIsVisible={setIsVisible}
            setMoreInfoItem={setMoreInfoItem}
            bookmark={bookmark}
          />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={930}
        extraData={[currVerse, bookmark]}
        onViewableItemsChanged={(info) => {
          if (info.viewableItems.length != 0)
            setCurrItem(info.viewableItems[0].item);
        }}
      />
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
        <View style={{ paddingHorizontal: wp(2) }}>
          <Text
            style={[
              styles.translation,
              { alignSelf: "center", marginBottom: hp(2) },
            ]}
          >{`${moreInfoItem?.chapter_name} ${moreInfoItem?.verse_key}`}</Text>
          <Text style={styles.arabicText}>{moreInfoItem?.text_uthmani}</Text>
          <Text style={styles.translation}>
            {moreInfoItem?.translations[0].text
              .replace(/[^\x00-\x7F]/g, " ")
              .replace(/\<[^\]]*\>/, "")
              .replace(/\s\s+/g, " ")}
          </Text>
          <TouchableOpacity
            style={styles.bookmark}
            onPress={() => saveBookmark()}
          >
            <Image
              source={require("../assets/bookmark.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

export default QuranInfo;

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
    left: wp(32),
    paddingLeft: wp(5),
    textAlign: "center",
    fontFamily: "Amiri_700Bold",
    fontSize: hp(3.6),
    color: "white",
  },
  tracker: {
    backgroundColor: "#460687",
    borderRadius: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  trackerText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  arabicText: {
    fontFamily: "Scheherazade_700Bold",
    color: "white",
    fontSize: hp(3),
    writingDirection: "rtl",
    marginBottom: hp(1),
  },
  translation: {
    fontFamily: "Poppins_600SemiBold",
    color: "white",
    fontSize: hp(2.2),
  },
  bookmark: {
    width: wp(6),
    height: hp(4),
    alignSelf: "flex-end",
  },
});
