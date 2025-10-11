/**
 * KYC (Know Your Customer) Verification Types
 *
 * Types for the 0xmail KYC verification service which integrates
 * with Sumsub for identity verification at three levels:
 * - Basic: Age and identity verification (18+)
 * - Enhanced: Basic + country verification + AML screening
 * - Accredited: Enhanced + financial verification for accredited investors
 */

import type { ChainType } from '../business/enums';

// ============================================
// Verification Levels
// ============================================

/**
 * Available KYC verification levels
 */
export type KYCVerificationLevel = 'basic' | 'enhanced' | 'accredited';

/**
 * Status of a KYC application throughout its lifecycle
 */
export type KYCApplicationStatus =
  | 'PENDING'      // User created application but hasn't started
  | 'INITIATED'    // Sumsub applicant created
  | 'IN_PROGRESS'  // User is uploading documents
  | 'SUBMITTED'    // User submitted for review
  | 'COMPLETED'    // Verification completed (any result)
  | 'REJECTED';    // Final rejection after max retries

/**
 * Sumsub review status values
 */
export type SumsubReviewStatus = 'init' | 'pending' | 'prechecked' | 'completed';

/**
 * Sumsub review answer (verification result)
 */
export type SumsubReviewAnswer = 'GREEN' | 'RED' | 'YELLOW';

// ============================================
// Database Models
// ============================================

/**
 * KYC Application record
 * Main table tracking user's KYC verification applications
 */
export interface KYCApplication {
  id: string;
  walletAddress: string;
  email: string;
  chainType: ChainType;
  sumsubApplicantId: string | null;
  metadata: Record<string, unknown>;
  verificationLevel: KYCVerificationLevel;
  status: KYCApplicationStatus;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Verification Result record
 * Stores the outcome of verification for each level
 */
export interface VerificationResult {
  id: string;
  kycApplicationId: string;
  verificationLevel: KYCVerificationLevel;
  status: SumsubReviewAnswer;
  reviewStatus: SumsubReviewStatus;
  countryCode: string | null;
  ageVerified: boolean;
  accreditedInvestor: boolean;
  verificationDate: Date | null;
  subscriptionExpiresAt: Date | null; // 12 months from verification
  sumsubReviewId: string | null;
  sumsubInspectionId: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Consent record
 * Tracks user consent for third-party DApp access
 */
export interface UserConsent {
  id: string;
  walletAddress: string;
  dappIdentifier: string;
  signedMessage: string;
  signature: string;
  consentScope: {
    levels: KYCVerificationLevel[];
    fields: string[];
  };
  grantedAt: Date;
  expiresAt: Date | null;
  revoked: boolean;
  revokedAt: Date | null;
}

// ============================================
// Sumsub API Types
// ============================================

/**
 * Sumsub configuration
 */
export interface SumsubConfig {
  appToken: string;
  secretKey: string;
  baseUrl: string;
  webhookSecret: string;
}

/**
 * Data required to create a Sumsub applicant
 */
export interface SumsubApplicantData {
  externalUserId: string; // wallet address
  email: string;
  type: 'individual';
  fixedInfo?: {
    country?: string;
  };
}

/**
 * Sumsub webhook payload structure
 */
export interface SumsubWebhookPayload {
  applicantId: string;
  inspectionId: string;
  applicantType: 'individual' | 'company';
  correlationId: string;
  externalUserId: string; // wallet address
  levelName: string;
  sandboxMode: boolean;
  reviewStatus: SumsubReviewStatus;
  reviewResult: {
    moderationComment: string;
    clientComment: string;
    reviewAnswer: SumsubReviewAnswer;
    rejectLabels: string[];
    reviewRejectType: 'FINAL' | 'RETRY' | 'EXTERNAL';
  };
  createdAtMs: string;
  clientId: string;
}

/**
 * Sumsub applicant status response
 */
export interface SumsubApplicantStatus {
  applicantId: string;
  reviewStatus: SumsubReviewStatus;
  reviewResult?: {
    reviewAnswer: SumsubReviewAnswer;
    rejectLabels: string[];
  };
  info?: {
    idDocs?: Array<{
      country?: string;
      fields?: {
        dob?: string;
        firstName?: string;
        lastName?: string;
      };
    }>;
    addresses?: Array<{
      country?: string;
    }>;
    questionnaires?: Array<{
      sections?: {
        income?: { annualIncome?: string };
        wealth?: { netWorth?: string };
        professional?: { designation?: string };
      };
    }>;
  };
}

// ============================================
// API Request/Response Types
// ============================================

/**
 * Request to initiate KYC verification
 */
export interface InitiateKYCRequest {
  walletAddress: string;
  chainType: ChainType;
  verificationLevel: KYCVerificationLevel;
}

/**
 * Response from initiating KYC verification
 */
export interface InitiateKYCResponse {
  applicationId: string;
  sumsubAccessToken: string; // For embedding Sumsub Web SDK
  status: KYCApplicationStatus;
  verificationLevel: KYCVerificationLevel;
}

/**
 * Response from getting KYC status
 */
export interface GetKYCStatusResponse {
  applicationId: string;
  walletAddress: string;
  verificationLevel: KYCVerificationLevel;
  status: KYCApplicationStatus;
  results: {
    basic?: VerificationLevelStatus;
    enhanced?: VerificationLevelStatus;
    accredited?: VerificationLevelStatus;
  };
  canRetry: boolean;
  retriesRemaining: number;
}

/**
 * Status for a specific verification level
 */
export interface VerificationLevelStatus {
  verified: boolean;
  status: SumsubReviewAnswer;
  ageVerified?: boolean;
  countryAllowed?: boolean;
  countryCode?: string;
  accreditedInvestor?: boolean;
  verifiedAt?: Date;
  subscriptionExpiresAt?: Date;
}

// ============================================
// Third-Party DApp API Types
// ============================================

/**
 * Request from third-party DApp to verify a user
 */
export interface VerifyUserRequest {
  walletAddress: string;
  signedConsent: string; // User's signature approving DApp access
  consentMessage: string; // Original message that was signed
  dappIdentifier: string; // Domain or app name
  requestedLevel: KYCVerificationLevel;
}

/**
 * Response to third-party DApp verification request
 */
export interface VerifyUserResponse {
  verified: boolean;
  level: KYCVerificationLevel;
  ageVerified: boolean;
  countryAllowed: boolean;
  accreditedInvestor: boolean;
  verifiedAt: Date;
  subscriptionExpiresAt: Date;
}

/**
 * Request to revoke consent for a DApp
 */
export interface RevokeConsentRequest {
  walletAddress: string;
  dappIdentifier: string;
  signature: string; // Wallet signature proving ownership
}

/**
 * Response to consent revocation
 */
export interface RevokeConsentResponse {
  success: boolean;
  revokedAt: Date;
}

/**
 * Get user's granted consents
 */
export interface GetConsentsResponse {
  consents: Array<{
    dappIdentifier: string;
    grantedAt: Date;
    expiresAt: Date | null;
    scope: {
      levels: KYCVerificationLevel[];
      fields: string[];
    };
  }>;
}
