import { EmailFolder } from './enums';
import { WalletData, FolderBase, MessageBase } from '../common';

export interface Email extends MessageBase {
  id: string;
  date: Date;
  read: boolean;
  starred: boolean;
  important?: boolean;
  folder: EmailFolder;
  labels?: string[];
  attachments?: string[];
}

export interface Folder extends FolderBase {}

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
export type { EmailFolder };
