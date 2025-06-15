import { TextInput, View } from "react-native";
import { AppStyles } from "../constants/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ input, handleSearch }) => {
    return (
        <View style={AppStyles.mainTextInputContainer}>
            <Icon name="search" size={24} />
            <TextInput
                style={[AppStyles.mainTextInputContainerText]}
                placeholder="Search"
                value={input}
                onChangeText={(text) => {handleSearch(text)}}
                autoCorrect={false}
                autoCapitalize="none"
            />
        </View>
    );
}

export default SearchBar;
