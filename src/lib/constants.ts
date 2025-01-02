export const ITERATIONS = 10000;

export const AUTHENTICATION_ERROR_MESSAGE =
  'You must be logged in to view this content';

export const PRIVATE_GROUP_ERROR_MESSAGE =
  'You do not have permission to view this group';

export const EMAIL_IN_USE_ERROR_MESSAGE = 'Email is already in use';

export const TOKEN_EXPIRED_ERROR_MESSAGE = 'Token has expired';

export const LOGIN_ERROR_MESSAGE = 'Invalid email or password';

export const RESOURCE_NOT_FOUND_ERROR_MESSAGE = 'Resource not found';

export const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Invalid email or password';

export const TOKEN_LENGTH = 32;

export const TOKEN_TTL = 1000 * 60 * 5;

export const MAX_FILE_SIZE = 5000000;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const EVENT_TYPE = {
  SUBSCRIPTION_CREATED: 'subscription_created',
};

export interface Tier {
  name: string;
  id: 'starter' | 'fluent' | 'polyglot';
  icon: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}

export const PricingTier: Tier[] = [
  {
    name: 'Fluent',
    id: 'fluent',
    icon: 'free-icon.svg',
    description:
      'Ideal for individuals who want to get started with simple design tasks.',
    features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
    featured: false,
    priceId: {
      month: 'pri_01jcxqrj1vm7xma5nc1m7paewg',
      year: 'pri_01jcxqtwyd8dh3bk6xetjp7emz',
    },
  },
  {
    name: 'Polyglot',
    id: 'polyglot',
    icon: 'basic-icon.svg',
    description:
      'Enhanced design tools for scaling teams who need more flexibility.',
    features: [
      'Integrations',
      'Unlimited workspaces',
      'Advanced editing tools',
      'Everything in Starter',
    ],
    featured: true,
    priceId: {
      month: 'pri_01jcxqvza17n9gg1jg0c4a30f0',
      year: 'pri_01jcxqwys7bwj3nng3venwa1jf',
    },
  },
];

export interface IBillingFrequency {
  value: string;
  label: string;
  priceSuffix: string;
}

export const BillingFrequency: IBillingFrequency[] = [
  { value: 'month', label: 'Monthly', priceSuffix: 'per user/month' },
  { value: 'year', label: 'Annual', priceSuffix: 'per user/year' },
];

export const AVAILABLE_LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Chinese (Simplified)', code: 'zh-CN' },
  { name: 'Chinese (Traditional)', code: 'zh-TW' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Italian', code: 'it' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Ukrainian', code: 'uk' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Bengali', code: 'bn' },
  { name: 'Urdu', code: 'ur' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Vietnamese', code: 'vi' },
  { name: 'Thai', code: 'th' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Dutch', code: 'nl' },
  { name: 'Polish', code: 'pl' },
  { name: 'Greek', code: 'el' },
  { name: 'Czech', code: 'cs' },
  { name: 'Danish', code: 'da' },
  { name: 'Finnish', code: 'fi' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Hebrew', code: 'he' },
  { name: 'Indonesian', code: 'id' },
  { name: 'Malay', code: 'ms' },
];
