import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

export interface Medicine {
  name: string;
  dose: string;
  date?: Date;
}

interface MedicineManagerProps {
  initialMedicines: Medicine[];
  initialVisibleItems?: number;
  onMedicineAdded?: (medicine: Medicine) => void;
}

export default function MedicineManager({
  initialMedicines = [],
  initialVisibleItems = 3,
  onMedicineAdded,
}: MedicineManagerProps) {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    name: '',
    dose: '',
  });
  
  const displayedMedicines = expanded 
    ? medicines 
    : medicines.slice(0, initialVisibleItems);

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dose) {
      const medicineToAdd = {
        ...newMedicine,
        date: new Date(),
      };
      setMedicines([...medicines, medicineToAdd]);
      onMedicineAdded?.(medicineToAdd);
      setNewMedicine({ name: '', dose: '' });
      setModalVisible(false);
    }
  };

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
    <View style={styles.full}>
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

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add Medication</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Medication</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={newMedicine.name}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Dose (e.g., 100mg)"
              value={newMedicine.dose}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, dose: text })}
            />

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.addButton]}
                onPress={handleAddMedicine}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    full: {
        width:'100%'
    },
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
    // width:'100%',
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
    // fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
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
    fontFamily: 'Manrope-Bold',
  },
  doseText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
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
    fontFamily: 'Manrope-Bold',
  },
  addButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
});