import db from "./connection"
import {
  oscillators as oscillatorsTable,
  presets as presetsTable,
  presetsToTags as presetsToTagsTable,
  tags as tagsTable,
  users as usersTable,
} from "./schema"

export async function seed() {
  console.log("Starting database seed...")

  try {
    console.log("Clearing existing data...")
    await db.delete(usersTable)
    await db.delete(presetsTable)
    await db.delete(oscillatorsTable)
    await db.delete(tagsTable)
    await db.delete(presetsToTagsTable)

    console.log("Creating preset tags...")

    const tags = await db
      .insert(tagsTable)
      .values(
        [
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
        }))
      )
      .returning()

    // console.log("Create oscillators...")

    // const [oscillatorA] = await db
    //   .insert(oscillatorsTable)
    //   .values({
    //     presetId: 10,
    //     index: 1,
    //     volume: 0,
    //     pan: 20,
    //     octave: 0,
    //     tune: 500,
    //     waveform: "sawtooth",
    //     ampAttack: 1,
    //     ampDecay: 1,
    //     ampSustain: 1,
    //     ampRelease: 1,
    //     filterAttack: 1,
    //     filterDecay: 1,
    //     filterSustain: 1,
    //     filterRelease: 1,
    //   })
    //   .returning()
  } catch (error) {
    console.error(error)
  }
}

seed()
