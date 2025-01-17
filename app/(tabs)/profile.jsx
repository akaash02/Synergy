import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  // Settings Icon pressed
  const handleSettingsPress = () => {
    Alert.alert('Settings', 'Navigate to the settings page!');
  };

  // Open image picker
  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'No image selected');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          setProfileImage(selectedImage);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsPress}>
        <Icon name="settings-outline" size={30} color="#161622" />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Left Side: Profile Picture and Name */}
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.profilePicture} onPress={handleImagePicker}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.initials}>Add Profile Picture</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.profileName}>Matthew Yeo</Text>
        </View>

        {/* Right Side: Stats Section */}
        <View style={styles.rightSection}>
          <View style={styles.statsSection}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>130</Text>
              <Text style={styles.statLabel}>Tasks issued</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>200</Text>
              <Text style={styles.statLabel}>Meetings held</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Additional Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Username: matthew.yeo</Text>
        <Text style={styles.infoLabel}>Email: matthew.yeo@ex.com</Text>
        <Text style={styles.infoLabel}>Description</Text>
        <Text style={styles.infoValue}>Living life to its fullest</Text>
      </View>

      {/* Meeting History Section */}
      <View style={styles.meetingHistorySection}>
        <Text style={styles.meetingHistoryTitle}>Meeting History</Text>
        <Text style={styles.meetingHistoryContent}>No meetings held yet.</Text>
      </View>

      {/* Task History Section */}
      <View style={styles.taskHistorySection}>
        <Text style={styles.taskHistoryTitle}>Task History</Text>
        <Text style={styles.taskHistoryContent}>No tasks completed yet.</Text>
      </View>
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

  settingsIcon: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    zIndex: 10,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  leftSection: {
    alignItems:'center',
    marginRight: 20,
  },

  profilePicture: {
    width: 115,
    height: 145,
    borderRadius: 10,
    backgroundColor: '#FF9C01',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  initials: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold', 
  },

  rightSection: {
    flex: 1,
    justifyContent: 'center',
  },

  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginLeft: 0,
  },

  stat: {
    marginRight: 20, //space between "following" and "followers"
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
  },


  profileName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600', 
    marginBottom: 10,
    
  },

  infoSection: {
    width: '90%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 14,
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 13,
    color: '#555',
    marginBottom: 1,
  },

  meetingHistorySection: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadownColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  meetingHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },

  meetingHistoryContent: {
    fontSize: 14,
    color: '#555',
  },
  
  taskHistorySection: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadownColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  taskHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },

  taskHistoryContent: {
    fontSize: 14,
    color: '#555',
  },

});
