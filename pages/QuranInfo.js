import React, { useState } from "react";
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

const QuranInfo = ({ navigation }) => {
  const [currItem, setCurrItem] = useState(data[0]);
  const [currVerse, setCurrVerse] = useState({
    page_num: 0,
    verse_key: "0:0",
  });
  const [isVisible, setIsVisible] = useState(false);
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
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
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
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Page
            item={item}
            index={index}
            currVerse={currVerse}
            setCurrVerse={setCurrVerse}
            setIsVisible={setIsVisible}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
      />
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
    width: wp(6),
    height: hp(2),
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
});
