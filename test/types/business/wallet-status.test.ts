import { describe, it, expect } from 'vitest';
import {
  isWalletConnected,
  isWalletVerified,
  getWalletConnectionState,
} from '../../../src/types/business/wallet-status';
import {
  ChainType,
  ConnectionState,
} from '../../../src/types/business/enums';

describe('Wallet Status', () => {
  describe('isWalletConnected', () => {
    it('should return true for connected wallet', () => {
      expect(
        isWalletConnected({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
        })
      ).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(isWalletConnected(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isWalletConnected(null)).toBe(false);
    });

    it('should return false for empty wallet address', () => {
      expect(
        isWalletConnected({
          walletAddress: '',
          chainType: ChainType.EVM,
        })
      ).toBe(false);
    });

    it('should return true for Solana wallet', () => {
      expect(
        isWalletConnected({
          walletAddress:
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          chainType: ChainType.SOLANA,
        })
      ).toBe(true);
    });
  });

  describe('isWalletVerified', () => {
    it('should return true when wallet has message and signature', () => {
      expect(
        isWalletVerified({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
          message: 'Sign this message',
          signature: '0xsig...',
        })
      ).toBe(true);
    });

    it('should return false when message is missing', () => {
      expect(
        isWalletVerified({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
          signature: '0xsig...',
        })
      ).toBe(false);
    });

    it('should return false when signature is missing', () => {
      expect(
        isWalletVerified({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
          message: 'Sign this',
        })
      ).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isWalletVerified(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isWalletVerified(null)).toBe(false);
    });

    it('should return false when wallet address is empty', () => {
      expect(
        isWalletVerified({
          walletAddress: '',
          chainType: ChainType.EVM,
          message: 'Sign this',
          signature: '0xsig...',
        })
      ).toBe(false);
    });

    it('should return false when message is empty string', () => {
      expect(
        isWalletVerified({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
          message: '',
          signature: '0xsig...',
        })
      ).toBe(false);
    });
  });

  describe('getWalletConnectionState', () => {
    it('should return DISCONNECTED for undefined', () => {
      expect(getWalletConnectionState(undefined)).toBe(
        ConnectionState.DISCONNECTED
      );
    });

    it('should return DISCONNECTED for null', () => {
      expect(getWalletConnectionState(null)).toBe(
        ConnectionState.DISCONNECTED
      );
    });

    it('should return CONNECTED for connected but unverified wallet', () => {
      expect(
        getWalletConnectionState({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
        })
      ).toBe(ConnectionState.CONNECTED);
    });

    it('should return VERIFIED for verified wallet', () => {
      expect(
        getWalletConnectionState({
          walletAddress: '0x1234567890123456789012345678901234567890',
          chainType: ChainType.EVM,
          message: 'Sign this',
          signature: '0xsig...',
        })
      ).toBe(ConnectionState.VERIFIED);
    });

    it('should return DISCONNECTED for empty wallet address', () => {
      expect(
        getWalletConnectionState({
          walletAddress: '',
          chainType: ChainType.EVM,
        })
      ).toBe(ConnectionState.DISCONNECTED);
    });
  });
});
