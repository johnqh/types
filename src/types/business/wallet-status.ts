/**
 * Wallet status management types
 * Defines the structure for tracking wallet connection and verification state
 */

import { Optional } from '../common';

/**
 * Wallet status interface representing the current state of wallet connection
 */
export interface WalletStatus {
  /** The connected wallet address */
  walletAddress: string;
  /** Optional verification message (present when wallet is verified) */
  message?: string;
  /** Optional signature (present when wallet is verified) */
  signature?: string;
}

/**
 * Wallet connection state enum
 */
export enum WalletConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTED = 'connected',
  VERIFIED = 'verified',
}

/**
 * Type guard to check if wallet status is defined
 */
export const isWalletConnected = (
  status: Optional<WalletStatus>
): status is WalletStatus => {
  return status !== undefined && status !== null && Boolean(status.walletAddress);
};

/**
 * Type guard to check if wallet is verified (has message and signature)
 */
export const isWalletVerified = (
  status: Optional<WalletStatus>
): status is Required<WalletStatus> => {
  return (
    isWalletConnected(status) &&
    Boolean(status.message) &&
    Boolean(status.signature)
  );
};

/**
 * Get current wallet connection state
 */
export const getWalletConnectionState = (
  status: Optional<WalletStatus>
): WalletConnectionState => {
  if (!isWalletConnected(status)) {
    return WalletConnectionState.DISCONNECTED;
  }

  if (isWalletVerified(status)) {
    return WalletConnectionState.VERIFIED;
  }

  return WalletConnectionState.CONNECTED;
};
