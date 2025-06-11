import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";
import { ENDPOINTS } from "../constants/api.js";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <View style={AppStyles.container}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={styles.imageContainer}
      />
      <View style={AppStyles.welcome}>
        <Text style={AppStyles.title}>Hello!</Text>
        <Text style={AppStyles.subTitle}>Welcome to Bidly!!</Text>
      </View>

      {/* Form login*/}
      <Text style={AppStyles.title}>Sign In </Text>
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
      <Pressable onPress={() => { }}>
        <Text style={styles.forgot}>Forgot Password ?</Text>
      </Pressable>
      <View>
        <Pressable
          style={[AppStyles.button, isLoading && styles.disabledButton]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={AppStyles.buttonText}>
            {isLoading ? "Signing In..." : "Login"}
          </Text>
        </Pressable>
        <Pressable onPress={() => { }}>
          <Text style={styles.newAccount}>
            Don't have account? <Text> Sign Up</Text>
          </Text>
        </Pressable>

        {/*To decide if use or no the icon*/}
        {/* <Icon name="gavel" size={150} color="black" style={styles.bidIcon} /> */}
        {/* <Image source={require("../../assets/bid3.jpg")} style={styles.image} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forgot: {
    textAlign: "right",
    marginEnd: 50,
    marginTop: 15,
    color: AppColors.PRIMARY,
  },
  newAccount: {
    textAlign: "center",
    marginTop: 40,
    color: AppColors.PRIMARY,
  },
  imageContainer: {
    width: 70,
    height: 80,
    borderRadius: 10,
    marginTop: 35,
    marginEnd: 30,
    alignSelf: "left",
  },
  disabledButton: {
    opacity: 0.7,
  },
  //   bidIcon: {
  //     alignSelf: "center",
  //     marginTop: 50,
  //     marginBottom: 20,
  //   },
  //   image: {
  //     width: 250,
  //     height: 180,
  //     borderRadius: 10,
  //     marginTop: 25,
  //     marginEnd: 30,
  //     alignSelf: "center",
  //   },
});
export default SignIn;
