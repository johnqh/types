/**
 * Authentication utilities for wallet-based authentication
 */

import { AuthStatus } from '../../types/business/enums';
import { Optional } from '../../types/common';

/**
 * Generate an authentication message with a nonce
 */
export function generateAuthMessage(nonce?: Optional<string>): string {
  const actualNonce =
    nonce || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return `Authenticate with 0xMail\nNonce: ${actualNonce}`;
}

/**
 * Check if authentication is expired
 * @param createdAt - The date when authentication was created
 * @param expirationHours - Number of hours until expiration (default: 24)
 */
export function isAuthExpired(createdAt: Date, expirationHours = 24): boolean {
  const expirationTime = new Date(
    createdAt.getTime() + expirationHours * 60 * 60 * 1000
  );
  return new Date() > expirationTime;
}

/**
 * Get human-readable text for authentication status
 */
export function getAuthStatusText(status: AuthStatus): string {
  switch (status) {
    case AuthStatus.DISCONNECTED:
      return 'Not connected';
    case AuthStatus.CONNECTED:
      return 'Connected - Please verify';
    case AuthStatus.VERIFIED:
      return 'Authenticated';
    default:
      return 'Unknown status';
  }
}

/**
 * Check if user can access protected features
 */
export function canAccessProtectedFeatures(status: AuthStatus): boolean {
  return status === AuthStatus.VERIFIED;
}

/**
 * Check if auth status indicates wallet is connected (either connected or verified)
 */
export function isAuthStatusConnected(status: AuthStatus): boolean {
  return status === AuthStatus.CONNECTED || status === AuthStatus.VERIFIED;
}

/**
 * Generate a random nonce for authentication
 */
export function generateNonce(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Extract nonce from an authentication message
 */
export function extractNonceFromMessage(message: string): Optional<string> {
  const match = message.match(/Nonce:\s*(.+)$/m);
  return match ? match[1].trim() : undefined;
}

/**
 * Validate that a nonce meets basic requirements
 */
export function isValidNonce(nonce: string): boolean {
  if (!nonce || typeof nonce !== 'string') {
    return false;
  }

  // Nonce should be at least 10 characters
  if (nonce.length < 10) {
    return false;
  }

  // Nonce should not be too old (check if it starts with a timestamp)
  const parts = nonce.split('-');
  if (parts.length >= 2) {
    const timestamp = parseInt(parts[0], 10);
    if (!isNaN(timestamp)) {
      // Check if timestamp is within last 24 hours
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      if (timestamp < oneDayAgo) {
        return false;
      }
    }
  }

  return true;
}
