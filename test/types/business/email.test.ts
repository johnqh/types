import { describe, it, expect } from 'vitest';
import { ChainType, MailboxType } from '../../../src/types/business/enums';
import { EmailFolder, type WalletUserData } from '../../../src/types/business/email';

describe('Email Types', () => {
  describe('WalletUserData', () => {
    it('should have required fields', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: ChainType.EVM,
      };

      expect(userData.walletAddress).toBe(
        '0x1234567890123456789012345678901234567890'
      );
      expect(userData.chainType).toBe('evm');
    });

    it('should accept optional fields', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: ChainType.SOLANA,
        walletType: 'metamask',
        displayName: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        metadata: {
          lastLogin: '2023-01-01T00:00:00Z',
          preferences: { theme: 'dark' },
          settings: { notifications: true },
        },
      };

      expect(userData.walletType).toBe('metamask');
      expect(userData.displayName).toBe('John Doe');
      expect(userData.avatar).toBe('https://example.com/avatar.jpg');
      expect(userData.metadata?.lastLogin).toBe('2023-01-01T00:00:00Z');
    });

    it('should work with different chain types', () => {
      const evmUser: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: ChainType.EVM,
      };

      const solanaUser: WalletUserData = {
        walletAddress: 'DsK1234567890123456789012345678901234567890',
        chainType: ChainType.SOLANA,
      };

      expect(evmUser.chainType).toBe(ChainType.EVM);
      expect(solanaUser.chainType).toBe(ChainType.SOLANA);
    });

    it('should handle complex metadata', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: ChainType.EVM,
        metadata: {
          userProfile: {
            bio: 'Web3 enthusiast',
            location: 'Decentralized',
            socialLinks: {
              twitter: '@user123',
              github: 'user123',
            },
          },
          accountSettings: {
            emailNotifications: true,
            privacy: {
              showAddress: false,
              showActivity: true,
            },
          },
          statistics: {
            totalTransactions: 150,
            totalVolume: '1000000000000000000',
            firstActivity: '2022-01-01T00:00:00Z',
          },
        },
      };

      expect(userData.metadata?.userProfile).toBeDefined();
      expect(userData.metadata?.accountSettings).toBeDefined();
      expect(userData.metadata?.statistics).toBeDefined();
    });

    it('should work without optional metadata', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: ChainType.EVM,
        walletType: 'walletconnect',
        displayName: 'Alice',
      };

      expect(userData.metadata).toBeUndefined();
      expect(userData.walletType).toBe('walletconnect');
      expect(userData.displayName).toBe('Alice');
    });
  });

  describe('Email Folder Re-exports', () => {
    it('should use MailboxType enum values correctly', () => {
      expect(MailboxType.INBOX).toBe('inbox');
      expect(MailboxType.SENT).toBe('sent');
      expect(MailboxType.DRAFTS).toBe('drafts');
      expect(MailboxType.SPAM).toBe('spam');
      expect(MailboxType.TRASH).toBe('trash');
      expect(MailboxType.STARRED).toBe('starred');
      expect(MailboxType.SNOOZED).toBe('snoozed');
      expect(MailboxType.ARCHIVE).toBe('archive');
      expect(MailboxType.SETTINGS).toBe('settings');
      expect(MailboxType.DEVELOPER).toBe('developer');
    });

    it('should allow EmailFolder type to accept standard and custom folders', () => {
      // EmailFolder is a type union: MailboxType | string
      const standardFolder: EmailFolder = MailboxType.INBOX;
      const customFolder: EmailFolder = 'my-custom-folder';

      expect(standardFolder).toBe('inbox');
      expect(customFolder).toBe('my-custom-folder');
    });

    it('should work with EmailFolder type assignments', () => {
      const folders: EmailFolder[] = [
        MailboxType.INBOX,
        MailboxType.SENT,
        'custom-folder-1',
        'custom-folder-2',
      ];

      expect(folders).toContain('inbox');
      expect(folders).toContain('sent');
      expect(folders).toContain('custom-folder-1');
      expect(folders).toContain('custom-folder-2');
      expect(folders).toHaveLength(4);
    });
  });
});
