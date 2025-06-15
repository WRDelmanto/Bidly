import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <Icon
        name="home"
        size={30}
        onPress={() => navigation.navigate('Feed')}
      />
      <Icon
        name="search"
        size={30}
        onPress={() => navigation.navigate('Search')}
      />
      <Icon
        name="add-box"
        size={30}
        onPress={() => navigation.navigate('CreateAuction')}
      />
      <Icon name="gavel"
        size={30}
        style={{ transform: [{ rotateY: '180deg' }] }}
        onPress={() => navigation.navigate('History')}
      />
      <Icon
        name="person"
        size={30}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 100,
    borderTopColor: "#000000",
    borderTopWidth: 0.5,
  },
});

export default NavBar;
