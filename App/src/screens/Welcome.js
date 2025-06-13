import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppColors } from "../constants/colors.js";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <View>
        <Text style={styles.title}>BIDLY</Text>
        <Text style={styles.subTitle}>Smart Bid, Silent Auction!</Text>
      </View>
      <View>
        <Icon name="gavel" size={150} color="black" style={styles.bidIcon} />
      </View>
      <Pressable onPress={() => navigation.navigate('SignIn')}>
        <Icon
          name="play-circle-outline"
          size={150}
          color="#000000"
          style={styles.bidIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: AppColors.PRIMARY,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
    color: "Black",
    fontWeight: "bold",
  },
  bidIcon: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    color: AppColors.PRIMARY,
  }
});

export default Welcome;
