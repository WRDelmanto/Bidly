import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={styles.imageLamp}
      />
      {/* Form Sign Up*/}
      <View style={styles.backText}>
        <Icon name="arrow-left" size={24} color="blue" />
        <Text style={styles.backLogin}>BACK TO LOGIN</Text>
      </View>
      <Text style={styles.text}>Sign UP </Text>
      <View style={styles.inputContainer}>
        <Icon name="account" size={24} color="blue" />
        <TextInput style={styles.textInput} placeholder="Name" />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="blue" />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="blue" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="blue" />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry
        />
      </View>

      <View>
        <TouchableOpacity style={styles.btnSignUp} onPress={() => {}}>
          <Text style={styles.btnSignUpText}>Sign Up</Text>
        </TouchableOpacity>

        {/* <Button
           style={styles.btnLogin}
           title="Login"
           color="blue"
           onPress={() => {}}
         /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 20,

    marginVertical: 50,
    color: "blue",
    fontWeight: "bold",
  },

  textInput: { padding: 15 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  backLogin: {
    textAlign: "left",
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
    marginLeft: 10,
  },
  btnSignUp: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
  },
  btnSignUpText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  newAccount: {
    textAlign: "center",
    marginTop: 40,
    color: "blue",
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
