import { View } from "react-native";
import NavBar from "../components/NavBar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api";

const Feed = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [auction, setAuction] = useState(null);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('User data:', userData);
      setUser(userData);
      const cachedAuction = await AsyncStorage.getItem('currentAuction');
      if (cachedAuction) {
        setAuction(JSON.parse(cachedAuction));
        console.log('Auction loaded from cache:', cachedAuction);
      } else {
        getNextAuction(userData._id);
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getNextAuction = async (userId) => {
    try {
      const response = await fetch(`${ENDPOINTS.FEED}/${userId}`);

      if (response.ok) {
        const auction = await response.json();
        if (auction) {
          setAuction(auction);
          await AsyncStorage.setItem('currentAuction', JSON.stringify(auction));
          console.log('Auction fetched and cached successfully:', auction);
        } else {
          console.log('No auction available');
        }
      } else {
        console.log('Failed to fetch auction');
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
    }
  }

  useEffect(() => {
    getUserData()
  }, []);

  return (
    <View style={AppStyles.mainContainer}>
      <FeedAuctionInfo navigation={navigation} auction={auction} />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Feed;

