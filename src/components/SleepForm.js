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

export default function SleepForm({ onClose, existingRecord }) {
  const [startTime, setStartTime] = useState(
    existingRecord?.startTime ||
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
  );
  const [endTime, setEndTime] = useState(existingRecord?.endTime || '');

  const handleSave = async () => {
    if (!startTime.trim()) {
      Alert.alert('Error', 'Please enter the start time');
      return;
    }

    const success = await saveRecord('sleep', {
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    });

    if (success) {
      Alert.alert('Success', 'Sleep record saved!');
      onClose();
    } else {
      Alert.alert('Error', 'Failed to save record');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>😴 Sleep Record</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="HH:MM"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>End Time (Optional)</Text>
        <TextInput
          style={styles.input}
          value={endTime}
          onChangeText={setEndTime}
          placeholder="HH:MM - Leave blank to update later"
        />
        <Text style={styles.helpText}>
          Leave blank and update later when baby wakes up
        </Text>
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
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
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
