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
import { Amiri_700Bold } from "@expo-google-fonts/amiri";
import { Scheherazade_700Bold } from "@expo-google-fonts/scheherazade";
import { SafeAreaView, Text } from "react-native";
import Quran from "./pages/Quran";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Amiri_700Bold,
    Scheherazade_700Bold,
  });
  if (!fontsLoaded)
    return (
      <SafeAreaView>
        <Text>loading...</Text>
      </SafeAreaView>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Quran" component={Quran} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
