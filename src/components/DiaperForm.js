import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { saveRecord } from '../utils/storage';

export default function DiaperForm({ onClose }) {
  const [diaperType, setDiaperType] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }));

  const handleSave = async () => {
    if (!diaperType) {
      Alert.alert('Error', 'Please select a diaper type');
      return;
    }

    const success = await saveRecord('diaper', {
      diaperType,
      time,
    });

    if (success) {
      Alert.alert('Success', 'Diaper record saved!');
      onClose();
    } else {
      Alert.alert('Error', 'Failed to save record');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧷 Diaper Change</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="HH:MM"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              diaperType === 'pee' && styles.optionButtonActive,
            ]}
            onPress={() => setDiaperType('pee')}
          >
            <Text
              style={[
                styles.optionText,
                diaperType === 'pee' && styles.optionTextActive,
              ]}
            >
              💧 Pee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              diaperType === 'poop' && styles.optionButtonActive,
            ]}
            onPress={() => setDiaperType('poop')}
          >
            <Text
              style={[
                styles.optionText,
                diaperType === 'poop' && styles.optionTextActive,
              ]}
            >
              💩 Poop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              diaperType === 'both' && styles.optionButtonActive,
            ]}
            onPress={() => setDiaperType('both')}
          >
            <Text
              style={[
                styles.optionText,
                diaperType === 'both' && styles.optionTextActive,
              ]}
            >
              💧💩 Both
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  optionTextActive: {
    color: '#4CAF50',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
