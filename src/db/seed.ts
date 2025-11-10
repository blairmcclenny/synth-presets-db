import db from "./connection.ts"
import { users, presets, oscillators, tags, presetsToTags } from "./schema.ts"

async function seed() {
  console.log("Starting database seed...")

  try {
    console.log("Clearing existing data...")

    await db.delete(users)
    await db.delete(presets)
    await db.delete(oscillators)
    await db.delete(tags)
    await db.delete(presetsToTags)

    console.log("Creating users...")

    const [envelopeEmperor] = await db
      .insert(users)
      .values({
        username: "Envelope Emperor",
        email: "adsr.overlord@sustainmail.io",
      })
      .returning()

    const [thePatchCableProphet] = await db
      .insert(users)
      .values({
        username: "The Patch Cable Prophet",
        email: "patchmeinatdawn@modularmail.net",
      })
      .returning()

    const [polyphonicSasquatch] = await db
      .insert(users)
      .values({
        username: "Polyphonic Sasquatch",
        email: "widepadenergy@lushpads.com",
      })
      .returning()

    console.log("Creating presets...")

    const [cloudConveyor, subwooferKarate, laserFruitSnack] = await db
      .insert(presets)
      .values([
        { name: "Cloud Conveyor", userId: envelopeEmperor.id },
        { name: "Subwoofer Karate", userId: envelopeEmperor.id },
        { name: "Laser Fruit Snack", userId: envelopeEmperor.id },
      ])
      .returning()

    const [graveyardFogMachine, quantumCoffeeShop, tinyDiscoPebble] = await db
      .insert(presets)
      .values([
        { name: "Graveyard Fog Machine", userId: thePatchCableProphet.id },
        { name: "Quantum Coffee Shop", userId: thePatchCableProphet.id },
        { name: "Tiny Disco Pebble", userId: thePatchCableProphet.id },
      ])
      .returning()

    const [
      slowMotionNebula,
      vintageThunderpants,
      pastelStardust,
      chainsawCompliment,
    ] = await db
      .insert(presets)
      .values([
        { name: "Slow-Motion Nebula", userId: polyphonicSasquatch.id },
        { name: "Vintage Thunderpants", userId: polyphonicSasquatch.id },
        { name: "Pastel Stardust", userId: polyphonicSasquatch.id },
        { name: "Chainsaw Compliment", userId: polyphonicSasquatch.id },
      ])
      .returning()

    console.log("Creating oscillators...")

    await db
      .insert(oscillators)
      .values(
        [
          cloudConveyor,
          subwooferKarate,
          laserFruitSnack,
          graveyardFogMachine,
          quantumCoffeeShop,
          tinyDiscoPebble,
          slowMotionNebula,
          vintageThunderpants,
          pastelStardust,
          chainsawCompliment,
        ].flatMap((preset) => [
          {
            presetId: preset.id,
            index: 0,
            volume: 0,
            pan: 0,
            octave: 0,
            tune: 0,
            waveform: "sawtooth" as const,
            ampAttack: 100,
            ampDecay: 100,
            ampSustain: 1,
            ampRelease: 100,
            filterAttack: 100,
            filterDecay: 100,
            filterSustain: 1,
            filterRelease: 100,
          },
          {
            presetId: preset.id,
            index: 1,
            volume: 0,
            pan: 0,
            octave: 0,
            tune: 0,
            waveform: "square" as const,
            ampAttack: 100,
            ampDecay: 100,
            ampSustain: 1,
            ampRelease: 100,
            filterAttack: 100,
            filterDecay: 100,
            filterSustain: 1,
            filterRelease: 100,
          },
        ])
      )
      .returning()

    console.log("Creating tags...")

    const [
      arp,
      bass,
      lead,
      pad,
      pluck,
      keys,
      aggressive,
      dreamy,
      dark,
      bright,
      evolving,
      analog,
      simple,
      complex,
    ] = await db
      .insert(tags)
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

    console.log("Creating presets to tags...")

    await db.insert(presetsToTags).values([
      {
        presetId: cloudConveyor.id,
        tagId: dreamy.id,
      },
      {
        presetId: cloudConveyor.id,
        tagId: analog.id,
      },
      {
        presetId: cloudConveyor.id,
        tagId: arp.id,
      },
      {
        presetId: subwooferKarate.id,
        tagId: aggressive.id,
      },
      {
        presetId: subwooferKarate.id,
        tagId: bass.id,
      },
      {
        presetId: laserFruitSnack.id,
        tagId: bright.id,
      },
      {
        presetId: laserFruitSnack.id,
        tagId: lead.id,
      },
      {
        presetId: graveyardFogMachine.id,
        tagId: dark.id,
      },
      {
        presetId: graveyardFogMachine.id,
        tagId: pad.id,
      },
      {
        presetId: quantumCoffeeShop.id,
        tagId: complex.id,
      },
      {
        presetId: quantumCoffeeShop.id,
        tagId: keys.id,
      },
      {
        presetId: tinyDiscoPebble.id,
        tagId: simple.id,
      },
      {
        presetId: tinyDiscoPebble.id,
        tagId: pluck.id,
      },
      {
        presetId: slowMotionNebula.id,
        tagId: evolving.id,
      },
      {
        presetId: slowMotionNebula.id,
        tagId: pad.id,
      },
      {
        presetId: vintageThunderpants.id,
        tagId: analog.id,
      },
      {
        presetId: vintageThunderpants.id,
        tagId: bass.id,
      },
      {
        presetId: pastelStardust.id,
        tagId: dreamy.id,
      },
      {
        presetId: pastelStardust.id,
        tagId: keys.id,
      },
      {
        presetId: chainsawCompliment.id,
        tagId: aggressive.id,
      },
      {
        presetId: chainsawCompliment.id,
        tagId: lead.id,
      },
    ])

    console.log("\nTesting relational queries...")

    // Query user with all their presets
    const userWithPresets = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, "adsr.overlord@sustainmail.io"),
      with: {
        presets: {
          with: {
            oscillators: true,
            tags: {
              with: {
                tag: true,
              },
            },
          },
        },
      },
    })

    // Query presets with their tags and oscillators
    const presetsWithTags = await db.query.presets.findMany({
      with: {
        user: true,
        tags: {
          with: {
            tag: true,
          },
        },
        oscillators: true,
      },
    })

    // Query tags with their presets
    const tagsWithPresets = await db.query.tags.findMany({
      columns: {
        name: true,
      },
      with: {
        presets: {
          with: {
            preset: {
              with: {
                oscillators: true,
              },
            },
          },
        },
      },
    })

    console.log("Database seeded successfully!")
    console.log("\nSeed Summary:")
    console.log("- 3 demo users created")
    console.log(
      `- Demo user has ${userWithPresets?.presets?.length || 0} presets`
    )
    console.log(`- ${presetsWithTags.length} presets created`)
    console.log(`- ${tagsWithPresets.length} tags created`)
    console.log(
      "- Tags are admin defined and only added or removed per preset by the user"
    )
  } catch (error) {
    console.error("Seed failed:", error)
    throw error
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seed
