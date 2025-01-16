import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { router } from "expo-router";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUsername, getIncompleteTasks } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, TaskCard, CustomButton } from "../../components";

const Home = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]); // State to store incomplete tasks
  const [refreshing, setRefreshing] = useState(false);

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
    <SafeAreaView className="bg-primary">
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
          <View className="flex- my-11 px-4 space-y-1">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">
                  {username ? username : 'Loading...'}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">Your Tasks</Text>
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
      <CustomButton
        title="Create a task"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </SafeAreaView>
  );
};

export default Home;
