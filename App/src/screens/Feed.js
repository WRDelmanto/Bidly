import { View, Image, StyleSheet } from "react-native";
import NavBar from "../components/Navbar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";

import { useEffect } from 'react';

const Feed = () => {
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
