import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";
import { useState } from "react";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleArrowBack = () => {
    if (name || email || password || confirmPassword) {
      Alert.alert(
        "Warning",
        "Are you sure you want to go back? Your changes will be lost.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Go back",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  }
  const handleSave = async () => {

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
        throw new Error(data.message || 'Save failed');
      }

      // Save successful
      try {
        await AsyncStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving user data:', error);
      }

    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
             <Text onPress={handleSave}>Save</Text>
           </View>

      <Icon
        name="account-circle"
        size={150}
        style={styles.profileIcon}
      />
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
