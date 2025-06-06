import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import ForgotPassword from "./src/screens/ForgotPassword";
import EditProfile from "./src/screens/EditProfile";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <EditProfile />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
