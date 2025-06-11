import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles";
import { AppColors } from "../constants/colors.js";

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={AppStyles.container}>
      <Image
        source={require("../../assets/lampOff.jpg")}
        style={styles.imageContainer}
      />
      {/* Form Sign Up*/}
      <View style={styles.backLoginContainer}>
        <Icon name="arrow-left" size={24} color={AppColors.PRIMARY} />
        <Text style={styles.backLogin}>Back To Login</Text>
      </View>
      <Text style={AppStyles.title}>Forgot Password</Text>
      <Text style={AppStyles.subTitle}>Don't worry, we're here to help!!</Text>

      <View style={AppStyles.inputContainer}>
        <Icon name="email-outline" size={24} color="blue" />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <Text style={styles.text}>Enter your registered email address</Text>
      <View>
        <Pressable style={AppStyles.button} onPress={() => {}}>
          <Text style={AppStyles.buttonText}>Reset Password</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  backLogin: {
    textAlign: "left",
    fontSize: 16,
    color: AppColors.PRIMARY,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imageContainer: {
    width: 70,
    height: 90,
    borderRadius: 10,
    marginTop: 25,
    marginEnd: 30,
    alignSelf: "left",
  },
  text: {
    fontSize: 15,

    marginTop: 5,
    color: "Black",
  },
});

export default ForgotPassword;
