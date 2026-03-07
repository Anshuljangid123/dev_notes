import type { Task } from "../types/task"

interface Props {
  tasks: Task[]
  deleteTask: (id: number) => void
}

const TaskList = ({ tasks, deleteTask }: Props) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList