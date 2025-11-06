import db from "./db/connection.ts"
import { tags } from "./db/schema.ts"

async function main() {
  try {
    const presetTags = await db.select().from(tags)
    console.log(presetTags)
  } catch (error) {
    console.error(error)
  }
}

main()
