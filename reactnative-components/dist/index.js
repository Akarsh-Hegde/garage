'use strict';

var React = require('react');
var reactNative = require('react-native');

const Button = ({ label, onPress }) => {
    return (React.createElement(reactNative.TouchableOpacity, { style: styles$2.button, onPress: onPress },
        React.createElement(reactNative.Text, { style: styles$2.text }, label)));
};
const styles$2 = reactNative.StyleSheet.create({
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
    return (React.createElement(reactNative.View, { style: styles$1.card },
        React.createElement(reactNative.Text, { style: styles$1.title }, title),
        React.createElement(reactNative.Text, { style: styles$1.content }, content)));
};
const styles$1 = reactNative.StyleSheet.create({
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

const WeatherWidget = ({ location, temperature, description }) => (React.createElement(reactNative.View, { style: styles.widgetContainer },
    React.createElement(reactNative.View, { style: styles.iconContainer },
        React.createElement(reactNative.Text, null, "\u26C5")),
    React.createElement(reactNative.View, { style: styles.weatherContent },
        React.createElement(reactNative.Text, { style: styles.weatherTitle },
            "Weather Update: ",
            location),
        React.createElement(reactNative.Text, { style: styles.temperature },
            temperature,
            "\u00B0C"),
        React.createElement(reactNative.Text, { style: styles.description }, description))));
const styles = reactNative.StyleSheet.create({
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

exports.Button = Button;
exports.Card = Card;
exports.WeatherWidget = WeatherWidget;
//# sourceMappingURL=index.js.map
