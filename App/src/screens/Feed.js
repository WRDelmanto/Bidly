import { View } from "react-native";
import NavBar from "../components/NavBar";
import FeedAuctionInfo from "../components/FeedAuctionInfo";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api";

const Feed = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState(0);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('User data:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getAuctions = async () => {
    if (!user) return;
    try {
      const cachedAuctions = await AsyncStorage.getItem('auctions');
      const cachedIndex = await AsyncStorage.getItem('currentAuctionIndex');

      let auctionsArray = [];

      if (cachedAuctions) {
        const parsedAuctions = JSON.parse(cachedAuctions)
        setAuctions(parsedAuctions);
        console.log('Auctions loaded from cache:', parsedAuctions);

        if (cachedIndex !== null) {
          setCurrentAuctionIndex(parseInt(cachedIndex));
        }
      } else {
        const [currentAuction, nextAuction] = await Promise.all([
          getNextAuction(user._id),
          getNextAuction(user._id)
        ]);
        if (currentAuction) auctionsArray.push(currentAuction);
        if (nextAuction) auctionsArray.push(nextAuction);
        await AsyncStorage.setItem('auctions', JSON.stringify(auctionsArray));
        setAuctions(auctionsArray);
        setCurrentAuctionIndex(0);
        await AsyncStorage.setItem('currentAuctionIndex', '0');
      }
    } catch (error) {
      console.error('Error loading auctions:', error);
    }
  };

  useEffect(() => {
    getUserData()
  }, []);

  useEffect(() => {
    getAuctions()
  }, [user]);

  const getNextAuction = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.FEED}/${user._id}`);
      if (response.ok) {
        const auction = await response.json();
        if (auction) {
          console.log('Auction fetched:', auction);
          return auction;
        } else {
          console.log('No auction available');
        }
      } else {
        console.log('Failed to fetch auction');
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
    }
    return null;
  }

  return (
    <View style={AppStyles.mainContainer}>
      <FeedAuctionInfo navigation={navigation} auction={auctions[currentAuctionIndex]} />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Feed;

