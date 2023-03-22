import React, { useState } from "react";
import {
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
import LastRead from "../components/home/LastRead";
import Tasbeeh from "../components/home/Tasbeeh";
var moment = require("moment-hijri");
moment.locale("en");

const Home = () => {
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
        <View style={{ paddingHorizontal: wp(6) }}>
          <Text style={styles.title}>Quranify</Text>
          <Text style={styles.date}>
            {date.toLocaleDateString("en-us", { weekday: "long" })}
          </Text>
          <Text style={styles.hijri}>{`${moment().format("iD")} ${
            months[moment().format("iM")]
          } ${moment().format("iYYYY")} AH`}</Text>
          <LastRead />
          <Tasbeeh />
        </View>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: hp(-2),
          }}
        >
          <TouchableOpacity style={styles.home}>
            <Image
              source={require("../assets/home-icon-purple.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.quran}>
            <Image
              source={require("../assets/quran-icon-grey.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dua}>
            <Image
              source={require("../assets/dua-icon-grey.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
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
    paddingHorizontal: wp(12),
  },
  home: {
    width: wp(12),
    height: hp(6),
  },
  quran: {
    width: wp(12),
    height: hp(6),
  },
  dua: {
    width: wp(10),
    height: hp(6),
  },
  title: {
    fontFamily: "Poppins_700Bold",
    color: "white",
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
    color: "white",
    fontSize: hp(2.4),
  },
});
