import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUsername, getIncompleteTasks } from "../../lib/appwrite";
import { EmptyState, SearchInput, TaskCard, CustomButton } from "../../components";
import * as Notifications from "expo-notifications";

const Home = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]); // State to store incomplete tasks
  const [refreshing, setRefreshing] = useState(false);

  // Schedule a notification for a specific task
  const scheduleNotification = async (task) => {
    const dueDate = new Date(task.DueDate); // Convert dueDate string to Date object
    const now = new Date();

    // Check if dueDate is in the future
    if (dueDate > now) {
      const timeUntilDue = dueDate.getTime() - now.getTime();

      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: `Your task "${task.Title}" is due soon!`,
          sound: true,
        },
        trigger: { seconds: Math.round(timeUntilDue / 1000) },
      });
    }
  };

  // Fetch username and tasks
  const fetchData = async () => {
    const fetchedUsername = await getUsername(); // Get username
    if (fetchedUsername) {
      setUsername(fetchedUsername);
    } else {
      setUsername('Guest');
    }

    const fetchedTasks = await getIncompleteTasks(); // Get incomplete tasks
    setTasks(fetchedTasks); // Store tasks in state
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // Refetch username and tasks
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.$id}
          data={tasks} // Pass tasks data to FlatList
          renderItem={({ item }) => (
            <TaskCard
              title={item.Title || "Untitled Task"}
              creator={item.Creator || "Unknown"}
              description={item.Description || "No description available"}
              dueDate={item.DueDate || "No due date"}
              priority={item.Priority || 0}
            />
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.welcomeText}>Welcome Back</Text>
                  <Text style={styles.usernameText}>
                    {username ? username : 'Loading...'}
                  </Text>
                </View>

                <View>
                  <Image
                    source={images.logoSmall}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchInput />

              <View style={styles.tasksTitleContainer}>
                <Text style={styles.tasksTitle}>Your Tasks</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No pending tasks"
              subtitle="Create a task to get started"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <View style={styles.fixedButtonContainer}>
        <CustomButton
          title="Create a task"
          handlePress={() => router.push("/create")}
          containerStyles={styles.createTaskButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Replace with your "bg-primary" equivalent
  },
  content: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#aaa', // Replace with "text-gray-100"
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff', // Replace with "text-white"
  },
  logo: {
    width: 36,
    height: 40,
  },
  tasksTitleContainer: {
    marginTop: 20,
  },
  tasksTitle: {
    fontSize: 18,
    color: '#aaa', // Replace with "text-gray-100"
    marginBottom: 8,
  },
  fixedButtonContainer: {
    padding: 16,
    backgroundColor: '#111', // Optional: matches your background color
  },
  createTaskButton: {
    width: '100%',
    paddingVertical: 10,
  },
});

export default Home;

