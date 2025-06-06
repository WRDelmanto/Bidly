import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
