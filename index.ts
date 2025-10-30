import "dotenv/config"
import { users } from "./src/db/schema.ts"
import { drizzle } from "drizzle-orm/neon-http"
import { reset } from "drizzle-seed"

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  try {
    await reset(db, { users })
  } catch (error) {
    console.error(error)
  }
}

main()
