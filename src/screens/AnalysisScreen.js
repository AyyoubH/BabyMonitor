import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRecords, deleteRecord } from '../utils/storage';

export default function AnalysisScreen() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadRecords = async () => {
    const data = await getRecords();
    setRecords(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteRecord(id);
            loadRecords();
          },
        },
      ]
    );
  };

  const getFilteredRecords = () => {
    if (filter === 'all') return records;
    return records.filter((record) => record.type === filter);
  };

  const getRecordIcon = (type) => {
    switch (type) {
      case 'food':
        return '🍼';
      case 'sleep':
        return '😴';
      case 'diaper':
        return '🧷';
      default:
        return '📝';
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderRecord = ({ item }) => {
    let details = '';
    if (item.type === 'food') {
      details = `Amount: ${item.amount} | Time: ${item.time}`;
    } else if (item.type === 'sleep') {
      details = `Start: ${item.startTime}${item.endTime ? ` | End: ${item.endTime}` : ' | Ongoing'}`;
    } else if (item.type === 'diaper') {
      const diaperTypeDisplay = item.diaperType.charAt(0).toUpperCase() + item.diaperType.slice(1);
      details = `Type: ${diaperTypeDisplay} | Time: ${item.time}`;
    }

    return (
      <View style={styles.recordCard}>
        <View style={styles.recordHeader}>
          <View style={styles.recordInfo}>
            <Text style={styles.recordIcon}>{getRecordIcon(item.type)}</Text>
            <View style={styles.recordContent}>
              <Text style={styles.recordType}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Text>
              <Text style={styles.recordDate}>{formatDate(item.timestamp)}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.recordDetails}>{details}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'food' && styles.filterButtonActive]}
          onPress={() => setFilter('food')}
        >
          <Text style={[styles.filterText, filter === 'food' && styles.filterTextActive]}>
            🍼 Food
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'sleep' && styles.filterButtonActive]}
          onPress={() => setFilter('sleep')}
        >
          <Text style={[styles.filterText, filter === 'sleep' && styles.filterTextActive]}>
            😴 Sleep
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'diaper' && styles.filterButtonActive]}
          onPress={() => setFilter('diaper')}
        >
          <Text style={[styles.filterText, filter === 'diaper' && styles.filterTextActive]}>
            🧷 Diaper
          </Text>
        </TouchableOpacity>
      </View>

      {getFilteredRecords().length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No records yet</Text>
          <Text style={styles.emptySubtext}>
            Start tracking your baby's activities from the Home tab
          </Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredRecords()}
          renderItem={renderRecord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recordIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recordContent: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recordDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recordDetails: {
    fontSize: 14,
    color: '#555',
    marginLeft: 36,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
