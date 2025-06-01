import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../constants/colors";

const Auction = () => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.mainImage} />
      <View style={styles.subStatusBar}>
        <Icon
          name="arrow-back"
          style={styles.backButton}
          size={30}
          onPress={() => console.log('Arrow back clicked')}
        />
        <Icon
          name="delete"
          style={styles.deleteButton}
          size={30}
          onPress={() => console.log('Delete clicked')}
        />
      </View>

      <View style={styles.auctionInfo}>
        <Text>Title</Text>
        <Text>Description</Text>
        <View style={styles.dueDateBid}>
          <View style={styles.duedate}>
            <Icon name="event"
              size={30}
              onPress={() => console.log('Home clicked')}
            />
            <Text>Duedate</Text>
          </View>
          <Text>Bid</Text>
        </View>
      </View>
      <View style={styles.bid}>
        <Text>Place Bid</Text>
        <TextInput
          style={styles.input}
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
    position: "relative"
  },
  subStatusBar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mainImage: {
    width: "100%",
    height: "350",
    margintop: 20
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
  dueDateBid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  duedate: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  bid: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    marginHorizontal: 20
  },
  bidButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Auction;
