import React from 'react';
import { View, Text, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';W

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
  deadline,
  setDeadline,
}) => {
  if (!isVisible) return null;


  const handleCancel = () => {
    setTitle('');
    setNewAnnouncement('');
    setPriority('Low');
    setDeadline(new Date());
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
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#FF9C01' }}>New Announcement</Text>

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
              placeholder="Write your announcement here"
              value={newAnnouncement}
              onChangeText={setNewAnnouncement}
              multiline
              number of lines={4}
            />

            {/*Handle priority selection here*/}

            <View
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 5,
                marginBottom: 16,
                backgroundColor: '#e0e0e0',
              }}
            >
              <Picker
                selectedValue={priority}
                onValueChange={(itemValue) => setPriority(itemValue)}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>

            {/*Handle deadline selection here*/}

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
