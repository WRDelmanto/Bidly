import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcome}>Hello!</Text>
        <Text>Welcome to Bidly!!</Text>
      </View>

      {/* Form login*/}

      <Text style={styles.text}>Sign In </Text>
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

      <Text style={styles.forgot}>Forgot Password ?</Text>

      <View>
        <Button title="Login" color="blue" onPress={() => {}} />
      </View>
    </View>

    // <Text
    // style={{
    //   textAlign: "center",
    //   textAlignVertical: "center",
    //   flex: 1,
    // }}
    // >
    //   This is the Sign In Screen
    // </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
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
});
export default SignIn;
