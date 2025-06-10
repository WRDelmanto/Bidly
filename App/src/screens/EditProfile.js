import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";
import { useState } from "react";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={AppStyles.container}>
      <View style={styles.editProfile}>
        <Pressable onPress={() => {}}>
          <Icon name="arrow-left" size={35} color={AppColors.PRIMARY} />
        </Pressable>
        <Text style={styles.editProfileTitle}>Edit Profile</Text>
        <Pressable onPress={() => {}}>
          <Icon name="check" size={35} color="green" />
        </Pressable>
      </View>

      <Icon
        name="account-circle"
        size={150}
        color="black"
        style={styles.profileIcon}
      />
      <Text style={styles.text}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={AppStyles.textInput}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Text style={styles.text}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={AppStyles.textInput}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Text style={styles.text}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={AppStyles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.text}>Confirm Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={AppStyles.textInput}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    color: AppColors.PRIMARY,
  },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginRight: 20,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  editProfileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 15,
    marginBottom: 0,
    marginTop: 0,
    color: "Black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default EditProfile;
