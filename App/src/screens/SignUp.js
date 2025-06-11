import { Text, View, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { useState } from "react";
import { AppColors } from "../constants/colors.js";
import { AppStyles } from "../constants/styles.js";
import { ENDPOINTS } from "../constants/api.js";
import { StyleSheet } from "react-native";

const SignUp = () => {
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
      Alert.alert("Success", "Account created successfully!");
      // TODO: Navigate to login or home screen

    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={AppStyles.container}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={styles.imageContainer}
      />
      {/* Form Sign Up*/}
      <View style={styles.backLoginContainer}>
        <Pressable onPress={() => { }}>
          <Icon name="arrow-left" size={24} />
        </Pressable>
        <Text style={styles.backLogin}>Back to signin</Text>
      </View>
      <Text style={AppStyles.title}>Sign UP</Text>
      <View style={AppStyles.inputContainer}>
        <Icon name="account" size={24} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />
      </View>
      <View style={AppStyles.inputContainer}>
        <Icon name="email-outline" size={24} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />
      </View>
      <View style={AppStyles.inputContainer}>
        <Icon name="lock-outline" size={20} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
      </View>
      <View style={AppStyles.inputContainer}>
        <Icon name="lock-outline" size={20} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!isLoading}
        />
      </View>

      <View>
        <Pressable
          style={[AppStyles.button, isLoading && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={AppStyles.buttonText}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backLogin: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 10,
  },
  backLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 25,
    marginEnd: 30,
    alignSelf: "left",
  },
  disabledButton: {
    opacity: 0.7,
  },
});
export default SignUp;
