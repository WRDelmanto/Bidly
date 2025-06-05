import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/lampOff.jpg")}
        style={styles.imageLamp}
      />
      {/* Form Sign Up*/}
      <View style={styles.backText}>
        <Icon name="arrow-left" size={24} color="blue" />
        <Text style={styles.backLogin}>BACK TO LOGIN</Text>
      </View>
      <Text style={styles.textForgot}>Forgot Password</Text>
      <Text style={styles.text}>Don't worry, we're here to help!!</Text>

      <Text>Enter your registered email address</Text>
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="blue" />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      <View>
        <TouchableOpacity style={styles.btnResetPsw} onPress={() => {}}>
          <Text style={styles.btnResetPswText}>Reset Password</Text>
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

    marginBottom: 40,
    marginTop: 0,
  },
  textForgot: {
    fontSize: 30,
    marginVertical: 50,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 20,
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
  btnResetPsw: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
  },
  btnResetPswText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  backText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  imageLamp: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginTop: 40,
    marginEnd: 30,
    alignSelf: "left",
  },
});

export default ForgotPassword;
