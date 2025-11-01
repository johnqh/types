import { describe, it, expect } from 'vitest';
import { EmailFolder } from '../../../src/types/business/enums';
import { MailboxSpecialUse } from '../../../src/types/wildduck/wildduck-types';

describe('Email Folder Types', () => {

  describe('Email Folder Re-exports', () => {
    it('should use MailboxSpecialUse enum values correctly', () => {
      expect(MailboxSpecialUse.Inbox).toBe('\\Inbox');
      expect(MailboxSpecialUse.Sent).toBe('\\Sent');
      expect(MailboxSpecialUse.Drafts).toBe('\\Drafts');
      expect(MailboxSpecialUse.Junk).toBe('\\Junk');
      expect(MailboxSpecialUse.Trash).toBe('\\Trash');
      expect(MailboxSpecialUse.Settings).toBe('\\App.Settings');
      expect(MailboxSpecialUse.Developer).toBe('\\App.Developer');
    });

    it('should allow EmailFolder type to accept standard and custom folders', () => {
      // EmailFolder is a type union: MailboxSpecialUse | string
      const standardFolder: EmailFolder = MailboxSpecialUse.Inbox;
      const customFolder: EmailFolder = 'my-custom-folder';

      expect(standardFolder).toBe('\\Inbox');
      expect(customFolder).toBe('my-custom-folder');
    });

    it('should work with EmailFolder type assignments', () => {
      const folders: EmailFolder[] = [
        MailboxSpecialUse.Inbox,
        MailboxSpecialUse.Sent,
        'custom-folder-1',
        'custom-folder-2',
      ];

      expect(folders).toContain('\\Inbox');
      expect(folders).toContain('\\Sent');
      expect(folders).toContain('custom-folder-1');
      expect(folders).toContain('custom-folder-2');
      expect(folders).toHaveLength(4);
    });
  });
});
