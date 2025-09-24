/**
 * Mailbox related types
 */

import { FolderBase } from '../common';

export interface MailBox extends FolderBase {
  id: string;
  icon: string;
  path?: string;
  specialUse?: string;
  subscribed?: boolean;
  hidden?: boolean;
}

export interface DefaultFolder {
  id: string;
  name: string;
  iconId: string;
  specialUse?: string;
}
