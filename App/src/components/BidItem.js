import { View, Text, StyleSheet, Image } from "react-native";
import { AppColors } from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BidItem = ({ bid }) => {
    return (
        <View style={styles.bidItem}>
            <View style={styles.bidderInfo}>
                {bid?.bidder?.picture ? (
                    <Image
                        source={{ uri: bid?.bidder?.picture }}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                ) : (
                    <Icon name="account-circle" size={40} />
                )}
                <Text style={styles.bidderName}>
                    {bid.bidder?.name}
                </Text>
            </View>
            <Text style={styles.bidAmount}>${bid.amount.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bidItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#ffffff'
    },
    bidderInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    bidderName: {
        fontSize: 16,
    },
    bidAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppColors.PRIMARY,
    },
});

export default BidItem;
