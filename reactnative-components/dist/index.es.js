import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const Button = ({ label, onPress }) => {
    return (React.createElement(TouchableOpacity, { style: styles$1.button, onPress: onPress },
        React.createElement(Text, { style: styles$1.text }, label)));
};
const styles$1 = StyleSheet.create({
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
    return (React.createElement(View, { style: styles.card },
        React.createElement(Text, { style: styles.title }, title),
        React.createElement(Text, { style: styles.content }, content)));
};
const styles = StyleSheet.create({
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

export { Button, Card };
//# sourceMappingURL=index.es.js.map
