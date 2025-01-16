import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the modal date-time picker
import { CustomButton, FormField } from "../components";
import { createTask, searchUsersByUsername } from "../lib/appwrite"; // Make sure to import the function

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState([]); // To store selected users
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: 1,
    dueDate: new Date(),
    assignees: [], // Array to store selected assignees' accountIds
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // For user search
  const [searchResults, setSearchResults] = useState([]); // List of users from search

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Please enter a username to search");
      return;
    }
  
    try {
      const users = await searchUsersByUsername(searchQuery);
      setSearchResults(users);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  const handleAssignUser = (user) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignees: [...prevForm.assignees, user.accountId], // Add selected user's accountId to assignees
    }));
  
    setAssignedUsers((prevUsers) => [...prevUsers, user]); // Add selected user to the list of assigned users
  };
  

  const handleDateConfirm = (date) => {
    setForm({ ...form, dueDate: date });
    setDatePickerVisible(false); // Hide the date picker modal after selecting a date
  };
  

  const handleCreateTask = async () => {
    if (!form.title || !form.description) {
      return Alert.alert("Please provide both title and description");
    }

    setUploading(true);

    try {
      const dueDate = form.dueDate.toISOString();
      await createTask(form.title, form.description, form.priority, dueDate, form.assignees);
      Alert.alert("Success", "Task created successfully!");
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the task.");
    } finally {
      setUploading(false);
      setForm({
        title: "",
        description: "",
        priority: 1,
        dueDate: new Date(),
        assignees: [],
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Create Task</Text>
        <FormField
          title="Task Title"
          value={form.title}
          placeholder="Enter the task title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <FormField
          title="Description"
          value={form.description}
          placeholder="Enter the task description"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Priority</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => setForm({ ...form, priority: 1 })}
              style={{
                backgroundColor: form.priority === 1 ? "green" : "#8E8E8E",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
            <Text className="text-white">Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setForm({ ...form, priority: 2 })}
              style={{
                backgroundColor: form.priority === 2 ? "#FF9800" : "#8E8E8E",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text className="text-white">Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setForm({ ...form, priority: 3 })}
              style={{
                backgroundColor: form.priority === 3 ? "#F44336" : "#8E8E8E",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text className="text-white">High</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FormField
          title="Assign Users"
          value={searchQuery}
          placeholder="Search users by username"
          handleChangeText={(e) => setSearchQuery(e)}
          onSubmitEditing={handleSearch}
          otherStyles="mt-7"
        />

        <View className="mt-4">
          {searchResults.map((user) => (
            <TouchableOpacity key={user.accountId} onPress={() => handleAssignUser(user)}>
              <Text className="text-gray-100">{user.username}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-4">
          {assignedUsers.map((user) => (
            <View key={user.accountId} className="bg-white p-3 rounded-lg mb-2 flex-row items-center">
              <Text className="text-gray-800">{user.username}</Text>
            </View>
          ))}
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Due Date</Text>
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
          title="Create Task"
          handlePress={handleCreateTask}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

