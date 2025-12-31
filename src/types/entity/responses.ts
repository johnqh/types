/**
 * @fileoverview Entity Response Type Definitions
 * @description Response types for entity API endpoints
 */

import type { BaseResponse } from '../common';
import type {
  Entity,
  EntityWithRole,
  EntityMember,
  EntityInvitation,
} from './entity';

// ========================================
// ENTITY RESPONSES
// ========================================

/**
 * Response for single entity operations (get, create, update).
 */
export type EntityResponse = BaseResponse<Entity>;

/**
 * Response for listing user's entities.
 * Includes the user's role in each entity.
 */
export type EntityWithRoleListResponse = BaseResponse<EntityWithRole[]>;

/**
 * Response for getting a single entity with role.
 */
export type EntityWithRoleResponse = BaseResponse<EntityWithRole>;

// ========================================
// MEMBER RESPONSES
// ========================================

/**
 * Response for single member operations (add, update role).
 */
export type EntityMemberResponse = BaseResponse<EntityMember>;

/**
 * Response for listing entity members.
 */
export type EntityMemberListResponse = BaseResponse<EntityMember[]>;

// ========================================
// INVITATION RESPONSES
// ========================================

/**
 * Response for single invitation operations (create, accept, decline).
 */
export type EntityInvitationResponse = BaseResponse<EntityInvitation>;

/**
 * Response for listing invitations.
 */
export type EntityInvitationListResponse = BaseResponse<EntityInvitation[]>;

// ========================================
// VALIDATION RESPONSES
// ========================================

/**
 * Response for checking if an entity slug is available.
 */
export interface SlugAvailabilityData {
  /** The slug that was checked */
  slug: string;
  /** Whether the slug is available for use */
  available: boolean;
  /** Suggested alternative if not available */
  suggestion?: string;
}

export type SlugAvailabilityResponse = BaseResponse<SlugAvailabilityData>;
