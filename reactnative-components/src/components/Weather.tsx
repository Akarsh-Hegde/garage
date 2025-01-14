import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface WeatherWidgetProps {
    location: string;
    temperature: number;
    description: string;
  }

const WeatherWidget: React.ComponentType<WeatherWidgetProps> = ({ location, temperature, description }) => (
  <View style={styles.widgetContainer}>
    <View style={styles.iconContainer}>
      <Text>⛅</Text>
    </View>
    <View style={styles.weatherContent}>
      <Text style={styles.weatherTitle}>Weather Update: {location}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export const styles = StyleSheet.create({
    widgetContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
      width:'100%'
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#cc99ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    weatherContent: {
      backgroundColor: '#4299e1',
      padding: 16,
      borderRadius: 8,
      flex: 1,
      width:'100%'
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
  
export default WeatherWidget;