import { EmailFolder } from './enums';
import { WalletData, FolderBase, MessageBase, Optional } from '../common';

export interface Email extends MessageBase {
  id: string;
  date: Date;
  read: boolean;
  starred: boolean;
  important?: Optional<boolean>;
  folder: EmailFolder;
  labels?: Optional<string[]>;
  attachments?: Optional<string[]>;
}

export interface Folder extends FolderBase {}

export interface EmailAddress {
  id: string;
  address: string;
  verified: boolean;
  primary?: Optional<boolean>;
  createdAt: Date;
  updatedAt?: Optional<Date>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: Optional<string>;
  emailAddresses: EmailAddress[];
}

// WalletUserData interface for wallet-based user information
export interface WalletUserData extends WalletData {
  walletType?: Optional<string>;
  displayName?: Optional<string>;
  avatar?: Optional<string>;
  metadata?: Optional<Record<string, unknown>>;
}

// Export the types that were imported from enums
export type { EmailFolder };
