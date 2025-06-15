import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AuctionItem = ({ auction, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.auctionItem}>
                <Icon
                    name="help-circle-outline"
                    color="gray"
                    size={80}
                />
                <View style={styles.auctionInfo}>
                    <Text>{auction.title}</Text>
                    <Text>{auction.description}</Text>
                </View>
            </View>
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
