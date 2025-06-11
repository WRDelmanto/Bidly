import { View, Image, StyleSheet, Text } from "react-native";
import NavBar from "../components/NavBar";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AppStyles } from "../constants/styles";

const Profile = ({ navigation }) => {
  const handleLogoff = () => {
    console.log("Logging off...");

    const deleteUserData = async (user) => {
      try {
        await AsyncStorage.removeItem('user');
      } catch (error) {
        console.error('Error deleting  user data:', error);
      }
    };

    deleteUserData()
  };

  return (
    <View style={AppStyles.container}>
      <Image
        style={styles.imageContainer}
        source={require("../../assets/motorcycle.jpg")}
        resizeMode="contain"
      />
      <View style={styles.profileInfo}>
        <Icon
          name="account-circle"
          size={30}
          onPress={() => console.log("Profile clicked")}
        />
        <Text>Bid</Text>
        <Text>Title</Text>
        <Text>Description</Text>
        <View style={styles.dateContainer}>
          <Icon name="calendar-today" size={30} />

          <Text>Due Date</Text>
        </View>
        <Icon
          name="logout"
          size={30}
          onPress={handleLogoff}
        />
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "50%",
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    position: "absolute",
    bottom: 60,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 12,
    alignItems: "start",
    paddingHorizontal: 20,
    gap: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    margemBottom: 20,
  },
});

export default Profile;
