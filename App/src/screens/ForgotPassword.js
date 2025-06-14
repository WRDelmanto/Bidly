import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.backToSignInContainer}>
            <Icon name="arrow-left" size={24} />
            <Text style={styles.backToSignInText}>Back to SignIn</Text>
          </View>
        </Pressable>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subTitle}>Don't worry, we're here to help!</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0096FF99",
  },
  cardContainer: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    marginTop: 150,
    paddingHorizontal: 32,
  },
  backToSignInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  backToSignInText: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 10,
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    color: "Black",
    fontWeight: "bold",
  },
  subTitle: {
    marginBottom: 12,
  },
  helpText: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
});

export default ForgotPassword;
