/**
 * @fileoverview Entity Permission Type Definitions
 * @description Permission types and constants for role-based access control
 */

import { EntityRole } from './entity';

// ========================================
// PERMISSION INTERFACE
// ========================================

/**
 * Defines all available permissions within an entity.
 * Each permission maps to a specific action a user can perform.
 */
export interface EntityPermissions {
  /** Can view entity details and settings */
  canViewEntity: boolean;
  /** Can edit entity name, description, avatar */
  canEditEntity: boolean;
  /** Can delete the entity (organizations only) */
  canDeleteEntity: boolean;
  /** Can add, remove, and change roles of members */
  canManageMembers: boolean;
  /** Can send invitations to new members */
  canInviteMembers: boolean;
  /** Can create, edit, and delete projects */
  canManageProjects: boolean;
  /** Can create new projects */
  canCreateProjects: boolean;
  /** Can view projects and their details */
  canViewProjects: boolean;
  /** Can create, edit, and delete API keys */
  canManageApiKeys: boolean;
  /** Can view and use API keys for invocations */
  canViewApiKeys: boolean;
}

// ========================================
// ROLE PERMISSION MAPPINGS
// ========================================

/**
 * Permission set for the Admin role.
 * Full access to all entity operations.
 */
const ADMIN_PERMISSIONS: EntityPermissions = {
  canViewEntity: true,
  canEditEntity: true,
  canDeleteEntity: true,
  canManageMembers: true,
  canInviteMembers: true,
  canManageProjects: true,
  canCreateProjects: true,
  canViewProjects: true,
  canManageApiKeys: true,
  canViewApiKeys: true,
};

/**
 * Permission set for the Manager role.
 * Can manage projects and API keys, but not entity settings or members.
 */
const MANAGER_PERMISSIONS: EntityPermissions = {
  canViewEntity: true,
  canEditEntity: false,
  canDeleteEntity: false,
  canManageMembers: false,
  canInviteMembers: false,
  canManageProjects: true,
  canCreateProjects: true,
  canViewProjects: true,
  canManageApiKeys: true,
  canViewApiKeys: true,
};

/**
 * Permission set for the Viewer role.
 * Read-only access to projects and API keys.
 */
const VIEWER_PERMISSIONS: EntityPermissions = {
  canViewEntity: true,
  canEditEntity: false,
  canDeleteEntity: false,
  canManageMembers: false,
  canInviteMembers: false,
  canManageProjects: false,
  canCreateProjects: false,
  canViewProjects: true,
  canManageApiKeys: false,
  canViewApiKeys: true,
};

/**
 * Maps each role to its permission set.
 * Used by permission checking utilities.
 */
export const ROLE_PERMISSIONS: Record<EntityRole, EntityPermissions> = {
  [EntityRole.ADMIN]: ADMIN_PERMISSIONS,
  [EntityRole.MANAGER]: MANAGER_PERMISSIONS,
  [EntityRole.VIEWER]: VIEWER_PERMISSIONS,
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get permissions for a given role.
 * @param role - The entity role
 * @returns The permission set for that role
 */
export function getPermissionsForRole(role: EntityRole): EntityPermissions {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if a role has a specific permission.
 * @param role - The entity role to check
 * @param permission - The permission key to check
 * @returns Whether the role has the permission
 */
export function hasPermission(
  role: EntityRole,
  permission: keyof EntityPermissions
): boolean {
  return ROLE_PERMISSIONS[role][permission];
}
