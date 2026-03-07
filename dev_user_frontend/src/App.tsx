import { useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import type { Task } from "./types/task"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title
    }

    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  )
}

export default App