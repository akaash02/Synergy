import React, { useState } from 'react';
import {  ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { CustomButton } from '../../components';
import { router } from 'expo-router';


const Meetings = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="my-8 px-4">
        <Text className="text-secondary text-xl font-psemibold mb-4">Calendar</Text>
        <Calendar
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            todayTextColor: '#FF9C01',
            selectedDayBackgroundColor: '#FF9C01',
            arrowColor: 'white',
            textDayFontFamily: 'Poppins-Regular',
            textMonthFontFamily: 'Poppins-SemiBold',
            textDayHeaderFontFamily: 'Poppins-Medium',
            textSectionTitleColor: 'white', // Day names (e.g., Sun, Mon, Tue)
            dayTextColor: 'white',         // Days on the calendar
            monthTextColor: 'white',       // Month name (e.g., January 2025)
            textDisabledColor: '#a1a1a1',  // Disabled dates (optional)
          }}
          style={{
            backgroundColor: 'transparent',
          }}
        />
        {selectedDate && (
          <Text className="text-gray-100 text-lg font-pextralight mt-4">
            Selected Date: {selectedDate}
          </Text>
        )}
      </View>
      <CustomButton
        title="Schedule Meeting"
        handlePress={() => router.push("/createMeeting")}
        containerStyles="w-full my-5"
      />
      <CustomButton
        title="View Meetings"
        handlePress={() => router.push("/viewMeetings")}
        containerStyles="w-full my-5"
      />
    </SafeAreaView>
  );
  
};

export default Meetings;
