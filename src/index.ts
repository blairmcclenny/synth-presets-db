import db from "./db/connection.ts"
import {
  users as usersTable,
  presets as presetsTable,
  oscillators as oscillatorsTable,
  tags as tagsTable,
  presetsToTags as presetsToTagsTable,
} from "./db/schema.ts"

async function main() {
  try {
    const users = await db.select().from(usersTable)
    const presets = await db.select().from(presetsTable)
    const oscillators = await db.select().from(oscillatorsTable)
    const tags = await db.select().from(tagsTable)
    const presetsToTags = await db.select().from(presetsToTagsTable)

    console.log(users)
    console.log(presets)
    console.log(oscillators)
    console.log(tags)
    console.log(presetsToTags)
  } catch (error) {
    console.error(error)
  }
}

main()
