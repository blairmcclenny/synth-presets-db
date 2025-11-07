import db from "./db/connection.ts"
import {
  oscillators as oscillatorsTable,
  tags as tagsTable,
} from "./db/schema.ts"

async function main() {
  try {
    const tags = await db.select().from(tagsTable).orderBy(tagsTable.name)
    const oscillators = await db.select().from(oscillatorsTable)

    console.log(tags)
    console.log(oscillators)
  } catch (error) {
    console.error(error)
  }
}

main()
