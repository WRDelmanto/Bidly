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
  text: {
    fontSize: 15,
    marginBottom: 0,
    marginTop: 0,
    color: "Black",
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
  backLogin: {
    textAlign: "left",
    fontSize: 16,
    color: AppColors.PRIMARY,
    fontWeight: "bold",
    marginLeft: 10,
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
  newAccount: {
    textAlign: "center",
    marginTop: 40,
    color: AppColors.PRIMARY,
    fontSize: 20,
  },
  backText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,

    marginRight: 20,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  editProfileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  profileIcon: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  imageLamp: {
    width: 70,
    height: 80,
    borderRadius: 10,
    marginTop: 35,
    marginEnd: 30,
    alignSelf: "left",
  },
  forgot: {
    textAlign: "right",
    marginEnd: 50,
    marginTop: 15,
    color: AppColors.PRIMARY,
  },
});

export { AppStyles };
