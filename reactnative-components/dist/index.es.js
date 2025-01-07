import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const Button = ({ label, onPress }) => {
    return (React.createElement(TouchableOpacity, { style: styles$2.button, onPress: onPress },
        React.createElement(Text, { style: styles$2.text }, label)));
};
const styles$2 = StyleSheet.create({
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
    return (React.createElement(View, { style: styles$1.card },
        React.createElement(Text, { style: styles$1.title }, title),
        React.createElement(Text, { style: styles$1.content }, content)));
};
const styles$1 = StyleSheet.create({
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

const WeatherWidget = ({ location, temperature, description }) => (React.createElement(View, { style: styles.widgetContainer },
    React.createElement(View, { style: styles.iconContainer },
        React.createElement(Text, null, "\u26C5")),
    React.createElement(View, { style: styles.weatherContent },
        React.createElement(Text, { style: styles.weatherTitle },
            "Weather Update: ",
            location),
        React.createElement(Text, { style: styles.temperature },
            temperature,
            "\u00B0C"),
        React.createElement(Text, { style: styles.description }, description))));
const styles = StyleSheet.create({
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

export { Button, Card, WeatherWidget };
//# sourceMappingURL=index.es.js.map
