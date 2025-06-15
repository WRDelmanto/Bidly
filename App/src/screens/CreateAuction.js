import { Text, View, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ENDPOINTS } from "../constants/api.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import { ToastAndroid } from 'react-native';
import { AppStyles } from "../constants/styles.js";

const CreateAuction = ({ navigation }) => {
  const [user, setUser] = useState()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (error) {
        console.error('Error reading user data:', error);
      }
    };

    getUserData()
  }, []);

  const handlePublish = async () => {
    setPublishing(true);

    try {
      const response = await fetch(ENDPOINTS.AUCTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          seller: user
        })
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        console.log('Auction created successfully');
        ToastAndroid.show('Auction created successfully', ToastAndroid.SHORT);
        navigation.goBack()
      } else {
        console.log('Failed to create auction');
      }
    } catch (error) {
      console.error('Error creating auction:', error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <View style={AppStyles.mainContainer}>
      <View style={styles.subStatusBar}>
        <View style={styles.subStatusBarArrowContainer}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text onPress={handlePublish}>Publish</Text>
      </View>
      <View style={styles.userInfo}>
        <Icon
          name="account-circle"
          size={42}
          onPress={() => console.log('Arrow back clicked')}
        />
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.auctionInfo}>
        <View>
          <Text style={styles.label}>Pictures</Text>
          <TextInput
            style={styles.input}
            placeholder="Add picture"
            placeholderTextColor="#888"
            onChangeText={(text) => console.log(text)}
            editable={!publishing}
          />
        </View>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#888"
            onChangeText={(text) => setTitle(text)}
            editable={!publishing}
          />
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Description"
            placeholderTextColor="#888"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            editable={!publishing}
          />
        </View>
      </View>
      {publishing && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )}
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
