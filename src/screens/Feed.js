import { View, Image, StyleSheet } from "react-native";
import NavBar from "../components/Navbar";
import FeedInfoLeft from "../components/FeedInfoLeft";

const Feed = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.mainImage} />
      <FeedInfoLeft />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  mainImage: {
    height: "100%",
    width: "100%",
  }
});

export default Feed;
