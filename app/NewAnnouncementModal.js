import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const NewAnnouncementModal = ({
  isVisible,
  onCancel,
  onSubmit,
  newAnnouncement,
  setNewAnnouncement,
  title,
  setTitle,
  priority,
  setPriority,
  //deadline,
  //setDeadline,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isVisible) return null;


  const handleCancel = () => {
    setTitle('');
    setNewAnnouncement('');
    setPriority('Select Priority');
    //setDeadline(new Date());
    onCancel();
  }

  return (
    <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // background blur
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: '30%',
              width: '90%',
              backgroundColor: '#161622',
              borderRadius: 10,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#FF9C01' }}>New Task</Text>

            {/*Title*/}

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 5,
                padding: 8,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#e0e0e0',
              }}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />

            {/*Announcement Content*/}

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 5,
                padding: 8,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#e0e0e0',
              }}
              placeholder="Task Description"
              value={newAnnouncement}
              onChangeText={setNewAnnouncement}
              multiline
              number of lines={4}
            />

            {/*Choose personnel to issue task to*/}

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 5,
                padding: 8,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#e0e0e0',
              }}
              placeholder="Enter username or email"
              //value={newAnnouncement}
              //onChangeText={setNewAnnouncement}
            />

            {/*Handle priority selection here*/}

            <View
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: '#e0e0e0',
              }}
            >
              <DropDownPicker
                open={isDropdownOpen}
                value={priority}
                items={[
                  { label: 'Low', value: 'Low' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'High', value: 'High' },
                ]}
                setOpen={setIsDropdownOpen}
                setValue={setPriority}
                placeholder="Select Priority"
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  marginBottom: 16,
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#e0e0e0',
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                }}
              />
            </View>

            {/*Handle deadline selection here*/}
            {/*
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || deadline;
                setDeadline(currentDate);
              }}
              style={{ marginBottom: 16 }}
            />
*/}
            {/*Action Buttons*/}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f44336',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 5,
                }}
                onPress={handleCancel}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF9C01',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 5,
                }}
                onPress={onSubmit}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NewAnnouncementModal;
