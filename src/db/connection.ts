import "dotenv/config"
import * as schema from "./schema.ts"
import { drizzle } from "drizzle-orm/neon-http"

export const db = drizzle(process.env.DATABASE_URL!, { schema })
export default db
