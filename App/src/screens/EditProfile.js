import { Text, View, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(null);

  const populateUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');

      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

      setUser(userData)
      setName(userData.name)
      setEmail(userData.email)
      setPicture(userData.picture || null)
    } catch (error) {
      console.error('Error reading user data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    populateUserInfo();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    });
  }, []);

  const handleArrowBack = () => {
    if (name !== user.name || email !== user.email) {
      Alert.alert(
        "Warning",
        "Are you sure you want to go back? Your changes will be lost.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Exit",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  }

  const handleSave = async () => {
    await handleSaveUserInfo();
    await handleSavePassword();

    navigation.goBack();
  };

  const handleSaveUserInfo = async () => {
    if (name === user.name && email === user.email && picture === (user.picture || null)) {
      return;
    }

    if (!name) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${ENDPOINTS.EDIT_PROFILE}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          picture,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Save failed');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSavePassword = async () => {
    if (!password && !confirmPassword) {
      navigation.goBack();
      return;
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

      const response = await fetch(`${ENDPOINTS.CHANGE_PASSWORD}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Save failed');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].base64 ? `data:image/jpeg;base64,${result.assets[0].base64}` : result.assets[0].uri);
    }

    handleSaveUserInfo();
  };

  return (
    <View style={AppStyles.mainContainer}>
      <View style={styles.subStatusBar}>
        <View style={styles.subStatusBarArrowContainer}>
          <Icon
            name="arrow-left"
            size={30}
            onPress={handleArrowBack}
          />
        </View>
        <Text onPress={handleSave}>{isLoading ? 'Saving...' : 'Save'}</Text>
      </View>
      <TouchableOpacity onPress={pickImage} disabled={isLoading} style={{ alignItems: "center" }}>
        {picture ? (
          <Image
            source={{ uri: picture }}
            style={{ width: 150, height: 150, borderRadius: 100, marginTop: 20, marginBottom: 20 }}
          />
        ) : (
          <Icon name="account-circle" size={150} style={styles.profileIcon} />
        )}
      </TouchableOpacity>
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
          placeholder="New Password"
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
    </View>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "black",
  },
  subStatusBar: {
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  subStatusBarArrowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  text: {
    fontSize: 15,
    marginBottom: 0,
    marginTop: 0,
    color: "Black",
  },
});

export default EditProfile;
