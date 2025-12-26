import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import FoodForm from '../components/FoodForm';
import SleepForm from '../components/SleepForm';
import DiaperForm from '../components/DiaperForm';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const openForm = (formType) => {
    setActiveForm(formType);
    setModalVisible(true);
  };

  const closeForm = () => {
    setModalVisible(false);
    setActiveForm(null);
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'food':
        return <FoodForm onClose={closeForm} />;
      case 'sleep':
        return <SleepForm onClose={closeForm} />;
      case 'diaper':
        return <DiaperForm onClose={closeForm} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby Monitor</Text>
      <Text style={styles.subtitle}>Track your baby's daily activities</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.foodButton]}
          onPress={() => openForm('food')}
        >
          <Text style={styles.buttonIcon}>🍼</Text>
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.sleepButton]}
          onPress={() => openForm('sleep')}
        >
          <Text style={styles.buttonIcon}>😴</Text>
          <Text style={styles.buttonText}>Sleep</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.diaperButton]}
          onPress={() => openForm('diaper')}
        >
          <Text style={styles.buttonIcon}>🧷</Text>
          <Text style={styles.buttonText}>Diaper</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>{renderForm()}</ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  foodButton: {
    backgroundColor: '#FFE5B4',
  },
  sleepButton: {
    backgroundColor: '#E6E6FA',
  },
  diaperButton: {
    backgroundColor: '#B4E5FF',
  },
  buttonIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
});
