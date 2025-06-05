// App.js
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Feed from "./src/screens/Feed";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ForgotPassword from "./src/screens/ForgotPassword";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Feed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
