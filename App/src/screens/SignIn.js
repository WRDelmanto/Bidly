import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";
import { ENDPOINTS } from "../constants/api.js";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isServerUp, setIsServerUp] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let intervalId;

      const checkServerHealth = async () => {
        try {
          const response = await fetch(ENDPOINTS.PING);
          const isHealthy = response.ok;
          console.log(`[${new Date().toISOString()}] Server is ${isHealthy ? 'Up' : 'Down'}`);
          setIsServerUp(isHealthy);
        } catch (error) {
          console.error('Failed to check server health:', error);
          setIsServerUp(false);
        }
      };

      // Initial check
      checkServerHealth();

      // Set up interval for continuous checking
      intervalId = setInterval(checkServerHealth, 1000);

      // Cleanup function
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [])
  );

  const handleSignIn = async () => {
    // Validate inputs
    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(ENDPOINTS.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Sign in successful
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
    <View style={AppStyles.mainContainer}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={styles.imageContainer}
      />
      {!isServerUp && (
        <Icon style={styles.serverAlert} name="alert" color={"#FF0000"} size={24} />
      )}
      <View>
        <Text style={styles.title}>Hello</Text>
        <Text>Welcome to Bidly!</Text>
      </View>

      {/* Form login*/}
      <Text style={styles.title}>Sign In</Text>
      <View style={AppStyles.mainTextInputContainer}>
        <Icon name="email-outline" size={24} color={AppColors.PRIMARY} />
        <TextInput
          style={[AppStyles.mainTextInputContainerText]}
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
      <Pressable onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>
      <View>
        <Pressable
          style={[AppStyles.mainButton, isLoading && styles.disabledButton]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={AppStyles.mainButtonText}>
            {isLoading ? "Signing In..." : "Login"}
          </Text>
        </Pressable>
        <Pressable onPress={() => { navigation.navigate('SignUp') }}>
          <Text style={styles.signUp}>
            Don't have account? <Text style={{ textDecorationLine: 'underline' }}>SignUp</Text>
          </Text>
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
  serverAlert: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    color: "Black",
    fontWeight: "bold",
  },
  forgot: {
    textAlign: "right",
    marginTop: 12,
  },
  signUp: {
    textAlign: "center",
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
export default SignIn;
