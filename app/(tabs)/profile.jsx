import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
      {/* Profile Picture */}
      <View style={styles.profilePicture}>
        <Text style={styles.initials}>Add Profile Picture</Text> {/* Placeholder for initials */}
      </View>

      {/* Following and Followers */}
      <View style={styles.statsSection}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>130</Text>
          <Text style={styles.statlabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>200</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
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
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    backgroundColor: '#fff',
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  profilePicture: {
    width: 110,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#FF9C01',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  initials: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold', 
  },

  statSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stat: {
    marginRight: 20, //space between "following" and "followers"
    
  },

  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },


  profileName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600', 
  },
});
