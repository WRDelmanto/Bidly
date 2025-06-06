import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { Styles } from "../constants/styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={Styles.container}>
      <View style={Styles.editProfile}>
        <Icon name="arrow-left" size={35} color={Colors.PRIMARY} />
        <Text style={Styles.editProfileTitle}>Edit Profile</Text>
        <Icon name="check" size={35} color="green" />
      </View>

      <Icon
        name="account-circle"
        size={150}
        color="black"
        style={Styles.profileIcon}
      />

      <View style={Styles.inputContainer}>
        <Icon name="account" size={24} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={Styles.inputContainer}>
        <Icon name="email-outline" size={24} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={Styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={Styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    </View>
  );
};

export default EditProfile;
