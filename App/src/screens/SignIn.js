import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { AppStyles } from "../constants/styles.js";
import { AppColors } from "../constants/colors.js";

const SignIn = () => {
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
        />
      </View>
      <View style={AppStyles.inputContainer}>
        <Icon name="lock-outline" size={20} color={AppColors.PRIMARY} />
        <TextInput
          style={AppStyles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable onPress={() => {}}>
        <Text style={styles.forgot}>Forgot Password ?</Text>
      </Pressable>
      <View>
        <Pressable style={AppStyles.button} onPress={() => {}}>
          <Text style={AppStyles.buttonText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => {}}>
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
