import { Router } from "express"
import { pool } from "../db"

const router = Router()

router.get("/", async (req, res) => {
 const result = await pool.query("SELECT * FROM notes ORDER BY id DESC")
 res.json(result.rows)
})

router.post("/", async (req, res) => {
 const { title } = req.body

 const result = await pool.query(
  "INSERT INTO notes(title) VALUES($1) RETURNING *",
  [title]
 )

 res.json(result.rows[0])
})

router.delete("/:id", async (req, res) => {
 const { id } = req.params

 await pool.query("DELETE FROM notes WHERE id=$1", [id])

 res.json({ message: "Note deleted" })
})

export default router