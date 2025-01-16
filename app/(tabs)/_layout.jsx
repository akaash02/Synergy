import { Image, View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (

    <View className="flex items-center justify-end gap-2"
    style={{ width: 100, height: 100 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 20, height: 20, tintColor: color }}
      />
      <Text
        className={`text-s ${focused ? "font-psemibold" : "font-pregular"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 80,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
            )
          }}
        />
        <Tabs.Screen
          name="meetings"
          options={{
            title: 'Meetings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Meetings"
              focused={focused}
            />
            )
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Manage Tasks',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.square}
              color={color}
              name="Tasks"
              focused={focused}
            />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
            )
          }}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout