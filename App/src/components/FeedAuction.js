import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FeedAuction = ({ navigation, auction }) => {
    const insets = useSafeAreaInsets();
    let usableScreenHeight = Dimensions.get('window').height - insets.top - insets.bottom;
    usableScreenHeight = usableScreenHeight - 60; // NavBar height
    usableScreenHeight = usableScreenHeight - 74;

    return (
        <View style={{ height: usableScreenHeight }}>
            {auction.images ? (
                <Image
                    source={{ uri: auction.images[0] }}
                    style={{ width: "100%", height: "100%" }}
                />
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Icon name="hide-image"
                        size={150}
                        color={"lightgray"}
                    />
                </View>
            )}
            <View style={styles.feedAuctionInfo}>
                {auction.seller.picture ? (
                    <Image
                        source={{ uri: auction.seller.picture }}
                        style={{ width: 30, height: 30, borderRadius: 100 }}
                    />
                ) : (
                    <Icon name="account-circle"
                        size={30}
                        onPress={() => console.log(auction.seller + ' clicked')}
                    />
                )}
                <Text>{auction.title}</Text>
                <Text>{auction.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    feedAuctionInfo: {
        position: "absolute",
        bottom: 20,
        left: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        gap: 6,
    }
});

export default FeedAuction;