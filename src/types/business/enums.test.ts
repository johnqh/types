import { describe, it, expect } from 'vitest';
import {
  ChainType,
  EmailFolder,
  StandardEmailFolder,
  SortOrder,
  Theme,
  NotificationType,
  EmailFolderUtils,
} from './enums';

describe('Business Enums', () => {
  describe('ChainType', () => {
    it('should have correct values', () => {
      expect(ChainType.EVM).toBe('evm');
      expect(ChainType.ETHEREUM).toBe('ethereum');
      expect(ChainType.SOLANA).toBe('solana');
      expect(ChainType.UNKNOWN).toBe('unknown');
    });

    it('should have all expected chain types', () => {
      const chainTypes = Object.values(ChainType);
      expect(chainTypes).toContain('evm');
      expect(chainTypes).toContain('ethereum');
      expect(chainTypes).toContain('solana');
      expect(chainTypes).toContain('unknown');
      expect(chainTypes).toHaveLength(4);
    });
  });

  describe('EmailFolder', () => {
    it('should be a type that includes StandardEmailFolder', () => {
      // EmailFolder is a type union, not an enum, so we test with values
      const standardFolder: EmailFolder = StandardEmailFolder.INBOX;
      const customFolder: EmailFolder = 'custom-folder';

      expect(standardFolder).toBe('inbox');
      expect(customFolder).toBe('custom-folder');
    });

    it('should work with EmailFolderUtils', () => {
      expect(EmailFolderUtils.isStandardFolder('inbox')).toBe(true);
      expect(EmailFolderUtils.isStandardFolder('custom-folder')).toBe(false);
      expect(EmailFolderUtils.isCustomFolder('custom-folder')).toBe(true);
      expect(EmailFolderUtils.displayName('inbox')).toBe('Inbox');
    });
  });

  describe('StandardEmailFolder', () => {
    it('should have correct values', () => {
      expect(StandardEmailFolder.INBOX).toBe('inbox');
      expect(StandardEmailFolder.SENT).toBe('sent');
      expect(StandardEmailFolder.DRAFTS).toBe('drafts');
      expect(StandardEmailFolder.SPAM).toBe('spam');
      expect(StandardEmailFolder.TRASH).toBe('trash');
      expect(StandardEmailFolder.STARRED).toBe('starred');
      expect(StandardEmailFolder.SNOOZED).toBe('snoozed');
      expect(StandardEmailFolder.ARCHIVE).toBe('archive');
    });

    it('should have all expected standard folders', () => {
      const folders = Object.values(StandardEmailFolder);
      expect(folders).toContain('inbox');
      expect(folders).toContain('sent');
      expect(folders).toContain('drafts');
      expect(folders).toContain('spam');
      expect(folders).toContain('trash');
      expect(folders).toContain('starred');
      expect(folders).toContain('snoozed');
      expect(folders).toContain('archive');
      expect(folders).toHaveLength(8);
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
