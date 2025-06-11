import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles";
import { AppColors } from "../constants/colors.js";
import { useState } from "react";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Email is required.");
      return;
    }
    Alert.alert(
      "Password Reset",
      "Please check your email for further instructions.",
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={AppStyles.mainContainer}>
      <Image
        source={require("../../assets/lampOff.jpg")}
        style={styles.imageContainer}
      />
      {/* Form Sign Up*/}
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.backToSignInContainer}>
          <Icon name="arrow-left" size={24} />
          <Text style={styles.backToSignInText}>Back to SignIn</Text>
        </View>
      </Pressable>
      <Text style={styles.title}>Forgot Password</Text>
      <Text>Don't worry, we're here to help!</Text>

      <View style={AppStyles.mainTextInputContainer}>
        <Icon name="email-outline" size={24} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.mainTextInputContainerText}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Text style={styles.helpText}>Enter your registered email address</Text>
      <View>
        <Pressable style={AppStyles.mainButton} onPress={handleForgotPassword}>
          <Text style={AppStyles.mainButtonText}>Reset Password</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 64,
    height: 64,
  },
  backToSignInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  backToSignInText: {
    textAlign: "left",
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    color: "Black",
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 12,
    marginTop: 6,
  },
});

export default ForgotPassword;
