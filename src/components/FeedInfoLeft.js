import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeedInfoLeft = () => {
    return (
        <View style={styles.feedInfoLeft}>
            <Icon name="account-circle"
                size={30}
                onPress={() => console.log('Profile clicked')}
            />
            <Text>Bid</Text>
            <Text>Title</Text>
            <Text>Description</Text>
            <View style={styles.duedate}>
                <Icon name="event"
                    size={30}
                    onPress={() => console.log('Home clicked')}
                />
                <Text style={styles.duedateText}>Duedate</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    feedInfoLeft: {
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
    },
    duedate: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    duedateText: {
        marginStart: 6
    }
});

export default FeedInfoLeft;
