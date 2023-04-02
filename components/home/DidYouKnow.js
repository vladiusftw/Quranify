import {
  Image,
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
import React, { useEffect, useState } from "react";
import { info } from "../../info";

const DidYouKnow = () => {
  const [data, setData] = useState([...info]);
  const getRandomContent = () => {
    const index2 = Math.floor(Math.random() * data.length);
    const temp = data;
    setContent(temp.splice(index2, 1)[0]);
    setData([...temp]);
    if (data.length == 0) setData([...info]);
  };

  const [content, setContent] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  onContentSizeChange = (contentWidth, contentHeight) => {
    setContentHeight(contentHeight);
  };
  useEffect(() => {
    getRandomContent();
  }, []);
  return (
    <ScrollView
      style={{ marginTop: hp(2.5), height: hp(49.5) }}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={contentHeight > hp(49.5)}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/last-read-bg.png")}
          style={styles.bgImg}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(1),
          }}
        >
          <Text style={styles.title}>Did You Know?</Text>
          <TouchableOpacity
            style={styles.reset}
            onPress={() => getRandomContent()}
          >
            <Image
              source={require("../../assets/reset-white.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.content}>
          {content.split("<b>").map((item, index) => {
            if (index % 2 == 0) return <Text key={index}>{item}</Text>;
            else
              return (
                <Text
                  style={{ fontFamily: "Poppins_700Bold", fontSize: hp(2) }}
                  key={index}
                >
                  {item}
                </Text>
              );
          })}
        </Text>
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
    color: "#EEEEEE",
    fontSize: hp(2.8),
  },
  content: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: hp(1.8),
    lineHeight: 30,
    marginTop: hp(1),
  },
  reset: {
    width: wp(10),
    height: hp(5),
    position: "absolute",
    right: 0,
  },
});
