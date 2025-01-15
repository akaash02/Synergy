import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import NewAnnouncementModal from '../NewAnnouncementModal';
import ConfirmationModal from '../ConfirmationModal'; 

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [title, setTitle] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [priority, setPriority] = useState('Low');
  
  // Track selected task and confirmation modal visibility
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);

  // Handle adding a new task
  const handleNewAnnouncement = () => {
    if (title.trim() !== '' && newAnnouncement.trim() !== '') {
      setAnnouncements((prev) => [
        ...prev,
        { title: title.trim(), content: newAnnouncement.trim(), priority: priority, completed: false },
      ]);
      setTitle('');
      setNewAnnouncement('');
      setPriority('Low');
      setModalVisible(false);
    }
  };

  // Handle marking the task as completed
  const markAsCompleted = () => {
    const updatedAnnouncements = announcements.filter((announcement) => announcement !== selectedAnnouncement);
    setAnnouncements(updatedAnnouncements);  
    setConfirmationModalVisible(false);    
  };

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
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '700' }}>Tasks</Text>
        </View>

        <ScrollView style={{ height: 240 }} contentContainerStyle={{ paddingBottom: 16 }}>
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedAnnouncement(announcement); 
                  setConfirmationModalVisible(true); 
                }}
                style={{
                  marginBottom: 16,
                  backgroundColor: announcement.completed ? '#d3ffd3' : '#fff',
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>{announcement.title}</Text>
                  <Text
                    style={{
                      color: announcement.priority === 'High' ? '#FF0000' : announcement.priority === 'Medium' ? '#FFA500' : '#008000',
                      fontSize: 14,
                      fontWeight: '700',
                    }}
                  >
                    {announcement.priority}
                  </Text>
                </View>
                <Text style={{ color: '#000', fontSize: 16 }}>{announcement.content}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: '#aaa', fontSize: 16, textAlign: 'center' }}>
              No tasks for now
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
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>New Task</Text>
      </TouchableOpacity>

      <NewAnnouncementModal
        isVisible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleNewAnnouncement}
        title={title}
        setTitle={setTitle}
        newAnnouncement={newAnnouncement}
        setNewAnnouncement={setNewAnnouncement}
        priority={priority}
        setPriority={setPriority}
      />

      {/* Confirmation modal */}
      <ConfirmationModal
        isVisible={isConfirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
        onConfirm={markAsCompleted}
        message="Mark task as completed?"
      />
    </View>
  );
};

export default Home;

