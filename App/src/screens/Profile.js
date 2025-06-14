import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../constants/styles";
import { AppColors } from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NavBar from "../components/NavBar";

const Profile = ({ navigation }) => {
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
      <View style={AppStyles.container}>
        <View style={styles.header}>
          <View>
            <Icon style={styles.avatarContainer} name="account-circle" size={80} color={AppColors.PRIMARY} />
          </View>
          <View style={styles.statisticContainer}>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>10</Text>
              <Text style={styles.statisticValue}>AUCTS</Text>
            </View>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>40</Text>
              <Text style={styles.statisticValue}>BIDS</Text>
            </View>
            <View style={styles.statisticInfo}>
              <Text style={styles.statisticValue}>5</Text>
              <Text style={styles.statisticValue}>WON</Text>
            </View>
          </View>
          <Pressable style={styles.configIcon}>
            <Icon name="cog" size={40} color={AppColors.PRIMARY} />
          </Pressable>
        </View>
        <View>
          <Text style={styles.title}>Name</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <NavBar />
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
  statisticInfo:{
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
    gap:15,
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

  });

export default Profile;
