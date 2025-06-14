import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { AppColors } from "../constants/colors";
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
    <View style={{ flex: 1 }}>
      <View style={AppStyles.mainContainer}>
        <View style={styles.header}>
          <View>
            <Icon style={styles.avatarContainer} name="account-circle" size={80} color={AppColors.PRIMARY} />
          </View>
          <View style={styles.statisticContainer}>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>{user?.stats.createdAuctions}</Text>
              <Text style={styles.statisticValue}>aucts</Text>
            </View>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>{user?.stats.bids}</Text>
              <Text style={styles.statisticValue}>bids</Text>
            </View>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>{user?.stats.wonAuctions}</Text>
              <Text style={styles.statisticValue}>won</Text>
            </View>
          </View>
          <Pressable style={styles.configIcon} onPress={() => setShowDropdown(!showDropdown)}>
            <Icon name="cog" size={40} color={AppColors.PRIMARY} />
          </Pressable>
          {showDropdown && (
            <View style={styles.dropdown}>
              <Pressable style={styles.dropdownItem} onPress={handleEditProfile}>
                <Icon name="account-edit" size={20} color={AppColors.PRIMARY} style={styles.dropdownIcon} />
                <Text style={styles.dropdownText}>Edit Profile</Text>
              </Pressable>
              <Pressable style={styles.dropdownItem} onPress={handleSignOff}>
                <Icon name="logout" size={20} color={AppColors.PRIMARY} style={styles.dropdownIcon} />
                <Text style={styles.dropdownText}>Logoff</Text>
              </Pressable>
            </View>
          )}

        </View>
        <View>
          <Text style={styles.title}>{user?.name}</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  configIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
  },
  statisticInfo: {
    alignItems: "center",
  },
  statisticValue: {
    fontSize: 20,
    fontWeight: "bold",

  },
  statisticContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginLeft: 30,
  },
  title: {
    fontSize: 20,
    color: "Black",
    fontWeight: "bold",
    marginLeft: 20,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
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
    color: AppColors.PRIMARY,
  },

});

export default Profile;
