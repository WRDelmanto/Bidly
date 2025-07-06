import { Text, Image, View, StyleSheet, TextInput, Pressable, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from "../constants/colors";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Auction = ({ navigation, route }) => {
  const { auction } = route.params;
  const [user, setUser] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [userBid, setUserBid] = useState(null);
  const [bids, setBids] = useState([]);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      //console.log('User data:', userData);
      setUser(userData);

    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getBids = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.BIDS}/${auction._id}`);
      if (response.ok) {
        const bidsData = await response.json();
        setBids(bidsData);
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };
  console.log('Bids:', bids);

  useEffect(() => {
    getUserData();
    getBids();
  }, []);

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount.trim());

    if (!amount || amount <= 0) {
      return Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
    }

    try {
      const response = await fetch(ENDPOINTS.BID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          auction: auction,
          bidder: user
        })
      });

      if (response.ok) {
        const { bid, auction: updatedAuction } = await response.json();
        setBidAmount('');
        setUserBid(bid);
        getBids();
        console.log('Bid successful:', bid);
      } else {
        const errorResponse = await response.json();
        console.log('Place bid failed', errorResponse);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const getHighestBid = () => {
    if (bids.length === 0) return null;
    return bids.reduce((highest, current) =>
      current.amount > highest.amount ? current : highest
    );
  };

  const renderBidItem = ({ item }) => (
    <View style={styles.bidItem}>
      <Text style={styles.bidderName}>
        {item.bidder?.name}
      </Text>
      <Text style={styles.bidAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.bidDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View View style={AppStyles.mainContainer} >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: auction.images[0] }}
          style={styles.mainImage}
        />
        <View style={styles.subStatusBar}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={styles.auctionInfo}>
        <Text>{auction.title}</Text>
        <Text>{auction.description}</Text>
        {userBid && (
          <Text style={styles.userBidText}>Your last bid: ${userBid.amount.toFixed(2)}</Text>
        )}
      </View>
      <View style={styles.bidsSection}>
        <View style={styles.bidsHeader}>
          <Text style={styles.bidsTitle}>All Bids ({bids.length})</Text>
          {getHighestBid() && (
            <Text style={styles.highestBidText}>
              Highest:  <Text style={styles.highestBidValue}>${getHighestBid().amount.toFixed(2)}</Text>
            </Text>
          )}
        </View>
        <FlatList
          data={bids}
          renderItem={renderBidItem}
          keyExtractor={(item) => item._id}
          style={styles.bidsList}
        />
      </View>
      <View style={styles.navbar}>
        <TextInput
          style={styles.bidInput}
          placeholder="$0.00"
          placeholderTextColor="#888"
          value={bidAmount}
          onChangeText={setBidAmount}
        />
        <Pressable
          style={styles.bidButton}
          onPress={handlePlaceBid}
        >
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: '#000000'
  },
  subStatusBar: {
    position: "absolute",
    top: 20,
    left: 12
  },
  mainImage: {
    width: "100%",
    height: "350",
    marginTop: 20,
  },
  auctionInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 20,
    alignItems: "start",
    gap: 8
  },
  navbar: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-around",
    marginTop: 20,
  },
  bidButton: {
    flexGrow: 3,
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bidInput: {
    width: 60,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userBidText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000'
  },
  bidItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff'
  },
  bidderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.PRIMARY,
  },
  bidDate: {
    fontSize: 12,
    color: '#666'
  },
  bidsSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  bidsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bidsList: {
    paddingBottom: 200,
  },
  highestBidText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,

  },
  highestBidValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.PRIMARY,
  },
  bidsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Auction;
