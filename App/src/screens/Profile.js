import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { ENDPOINTS } from "../constants/api.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NavBar from "../components/NavBar";
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
      console.log('User data:', userData);
      setUser(userData);
      getAuctions(userData._id);
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const getAuctions = async (userId) => {
    try {
      const response = await fetch(`${ENDPOINTS.AUCTIONS}/${userId}`);

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
          <Icon
            name="account-circle"
            size={80}
          />
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
      </View>
      <View>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
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
    gap: 20,
  },
  statsInfo: {
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
  },
  statsSubText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    color: "Black",
    fontWeight: "bold",
    marginLeft: 8,
  },
  configIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  dropdown: {
    position: "absolute",
    top: 25,
    right: 25,
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
