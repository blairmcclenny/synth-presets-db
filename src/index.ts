import "dotenv/config"
import { users } from "./db/schema.ts"
import { drizzle } from "drizzle-orm/neon-http"
import { seed } from "drizzle-seed"

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  try {
    await seed(db, { users })
  } catch (error) {
    console.error(error)
  }
}

main()
