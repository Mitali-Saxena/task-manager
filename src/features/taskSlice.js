import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, getDocs, doc, updateDoc, writeBatch, addDoc } from "../firebase"; // Import correctly

// Fetch tasks from Firestore
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks")); // ✅ Correct way
    const tasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("✅ Fetched tasks from Firebase:", tasks); // Debugging
    return tasks;
  } catch (error) {
    console.error("❌ Error fetching tasks:", error.message);
    throw error;
  }
});

// Update task order in Firestore
export const updateTaskOrder = createAsyncThunk("tasks/updateTaskOrder", async (reorderedTasks) => {
  try {
    console.log("🔄 Updating task order:", reorderedTasks);

    const batch = writeBatch(db);
    reorderedTasks.forEach((task, index) => {
      const taskRef = doc(db, "tasks", task.id);
      batch.update(taskRef, { order: index });
    });

    await batch.commit();
    return reorderedTasks;
  } catch (error) {
    console.error("❌ Error updating task order:", error.message);
    throw error;
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { id: docRef.id, ...task }; 
  });

// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        console.log("✅ Updated Redux state with tasks:", state.tasks);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTaskOrder.fulfilled, (state, action) => {
        state.tasks = action.payload;
        console.log("✅ Updated Redux task order:", state.tasks);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log("✅ Task added:", action.payload);
        state.tasks.push(action.payload); // Add the new task to Redux state
      });
  },
});

export default taskSlice.reducer;
