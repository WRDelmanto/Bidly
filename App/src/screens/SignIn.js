import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { Styles } from "../constants/styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SignIn = () => {
  return (
    <View style={Styles.container}>
      <Image
        source={require("../../assets/lamp.jpg")}
        style={Styles.imageLamp}
      />
      <View style={Styles.welcome}>
        <Text style={Styles.welcome}>Hello!</Text>
        <Text>Welcome to Bidly!!</Text>
      </View>

      {/* Form login*/}

      <Text style={Styles.text}>Sign In </Text>
      <View style={Styles.inputContainer}>
        <Icon name="email-outline" size={24} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <View style={Styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="blue" />
        <TextInput
          style={Styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <Text style={Styles.forgot}>Forgot Password ?</Text>

      <View>
        <TouchableOpacity style={Styles.button} onPress={() => {}}>
          <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={Styles.newAccount}>
          Don't have account? <Text> Sign Up</Text>
        </Text>

        {/* <Icon name="gavel" size={150} color="black" style={styles.bidIcon} /> */}
        {/* <Image source={require("../../assets/bid3.jpg")} style={styles.image} /> */}

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

const stylesLocal = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     padding: 20,
  //     marginRight: 20,
  //     marginLeft: 20,
  //     height: "100%",
  //     width: "100%",
  //   },
  //   text: {
  //     fontSize: 20,
  //     marginTop: 20,
  //     marginVertical: 50,
  //     color: "blue",
  //     fontWeight: "bold",
  //   },
  //   welcome: {
  //     marginTop: 15,
  //     fontSize: 30,
  //   },
  //   textInput: { padding: 15 },
  //   inputContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     height: 50,
  //     width: "90%",
  //     borderColor: "gray",
  //     borderWidth: 1,
  //     marginBottom: 20,
  //     paddingHorizontal: 10,
  //     borderRadius: 10,
  //   },
  // forgot: {
  //   textAlign: "right",
  //   marginEnd: 50,
  //   color: Colors.PRIMARY,
  // },
  //   btnLogin: {
  //     backgroundColor: "blue",
  //     color: "white",
  //     padding: 10,
  //     borderRadius: 15,
  //     alignItems: "center",
  //     marginTop: 30,
  //     width: "90%",
  //   },
  //   btnLoginText: {
  //     color: "white",
  //     textAlign: "center",
  //     fontSize: 18,
  //     fontWeight: "bold",
  //   },
  //   newAccount: {
  //     textAlign: "center",
  //     marginTop: 40,
  //     color: "blue",
  //   },
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
  //   imageLamp: {
  //     width: 70,
  //     height: 70,
  //     borderRadius: 10,
  //     marginTop: 25,
  //     alignSelf: "left",
  //   },
});
export default SignIn;
