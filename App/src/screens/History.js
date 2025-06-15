import { View } from "react-native";
import NavBar from "../components/NavBar";
import { AppStyles } from "../constants/styles";
import SearchBar from "../components/SearchBar";

const History = ({ navigation }) => {
  return (
    <View style={AppStyles.mainContainer}>
      <SearchBar />
      <NavBar navigation={navigation} />
    </View>
  );
};

export default History;
