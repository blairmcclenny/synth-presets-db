import db from "./connection"
import { NewTag, tags } from "./schema"

export async function seed() {
  console.log("Starting database seed...")

  try {
    console.log("Clearing existing data...")
    await db.delete(tags)

    console.log("Creating preset tags...")
    const defaultTags: NewTag[] = [
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
    ].map((tag) => ({
      name: tag,
      createdAt: new Date(),
    }))

    const presetTags = await db.insert(tags).values(defaultTags).returning()
  } catch (error) {
    console.error(error)
  }
}

seed()
