import "dotenv/config"
import app from "./server.ts"

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
  console.log(`Environment: ${process.env.APP_STAGE}`)
})
