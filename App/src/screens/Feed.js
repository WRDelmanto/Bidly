import { View, FlatList } from "react-native";
import NavBar from "../components/NavBar";
import FeedItem from "../components/FeedItem";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINTS } from "../constants/api";

const Feed = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log('User data:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getAuctions = async () => {
    if (!user) return;
    try {
      const cachedAuctions = await AsyncStorage.getItem('auctions');

      if (cachedAuctions) {
        const parsedAuctions = JSON.parse(cachedAuctions)
        setAuctions(parsedAuctions);
        console.log('Auctions loaded from cache:', parsedAuctions.length);
      } else {
        let auctionsArray = [];

        const [currentAuction, nextAuction] = await Promise.all([
          getNextAuction(user._id),
          getNextAuction(user._id)
        ]);

        if (currentAuction) auctionsArray.push(currentAuction);
        if (nextAuction) auctionsArray.push(nextAuction);

        await AsyncStorage.setItem('auctions', JSON.stringify(auctionsArray));

        setAuctions(auctionsArray);
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
    if (!user || isLoading) return null;

    try {
      setIsLoading(true);
      const response = await fetch(ENDPOINTS.FEED(user._id));

      if (response.ok) {
        const auction = await response.json();

        if (auction) return auction;
        else console.log('No auction available');
      } else console.log('Failed to fetch auction');
    } catch (error) {
      console.error('Error fetching auction:', error);
    } finally {
      setIsLoading(false);
    }
    return null;
  }

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length === 0) return;

    const lastViewableItem = viewableItems[viewableItems.length - 1];
    const isLastItemVisible = lastViewableItem.index === auctions.length - 1;

    if (isLastItemVisible && !isLoading) {
      loadNextAuction();
    }
  };

  const loadNextAuction = async () => {
    const nextAuction = await getNextAuction();
    if (nextAuction) {
      const updatedAuctions = [...auctions, nextAuction];
      setAuctions(updatedAuctions);
      await AsyncStorage.setItem('auctions', JSON.stringify(updatedAuctions));
      console.log('Auctions loaded:', updatedAuctions.length);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={auctions}
        style={{ flex: 1, marginBottom: 60 }}
        renderItem={({ item: auction }) => (
          <FeedItem
            key={auction._id}
            auction={auction}
            onPress={() => navigation.navigate('Auction', { auction })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 100,
        }}
      />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Feed;
