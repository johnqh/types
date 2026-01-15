/**
 * @fileoverview Entity Request Type Definitions
 * @description Request types for entity API endpoints
 */

import type { EntityRole } from './entity';

// ========================================
// ENTITY REQUESTS
// ========================================

/**
 * Request to create a new organization entity.
 * Personal entities are created automatically and cannot be created via API.
 */
export interface CreateEntityRequest {
  /** Display name for the organization */
  displayName: string;
  /** Optional custom slug (8-12 alphanumeric). Auto-generated if not provided */
  entitySlug?: string;
  /** Optional description */
  description?: string;
}

/**
 * Request to update an entity's details.
 * Only owners and managers can update entity settings.
 */
export interface UpdateEntityRequest {
  /** New display name */
  displayName?: string;
  /** New slug (must be unique and available) */
  entitySlug?: string;
  /** New description */
  description?: string;
  /** New avatar URL */
  avatarUrl?: string;
}

// ========================================
// MEMBER REQUESTS
// ========================================

/**
 * Request to update a member's role.
 * Only owners can update member roles.
 */
export interface UpdateMemberRoleRequest {
  /** New role for the member */
  role: EntityRole;
}

// ========================================
// INVITATION REQUESTS
// ========================================

/**
 * Request to invite a user to join an entity.
 * Only owners can send invitations.
 */
export interface InviteMemberRequest {
  /** Email address of the user to invite */
  email: string;
  /** Role to assign when invitation is accepted */
  role: EntityRole;
}

/**
 * Request to accept an invitation using its token.
 */
export interface AcceptInvitationRequest {
  /** Unique invitation token from the invitation link */
  token: string;
}

/**
 * Request to decline an invitation using its token.
 */
export interface DeclineInvitationRequest {
  /** Unique invitation token from the invitation link */
  token: string;
}
