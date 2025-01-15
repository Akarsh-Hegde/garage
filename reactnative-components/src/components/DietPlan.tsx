import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

interface FoodItem {
  id: string;
  name: string;
  nutrients: string[];
  benefits: string[];
  imageUrl?: string;
  allergyWarnings?: string[];
  mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  sensoryConsiderations?: string[];
  texture: 'smooth' | 'crunchy' | 'mixed' | 'soft';
}

interface DietPlanProps {
  mealPlans: FoodItem[];
}

export default function DietPlanComponent({
  mealPlans,
}: DietPlanProps) {
  const groupedMeals = mealPlans.reduce((acc, item) => {
    if (!acc[item.mealTime]) {
      acc[item.mealTime] = [];
    }
    acc[item.mealTime].push(item);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  const renderFoodItem = (item: FoodItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.foodItem}
    >
      {/* {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.foodImage}
          resizeMode="cover"
        />
      )} */}
      
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>
          {item.name}
        </Text>
        {item.imageUrl && (
            <Image
            source={{ uri: item.imageUrl }}
            style={styles.foodImage}
            resizeMode="cover"
            />
        )}
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.texture}</Text>
        </View>

        <View style={styles.sensoryInfo}>
          <Text style={styles.sectionTitle}>
            Sensory Considerations:
          </Text>
          {item.sensoryConsiderations?.map((consideration, index) => (
            <Text
              key={index}
              style={styles.sensoryText}
            >
              • {consideration}
            </Text>
          ))}
        </View>

        {item.allergyWarnings && (
          <View style={styles.allergyWarnings}>
            <Text style={styles.warningText}>
              ⚠️ Allergy Alert: {item.allergyWarnings.join(', ')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedMeals).map(([mealTime, foods]) => (
        <View key={mealTime} style={styles.mealSection}>
          <Text style={styles.mealTimeTitle}>
            {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}
          </Text>
          {foods.map(renderFoodItem)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAF5FF',
    borderRadius:16
  },
  mealSection: {
    marginBottom: 20,
  },
  mealTimeTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#553C9A',
    fontFamily: 'Manrope-Bold',
  },
  foodItem: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginVertical:10
  },
  badge: {
    backgroundColor: '#007bff', // Blue background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15, // Rounded corners
    alignSelf: 'flex-start', // Wrap content width
  },
  badgeText: {
    color: '#fff', // White text
    fontSize: 14,
    fontWeight: '600', // Semi-bold text
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333333',
    fontFamily: 'Manrope-Bold'
  },
  textureLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333333',
    fontFamily: 'Manrope-SemiBold'
  },
  sensoryInfo: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Manrope-Bold',
    marginBottom: 2,
    color: '#333333',
  },
  sensoryText: {
    fontSize: 12,
    marginLeft: 8,
    color: '#333333',
    fontFamily: 'Manrope-Bold'
  },
  allergyWarnings: {
    marginTop: 4,
    padding: 4,
    backgroundColor: '#FFE0E0',
    borderRadius: 4,
  },
  warningText: {
    color: '#D32F2F',
    fontSize: 12,
    fontFamily: 'Manrope-Regular'
  },
});