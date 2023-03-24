import React, { memo, useState } from "react";
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

const renderItems = (item, currVerse, setCurrVerse, setIsVisible) => {
  const items = [];
  var content = [];
  for (var i = 0; i < item.verses.length; i++) {
    const item2 = item.verses[i];
    if (item2.verse_number == 1) {
      if (content.length > 0) {
        items.push(<Text key={item2.id + "parent"}>{content}</Text>);
        content = [];
      }
      items.push(
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#460687",
            borderRadius: 10,
            paddingHorizontal: wp(4),
            width: "100%",
            marginBottom: hp(2),
            marginTop: hp(1),
          }}
          key={item2.id + "title"}
        >
          <Text
            style={styles.headerLeft}
          >{`${item2.verses_count} verses`}</Text>
          <Text style={styles.headerTitle}>{item2.chapter_name_arabic}</Text>
          <Text style={styles.headerRight}>{item2.chapter_type}</Text>
        </View>
      );
      if (item2.verse_number == 1 && item2.bismillah_pre) {
        items.push(
          <View
            style={{ alignItems: "center", width: "100%" }}
            key={item2.id + "bism"}
          >
            <Text style={styles.text}>
              {"بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
            </Text>
          </View>
        );
      }
    }
    content.push(
      <Text
        style={[
          styles.text,
          {
            backgroundColor:
              currVerse.verse_key == item2.verse_key
                ? "#460687"
                : "transparent",
          },
        ]}
        key={item2.verse_key}
        onPress={() => {
          setCurrVerse({ page_num: item.id, verse_key: item2.verse_key });
        }}
      >
        {`${item2.text_uthmani} `}

        <Text
          style={{
            textDecorationLine: "underline",
            textDecorationColor: "#460687",
            textDecorationStyle: "double",
            textAlign: "center",
          }}
        >
          {`( ${item2.verse_number} )`}
        </Text>
        <Text> </Text>
      </Text>
    );
  }
  items.push(<Text key={item.id + "parent"}>{content}</Text>);
  items.push(
    <View
      style={{ width: "100%", alignItems: "center", marginBottom: hp(2) }}
      key={item.id + "page_num"}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/border.png")}
          style={{
            width: wp(10),
            height: hp(5),
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            position: "absolute",
            fontFamily: "Poppins_500Medium",
            color: "white",
            fontSize: hp(1.4),

            width: wp(8),
            textAlign: "center",
            left: wp(1),
            top: hp(1.3),
          }}
        >
          {item.id}
        </Text>
      </View>
    </View>
  );
  return items;
};

const Page = ({ item, index, currVerse, setCurrVerse, setIsVisible }) => {
  return (
    <View style={styles.container}>
      {renderItems(item, currVerse, setCurrVerse, setIsVisible)}
    </View>
  );
};

const areEqual = (prevProps, nextProps) => {
  const { item, currVerse } = nextProps;
  const { item: item2, currVerse: currVerse2 } = prevProps;

  /*if the props are equal, it won't update*/
  if (item != item2) return false;
  if (
    currVerse != currVerse2 &&
    (item.id == currVerse.page_num || item.id == currVerse2.page_num)
  )
    return false;
  return true;
};

export default memo(Page, areEqual);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    marginBottom: hp(0.5),
    flexDirection: "row-reverse",
    flexWrap: "wrap",
  },
  headerLeft: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    textTransform: "uppercase",
    fontSize: hp(1.2),
  },
  headerTitle: {
    fontFamily: "Amiri_700Bold",
    color: "white",
    fontSize: hp(3.2),
  },
  headerRight: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    textTransform: "uppercase",
    fontSize: hp(1.2),
  },
  text: {
    fontFamily: "Scheherazade_700Bold",
    color: "white",
    fontSize: hp(2.8),
    writingDirection: "rtl",
    lineHeight: 50,
  },
});
