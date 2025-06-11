import { View, Image, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feed = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        console.log('User data:', jsonValue);
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (error) {
        console.error('Error reading user data:', error);
      }
    };

    getUserData()
  }, []);

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
