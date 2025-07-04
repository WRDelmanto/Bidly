import { StyleSheet, View, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeedAuctionInfo = ({ navigation, auction }) => {
    return (
        <View style={styles.feedAuctionInfo}>
            {auction?.seller?.picture ? (
                <Image
                    source={{ uri: auction?.seller?.picture }}
                    style={{ width: 30, height: 30, borderRadius: 100 }}
                />
            ) : (
                <Icon name="account-circle"
                    size={30}
                    onPress={() => console.log(auction?.seller + ' clicked')}
                />
            )}
            <Text>{auction?.title}</Text>
            <Text>{auction?.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    feedAuctionInfo: {
        position: "absolute",
        bottom: 60,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingBottom: 12,
        alignItems: "start",
        paddingHorizontal: 20,
        gap: 8
    }
});

export default FeedAuctionInfo;
