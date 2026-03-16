import { useState, useEffect } from "react"
// Import React hooks: useState for data storage, useEffect for side effects (like fetching data)
import TaskForm from "./components/TaskForm"
// Import the custom component used to input new tasks
import TaskList from "./components/TaskList"
// Import the custom component used to display the list of tasks

// Define the backend URL. It checks your environment variables (for Azure/Cloud) 
// or defaults to localhost:3001 for local development.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App() {
  // Create a state variable 'tasks' initialized as an empty array.
  // The TypeScript part <{id: number, title: string}[]> defines the structure of a task object.
  const [tasks, setTasks] = useState<{id: number, title: string}[]>([]);

  // useEffect runs code after the component is rendered.
  useEffect(() => {
    // We define an async function inside because useEffect callbacks themselves cannot be async.
    const fetchTasks = async () => {
      try {
        // Send a GET request to the backend to retrieve all notes/tasks.
        const response = await fetch(`${API_URL}/notes`);
        
        // Convert the raw response from the server into a JavaScript object (array).
        const data = await response.json();
        
        // Update the 'tasks' state with the data received from the database.
        setTasks(data);
      } catch (error) {
        // Log an error to the console if the server is down or the request fails.
        console.error("Error fetching tasks:", error);
      }
    };

    // Immediately call the function we just defined.
    fetchTasks();
    
    // The empty array [] means this effect runs ONLY ONCE when the app first loads.
  }, []); 

  // Function to create a new task, passed as a prop to TaskForm.
  const addTask = async (title: string) => {
    try {
      // Send a POST request with the new task title in the body (JSON format).
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      
      // The backend returns the newly created task (including its new ID from the DB).
      const newTask = await response.json();
      
      // Update state using a 'functional update' (prev => ...).
      // This ensures we don't lose tasks if multiple updates happen quickly.
      setTasks(prev => [...prev, newTask]); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to remove a task, passed as a prop to TaskList.
  const deleteTask = async (id: number) => {
    try {
      // Send a DELETE request to the specific URL containing the task's ID.
      await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE"
      });
      
      // Filter out the deleted task from the local state so the UI updates instantly.
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // The JSX (HTML-like code) that describes the UI.
  return (
    // Main container using Tailwind CSS for a grey background and centered layout.
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* The white card containing our app content */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task List</h1>
        
        {/* Render TaskForm and give it the addTask function so it can send data back up */}
        <TaskForm addTask={addTask} />
        
        {/* Render TaskList and give it the tasks data and the deleteTask function */}
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  )
}
