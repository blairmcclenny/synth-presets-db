import express from "express"
import authRoutes from "./routes/authRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import presetRoutes from "./routes/presetRoutes.ts"

const app = express()

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Synth Preset API",
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/presets", presetRoutes)

export { app }

export default app
