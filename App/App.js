import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Auction from "./src/screens/Auction";
import CreateAuction from "./src/screens/CreateAuction";
import EditProfile from "./src/screens/EditProfile";
import Feed from "./src/screens/Feed";
import ForgotPassword from "./src/screens/ForgotPassword";
import History from "./src/screens/History";
import Profile from "./src/screens/Profile";
import Search from "./src/screens/Search";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Welcome from "./src/screens/Welcome";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auction" component={Auction} />
          <Stack.Screen name="CreateAuction" component={CreateAuction} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
