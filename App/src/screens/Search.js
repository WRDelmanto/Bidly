import { View } from "react-native";
import NavBar from "../components/NavBar";
import { AppStyles } from "../constants/styles";

const Search = ({ navigation }) => {
  return (
    <View style={AppStyles.mainContainer}>
      <NavBar navigation={navigation} />
    </View>
  );
};

export default Search;
