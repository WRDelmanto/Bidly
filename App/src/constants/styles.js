import { AppColors } from "./colors.js";
import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  mainTextInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "gray",
    marginTop: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  mainTextInputContainerText: {
    padding: 15
  },
  mainButton: {
    backgroundColor: AppColors.PRIMARY,
    color: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  mainButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export { AppStyles };
