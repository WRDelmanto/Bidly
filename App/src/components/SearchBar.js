import { TextInput, View } from "react-native";
import { AppStyles } from "../constants/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from "react";

const SearchBar = () => {
    const [input, setInput] = useState('')

    return (
        <View style={AppStyles.mainTextInputContainer}>
            <Icon name="search" size={24} />
            <TextInput
                style={[AppStyles.mainTextInputContainerText]}
                placeholder="Search"
                value={input}
                onChangeText={setInput}
            />
        </View>
    );
}

export default SearchBar;
