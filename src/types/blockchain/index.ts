/**
 * Blockchain types entry point.
 *
 * Import from `@sudobility/types/blockchain` to load only blockchain-
 * related types, interfaces, enums, and validators without pulling in
 * the rest of the library.
 *
 * @since 1.9.54
 */

// Types
export type {
  ChainConfig,
  ClaimableRevenue,
  ClientConfig,
  DeploymentAddresses,
  FeeStructure,
  Message,
  MessageFilter,
  MessageRecipient,
  OperationError,
  PreparedMessage,
  RpcConfig,
  SendMessageOptions,
  TransactionResult,
} from './common.js';

// Enums and constants
export {
  MessageType,
  PROTOCOL_CONSTANTS,
  TransactionStatus,
} from './common.js';

// Type guards
export {
  isEvmAddress,
  isEvmRecipient,
  isSolanaAddress,
  isSolanaRecipient,
} from './common.js';

// Validators
export {
  validateAddress,
  validateAmount,
  validateDomain,
  validateMessage,
} from './validation.js';
