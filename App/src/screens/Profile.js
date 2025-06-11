import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const handleSignOff = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing off:', error);
    }
  };
  return (
    <Text
      style={{
        textAlign: "center",
        textAlignVertical: "center",
        flex: 1,
      }}
      onPress={handleSignOff}
    >
      This is the Profile Screen
    </Text>
  );
};

export default Profile;
