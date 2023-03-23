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

const RenderItem = ({ item, index, type }) => {
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
        <View style={{ marginLeft: wp(4) }}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "white",
              fontSize: hp(1.6),
            }}
          >
            {type == "Surah" ? item.name_simple : item.verses[0].chapter_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(0.5),
              display: type == "Surah" ? "flex" : "none",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: "#A19CC5",
                fontSize: hp(1.2),
                textTransform: "uppercase",
              }}
            >
              {item.revelation_place}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 50,
                backgroundColor: "rgba(187, 196, 206, 0.35)",
                marginLeft: wp(1),
                marginRight: wp(1),
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: "#A19CC5",
                fontSize: hp(1.2),
                textTransform: "uppercase",
              }}
            >{`${item.verses_count} verses`}</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Amiri_700Bold",
          color: "#A44AFF",
          fontSize: hp(2),
        }}
      >
        {item.name_arabic}
      </Text>
    </TouchableOpacity>
  );
};

const areEqual = (prevProps, nextProps) => {
  const { id } = nextProps;
  const { id: id2 } = prevProps;

  /*if the props are equal, it won't update*/
  const isSelectedEqual = id === id2;

  return isSelectedEqual;
};

export default memo(RenderItem, areEqual);

const styles = StyleSheet.create({});