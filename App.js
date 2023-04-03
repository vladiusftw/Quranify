import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Amiri_700Bold, useFonts as useFonts2 } from "@expo-google-fonts/amiri";
import {
  Scheherazade_700Bold,
  Scheherazade_400Regular,
  useFonts as useFonts3,
} from "@expo-google-fonts/scheherazade";
import {
  SafeAreaView,
  Text,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import Quran from "./pages/Quran";
import QuranInfo from "./pages/QuranInfo";
import Tasbih from "./pages/Tasbih";
import { View } from "react-native";
import Settings from "./pages/Settings";
import Bookmark from "./pages/Bookmark";
import MyContext from "./MyContext";

I18nManager.allowRTL(true);

const Stack = createStackNavigator();

export default function App() {
  // fonts imports
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Amiri_700Bold,
    Scheherazade_700Bold,
  });
  const [fontsLoaded2] = useFonts2({
    Amiri_700Bold,
  });
  const [fontsLoaded3] = useFonts3({
    Scheherazade_700Bold,
    Scheherazade_400Regular,
  });

  if (!fontsLoaded || !fontsLoaded2 || !fontsLoaded3)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#040C23",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <MyContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Quran" component={Quran} />
          <Stack.Screen name="QuranInfo" component={QuranInfo} />
          <Stack.Screen name="Tasbih" component={Tasbih} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Bookmark" component={Bookmark} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext>
  );
}
