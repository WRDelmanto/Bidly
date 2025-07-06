import { Text, View, StyleSheet, TextInput, Alert, ToastAndroid, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ENDPOINTS } from "../constants/api.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { AppStyles } from "../constants/styles.js";
import * as ImagePicker from 'expo-image-picker';

const CreateAuction = ({ navigation }) => {
  const [user, setUser] = useState()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [images, setImages] = useState([]);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  useEffect(() => {
    getUserData()
  }, []);

  const handleArrowBack = () => {
    if (title || description) {
      Alert.alert(
        "Warning",
        "Are you sure you want to go back? Your changes will be lost.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Go back",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  }

  const handlePublish = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Title and Description are required.");
      return;
    }

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
          seller: user,
          images: images
        })
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        console.log('Auction created successfully');
        ToastAndroid.show('Auction created successfully', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        console.log('Failed to create auction');
      }
    } catch (error) {
      console.error('Error creating auction:', error);
    } finally {
      setPublishing(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => `data:image/jpeg;base64,${asset.base64}`)]);
    }
  };

  return (
    <View style={AppStyles.mainContainer}>
      <View style={styles.subStatusBar}>
        <View style={styles.subStatusBarArrowContainer}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={handleArrowBack}
          />
        </View>
        <Text onPress={handlePublish}>Publish</Text>
      </View>
      <View style={styles.userInfo}>
        {user?.picture ? (
          <Image
            source={{ uri: user.picture }}
            style={{ width: 42, height: 42, borderRadius: 100 }}
          />
        ) : (
          <Icon
            name="account-circle"
            size={42}
          />
        )}

        <Text>{user?.name || 'Loading...'}</Text>
      </View>
      <View style={styles.auctionInfo}>
        <View>
          <Text style={styles.label}>Pictures</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="add-a-photo" size={30} onPress={pickImage} />
            <ScrollView horizontal>
              {images.map((uri, idx) => (
                <Image
                  key={idx}
                  source={{ uri }}
                  style={{ width: 60, height: 60, borderRadius: 8, marginHorizontal: 4 }}
                />
              ))}
            </ScrollView>
          </View>
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
    marginStart: 4
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
