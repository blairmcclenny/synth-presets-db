import db from "./db/connection.ts"
import {
  users as usersTable,
  presets as presetsTable,
  oscillators as oscillatorsTable,
  tags as tagsTable,
} from "./db/schema.ts"

async function main() {
  try {
    const users = await db.select().from(usersTable)
    const presets = await db.select().from(presetsTable)
    const tags = await db.select().from(tagsTable).orderBy(tagsTable.name)
    const oscillators = await db.select().from(oscillatorsTable)

    console.log(users)
    console.log(presets)
    console.log(tags)
    console.log(oscillators)
  } catch (error) {
    console.error(error)
  }
}

main()
