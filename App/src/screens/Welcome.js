import { Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppColors } from "../constants/colors.js";
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#FFFFFF', AppColors.PRIMARY, '#000000']}
      locations={[0, 0.25, 1]}
      style={styles.welcomeContainer}
    >
      <Text style={styles.title}>BIDLY</Text>
      <Text style={styles.subTitle}>Smart Bid, Silent Auction!</Text>
      <Icon
        name="gavel"
        size={180}
        style={styles.gavelIcon}
      />
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowRadius: 4,
    marginTop: 128,
  },
  subTitle: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  gavelIcon: {
    color: "#FFFFFF",
    transform: [{ rotateY: '180deg' }],
    opacity: 0.9,
    marginTop: 64,
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 50,
    opacity: 0.95,
    marginTop: 128
  },
  buttonText: {
    color: AppColors.PRIMARY,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Welcome;
