import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Left Side: Profile Picture and Name */}
        <View style={styles.leftSection}>
          <View style={styles.profilePicture}>
            <Text style={styles.initials}>Add Profile Picture</Text>
          </View>
          <Text style={styles.profileName}>Matthew Yeo</Text>
        </View>
        {/* Right side: Stats and Info */}
        <View style={styles.rightSection}>
          {/* Stats */}
          <View style={styles.statsSection}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>135</Text>
              <Text style={styles.statLabel}>Tasks Issued</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>200</Text>
              <Text style={styles.statLabel}>Meetings Held</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Username</Text>
        <Text style={styles.infoValue}>matthew.yeo</Text>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>matthew.yeo@example.com</Text>
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
    backgroundColor: '#000033', // Dark blue background
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftSection: {
    alignItems: 'center',
    marginRight: 2,
  },
  profilePicture: {
    width: 110,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#60a5fa', // Bright blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 14,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    marginRight: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF', // Cyan text
  },
  statLabel: {
    fontSize: 14,
    color: '#CCCCFF', // Light cyan
  },
  infoSection: {
    backgroundColor: '#1A1A2E', // Darker blue
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#00FFFF', // Cyan text
    marginBottom: 10,
  },
  meetingHistorySection: {
    backgroundColor: '#1A1A2E', // Darker blue
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  meetingHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
  meetingHistoryContent: {
    fontSize: 14,
    color: '#CCCCFF', // Light cyan
  },
  taskHistorySection: {
    backgroundColor: '#1A1A2E', // Darker blue
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  taskHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
  taskHistoryContent: {
    fontSize: 14,
    color: '#CCCCFF', // Light cyan
  },
});
