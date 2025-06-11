import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";

const Welcome = ({ navigation }) => {
  return (
    // <Text
    //   style={{
    //     textAlign: "center",
    //     textAlignVertical: "center",
    //     flex: 1,
    //   }}
    // >
    //   This is the Welcome Screen
    // </Text>
    <View style={styles.welcomeContainer}>
      <View style={AppStyles.welcome}>
        <Text style={styles.title}>BIDLY</Text>
        <Text style={AppStyles.subTitle}>Smart Bid, Silent Auction!</Text>
      </View>
      <View>
        <Icon name="gavel" size={150} color="black" style={styles.bidIcon} />
        {/* <Image source={require("../../assets/bid3.jpg")} style={styles.image} /> */}
      </View>
      <Pressable onPress={() => console.log("Get Started Pressed")}>
        <Icon
          name="play-circle-outline"
          size={150}
          color="black"
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
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: AppColors.PRIMARY,
    textAlign: "center",
  },
  bidIcon: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  // image: {
  //   width: 230,
  //   height: 180,
  //   borderRadius: 10,
  //   marginTop: 30,
  //   marginEnd: 30,
  //   alignSelf: "center",
  // },
});

export default Welcome;
