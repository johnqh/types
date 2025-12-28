import { describe, it, expect } from 'vitest';
import {
  ChainType,
  EmailFolder,
  SortOrder,
  Theme,
  NotificationType,
  EmailFolderUtils,
  MailboxSpecialUse,
} from '../../../src/types/business/enums';

describe('Business Enums', () => {
  describe('ChainType', () => {
    it('should have correct values', () => {
      expect(ChainType.EVM).toBe('evm');
      expect(ChainType.SOLANA).toBe('solana');
    });

    it('should have all expected chain types', () => {
      const chainTypes = Object.values(ChainType);
      expect(chainTypes).toContain('evm');
      expect(chainTypes).toContain('solana');
      expect(chainTypes).toHaveLength(2);
    });
  });

  describe('EmailFolder', () => {
    it('should be a type that includes MailboxSpecialUse', () => {
      // EmailFolder is a type union, not an enum, so we test with values
      const standardFolder: EmailFolder = MailboxSpecialUse.Inbox;
      const customFolder: EmailFolder = 'custom-folder';

      expect(standardFolder).toBe('\\Inbox');
      expect(customFolder).toBe('custom-folder');
    });

    it('should work with EmailFolderUtils', () => {
      expect(EmailFolderUtils.isStandardFolder('\\Inbox')).toBe(true);
      expect(EmailFolderUtils.isStandardFolder('custom-folder')).toBe(false);
      expect(EmailFolderUtils.isCustomFolder('custom-folder')).toBe(true);
      expect(EmailFolderUtils.displayName('\\Inbox')).toBe('\\Inbox');
    });
  });

  describe('MailboxSpecialUse', () => {
    it('should have correct values', () => {
      expect(MailboxSpecialUse.Inbox).toBe('\\Inbox');
      expect(MailboxSpecialUse.Sent).toBe('\\Sent');
      expect(MailboxSpecialUse.Drafts).toBe('\\Drafts');
      expect(MailboxSpecialUse.Junk).toBe('\\Junk');
      expect(MailboxSpecialUse.Trash).toBe('\\Trash');
      expect(MailboxSpecialUse.Settings).toBe('\\App.Settings');
      expect(MailboxSpecialUse.Developer).toBe('\\App.Developer');
    });

    it('should have all expected standard folders', () => {
      const folders = Object.values(MailboxSpecialUse);
      expect(folders).toContain('\\Inbox');
      expect(folders).toContain('\\Sent');
      expect(folders).toContain('\\Drafts');
      expect(folders).toContain('\\Junk');
      expect(folders).toContain('\\Trash');
      expect(folders).toContain('\\App.Settings');
      expect(folders).toContain('\\App.Developer');
      expect(folders).toHaveLength(7); // Inbox, Sent, Trash, Drafts, Junk, Settings, Developer
    });
  });

  describe('NotificationType', () => {
    it('should have correct values', () => {
      expect(NotificationType.INFO).toBe('info');
      expect(NotificationType.SUCCESS).toBe('success');
      expect(NotificationType.WARNING).toBe('warning');
      expect(NotificationType.ERROR).toBe('error');
    });

    it('should have all expected notification types', () => {
      const types = Object.values(NotificationType);
      expect(types).toContain('info');
      expect(types).toContain('success');
      expect(types).toContain('warning');
      expect(types).toContain('error');
      expect(types).toHaveLength(4);
    });
  });

  describe('Theme', () => {
    it('should have correct values', () => {
      expect(Theme.LIGHT).toBe('light');
      expect(Theme.DARK).toBe('dark');
      expect(Theme.SYSTEM).toBe('system');
    });

    it('should have all expected themes', () => {
      const themes = Object.values(Theme);
      expect(themes).toContain('light');
      expect(themes).toContain('dark');
      expect(themes).toContain('system');
      expect(themes).toHaveLength(3);
    });
  });

  describe('SortOrder', () => {
    it('should have correct values', () => {
      expect(SortOrder.ASC).toBe('asc');
      expect(SortOrder.DESC).toBe('desc');
    });

    it('should have all expected sort orders', () => {
      const orders = Object.values(SortOrder);
      expect(orders).toContain('asc');
      expect(orders).toContain('desc');
      expect(orders).toHaveLength(2);
    });
  });
});
