import { describe, it, expect } from 'vitest';
import { StandardEmailFolder } from './enums';
import { EmailFolder, type WalletUserData } from './email';

describe('Email Types', () => {
  describe('WalletUserData', () => {
    it('should have required fields', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: 'evm',
      };

      expect(userData.walletAddress).toBe(
        '0x1234567890123456789012345678901234567890'
      );
      expect(userData.chainType).toBe('evm');
    });

    it('should accept optional fields', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: 'solana',
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
        chainType: 'evm',
      };

      const solanaUser: WalletUserData = {
        walletAddress: 'DsK1234567890123456789012345678901234567890',
        chainType: 'solana',
      };

      expect(evmUser.chainType).toBe('evm');
      expect(solanaUser.chainType).toBe('solana');
    });

    it('should handle complex metadata', () => {
      const userData: WalletUserData = {
        walletAddress: '0x1234567890123456789012345678901234567890',
        chainType: 'evm',
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
        chainType: 'evm',
        walletType: 'walletconnect',
        displayName: 'Alice',
      };

      expect(userData.metadata).toBeUndefined();
      expect(userData.walletType).toBe('walletconnect');
      expect(userData.displayName).toBe('Alice');
    });
  });

  describe('Email Folder Re-exports', () => {
    it('should re-export StandardEmailFolder enum correctly', () => {
      expect(StandardEmailFolder.INBOX).toBe('inbox');
      expect(StandardEmailFolder.SENT).toBe('sent');
      expect(StandardEmailFolder.DRAFTS).toBe('drafts');
      expect(StandardEmailFolder.SPAM).toBe('spam');
      expect(StandardEmailFolder.TRASH).toBe('trash');
      expect(StandardEmailFolder.STARRED).toBe('starred');
      expect(StandardEmailFolder.SNOOZED).toBe('snoozed');
      expect(StandardEmailFolder.ARCHIVE).toBe('archive');
    });

    it('should allow EmailFolder type to accept standard and custom folders', () => {
      // EmailFolder is a type union: StandardEmailFolder | string
      const standardFolder: EmailFolder = StandardEmailFolder.INBOX;
      const customFolder: EmailFolder = 'my-custom-folder';

      expect(standardFolder).toBe('inbox');
      expect(customFolder).toBe('my-custom-folder');
    });

    it('should work with EmailFolder type assignments', () => {
      const folders: EmailFolder[] = [
        StandardEmailFolder.INBOX,
        StandardEmailFolder.SENT,
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
