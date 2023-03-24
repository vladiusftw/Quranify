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

const Tasbih = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0.88 }}>
        <View style={{ paddingHorizontal: wp(6), paddingTop: hp(1) }}>
          <Text style={styles.title}>Quranify</Text>
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
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={require("../assets/home-icon-grey.png")}
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
          <TouchableOpacity style={styles.tasbih}>
            <Image
              source={require("../assets/tasbih-purple.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dua}
            onPress={() => Alert.alert("Duas Coming Soon!")}
          >
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

export default Tasbih;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040C23",
  },
  bottomBar: {
    flex: 0.12,
    backgroundColor: "#121931",
    justifyContent: "center",
    paddingHorizontal: wp(8),
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
