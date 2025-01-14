import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import NewAnnouncementModal from '../NewAnnouncementModal';

const Home = () => {

  {/*States*/ }


  // Track the visibility of the modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Track the content of the new announcement
  const [newAnnouncement, setNewAnnouncement] = useState('');

  // Store the list of announcements
  const [announcements, setAnnouncements] = useState([]);


  {/*Functions*/ }


  // Handle adding a new announcement
  const handleNewAnnouncement = () => {
    if (newAnnouncement.trim() !== '') {
      setAnnouncements((prev) => [...prev, newAnnouncement]); // Add the new announcement to the list
      setNewAnnouncement(''); // Clear input
      setModalVisible(false); // Close modal
    }
  };


  {/*Return logic*/ }


  return (
    <View style={{ flex: 1, backgroundColor: '#161622', alignItems: 'center', paddingHorizontal: 16 }}>
      <Text style={{ color: '#FF9C01', fontSize: 24, fontWeight: '600', marginTop: 40, textAlign: 'center' }}>
        Welcome Back, {'\n'}
      </Text>

      <View style={{ paddingBottom: 8 }}>
        <Text style={{ color: '#FF9C01', fontSize: 32, fontWeight: '500', textAlign: 'center' }}>Jia Min</Text>
      </View>

      <View style={{ width: '90%', backgroundColor: '#e0e0e0', borderRadius: 10, padding: 16, marginTop: 40 }}>
        <View style={{ backgroundColor: '#FF9C01', padding: 8, borderRadius: 5, marginBottom: 16 }}>
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '700' }}>Announcements</Text>
        </View>

        <ScrollView
          style={{ height: 240 }} // Set fixed height for the announcements box
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <View key={index}>
                <Text style={{ color: '#000', fontSize: 16, marginBottom: 16 }}>{announcement}</Text>
                <View style={{ borderBottomWidth: 1, borderColor: '#FF9C01', marginBottom: 16 }} />
              </View>
            ))
          ) : (
            // Placeholder text when no announcements exist
            <Text style={{ color: '#aaa', fontSize: 16, textAlign: 'center' }}>
              No announcements for now
            </Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={{
          width: '90%',
          backgroundColor: '#FF9C01',
          paddingVertical: 12,
          marginTop: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>New Announcement</Text>
      </TouchableOpacity>

      <NewAnnouncementModal
        isVisible={isModalVisible} 
        onCancel={() => setModalVisible(false)} 
        onSubmit={handleNewAnnouncement} // Add new announcement
        newAnnouncement={newAnnouncement} 
        setNewAnnouncement={setNewAnnouncement} 
      />
    </View>
  );
};

export default Home;


