import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from "../constants/colors";
import { AppStyles } from "../constants/styles";

const Auction = ({ navigation }) => {
  return (
    <View style={AppStyles.mainContainer}>
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
        <Text>Title</Text>
        <Text>Description</Text>
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
          onPress={() => console.log('Place bid clicked')}
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
    left: 20
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
    paddingTop: 12,
    alignItems: "start",
    paddingHorizontal: 20,
    gap: 8
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20
  },
  bidButton: {
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 12,
    width: "65%",
    borderRadius: 8,
    alignItems: 'center'
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bidInput: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Auction;
