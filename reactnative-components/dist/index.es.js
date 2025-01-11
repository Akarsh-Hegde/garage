import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Pressable } from 'react-native';

const Button = ({ label, onPress }) => {
    return (React.createElement(TouchableOpacity, { style: styles$3.button, onPress: onPress },
        React.createElement(Text, { style: styles$3.text }, label)));
};
const styles$3 = StyleSheet.create({
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
    return (React.createElement(View, { style: styles$2.card },
        React.createElement(Text, { style: styles$2.title }, title),
        React.createElement(Text, { style: styles$2.content }, content)));
};
const styles$2 = StyleSheet.create({
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

const WeatherWidget = ({ location, temperature, description }) => (React.createElement(View, { style: styles$1.widgetContainer },
    React.createElement(View, { style: styles$1.iconContainer },
        React.createElement(Text, null, "\u26C5")),
    React.createElement(View, { style: styles$1.weatherContent },
        React.createElement(Text, { style: styles$1.weatherTitle },
            "Weather Update: ",
            location),
        React.createElement(Text, { style: styles$1.temperature },
            temperature,
            "\u00B0C"),
        React.createElement(Text, { style: styles$1.description }, description))));
const styles$1 = StyleSheet.create({
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
    const [expanded, setExpanded] = useState(false);
    const displayedMedicines = expanded
        ? medicines
        : medicines.slice(0, initialVisibleItems);
    const renderItem = ({ item }) => (React.createElement(View, { style: styles.row },
        React.createElement(Text, { style: styles.medicineText }, item.name),
        React.createElement(View, { style: styles.verticalDivider }),
        React.createElement(Text, { style: styles.doseText }, item.dose)));
    const renderHeader = () => (React.createElement(View, { style: styles.headerContainer },
        React.createElement(View, { style: styles.header },
            React.createElement(Text, { style: styles.headerText }, "Medicine"),
            React.createElement(View, { style: styles.headerVerticalDivider }),
            React.createElement(Text, { style: styles.headerText }, "Dose"))));
    return (React.createElement(View, { style: styles.container },
        renderHeader(),
        React.createElement(FlatList, { data: displayedMedicines, renderItem: renderItem, keyExtractor: (item, index) => `${item.name}-${index}`, scrollEnabled: false, ItemSeparatorComponent: () => React.createElement(View, { style: styles.separator }) }),
        medicines.length > initialVisibleItems && (React.createElement(Pressable, { onPress: () => setExpanded(!expanded), style: styles.seeMoreContainer },
            React.createElement(Text, { style: styles.seeMoreText }, expanded ? 'See less' : 'See more')))));
}
const styles = StyleSheet.create({
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

export { Button, Card, MedicineList, WeatherWidget };
//# sourceMappingURL=index.es.js.map
