import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['member', 'admin']);
export const accountTypeEnum = pgEnum('type', ['email', 'google', 'github']);

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountType: accountTypeEnum('accountType').notNull(),
  githubId: text('githubId').unique(),
  googleId: text('googleId').unique(),
  password: text('password'),
  salt: text('salt'),
});

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const profiles = pgTable('profile', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('displayName'),
  image: text('image'),
});

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
