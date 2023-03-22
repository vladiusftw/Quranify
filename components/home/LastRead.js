import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LastRead = () => {
  return (
    <TouchableOpacity style={styles.container}>
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
      <Text style={styles.chapter}>Al-Fatihah</Text>
      <Text style={styles.verseNum}>Ayah No: 1</Text>
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
    color: "white",
    fontSize: hp(1.4),
  },
  chapter: {
    fontFamily: "Poppins_600SemiBold",
    color: "white",
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