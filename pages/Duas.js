import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Duas = ({ navigation }) => {
  const [tab, setTab] = useState("category");
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0.88 }}>
        <View style={{ paddingHorizontal: wp(6), paddingTop: hp(1) }}>
          <Text style={styles.title}>Quranify</Text>
          <View style={{ flexDirection: "row", marginTop: hp(2) }}>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    tab == "category"
                      ? "rgba(164, 74, 255, 1)"
                      : "rgba(135, 137, 163, 0.1)",
                },
              ]}
              onPress={() => setTab("category")}
            >
              <Text style={styles.tabText}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    tab == "my duas"
                      ? "rgba(164, 74, 255, 1)"
                      : "rgba(135, 137, 163, 0.1)",
                },
              ]}
              onPress={() => setTab("my duas")}
            >
              <Text style={styles.tabText}>My Duas</Text>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity style={styles.quran}>
            <Image
              source={require("../assets/quran-icon-purple.png")}
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

export default Duas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040C23",
  },
  bottomBar: {
    flex: 0.12,
    backgroundColor: "#121931",
    justifyContent: "center",
    paddingHorizontal: wp(6),
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
  tab: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: hp(1.5),
    borderBottomColor: "rgba(135, 137, 163, 0.1)",
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: hp(1.6),
    color: "#EEEEEE",
  },
});
