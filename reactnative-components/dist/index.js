'use strict';

var React = require('react');
var reactNative = require('react-native');

const Button = ({ label, onPress }) => {
    return (React.createElement(reactNative.TouchableOpacity, { style: styles$1.button, onPress: onPress },
        React.createElement(reactNative.Text, { style: styles$1.text }, label)));
};
const styles$1 = reactNative.StyleSheet.create({
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
    return (React.createElement(reactNative.View, { style: styles.card },
        React.createElement(reactNative.Text, { style: styles.title }, title),
        React.createElement(reactNative.Text, { style: styles.content }, content)));
};
const styles = reactNative.StyleSheet.create({
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

exports.Button = Button;
exports.Card = Card;
//# sourceMappingURL=index.js.map
