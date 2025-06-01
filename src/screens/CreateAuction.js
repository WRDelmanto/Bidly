import { Text, View, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateAuction = () => {
  return (
    <View>
      <View style={styles.subStatusBar}>
        <View style={styles.subStatusBarArrowContainer}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={() => console.log('Arrow back clicked')}
          />
          <Text>New Auction</Text>
        </View>
        <Text onPress={() => { console.log('Publish clicked') }}>Publish</Text>
      </View>
      <View style={styles.userInfo}>
        <Icon
          name="account-circle"
          size={30}
          onPress={() => console.log('Arrow back clicked')}
        />
        <Text>Name</Text>
      </View>
      <View style={styles.auctionInfo}>
        <View>
          <Text style={styles.label}>Pictures</Text>
          <TextInput
            style={styles.input}
            placeholder="Add picture"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Description"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
            multiline={true}
          />
        </View>
        <View>
          <Text style={styles.label}>Duedate</Text>
          <TextInput
            style={styles.input}
            placeholder="31 Jun, 2025"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Starting bid</Text>
          <TextInput
            style={styles.input}
            placeholder="$0.00"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subStatusBar: {
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  subStatusBarArrowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  userInfo: {
    marginHorizontal: 20,
    marginTop: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  auctionInfo: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 8
  },
  label: {
    marginStart: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 16,
    padding: 12
  },
  descriptionInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 16,
    padding: 12,
    textAlignVertical: 'top',
    textAlign: 'start'
  }
});

export default CreateAuction;
