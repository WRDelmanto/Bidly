import { AppColors } from "./colors.js";
import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    color: "Black",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
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
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  button: {
    backgroundColor: AppColors.PRIMARY,
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
});

export { AppStyles };
