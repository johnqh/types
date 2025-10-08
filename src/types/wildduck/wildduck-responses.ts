/**
 * @fileoverview WildDuck API response type definitions
 * @description Complete type definitions for WildDuck email server API responses
 * @package @johnqh/types
 */

import { Optional } from '../common';
import { FilterQuery, FilterAction } from './wildduck-requests';

// =============================================================================
// WILDDUCK API RESPONSE TYPES
// =============================================================================

/**
 * WildDuck Authentication Response Types
 * Used for blockchain-based authentication with wallet signatures
 */
export interface WildDuckAuthResponse {
  success: boolean;
  id: Optional<string>;
  username: Optional<string>;
  address: Optional<string>;
  scope: Optional<string[]>;
  token: Optional<string>;
  require2fa: Optional<string[]>;
  requirePasswordChange: Optional<boolean>;
  message: Optional<string>;
  error: Optional<string>;
}

export interface WildDuckPreAuthResponse {
  success: boolean;
  id: Optional<string>;
  username: Optional<string>;
  address: Optional<string>;
  scope: Optional<string[]>;
  require2fa: Optional<string[]>;
  requirePasswordChange: Optional<boolean>;
  message: Optional<string>;
  nonce: Optional<string>;
}

/**
 * WildDuck User Management Response Types
 * For user account creation, updates, and management
 */
export interface WildDuckUser {
  id: string;
  username: string;
  name: Optional<string>;
  address: Optional<string>;
  language: Optional<string>;
  retention: Optional<number>;
  quota: Optional<{
    allowed: number;
    used: number;
  }>;
  disabled: boolean;
  suspended: boolean;
  tags: Optional<string[]>;
  hasPasswordSet: Optional<boolean>;
  activated: Optional<boolean>;
  created: Optional<string>;
}

export interface WildDuckUserResponse {
  success: boolean;
  id: Optional<string>;
  error: Optional<string>;
}

/**
 * User information response (detailed)
 */
export interface UserInfo {
  success: boolean;
  id: string;
  username: string;
  name?: string;
  address: string;
  retention?: number;
  enabled2fa?: string[];
  autoreply?: boolean;
  encryptMessages?: boolean;
  encryptForwarded?: boolean;
  pubKey?: string;
  metaData?: Record<string, unknown>;
  internalData?: Record<string, unknown>;
  hasPasswordSet?: boolean;
  activated?: boolean;
  disabled?: boolean;
  suspended?: boolean;
  quota: {
    allowed: number;
    used: number;
  };
  targets?: string[];
  spamLevel?: number;
  uploadSentMessages?: boolean;
  mtaRelay?: string;
  limits: {
    quota: {
      allowed: number;
      used: number;
    };
    recipients?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    forwards?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    received?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    imapUpload?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    imapDownload?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    pop3Download?: {
      allowed: number;
      used: number;
      ttl: number;
    };
    imapMaxConnections?: {
      allowed: number;
    };
  };
  tags?: string[];
  disabledScopes?: string[];
  fromWhitelist?: string[];
}

/**
 * WildDuck Mailbox Response Types
 * For email folder/mailbox management
 */
export interface WildDuckMailbox {
  id: string;
  name: string;
  path: string;
  specialUse: Optional<
    'Inbox' | 'Sent' | 'Trash' | 'Drafts' | 'Junk' | 'Archive'
  >;
  modifyIndex: number;
  subscribed: boolean;
  hidden: boolean;
  total: Optional<number>;
  unseen: Optional<number>;
  size: Optional<number>;
}

export interface WildDuckMailboxResponse {
  success: boolean;
  results: WildDuckMailbox[];
  error: Optional<string>;
}

/**
 * WildDuck Message Response Types
 * For email message handling and operations
 */
export interface WildDuckMessageAddress {
  name: Optional<string>;
  address: string;
}

export interface WildDuckMessageAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  hash: Optional<string>;
}

export interface WildDuckMessageBase {
  id: string;
  mailbox: string;
  thread: string;
  from: Optional<WildDuckMessageAddress>;
  to: WildDuckMessageAddress[];
  cc: Optional<WildDuckMessageAddress[]>;
  bcc: Optional<WildDuckMessageAddress[]>;
  subject: string;
  date: string;
  intro: string;
  seen: boolean;
  deleted: boolean;
  flagged: boolean;
  draft: boolean;
  answered: boolean;
  size: number;
  ha: boolean; // has attachments
}

export interface WildDuckMessage extends WildDuckMessageBase {
  attachments: boolean;
}

export interface WildDuckMessageDetail extends WildDuckMessageBase {
  user: string;
  html: Optional<string>;
  text: Optional<string>;
  headers: Optional<Record<string, string | string[]>>;
  attachments: WildDuckMessageAttachment[];
  references: Optional<string[]>;
  inReplyTo: Optional<string>;
}

export interface WildDuckMessagesResponse {
  success: boolean;
  total: number;
  page: number;
  previousCursor: Optional<string>;
  nextCursor: Optional<string>;
  results: WildDuckMessage[];
  error?: string;
}

export interface WildDuckMessageResponse {
  success: boolean;
  data: Optional<WildDuckMessageDetail>;
  error: Optional<string>;
}

/**
 * WildDuck Address Response Types
 * For email address management
 */
export interface WildDuckAddress {
  id: string;
  address: string;
  name: Optional<string>;
  main: boolean;
  created: Optional<string>;
  metaData: Optional<Record<string, unknown>>;
  tags: Optional<string[]>;
}

export interface WildDuckAddressResponse {
  success: boolean;
  results: Optional<WildDuckAddress[]>;
  error: Optional<string>;
}

/**
 * WildDuck Configuration
 */
export interface WildDuckConfig {
  backendUrl: string;
  apiToken: string;
  cloudflareWorkerUrl?: string;
}

/**
 * WildDuck Health Check Response
 */
export interface WildDuckHealthResponse {
  success: boolean;
  status: 'ok' | 'error';
  version?: string;
  error?: string;
}

export interface WildDuckHealthStatus {
  healthy: boolean;
  version: Optional<string>;
  lastChecked: Optional<Date>;
}

/**
 * WildDuck User Settings Response
 */
export interface WildDuckUserSettings {
  existingPasswords?: {
    allowed: number;
  };
  internalData?: Record<string, unknown>;
}

/**
 * WildDuck Settings Response
 */
export interface WildDuckSettings {
  success: boolean;
  limits?: {
    quota?: {
      allowed: number;
      used: number;
    };
  };
  error?: string;
}

/**
 * WildDuck Filter Response Types
 * Note: FilterQuery and FilterAction are defined in wildduck-requests.ts
 */

/** Email filter */
export interface EmailFilter {
  id: string;
  name: string;
  query: FilterQuery;
  action: FilterAction;
  disabled?: boolean;
}

/** Response from getting all filters */
export interface FiltersResponse {
  success: boolean;
  results: EmailFilter[];
}

/** Response from filter operations */
export interface FilterResponse {
  success: boolean;
  id?: string;
}

/**
 * Auto-reply (out of office) settings response
 */
export interface AutoReplySettings {
  success: boolean;
  status?: boolean;
  name?: string;
  subject?: string;
  text?: string;
  html?: string;
  start?: string;
  end?: string;
}

/**
 * Forwarding target response types
 * Forwarding target - can be email, SMTP relay, or HTTP webhook
 * Examples:
 * - Email: "user@example.com"
 * - SMTP: "smtp://mx.example.com:25" or "smtps://smtp.example.com:465"
 * - HTTP: "http://example.com/webhook" or "https://example.com/webhook"
 */
export type ForwardingTarget = string;

export interface ForwardingTargetsResponse {
  success: boolean;
  targets?: ForwardingTarget[];
}

/**
 * Spam settings response
 */
export interface SpamSettings {
  success: boolean;
  spamLevel?: number;
  fromWhitelist?: string[];
}

/**
 * SMTP relay configuration
 * Allows users to route outbound mail through a custom SMTP server
 */
export interface SMTPRelay {
  enabled: boolean;
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

/**
 * Advanced settings response
 */
export interface AdvancedSettings {
  success: boolean;
  uploadSentMessages?: boolean;
  smtpRelay?: SMTPRelay;
}

/**
 * Type Guards
 */
export const isWildDuckAuthResponse = (obj: unknown): obj is WildDuckAuthResponse => {
  return typeof obj === 'object' && obj !== null && 'success' in obj && typeof (obj as WildDuckAuthResponse).success === 'boolean';
};

export const isWildDuckMessage = (obj: unknown): obj is WildDuckMessage => {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'subject' in obj && typeof (obj as WildDuckMessage).id === 'string' && typeof (obj as WildDuckMessage).subject === 'string';
};
