import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

interface Medicine {
  name: string;
  dose: string;
  date: Date;
}

interface MedicineListProps {
  medicines: Medicine[];
  initialVisibleItems?: number;
}

export default function MedicineList({
  medicines,
  initialVisibleItems = 3,
}: MedicineListProps) {
  const [expanded, setExpanded] = useState(false);
  
  const displayedMedicines = expanded 
    ? medicines 
    : medicines.slice(0, initialVisibleItems);

  const renderItem = ({ item }: { item: Medicine }) => (
    <View style={styles.row}>
      <Text style={styles.medicineText}>{item.name}</Text>
      <View style={styles.verticalDivider} />
      <Text style={styles.doseText}>{item.dose}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medicine</Text>
        <View style={styles.headerVerticalDivider} />
        <Text style={styles.headerText}>Dose</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={displayedMedicines}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {medicines.length > initialVisibleItems && (
        <Pressable
          onPress={() => setExpanded(!expanded)}
          style={styles.seeMoreContainer}
        >
          <Text style={styles.seeMoreText}>
            {expanded ? 'See less' : 'See more'}
          </Text>
        </Pressable>
      )}
    </View>
  );
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
    width:'100%'
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