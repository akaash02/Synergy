import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledUsername = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledButton = styled(Text);

const Home = () => {
  return (
    <StyledView className="flex-1 bg-primary items-center px-4 overflow-auto">
      <StyledText className="text-secondary text-2xl font-psemibold mt-10 text-center">
        Welcome Back, {'\n'}
      </StyledText>

      <StyledView className="pb-2">
        <StyledUsername className="text-secondary text-4xl font-pmedium text-center">
          Jia Min
        </StyledUsername>
      </StyledView>



      <StyledView className="w-11/12 bg-gray-100 rounded-lg p-4 pt-4 mt-10">
        {/* Announcements */}
        
        <StyledView className="bg-secondary p-2 rounded-lg mb-4 w-30">
          <StyledText className="text-black-100 text-lg font-plarge">
            Announcements
          </StyledText>
        </StyledView>
        

        <StyledScrollView
          className="h-80"  // Fixed height for the announcements box
          contentContainerStyle={{ paddingBottom: 16 }}
        >


          <StyledText className="text-black-100 text-lg font-plight mb-4">
            Akaash
          </StyledText>

          <View className="border-b border-secondary my-4" />

          {/* Sample announcements */}
          <StyledText className="text-black-100 text-lg font-plight mb-4">
            is
          </StyledText>

          <View className="border-b border-secondary my-4" />

          <StyledText className="text-black-100 text-lg font-plight mb-4">
            c
          </StyledText>

          <View className="border-b border-secondary my-4" />

          <StyledText className="text-black-100 text-lg font-plight mb-4">
            o
          </StyledText>

          <View className="border-b border-secondary my-4" />

          <StyledText className="text-black-100 text-lg font-plight mb-4">
            o
          </StyledText>

          <View className="border-b border-secondary my-4" />

          <StyledText className="text-black-100 text-lg font-plight mb-4">
            l
          </StyledText>
          

        </StyledScrollView>
      </StyledView>

      <StyledButton className="w-11/12 bg-secondary text-white py-3 mt-4 rounded-lg text-center font-pmedium">
        New Announcement
      </StyledButton>

    </StyledView>

  );
};

export default Home