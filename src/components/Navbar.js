import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavBar = () => {
  return (
    <View style={styles.navbar}>
      <Icon name="home"
        size={30}
        onPress={() => console.log('Home clicked')}
      />
      <Icon
        name="search" size={30}
        onPress={() => console.log('Search clicked')}
      />
      <Icon
        name="add-box" size={30}
        onPress={() => console.log('Add Auction clicked')}
      />
      <Icon name="gavel"
        size={30}
        style={{ transform: [{ rotateY: '180deg' }] }}
        onPress={() => console.log('History clicked')}
      />
      <Icon
        name="person"
        size={30}
        onPress={() => console.log('Profile clicked')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20
  },
});

export default NavBar;
