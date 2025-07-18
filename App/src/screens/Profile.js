import { Text, View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NavBar from "../components/NavBar";
import AuctionItem from "../components/AuctionItem";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState()
  const [auctions, setAuctions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log('User data:', userData);
      setUser(userData);
      getAuctions(userData._id);
      refreshUserData(userData._id);
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getAuctions = async (userId) => {
    try {
      const response = await fetch(ENDPOINTS.AUCTIONS(userId));

      if (response.ok) {
        const auctions = await response.json();
        setAuctions(auctions);
        console.log('Auctions fetched successfully:', auctions.length);
      } else {
        console.log('Failed to fetch auctions');
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  };

  const refreshUserData = async (userId) => {
    try {
      const response = await fetch(ENDPOINTS.REFRESH_USER(userId));

      if (response.ok) {
        const refreshedUser = await response.json();
        setUser(refreshedUser);
        await AsyncStorage.setItem('user', JSON.stringify(refreshedUser));
        // console.log('User refreshed:', refreshedUser);
      } else {
        console.log('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
    setShowDropdown(false);
  }

  const handleSignOff = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing off:', error);
    }
  };

  return (
    <View style={AppStyles.mainContainer}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.pictureStatsContainer}>
          {user?.picture ? (
            <Image
              source={{ uri: user.picture }}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
          ) : (
            <Icon name="account-circle" size={80} />
          )}
          <View style={styles.statsContainer}>
            <View style={styles.statsInfo}>
              <Text style={styles.statsText}>{user?.stats.createdAuctions}</Text>
              <Text style={styles.statsSubText}>aucts</Text>
            </View>
            <View style={styles.statsInfo}>
              <Text style={styles.statsText}>{user?.stats.bids}</Text>
              <Text style={styles.statsSubText}>bids</Text>
            </View>
            <View style={styles.statsInfo}>
              <Text style={styles.statsText}>{user?.stats.wonAuctions}</Text>
              <Text style={styles.statsSubText}>won</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
      </View>
      <FlatList
        data={auctions}
        style={styles.flatList}
        renderItem={({ item: auction }) => (
          <AuctionItem
            key={auction._id}
            auction={auction}
            onPress={() => navigation.navigate('Auction', { auction })}
          />
        )}
      />
      <Pressable
        style={styles.configIcon}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Icon
          name="cog"
          size={28}
        />
      </Pressable>
      {showDropdown && (
        <View style={styles.dropdown}>
          <Pressable style={styles.dropdownItem} onPress={handleEditProfile}>
            <Icon
              name="account-edit"
              size={20}
              style={styles.dropdownIcon}
            />
            <Text style={styles.dropdownText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.dropdownItem} onPress={handleSignOff}>
            <Icon name="logout"
              size={20}
              style={styles.dropdownIcon}
            />
            <Text style={styles.dropdownText}>Logoff</Text>
          </Pressable>
        </View>
      )}
      <NavBar navigation={navigation} />
    </View >
  );
};

const styles = StyleSheet.create({
  profileInfoContainer: {
    flexDirection: 'column',
  },
  pictureStatsContainer: {
    width: "70%",
    flexDirection: "row",
    alignContent: "left"
  },
  statsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  statsInfo: {
    alignItems: "center",
  },
  statsText: {
    fontSize: 20,
  },
  statsSubText: {
    fontSize: 16,
  },
  userName: {
    fontSize: 20,
    color: "Black",
    fontWeight: "bold",
    marginLeft: 8,
    marginBottom: 12,
  },
  flatList: {
    marginBottom: 40,
  },
  configIcon: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  dropdown: {
    position: "absolute",
    top: 45,
    right: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default Profile;
