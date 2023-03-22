import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tasbeeh = () => {
  const [counter, setCounter] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasbeeh</Text>
      <View
        style={{
          flexDirection: "row",
          width: wp(50),
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.number} numberOfLines={1} ellipsizeMode={"middle"}>
          {counter}
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setCounter((prev) => prev + 1)}
        >
          <Image
            source={require("../../assets/add.png")}
            style={styles.button}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setCounter(0)}
        >
          <Image
            source={require("../../assets/reset.png")}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tasbeeh;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontFamily: "Poppins_700Bold",
    color: "white",
    fontSize: hp(2.8),
  },
  number: {
    fontFamily: "Poppins_700Bold",
    color: "white",
    fontSize: hp(3.2),
    width: wp(20),
    textAlign: "right",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#460687",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  button: {
    width: wp(7),
    height: hp(4),
    resizeMode: "contain",
  },
});
