import { useState } from "react"

interface Props {
  addTask: (title: string) => void
}

const TaskForm = ({ addTask }: Props) => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title) return

    addTask(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm