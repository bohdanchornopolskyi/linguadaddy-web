import {
  AUTHENTICATION_ERROR_MESSAGE,
  EMAIL_IN_USE_ERROR_MESSAGE,
  INVALID_CREDENTIALS_ERROR_MESSAGE,
  RESOURCE_NOT_FOUND_ERROR_MESSAGE,
  TOKEN_EXPIRED_ERROR_MESSAGE,
} from '@/lib/constants';

export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = 'AuthenticationError';
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super(EMAIL_IN_USE_ERROR_MESSAGE);
    this.name = 'EmailInUseError';
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super(RESOURCE_NOT_FOUND_ERROR_MESSAGE);
    this.name = 'NotFoundError';
  }
}

export class TokenExpiredError extends PublicError {
  constructor() {
    super(TOKEN_EXPIRED_ERROR_MESSAGE);
    this.name = 'TokenExpiredError';
  }
}

export class LoginError extends PublicError {
  constructor(message: string) {
    super(message || INVALID_CREDENTIALS_ERROR_MESSAGE);
    this.name = 'LoginError';
  }
}
