import "dotenv/config"
import { oscillators, presets, tags, users } from "./db/schema.ts"
import { drizzle } from "drizzle-orm/neon-http"
import { reset, seed } from "drizzle-seed"

const db = drizzle(process.env.DATABASE_URL!)

const defaultTags = [
  "Arp",
  "Bass",
  "Lead",
  "Pad",
  "Pluck",
  "Keys",
  "Aggressive",
  "Dreamy",
  "Dark",
  "Bright",
  "Evolving",
  "Analog",
  "Simple",
  "Complex",
] as const

async function main() {
  try {
    await reset(db, { users, presets, oscillators })
    await seed(db, { users, presets, oscillators })
    await db
      .insert(tags)
      .values(defaultTags.map((name) => ({ name })))
      .onConflictDoNothing()
  } catch (e) {
    console.error(e)
  }
}

main()
