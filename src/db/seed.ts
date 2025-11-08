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

    console.log("Creating users...")

    const [envelopeEmperor] = await db
      .insert(usersTable)
      .values({
        username: "Envelope Emperor",
        email: "adsr.overlord@sustainmail.io",
      })
      .returning()

    const [thePatchCableProphet] = await db
      .insert(usersTable)
      .values({
        username: "The Patch Cable Prophet",
        email: "patchmeinatdawn@modularmail.net",
      })
      .returning()

    const [polyphonicSasquatch] = await db
      .insert(usersTable)
      .values({
        username: "Polyphonic Sasquatch",
        email: "widepadenergy@lushpads.com",
      })
      .returning()

    console.log("Creating presets...")

    const [cloudConveyor, subwooferKarate, laserFruitSnack] = await db
      .insert(presetsTable)
      .values([
        { name: "Cloud Conveyor", userId: envelopeEmperor.id },
        { name: "Subwoofer Karate", userId: envelopeEmperor.id },
        { name: "Laser Fruit Snack", userId: envelopeEmperor.id },
      ])
      .returning()

    const [graveyardFogMachine, quantumCoffeeShop, tinyDiscoPebble] = await db
      .insert(presetsTable)
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
      .insert(presetsTable)
      .values([
        { name: "Slow-Motion Nebula", userId: polyphonicSasquatch.id },
        { name: "Vintage Thunderpants", userId: polyphonicSasquatch.id },
        { name: "Pastel Stardust", userId: polyphonicSasquatch.id },
        { name: "Chainsaw Compliment", userId: polyphonicSasquatch.id },
      ])
      .returning()

    console.log("Creating oscillators...")

    await db
      .insert(oscillatorsTable)
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

    console.log("Creating presets to tags...")

    await db.insert(presetsToTagsTable).values([
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
  } catch (error) {
    console.error(error)
  }
}

seed()
