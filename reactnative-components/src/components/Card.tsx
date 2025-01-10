import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.ComponentType<CardProps> = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
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

export default Card;
