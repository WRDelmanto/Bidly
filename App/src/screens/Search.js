import { View, FlatList } from "react-native";
import NavBar from "../components/NavBar";
import { AppStyles } from "../constants/styles";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../constants/api";
import AuctionItem from "../components/AuctionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState('');
  const [auctions, setAuctions] = useState([]);

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

  const handleSearch = async (text) => {
    if (!user) return;

    setInput(text)

    try {
      let endpoint = text.trim()
        ? `${ENDPOINTS.SEARCH}/${user._id}/${text.trim()}`
        : `${ENDPOINTS.EMPTY_SEARCH}/${user._id}`;
      const response = await fetch(endpoint);

      if (response.ok) {
        const results = await response.json();
        setAuctions(results);
        console.log('Auctions:', results.length);
      } else {
        console.log('Search failed');
        setAuctions([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setAuctions([]);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    handleSearch('');
  }, [user]);

  return (
    <View style={AppStyles.mainContainer}>
      <SearchBar input={input} handleSearch={handleSearch} />
      <FlatList
        data={auctions}
        renderItem={({ item: auction }) => (
          <AuctionItem
            key={auction._id}
            auction={auction}
            onPress={() => navigation.navigate('Auction', { auction })}
          />
        )}
      />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Search;
