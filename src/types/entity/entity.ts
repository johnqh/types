/**
 * @fileoverview Entity Type Definitions
 * @description Core types for the entity/organization system used across shapeshyft and whisperly
 */

// ========================================
// ENUMS
// ========================================

/**
 * Type of entity.
 * - personal: Auto-created for each user, cannot be deleted
 * - organization: User-created, supports multiple members
 */
export enum EntityType {
  PERSONAL = 'personal',
  ORGANIZATION = 'organization',
}

/**
 * Role of a user within an entity.
 * Determines permissions for various operations.
 * - OWNER: Only for organizations. Full access including user management.
 * - MANAGER: Can manage projects and endpoints. Used for personal entities.
 * - MEMBER: Read-only access to projects and endpoints.
 */
export enum EntityRole {
  /** Organization owner: full access including invite users, change roles, manage projects/endpoints */
  OWNER = 'owner',
  /** Can manage projects and endpoints, but cannot manage users. Default role for personal entities. */
  MANAGER = 'manager',
  /** Read-only access to projects and endpoints */
  MEMBER = 'member',
}

/**
 * Status of an entity invitation.
 */
export enum InvitationStatus {
  /** Invitation sent, awaiting response */
  PENDING = 'pending',
  /** Invitation accepted, user is now a member */
  ACCEPTED = 'accepted',
  /** Invitation declined by the invitee */
  DECLINED = 'declined',
  /** Invitation expired (not accepted within time limit) */
  EXPIRED = 'expired',
}

// ========================================
// CORE ENTITY TYPES
// ========================================

/**
 * An entity represents a workspace that can own projects and API keys.
 * Can be either a personal workspace (one per user) or an organization (shared).
 * - Personal entities: User has 'manager' role (no user management needed).
 * - Organizations: Creator has 'owner' role (can manage users, projects, endpoints).
 */
export interface Entity {
  /** Unique identifier (UUID) */
  id: string;
  /** URL-friendly slug (8-12 alphanumeric characters) */
  entitySlug: string;
  /** Type of entity: personal or organization */
  entityType: EntityType;
  /** Display name shown in UI */
  displayName: string;
  /** Optional description */
  description: string | null;
  /** Optional avatar URL */
  avatarUrl: string | null;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Entity with the current user's role included.
 * Used when listing entities for a user.
 */
export interface EntityWithRole extends Entity {
  /** Current user's role in this entity */
  userRole: EntityRole;
}

/**
 * Minimal user information for display in member lists.
 */
export interface EntityMemberUser {
  /** User's unique identifier */
  id: string;
  /** User's email address */
  email: string | null;
  /** User's display name */
  displayName: string | null;
}

/**
 * A membership record linking a user to an entity with a specific role.
 * This table manages all user-entity roles including organization ownership.
 */
export interface EntityMember {
  /** Unique identifier (UUID) */
  id: string;
  /** Entity this membership belongs to */
  entityId: string;
  /** User who is a member (firebase_uid) */
  userId: string;
  /** User's role in the entity (owner, manager, member) */
  role: EntityRole;
  /** Whether this membership is active (false = soft deleted) */
  isActive: boolean;
  /** ISO 8601 timestamp when user joined */
  joinedAt: string;
  /** ISO 8601 timestamp of record creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
  /** Populated user information (when joined) */
  user?: EntityMemberUser;
}

/**
 * An invitation for a user to join an entity.
 * Stored with email address to support inviting users who haven't signed up yet.
 */
export interface EntityInvitation {
  /** Unique identifier (UUID) */
  id: string;
  /** Entity the user is invited to join */
  entityId: string;
  /** Email address of the invitee */
  email: string;
  /** Role the user will have upon accepting */
  role: EntityRole;
  /** Current status of the invitation */
  status: InvitationStatus;
  /** User ID of who sent the invitation */
  invitedByUserId: string;
  /** Unique token for accepting/declining (included in invitation link) */
  token: string;
  /** ISO 8601 timestamp when invitation expires */
  expiresAt: string;
  /** ISO 8601 timestamp when invitation was accepted (null if not accepted) */
  acceptedAt: string | null;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
  /** Populated entity information (when joined) */
  entity?: Entity;
  /** Populated inviter information (when joined) */
  invitedBy?: EntityMemberUser;
}
