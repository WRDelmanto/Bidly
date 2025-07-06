import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../constants/colors";

const BidItem = ({ item }) => {
    return (
        <View style={styles.bidItem}>
            <Text style={styles.bidderName}>
                {item.bidder?.name || 'Anonymous'}
            </Text>
            <Text style={styles.bidAmount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.bidDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bidItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#ffffff'
    },
    bidderName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bidAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppColors.PRIMARY,
    },
    bidDate: {
        fontSize: 12,
        color: '#666'
    },
});

export default BidItem;
