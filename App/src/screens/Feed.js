import { View } from "react-native";
import NavBar from "../components/NavBar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";

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
    <View style={AppStyles.mainContainer}>
      <FeedAuctionInfo navigation={navigation} />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Feed;
