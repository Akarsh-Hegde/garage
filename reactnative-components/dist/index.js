'use strict';

var React = require('react');
var reactNative = require('react-native');

const Button = ({ label, onPress }) => {
    return (React.createElement(reactNative.TouchableOpacity, { style: styles$3.button, onPress: onPress },
        React.createElement(reactNative.Text, { style: styles$3.text }, label)));
};
const styles$3 = reactNative.StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

const Card = ({ title, content }) => {
    return (React.createElement(reactNative.View, { style: styles$2.card },
        React.createElement(reactNative.Text, { style: styles$2.title }, title),
        React.createElement(reactNative.Text, { style: styles$2.content }, content)));
};
const styles$2 = reactNative.StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: '#555',
    },
});

const WeatherWidget = ({ location, temperature, description }) => (React.createElement(reactNative.View, { style: styles$1.widgetContainer },
    React.createElement(reactNative.View, { style: styles$1.iconContainer },
        React.createElement(reactNative.Text, null, "\u26C5")),
    React.createElement(reactNative.View, { style: styles$1.weatherContent },
        React.createElement(reactNative.Text, { style: styles$1.weatherTitle },
            "Weather Update: ",
            location),
        React.createElement(reactNative.Text, { style: styles$1.temperature },
            temperature,
            "\u00B0C"),
        React.createElement(reactNative.Text, { style: styles$1.description }, description))));
const styles$1 = reactNative.StyleSheet.create({
    widgetContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        width: '100%'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4299e1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    weatherContent: {
        backgroundColor: '#4299e1',
        padding: 16,
        borderRadius: 8,
        flex: 1,
        width: '100%'
    },
    weatherTitle: {
        color: '#fff',
        fontSize: 16,
    },
    temperature: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
    },
});

function MedicineList({ medicines, initialVisibleItems = 3, }) {
    const [expanded, setExpanded] = React.useState(false);
    const displayedMedicines = expanded
        ? medicines
        : medicines.slice(0, initialVisibleItems);
    const renderItem = ({ item }) => (React.createElement(reactNative.View, { style: styles.row },
        React.createElement(reactNative.Text, { style: styles.medicineText }, item.name),
        React.createElement(reactNative.View, { style: styles.verticalDivider }),
        React.createElement(reactNative.Text, { style: styles.doseText }, item.dose)));
    const renderHeader = () => (React.createElement(reactNative.View, { style: styles.headerContainer },
        React.createElement(reactNative.View, { style: styles.header },
            React.createElement(reactNative.Text, { style: styles.headerText }, "Medicine"),
            React.createElement(reactNative.View, { style: styles.headerVerticalDivider }),
            React.createElement(reactNative.Text, { style: styles.headerText }, "Dose"))));
    return (React.createElement(reactNative.View, { style: styles.container },
        renderHeader(),
        React.createElement(reactNative.FlatList, { data: displayedMedicines, renderItem: renderItem, keyExtractor: (item, index) => `${item.name}-${index}`, scrollEnabled: false, ItemSeparatorComponent: () => React.createElement(reactNative.View, { style: styles.separator }) }),
        medicines.length > initialVisibleItems && (React.createElement(reactNative.Pressable, { onPress: () => setExpanded(!expanded), style: styles.seeMoreContainer },
            React.createElement(reactNative.Text, { style: styles.seeMoreText }, expanded ? 'See less' : 'See more')))));
}
const styles = reactNative.StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerContainer: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
        textAlign: 'center',
    },
    headerVerticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e5e5e5',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e5e5e5',
        marginHorizontal: 8,
    },
    medicineText: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
    },
    doseText: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e5e5',
    },
    seeMoreContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    seeMoreText: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '400',
    },
});

exports.Button = Button;
exports.Card = Card;
exports.MedicineList = MedicineList;
exports.WeatherWidget = WeatherWidget;
//# sourceMappingURL=index.js.map
