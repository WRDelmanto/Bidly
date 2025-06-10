import { Text, View, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { useState } from "react";
import { AppColors } from "../constants/colors.js";
import { AppStyles } from "../constants/styles.js";
import { StyleSheet } from "react-native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    console.log("Sign Up");
  };

  return (
    <View style={AppStyles.container}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={styles.imageLamp}
      />
      {/* Form Sign Up*/}
      <View style={styles.backText}>
        <Pressable onPress={() => {}}>
          <Icon name="arrow-left" size={24} color={AppColors.PRIMARY} />
        </Pressable>
        <Text style={styles.backLogin}>Back To Login</Text>
      </View>
      <Text style={AppStyles.title}>Sign UP</Text>
      <View style={AppStyles.inputContainer}>
        <Icon name="account" size={24} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={setName}
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
        />
      </View>

      <View>
        <Pressable style={AppStyles.button} onPress={handleSignUp}>
          <Text style={AppStyles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backLogin: {
    textAlign: "left",
    fontSize: 16,
    color: AppColors.PRIMARY,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  imageLamp: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 25,
    marginEnd: 30,
    alignSelf: "left",
  },
});
export default SignUp;
