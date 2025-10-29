import {
  pgTable,
  // serial,
  // integer,
  varchar,
  // text,
  // real,
  // smallint,
  timestamp,
  integer,
} from "drizzle-orm/pg-core"
// import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
})

// export const usersRelations = relations(users, ({ many }) => ({
//   presets: many(presets),
// }))

// export const presets = pgTable("presets", {
//   id: serial().primaryKey(),
//   userId: integer()
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   name: varchar({ length: 100 }).notNull(),
//   description: text(),
//   createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
//   updatedAt: timestamp({ mode: "date" })
//     .defaultNow()
//     .$onUpdate(() => new Date()),
// })

// export const presetsRelations = relations(presets, ({ one, many }) => ({
//   user: one(users, {
//     fields: [presets.userId],
//     references: [users.id],
//   }),
//   oscillators: many(oscillators),
//   tags: many(presetsToTags),
// }))

// export const oscillators = pgTable("oscillators", {
//   id: serial().primaryKey(),
//   presetId: integer()
//     .notNull()
//     .references(() => presets.id, { onDelete: "cascade" }),
//   index: smallint().notNull(),
//   volume: real().notNull(), // 0.0 - 1.0 in UI
//   pan: real().notNull(), // -1.0 to 1.0 in UI
//   octave: smallint().notNull(), // e.g. -2 .. +2
//   tune: smallint().notNull(), // fine tune in cents
//   type: text({ enum: ["sine", "square", "sawtooth", "triangle"] }).notNull(),
//   ampAttack: real().notNull(), // seconds
//   ampDecay: real().notNull(), // seconds
//   ampSustain: real().notNull(), // 0.0 - 1.0
//   ampRelease: real().notNull(), // seconds
// })

// export const oscillatorsRelations = relations(oscillators, ({ one }) => ({
//   preset: one(presets, {
//     fields: [oscillators.presetId],
//     references: [presets.id],
//   }),
// }))

// export const tags = pgTable("tags", {
//   id: serial().primaryKey(),
//   userId: integer()
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   name: varchar({ length: 50 }).notNull(),
//   createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
// })

// export const tagsRelations = relations(tags, ({ one, many }) => ({
//   user: one(users, {
//     fields: [tags.userId],
//     references: [users.id],
//   }),
//   presets: many(presetsToTags),
// }))

// export const presetsToTags = pgTable(
//   "presets_to_tags",
//   {
//     presetId: integer()
//       .notNull()
//       .references(() => presets.id, { onDelete: "cascade" }),

//     tagId: integer()
//       .notNull()
//       .references(() => tags.id, { onDelete: "cascade" }),
//   },
//   (table) => ({
//     pk: primaryKey({ columns: [table.presetId, table.tagId] }),
//   })
// )

// export const presetsToTagsRelations = relations(presetsToTags, ({ one }) => ({
//   preset: one(presets, {
//     fields: [presetsToTags.presetId],
//     references: [presets.id],
//   }),
//   tag: one(tags, {
//     fields: [presetsToTags.tagId],
//     references: [tags.id],
//   }),
// }))
