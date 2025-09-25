/**
 * Mailbox related types
 */

import { FolderBase, Optional } from '../common';

export interface MailBox extends FolderBase {
  id: string;
  icon: string;
  path?: Optional<string>;
  specialUse?: Optional<string>;
  subscribed?: Optional<boolean>;
  hidden?: Optional<boolean>;
}

export interface DefaultFolder {
  id: string;
  name: string;
  iconId: string;
  specialUse?: Optional<string>;
}
