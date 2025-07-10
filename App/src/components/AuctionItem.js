import { View, Text, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AuctionItem = ({ auction, onPress, won }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.auctionItem}>
                {Array.isArray(auction.images) && auction.images[0] ? (
                    <Image
                        source={{ uri: auction.images[0] }}
                        style={{ width: 80, height: 80, borderRadius: 100 }}
                    />
                ) : (
                    <Icon name="account-circle" size={80} />
                )}
                <View style={styles.auctionInfo}>
                    <Text>{auction.title}</Text>
                    <Text>{auction.description}</Text>
                </View>
            </View>
            {won && (
                <View style={{ position: 'absolute', top: 20, right: 0 }}>
                    <Icon name="star" size={20} color={"#FFD700"} />
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    auctionItem: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderTopColor: "#000000",
        borderTopWidth: 0.5,
        paddingVertical: 10,
    },
    auctionInfo: {
        display: "flex",
        marginStart: 6,
        flexDirection: "column",
        justifyContent: "center",
        gap: 10
    },
});

export default AuctionItem;
