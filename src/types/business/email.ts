import { EmailFolder, StandardEmailFolder } from './enums';
import { WalletData } from '../common';

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  important?: boolean;
  folder: EmailFolder;
  labels?: string[];
  attachments?: string[];
}

export interface Folder {
  name: string;
  count: number;
  unreadCount: number;
}

export interface EmailAddress {
  id: string;
  address: string;
  verified: boolean;
  primary?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  emailAddresses: EmailAddress[];
}

// WalletUserData interface for wallet-based user information
export interface WalletUserData extends WalletData {
  walletType?: string;
  displayName?: string;
  avatar?: string;
  metadata?: Record<string, unknown>;
}

// Export the types that were imported from enums
export type { EmailFolder, StandardEmailFolder };
