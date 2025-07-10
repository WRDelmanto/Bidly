import { Text, Image, View, StyleSheet, TextInput, Pressable, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from "../constants/colors";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BidItem from "../components/BidItem";

const Auction = ({ navigation, route }) => {
  const { auction: initialAuction } = route.params;
  const [auction, setAuction] = useState(initialAuction);
  const [user, setUser] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);

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

  const fetchAuction = async () => {
    try {
      const response = await fetch(ENDPOINTS.AUCTION(auction._id));
      if (response.ok) {
        const updatedAuction = await response.json();
        // console.log("Auction:", updatedAuction);
        setAuction(updatedAuction);
      }
    } catch (error) {
      console.error('Error fetching auction:', error);
    }
  };

  const getBids = async () => {
    try {
      const response = await fetch(ENDPOINTS.BIDS(auction._id));
      if (response.ok) {
        const bidsData = await response.json();
        // console.log('Bids:', bids);
        setBids(bidsData);
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  useEffect(() => {
    getUserData();
    fetchAuction();
    getBids();
  }, []);

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount.trim());

    if (!amount || amount <= 0) {
      return Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
    }

    try {
      const response = await fetch(ENDPOINTS.BID(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          auctionId: auction._id,
          userId: user._id
        })
      });

      if (response.ok) {
        const { bid: newBid, auction: updatedAuction, user: updatedUser } = await response.json();
        getBids();

        setAuction(updatedAuction);
        setUser(updatedUser)

        AsyncStorage.setItem('user', JSON.stringify(updatedUser));

        setBidAmount('');

        // console.log('Bid successful:', bid);
        // console.log('Updated auction:', updatedAuction);
      } else {
        const errorResponse = await response.json();
        console.log('Place bid failed', errorResponse);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const handleCloseAuction = async () => {
    try {
      const response = await fetch(ENDPOINTS.CLOSE_AUCTION(auction._id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const updatedAuction = await response.json();
        setAuction(updatedAuction);
        console.log('Auction closed successfully:', updatedAuction);
      } else {
        const errorResponse = await response.json();
        console.log('Close auction failed', errorResponse);
      }
    } catch (error) {
      console.error('Error closing auction:', error);
    }
  }

  return (
    <View View style={AppStyles.mainContainer} >
      <View style={styles.imageContainer}>
        {auction.images ? (
          <Image
            source={{ uri: auction.images[0] }}
            style={styles.mainImage}
          />
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 350 }}>
            <Icon name="hide-image"
              size={100}
              color={"lightgray"}
            />
          </View>
        )}
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
      </View>
      {auction?.highestBid && (
        <View style={styles.highestBid}>
          <Text style={styles.bidsTitle}>Highest Bid:</Text>
          <BidItem bid={auction?.highestBid} />
        </View>
      )}
      {bids.length > 0 && (
        <View style={styles.bidsSection}>
          <Text style={styles.bidsTitle}>Bids: {bids.length}</Text>
          <FlatList
            data={bids}
            renderItem={({ item: bid }) => (
              <BidItem bid={bid} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
      {auction.isClosed ? (
        <View style={styles.navbar}>
          <Text style={styles.bidClosed}>Bids Closed</Text>
        </View>
      )
        : auction.seller === user?._id ? (
          <View style={styles.navbar}>
            <Pressable
              style={styles.bidButton}
              onPress={handleCloseAuction}
            >
              <Text style={styles.bidButtonText}>Close Auction</Text>
            </Pressable>
          </View>
        ) : (
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
        )
      }
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
  highestBid: {
    marginTop: 20,
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
  bidClosed: {
    fontSize: 16,
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
  bidsSection: {
    flex: 1,
    marginTop: 20,
    marginBottom: 60,
  },
  bidsTitle: {
    fontSize: 14,
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
});

export default Auction;
