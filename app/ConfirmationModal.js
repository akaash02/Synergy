import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity } from 'react-native';

const ConfirmationModal = ({ isVisible, onClose, onConfirm, message }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row', // Align buttons horizontally
              marginTop: 20,
              width: '100%', // Ensure buttons take full width
              justifyContent: 'space-between', // Space out buttons
            }}
          >
            <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'black', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onConfirm} style={{ backgroundColor: '#FF9C01', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

