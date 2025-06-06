import { View, Image, StyleSheet } from "react-native";
import NavBar from "../components/Navbar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";

const Feed = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.mainImage} />
      <FeedAuctionInfo />
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
    width: "100%"
  }
});

export default Feed;
