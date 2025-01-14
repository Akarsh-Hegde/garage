import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

const ErrorFallback = () => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorIconContainer}>
        <AlertCircle size={24} color="#7639DE" />
      </View>
      <Text style={styles.errorTitle}>Component Not Found</Text>
      <Text style={styles.errorMessage}>
        I understand what you're asking for, but I don't have the right component for you. I'm working on expanding my capabilities!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E4D4FF',
    alignItems: 'center',
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Manrope-SemiBold',
    lineHeight: 20,
  },
});

export default ErrorFallback;