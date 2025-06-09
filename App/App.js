import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Welcome from "./src/screens/Welcome";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ForgotPassword />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
