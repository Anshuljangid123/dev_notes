import express from "express"
import cors from "cors"

import notesRoutes from "./routes/notes.routes"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/notes", notesRoutes);


app.get("/health", (req, res) => {
  res.json({ message: "API working" })
})

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})