import express from "express"
import authRoutes from "./routes/authRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import presetRoutes from "./routes/presetRoutes.ts"
import helmet from "helmet"
import cors from "cors"
import env, { isDev, isTestEnv } from "../env.ts"
import morgan from "morgan"

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan("dev", {
    skip: () => isTestEnv(),
  })
)

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

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  })
})

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack)
    res.status(500).json({
      error: "Something went wrong",
      ...(isDev() && { details: err.message }),
    })
  }
)

export { app }

export default app
