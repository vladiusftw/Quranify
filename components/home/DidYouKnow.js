import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";

const DidYouKnow = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.";
  const [contentHeight, setContentHeight] = useState(0);
  onContentSizeChange = (contentWidth, contentHeight) => {
    setContentHeight(contentHeight);
  };
  return (
    <ScrollView
      style={{ marginTop: hp(2), height: hp(45) }}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={contentHeight > hp(45)}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/last-read-bg.png")}
          style={styles.bgImg}
        />
        <Text style={styles.title}>Did You Know?</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
  );
};

export default DidYouKnow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#460687",
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    overflow: "hidden",
  },
  bgImg: {
    width: wp(63),
    height: hp(14),
    resizeMode: "contain",
    position: "absolute",
    right: wp(0),
    bottom: hp(-0.5),
    opacity: 0.2,
  },
  title: {
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    color: "white",
    fontSize: hp(2.8),
  },
  content: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: hp(1.6),
    lineHeight: 24,
    marginTop: hp(1),
  },
});
