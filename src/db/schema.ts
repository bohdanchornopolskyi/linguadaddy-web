import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['member', 'admin']);
export const accountTypeEnum = pgEnum('type', ['email', 'google', 'github']);
export const subscriptionPlans = pgEnum('plans', ['fluent', 'polyglot']);

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
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
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('displayName'),
  image: text('image'),
  defaultLanguageId: uuid('default_language_id').references(() => languages.id),
});

export const verifyEmailTokens = pgTable('verify_email_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  token: text('token'),
  tokenExpiresAt: timestamp('tokenExpiresAt', { mode: 'date' }),
});

export const resetTokens = pgTable('reset_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  token: text('token'),
  tokenExpiresAt: timestamp('tokenExpiresAt', { mode: 'date' }),
});

export const subscriptions = pgTable('subscription', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', {
    enum: ['active', 'past_due', 'canceled', 'paused', 'expired'],
  }).notNull(),
  paddleCustomerId: text('paddleCustomerId').notNull(),
  subscriptionId: text('subscriptionId').unique().notNull(),
  plan: subscriptionPlans('plan').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  trialStartDate: timestamp('trial_start_date'),
  trialEndDate: timestamp('trial_end_date'),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  pausedAt: timestamp('paused_at'),
  canceledAt: timestamp('canceled_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userLanguages = pgTable('user_languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  languageId: uuid('language_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const languages = pgTable('languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  code: text('code').unique().notNull(),
});

export const dictionaries = pgTable('dictionaries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  languageId: uuid('language_id')
    .notNull()
    .references(() => languages.id, { onDelete: 'cascade' }),
  word: text('word').notNull(),
  translation: text('translation').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sets = pgTable('sets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  languageId: uuid('language_id')
    .notNull()
    .references(() => languages.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const setWords = pgTable('set_words', {
  id: uuid('id').defaultRandom().primaryKey(),
  setId: uuid('set_id')
    .notNull()
    .references(() => sets.id, { onDelete: 'cascade' }),
  wordId: uuid('word_id')
    .notNull()
    .references(() => dictionaries.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
export type Account = typeof accounts.$inferSelect;
export type Profile = InferInsertModel<typeof profiles>;
export type Subscription = InferInsertModel<typeof subscriptions>;
export type Language = InferInsertModel<typeof languages>;
export type Dictionary = InferInsertModel<typeof dictionaries>;
export type Set = InferInsertModel<typeof sets>;
export type SetWord = InferInsertModel<typeof setWords>;
export type SubscriptionPlans = typeof subscriptionPlans.enumValues;
