import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePicture}>
        <Text style={styles.initials}>Add Profile Picture</Text> {/* Placeholder for initials */}
      </View>
    
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