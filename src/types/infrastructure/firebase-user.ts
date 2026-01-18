/**
 * @fileoverview Firebase user info types shared between frontend and backend.
 *
 * Used by:
 * - @sudobility/auth_service (backend) - getUserInfo helper
 * - @sudobility/auth_lib (frontend) - useSiteAdmin hook
 */

/**
 * User info response from GET /users/:userId endpoint.
 * This type represents the user information returned by the backend API
 * and consumed by the frontend useSiteAdmin hook.
 */
export interface UserInfoResponse {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  siteAdmin: boolean;
  photoURL: string | null;
  phoneNumber: string | null;
  disabled: boolean;
  metadata: {
    creationTime: string | null;
    lastSignInTime: string | null;
  };
}
