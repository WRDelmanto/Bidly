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
      {/* Form Sign Up*/}

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

      <Text style={styles.forgot}>Forgot Password ?</Text>

      <View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => {}}>
          <Text style={styles.btnLoginText}>Sign Up</Text>
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
  welcome: {
    marginTop: 40,
    fontSize: 30,
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
  forgot: {
    textAlign: "right",
    marginEnd: 50,
    color: "blue",
  },
  btnLogin: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
  },
  btnLoginText: {
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
  bidIcon: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 10,
    marginTop: 25,
    marginEnd: 30,
    alignSelf: "center",
  },
});
export default SignUp;
