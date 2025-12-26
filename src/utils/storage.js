import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@baby_monitor_records';

export const saveRecord = async (type, data) => {
  try {
    const existingRecords = await getRecords();
    const newRecord = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
      ...data,
    };
    const updatedRecords = [newRecord, ...existingRecords];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return true;
  } catch (error) {
    console.error('Error saving record:', error);
    return false;
  }
};

export const getRecords = async () => {
  try {
    const records = await AsyncStorage.getItem(STORAGE_KEY);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error('Error getting records:', error);
    return [];
  }
};

export const updateRecord = async (id, data) => {
  try {
    const existingRecords = await getRecords();
    const updatedRecords = existingRecords.map((record) =>
      record.id === id ? { ...record, ...data } : record
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return true;
  } catch (error) {
    console.error('Error updating record:', error);
    return false;
  }
};

export const deleteRecord = async (id) => {
  try {
    const existingRecords = await getRecords();
    const updatedRecords = existingRecords.filter((record) => record.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return true;
  } catch (error) {
    console.error('Error deleting record:', error);
    return false;
  }
};
