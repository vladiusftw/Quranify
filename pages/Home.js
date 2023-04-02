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
import DidYouKnow from "../components/home/DidYouKnow";
import LastRead from "../components/home/LastRead";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
var moment = require("moment-hijri");
moment.locale("en");

const Home = ({ navigation }) => {
  const date = new Date();
  const months = {
    1: "Muharram",
    2: "Safar",
    3: "Rabi' I",
    4: "Rabi' II",
    5: "Jumada I",
    6: "Jumada II",
    7: "Rajab",
    8: "Sha'ban",
    9: "Ramadan",
    10: "Shawwal",
    11: "Dhu'l-Qi'dah",
    12: "Dhu'l-Hijjah",
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0.88 }}>
        <View style={{ paddingHorizontal: wp(6), paddingTop: hp(1) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Quranify</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[styles.info, { marginRight: wp(3) }]}
                onPress={() =>
                  Alert.alert("Press & hold an ayah for bookmark/translation")
                }
              >
                <Image
                  source={require("../assets/info.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.info}
                onPress={() => navigation.navigate("Settings")}
              >
                <Image
                  source={require("../assets/settings.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.date}>
            {date.toLocaleDateString("en-us", { weekday: "long" })}
          </Text>
          <Text style={styles.hijri}>{`${moment().format("iD")} ${
            months[moment().format("iM")]
          } ${moment().format("iYYYY")} AH`}</Text>
          <LastRead />
          <DidYouKnow />
        </View>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: hp(-2),
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.home}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/home-icon-purple.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quran}
            onPress={() => navigation.navigate("Quran")}
          >
            <Image
              source={require("../assets/quran-icon-grey.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tasbih}
            onPress={() => navigation.navigate("Tasbih")}
          >
            <Image
              source={require("../assets/tasbih.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.dua}
            onPress={() => Alert.alert("Duas Coming Soon!")}
          >
            <Image
              source={require("../assets/dua-icon-grey.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040C23",
  },
  bottomBar: {
    flex: 0.12,
    backgroundColor: "#121931",
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  home: {
    width: wp(12),
    height: hp(6),
  },
  quran: {
    width: wp(12),
    height: hp(6),
  },
  tasbih: {
    width: wp(12),
    height: hp(6),
  },
  dua: {
    width: wp(10),
    height: hp(6),
  },
  title: {
    fontFamily: "Poppins_700Bold",
    color: "#EEEEEE",
    fontSize: hp(2.8),
  },
  date: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(161, 156, 197, 0.8)",
    fontSize: hp(1.8),
    marginTop: hp(2),
  },
  hijri: {
    fontFamily: "Poppins_600SemiBold",
    color: "#EEEEEE",
    fontSize: hp(2.4),
  },
  info: {
    width: wp(7),
    height: hp(4),
  },
});
