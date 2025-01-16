import React, { useState } from 'react';
import {  ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField } from '../components';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createMeeting } from '../lib/appwrite';

const CreateMeetings = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // For showing/hiding the modal

  const handleDateConfirm = (date) => {
    setForm({ ...form, dueDate: date });
    setDatePickerVisible(false); // Hide the date picker modal after selecting a date
  };

  const handleCreateMeeting = async () => {
    if (!form.title || !form.description) {
      return Alert.alert("Please provide both title and description");
    }
  
    setUploading(true);
  
    try {
      // Convert due date to the correct format for Appwrite (ISO 8601 format)
      const dueDate = form.dueDate.toISOString();
  
      // Directly pass the priority as an integer
      await createMeeting(form.title, form.description,  form.dueDate);
  
      Alert.alert("Success", "Task created successfully!");
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the task.");
    } finally {
      setUploading(false);
      setForm({
        title: "",
        description: "",
        dueDate: new Date(),
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="px-4 my-6 flex-1">
        <Text className="text-2xl text-white font-psemibold">Create Meeting</Text>
  
        <FormField
          title="Meeting Title"
          value={form.title}
          placeholder="Enter the meeting title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
  
        <FormField
          title="Description"
          value={form.description}
          placeholder="Enter the meeting description"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Date</Text>
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center">
              <Text className="text-gray-100 font-pmedium">
                {form.dueDate ? form.dueDate.toLocaleString() : "Select Date & Time"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
  
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={form.dueDate}
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
  
        <CustomButton
          title="Create Meeting"
          handlePress={handleCreateMeeting}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMeetings;
