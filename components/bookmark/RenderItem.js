import { useNavigation } from "@react-navigation/native";
import React, { useState, memo, useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
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

const RenderItem = ({ item, index, type, setBookmarkItem, setIsVisible2 }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: hp(1.5),
        borderBottomColor: "rgba(123, 128, 173, 0.35)",
        borderBottomWidth: 1,
        marginBottom: hp(1.5),
      }}
      onPress={() => {
        if (type == "hide")
          navigation.navigate("QuranInfo", {
            page_number: item.page_number,
          });
        else {
          setBookmarkItem(item);
          setIsVisible2(true);
        }
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            color: "#EEEEEE",
            fontSize: hp(1.4),

            width: wp(8),
            textAlign: "center",
            left: wp(1),
            top: hp(1.3),
          }}
        >
          {index + 1}
        </Text>
        <View style={{ marginLeft: wp(4) }}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "#EEEEEE",
              fontSize: hp(1.6),
            }}
          >
            {item.bookmark_name}
          </Text>

          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "#A19CC5",
              fontSize: hp(1.2),
              textTransform: "uppercase",
            }}
          >
            {`verse ${item.verse_number}`}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: "#A44AFF",
          fontSize: hp(1.6),
        }}
      >
        {item.chapter_name}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({});
