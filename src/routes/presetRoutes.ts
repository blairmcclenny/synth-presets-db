import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Get all presets" })
})

router.post("/", (req, res) => {
  res.status(201).json({ message: "Preset created" })
})

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete preset ${req.params.id}` })
})

export default router
