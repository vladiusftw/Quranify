import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { Slider } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const [font, setFont] = useState({
    fontSize: 0,
    fontFamily: "Scheherazade_700Bold",
  });
  const saveFont = async () => {
    try {
      const jsonValue = JSON.stringify({
        fontSize: font.fontSize,
        fontFamily: font.fontFamily,
      });
      await AsyncStorage.setItem("quranify-font", jsonValue);
    } catch (e) {
      // saving error
      alert("An error has occured!");
    }
  };
  const getFont = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("quranify-font");
      if (jsonValue != null) setFont(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      alert("An error has occured!");
    }
  };

  useEffect(() => {
    getFont();
  }, []);

  useEffect(() => {
    saveFont();
  }, [font]);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
          <Text style={styles.title}>Quran Settings</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: wp(6) }}>
        <Text
          style={[
            styles.text,
            {
              fontSize: hp(2.2) + hp(0.2) * font.fontSize,
              fontFamily: font.fontFamily,
            },
          ]}
        >
          {"بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.labels, { flex: 1 }]}>Font Size</Text>
          <Slider
            value={font.fontSize}
            onValueChange={(value) =>
              setFont({ ...font, ...{ fontSize: value } })
            }
            maximumValue={4}
            minimumValue={0}
            step={1}
            orientation="horizontal"
            thumbStyle={{ height: 20, width: 20, backgroundColor: "#460687" }}
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={[styles.labels, { flex: 1 }]}>Font Weight</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.48,
                backgroundColor: "#460687",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                height: hp(5),
                borderWidth: 1,
                borderColor:
                  font.fontFamily == "Scheherazade_400Regular"
                    ? "#EEEEEE"
                    : "transparent",
              }}
              onPress={() =>
                setFont({
                  ...font,
                  ...{ fontFamily: "Scheherazade_400Regular" },
                })
              }
            >
              <Text style={styles.smallText}>Regular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.48,
                backgroundColor: "#460687",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                height: hp(5),
                borderWidth: 1,
                borderColor:
                  font.fontFamily != "Scheherazade_400Regular"
                    ? "#EEEEEE"
                    : "transparent",
              }}
              onPress={() =>
                setFont({ ...font, ...{ fontFamily: "Scheherazade_700Bold" } })
              }
            >
              <Text style={styles.smallText}>Bold</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040C23",
  },
  topBar: {
    backgroundColor: "#121931",
    paddingVertical: hp(3),
    paddingHorizontal: wp(6),
    marginBottom: hp(1),
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
    fontFamily: "Poppins_600SemiBold",
    fontSize: hp(2.8),
    color: "#EEEEEE",
    position: "absolute",
    left: wp(12.5),
    width: wp(60),
  },
  text: {
    color: "#EEEEEE",
    writingDirection: "rtl",
    lineHeight: 52,
    alignSelf: "center",
  },
  labels: {
    fontFamily: "Poppins_600SemiBold",
    color: "#EEEEEE",
    fontSize: hp(2.2),
  },
  smallText: {
    fontFamily: "Poppins_500Medium",
    color: "#EEEEEE",
    fontSize: hp(1.4),
  },
});
