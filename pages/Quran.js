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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import data from "../chapters.json";
import pages from "../quran.json";
import RenderItem from "../components/quran/RenderItem";

const Quran = ({ navigation }) => {
  const [currTab, setCurrTab] = useState("Surah");
  const [search, setSearch] = useState("");

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
            <TouchableOpacity style={styles.bookmark}>
              <Image
                source={require("../assets/bookmark.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Search..."
            style={styles.input}
            placeholderTextColor={"#A19CC5"}
            onChangeText={(newText) => setSearch(newText)}
            keyboardType={currTab == "Surah" ? "default" : "number-pad"}
            returnKeyType={"done"}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(3),
            }}
          >
            <TouchableOpacity
              style={[
                styles.tabContainer,
                {
                  borderBottomColor:
                    currTab == "Surah" ? "#A44AFF" : "rgba(135, 137, 163, 0.1)",
                },
              ]}
              onPress={() => setCurrTab("Surah")}
            >
              <Text style={styles.tab}>Surah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabContainer,
                {
                  borderBottomColor:
                    currTab == "Juz" ? "#A44AFF" : "rgba(135, 137, 163, 0.1)",
                },
              ]}
              onPress={() => setCurrTab("Juz")}
            >
              <Text style={styles.tab}>Juz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabContainer,
                {
                  borderBottomColor:
                    currTab == "Page" ? "#A44AFF" : "rgba(135, 137, 163, 0.1)",
                },
              ]}
              onPress={() => setCurrTab("Page")}
            >
              <Text style={styles.tab}>Page</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: hp(62),
              marginTop: hp(2),
              display: currTab == "Surah" ? "flex" : "none",
            }}
          >
            {currTab == "Surah" ? (
              <FlatList
                data={data.filter((a) =>
                  search.length != 0
                    ? a.name_simple
                        .toLocaleLowerCase()
                        .includes(search.toLowerCase())
                    : a
                )}
                renderItem={({ item, index }) => (
                  <RenderItem item={item} index={index} type={"Surah"} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={8}
              />
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              height: hp(62),
              marginTop: hp(2),
              display: currTab == "Page" ? "flex" : "none",
            }}
          >
            {currTab == "Page" ? (
              <FlatList
                data={pages.filter((a) =>
                  search.length != 0 ? (a.id + "").includes(search) : a
                )}
                renderItem={({ item, index }) => (
                  <RenderItem item={item} index={index} type={"Page"} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={8}
              />
            ) : (
              <></>
            )}
          </View>
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

export default Quran;

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
  bookmark: {
    width: wp(5),
    height: hp(4),
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#A44AFF",
    borderRadius: 5,
    paddingVertical: hp(1.5),
    marginTop: hp(3),
    paddingHorizontal: wp(3),
    color: "#A19CC5",
  },
  tabContainer: {
    flex: 1,
    borderBottomWidth: 3,
    paddingBottom: hp(1),
  },
  tab: {
    fontFamily: "Poppins_500Medium",
    color: "#A19CC5",
    fontSize: hp(1.6),
    width: "100%",
    textAlign: "center",
  },
});
