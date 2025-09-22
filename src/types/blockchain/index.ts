// Common blockchain types
export type {
  ClaimableRevenue,
  ClientConfig,
  DeploymentAddresses,
  FeeStructure,
  Message,
  MessageFilter,
  MessageRecipient,
  NetworkConfig,
  OperationError,
  PaginationOptions,
  PreparedMessage,
  Result,
  RpcConfig,
  SendMessageOptions,
  TransactionResult
} from './common';

export {
  DEFAULT_NETWORKS,
  MessageType,
  PROTOCOL_CONSTANTS,
  TransactionStatus,
  isEvmAddress,
  isEvmRecipient,
  isSolanaAddress,
  isSolanaRecipient
} from './common';

// Validation types
export {
  validateAddress,
  validateAmount,
  validateDomain,
  validateMessage
} from './validation';
