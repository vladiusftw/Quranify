import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
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
import { Audio } from "expo-av";

const QuranInfo = ({ navigation, route }) => {
  const [sound, setSound] = useState();
  const [currItem, setCurrItem] = useState(data[0]);
  const [currVerse, setCurrVerse] = useState({
    page_num: 0,
    verse_key: "0:0",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [moreInfoItem, setMoreInfoItem] = useState();
  const [bookmarks, setBookmarks] = useState();
  const { page_number } = route.params;
  const ref = useRef();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (!isVisible && sound) sound.unloadAsync();
  }, [isVisible]);

  const playSound = async () => {
    if (currVerse.audio != "") {
      const sound2 = new Audio.Sound();
      await sound2.loadAsync({
        uri: moreInfoItem.audio,
      });
      setSound(sound2);
      await sound2.playAsync();
    } else console.log(moreInfoItem);
  };

  const getBookmark = async () => {
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
        <ScrollView style={{ paddingHorizontal: wp(2), maxHeight: hp(60) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: hp(2),
            }}
          >
            <TouchableOpacity style={styles.play} onPress={playSound}>
              <Image
                source={require("../assets/play.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text
              style={[styles.translation]}
            >{`${moreInfoItem?.chapter_name} ${moreInfoItem?.verse_key}`}</Text>
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

          <Text style={styles.arabicText}>{moreInfoItem?.text_uthmani}</Text>
          <Text style={styles.translation}>
            {moreInfoItem?.translations[0].text
              .replace(/[^\x00-\x7F]/g, " ")
              .replace(/\<[^\]]*\>/, "")
              .replace(/\s\s+/g, " ")}
          </Text>
        </ScrollView>
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
    color: "#EEEEEE",
  },
  tracker: {
    backgroundColor: "#460687",
    borderRadius: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  trackerText: {
    color: "#EEEEEE",
    fontFamily: "Poppins_500Medium",
  },
  arabicText: {
    fontFamily: "Scheherazade_700Bold",
    color: "#EEEEEE",
    fontSize: hp(3),
    writingDirection: "rtl",
    marginBottom: hp(1),
  },
  translation: {
    fontFamily: "Poppins_600SemiBold",
    color: "#EEEEEE",
    fontSize: hp(2.2),
  },
  bookmark: {
    width: wp(5),
    height: hp(4),
  },
  play: {
    width: wp(7),
    height: hp(4),
  },
});
