import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskModal = ({ isVisible, onClose, selectedUsers }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <ScrollView>
          {selectedUsers.map((user, index) => (
            <View key={index} style={styles.userRow}>
              <Icon name="user" size={24} color="#555" style={styles.userIcon} />
              <Text style={styles.userName}>{user}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    maxHeight: '70%',
    position: 'absolute'
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  userIcon: {
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#FF9C01',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TaskModal;
