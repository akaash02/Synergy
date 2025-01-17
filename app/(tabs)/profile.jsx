import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import { EmptyState, SearchInput, TaskCard, CustomButton } from "../../components";
import { account, signOut } from "../../lib/appwrite";

const handleLogout = async (navigation) => {
  try {
    const success = await signOut();
    if (success) {
      // Navigate to login page or splash screen
      navigation.replace("/welcome"); // Replace "LoginPage" with your login screen route
    }
  } catch (error) {
    alert("Failed to logout. Please try again.");
  }
};

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePicture}>
        <Text style={styles.initials}>Add Profile Picture</Text> {/* Placeholder for initials */}
      </View>

      <CustomButton
          title="Logout"
          handlePress={() => handleLogout()}
          containerStyles={styles.createTaskButton}
          style={{ justifyContent: 'center' }}
        />
    
    {/* Profile Name */}
    <Text style={styles.profileName}>Matthew Yeo</Text>
  </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor: '#fff',
    padding: 20,
  },
  profilePicture: {
    width: 110,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#CDCDE0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  initials: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    color: '#000000',
    fontweight: '600',
  },
});