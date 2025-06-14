import { Text, View, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { AppColors } from "../constants/colors.js";
import { AppStyles } from "../constants/styles.js";
import { ENDPOINTS } from "../constants/api.js";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      if (!name) {
        Alert.alert("Error", "Name is required");
        return;
      }
      if (!email) {
        Alert.alert("Error", "Email is required");
        return;
      }
      if (!password) {
        Alert.alert("Error", "Password is required");
        return;
      }
      if (!confirmPassword) {
        Alert.alert("Error", "Confirm Password is required");
        return;
      }
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Signup successful
      try {
        await AsyncStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving user data:', error);
      }

      navigation.navigate('Feed')

    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <Pressable onPress={() => { navigation.navigate('SignIn') }}>
          <View style={styles.backToSignInContainer}>
            <Icon name="arrow-left" size={24} />
            <Text style={styles.backtoSignInText}>Back to Sign In</Text>
          </View>
        </Pressable>
        <Text style={styles.title}>Sign Up</Text>
        <View style={AppStyles.mainTextInputContainer}>
          <Icon name="account" size={24} color={AppColors.PRIMARY} />
          <TextInput
            style={AppStyles.mainTextInputContainerText}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
          />
        </View>
        <View style={AppStyles.mainTextInputContainer}>
          <Icon name="email-outline" size={24} color={AppColors.PRIMARY} />
          <TextInput
            style={AppStyles.mainTextInputContainerText}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>
        <View style={AppStyles.mainTextInputContainer}>
          <Icon name="lock-outline" size={20} color={AppColors.PRIMARY} />
          <TextInput
            style={AppStyles.mainTextInputContainerText}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
        </View>
        <View style={AppStyles.mainTextInputContainer}>
          <Icon name="lock-outline" size={20} color={AppColors.PRIMARY} />
          <TextInput
            style={AppStyles.mainTextInputContainerText}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
          />
        </View>
        <View>
          <Pressable
            style={[AppStyles.mainButton, isLoading && styles.disabledButton]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={AppStyles.mainButtonText}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Text>
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
  backtoSignInText: {
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
  disabledButton: {
    opacity: 0.7,
  },
});
export default SignUp;
