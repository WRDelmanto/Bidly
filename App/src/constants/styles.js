import { Colors } from "./colors.js";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
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
    color: "Black",
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
    color: Colors.PRIMARY,
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  newAccount: {
    textAlign: "center",
    marginTop: 40,
    color: Colors.PRIMARY,
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
  forgot: {
    textAlign: "right",
    marginEnd: 50,
    color: Colors.PRIMARY,
  },
});

export { Styles };
