import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from "../constants/colors";
import { AppStyles } from "../constants/styles";

const Auction = ({ navigation, route }) => {
  const { auction } = route.params;

  const handlePlaceBid = () => {
    console.log('Place bid clicked')
  };

  return (
    <View View style={AppStyles.mainContainer} >
      <View style={styles.imageContainer}>
        <Image style={styles.mainImage} />
        <View style={styles.subStatusBar}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={styles.auctionInfo}>
        {console.log('Auction data:', auction)}
        <Text>{auction.title}</Text>
        <Text>{auction.description}</Text>
      </View>
      <View style={styles.navbar}>
        <TextInput
          style={styles.bidInput}
          placeholder="$0.00"
          placeholderTextColor="#888"
          onChangeText={(text) => console.log(text)}
        />
        <TouchableOpacity
          style={styles.bidButton}
          onPress={handlePlaceBid}
        >
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: '#000000'
  },
  subStatusBar: {
    position: "absolute",
    top: 20,
    left: 12
  },
  mainImage: {
    width: "100%",
    height: "350",
    marginTop: 20,
  },
  auctionInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 20,
    alignItems: "start",
    gap: 8
  },
  navbar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-around",
    marginTop: 20,
  },
  bidButton: {
    flexGrow: 3,
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bidInput: {
    width: 60,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Auction;
