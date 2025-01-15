import { Client, Account, ID, Avatars, Storage, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.akaash.synergy",
  projectId: "6784d851001d6f5cab51",
  storageId: "678530c800100508b314",
  databaseId: "67852e830029476ed3eb",
  userCollectionId: "67852ebf000f0abd121e",
  meetingsCollectionId: "67852f4200224a717ad3",
  tasksCollectionId: "6787271b0010616bd554",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get Current User's Username
export async function getUsername() {
  try {
    const currentUser = await getCurrentUser();
    return currentUser ? currentUser.username : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Create a new Task
export async function createTask(title, description, priority, dueDate) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No user logged in');

    const taskId = ID.unique(); // Generate a unique task ID

    console.log('Generated Task ID:', taskId); // Debug: Check the generated task ID

    // Create the new task document with a relation to the current user
    const newTask = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId, // Use the generated unique task ID as the document ID
      {
        taskId: taskId, // Add taskId as an attribute in the document body
        Title: title,
        Description: description,
        Priority: priority,
        Completed: false, // New task is initially incomplete
        DueDate: dueDate ? dueDate : null,
        Creator: currentUser.accountId
      }
    );

    return newTask;
  } catch (error) {
    console.log('Error creating task:', error);
    throw new Error(error);
  }
}


// Mark a Task as Complete
export async function markTaskAsCompleted(taskId) {
  try {
    const updatedTask = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId,
      {
        completed: true,
      }
    );

    return updatedTask;
  } catch (error) {
    console.log('Error marking task as completed:', error);
    throw new Error(error);
  }
}

// Edit a Task
export async function editTask(taskId, updatedFields) {
  try {
    const updatedTask = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId,
      updatedFields
    );

    return updatedTask;
  } catch (error) {
    console.log('Error editing task:', error);
    throw new Error(error);
  }
}

// Delete a Task
export async function deleteTask(taskId) {
  try {
    const deletedTask = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId
    );

    return deletedTask;
  } catch (error) {
    console.log('Error deleting task:', error);
    throw new Error(error);
  }
}


// Get Incomplete Tasks of the Current User
export async function getIncompleteTasks() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const tasks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      [
        Query.equal("Creator", currentUser.accountId),
        Query.equal("Completed", false)
      ]
    );

    return tasks.documents;
  } catch (error) {
    console.log('Error fetching incomplete tasks:', error);
    return [];
  }
}

// Get All Tasks of the Current User
export async function getAllTasks() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const tasks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      [Query.equal("accountId", currentUser.accountId)]
    );

    return tasks.documents;
  } catch (error) {
    console.log('Error fetching all tasks:', error);
    return [];
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


