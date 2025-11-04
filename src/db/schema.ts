import {
  pgTable,
  varchar,
  text,
  real,
  smallint,
  timestamp,
  integer,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  presets: many(presets),
}))

export const presets = pgTable("presets", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const presetsRelations = relations(presets, ({ one, many }) => ({
  user: one(users, {
    fields: [presets.userId],
    references: [users.id],
  }),
  oscillators: many(oscillators),
  tags: many(presetsToTags),
}))

export const waveformEnum = pgEnum("waveform", [
  "sine",
  "square",
  "sawtooth",
  "triangle",
])

export const oscillators = pgTable("oscillators", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  presetId: integer("preset_id")
    .notNull()
    .references(() => presets.id, { onDelete: "cascade" }),
  index: smallint("index").notNull(),
  volume: real("volume").notNull(),
  pan: real("pan").notNull(),
  octave: smallint("octave").notNull(),
  tune: smallint("tune").notNull(),
  waveform: waveformEnum().notNull(),
  ampAttack: real("amp_attack").notNull(),
  ampDecay: real("amp_decay").notNull(),
  ampSustain: real("amp_sustain").notNull(),
  ampRelease: real("amp_release").notNull(),
  filterAttack: real("filter_attack").notNull(),
  filterDecay: real("filter_decay").notNull(),
  filterSustain: real("filter_sustain").notNull(),
  filterRelease: real("filter_release").notNull(),
})

export const oscillatorsRelations = relations(oscillators, ({ one }) => ({
  preset: one(presets, {
    fields: [oscillators.presetId],
    references: [presets.id],
  }),
}))

export const tags = pgTable("tags", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  presets: many(presetsToTags),
}))

export const presetsToTags = pgTable(
  "presets_to_tags",
  {
    presetId: integer("preset_id")
      .notNull()
      .references(() => presets.id, { onDelete: "cascade" }),

    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.presetId, table.tagId] }),
  })
)

export const presetsToTagsRelations = relations(presetsToTags, ({ one }) => ({
  preset: one(presets, {
    fields: [presetsToTags.presetId],
    references: [presets.id],
  }),
  tag: one(tags, {
    fields: [presetsToTags.tagId],
    references: [tags.id],
  }),
}))
