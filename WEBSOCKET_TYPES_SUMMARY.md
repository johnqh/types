# WebSocket Types Summary

## Overview

Added comprehensive TypeScript type definitions for WildDuck WebSocket API in `src/types/wildduck/wildduck-websocket-types.ts`.

## Type Reuse Strategy

The WebSocket types **extensively reuse** existing WildDuck API types to ensure consistency across the codebase:

### Reused Types from `wildduck-types.ts`

| WebSocket Usage | Reused Type | Description |
|----------------|-------------|-------------|
| Mailboxes channel data | `WildduckMailbox` | Complete mailbox structure |
| Settings channel data | `WildduckUserResponse` | Full user settings/info |
| Filters channel data | `WildduckFilterListItem` | Filter list items |
| Autoreply channel data | `WildduckAutoreplyResponse` | Autoreply settings |
| Messages channel data | `WildduckMessageListItem` | Message list items |
| Object IDs | `WildduckObjectId` | 24-character hex strings |

## New Type Categories

### 1. **Channel Types**
```typescript
type WildduckWebSocketChannel = 'mailboxes' | 'settings' | 'filters' | 'autoreply' | 'messages'
type WildduckWebSocketMessageType = 'subscribe' | 'unsubscribe' | 'fetch' | 'data' | 'update' | 'disconnect'
```

### 2. **Message Envelope**
```typescript
interface WildduckWebSocketMessage<T> {
  type: WildduckWebSocketMessageType;
  channel: WildduckWebSocketChannel | 'system';
  data: T;
}
```

### 3. **Client Request Messages**
- `WildduckSubscribeMailboxesRequest` - Subscribe to mailboxes channel
- `WildduckSubscribeSettingsRequest` - Subscribe to settings channel
- `WildduckSubscribeFiltersRequest` - Subscribe to filters channel
- `WildduckSubscribeAutoreplyRequest` - Subscribe to autoreply channel
- `WildduckSubscribeMessagesRequest` - Subscribe to messages channel (requires mailboxId)
- `WildduckUnsubscribeRequest` - Unsubscribe from any channel
- `WildduckFetchMessagesRequest` - Pagination for messages channel

### 4. **Server Response Data Structures**

All response data structures **reuse existing types**:

```typescript
// Mailboxes - reuses WildduckMailbox[]
interface WildduckMailboxesDataResponse {
  success: true;
  mailboxes: WildduckMailbox[];
}

// Settings - directly reuses WildduckUserResponse
type WildduckSettingsDataResponse = WildduckUserResponse;

// Filters - reuses WildduckFilterListItem[]
interface WildduckFiltersDataResponse {
  success: true;
  limits: { allowed: number; used: number };
  filters: WildduckFilterListItem[];
}

// Autoreply - directly reuses WildduckAutoreplyResponse
type WildduckAutoreplyDataResponse = WildduckAutoreplyResponse;

// Messages - reuses WildduckMessageListItem[]
interface WildduckMessagesDataResponse {
  success: true;
  mailboxId: WildduckObjectId;
  specialUse: string | null;
  messages: WildduckMessageListItem[];
  hasMore: boolean;
}
```

### 5. **Response Wrapper**
```typescript
interface WildduckWebSocketResponseData<T> {
  code: number; // HTTP-style status code
  response: T;
}
```

### 6. **Real-time Update Events**
- `WildduckMailboxUpdateEvent` - mailbox.created, mailbox.renamed, mailbox.deleted
- `WildduckMessageUpdateEvent` - message.added, message.flags.changed, message.moved, message.deleted
- `WildduckSettingsUpdateEvent` - settings.updated
- `WildduckFilterUpdateEvent` - filter.created, filter.deleted
- `WildduckAutoreplyUpdateEvent` - autoreply.user.enabled, autoreply.user.disabled

### 7. **Batched Updates**
```typescript
interface WildduckBatchedUpdatesResponse {
  success: true;
  updates: WildduckWebSocketUpdateEvent[];
}
```

## Type Guards

Provided type guards for runtime type checking:
- `isWildduckSubscribeRequest()`
- `isWildduckUnsubscribeRequest()`
- `isWildduckFetchRequest()`
- `isWildduckDataMessage()`
- `isWildduckUpdateMessage()`
- `isWildduckDisconnectMessage()`
- `isWildduckWebSocketErrorResponse()` - renamed to avoid conflict with existing validation utils

## Helper Functions

Convenient factory functions for creating messages:
- `createWildduckSubscribeRequest()` - Type-safe subscribe request creation
- `createWildduckUnsubscribeRequest()` - Create unsubscribe requests
- `createWildduckFetchMessagesRequest()` - Create pagination fetch requests

## Usage Examples

### Client-side Subscription
```typescript
import {
  createWildduckSubscribeRequest,
  WildduckSubscribeMailboxesRequest,
  WildduckMailboxesDataMessage
} from '@sudobility/types';

// Subscribe to mailboxes
const subscribeMsg: WildduckSubscribeMailboxesRequest = createWildduckSubscribeRequest('mailboxes', {
  userId: '507f1f77bcf86cd799439011',
  token: 'abc123...'
});

ws.send(JSON.stringify(subscribeMsg));

// Handle response
ws.onmessage = (event) => {
  const message = JSON.parse(event.data) as WildduckMailboxesDataMessage;
  if (message.type === 'data' && message.channel === 'mailboxes') {
    // message.data.response.mailboxes is WildduckMailbox[]
    const mailboxes = message.data.response.mailboxes;
  }
};
```

### Handling Updates
```typescript
import { WildduckMailboxesUpdateMessage, isWildduckUpdateMessage } from '@sudobility/types';

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (isWildduckUpdateMessage(message) && message.channel === 'mailboxes') {
    const updates = message.data.response.updates;
    updates.forEach(update => {
      if (update.type === 'mailbox.created') {
        console.log('New mailbox:', update.path);
      }
    });
  }
};
```

## Benefits

1. **Type Safety**: Full TypeScript coverage for WebSocket communication
2. **Code Reuse**: Maximizes reuse of existing WildDuck API types
3. **Consistency**: Same data structures in REST API and WebSocket responses
4. **Discoverability**: IDE autocomplete for all message types
5. **Runtime Validation**: Type guards for safe message parsing
6. **Documentation**: Self-documenting through TypeScript types

## Integration

The types are automatically exported through:
```typescript
// From @sudobility/types
export * from './types/wildduck/wildduck-websocket-types';
```

All types are available as named exports from the package root.

## Build Status

✅ TypeScript compilation: SUCCESS
✅ ESM build: SUCCESS
✅ CJS build: SUCCESS
✅ Type declarations generated: SUCCESS

## Files Modified

1. **NEW**: `src/types/wildduck/wildduck-websocket-types.ts` - WebSocket type definitions
2. **MODIFIED**: `src/types/wildduck/index.ts` - Added export for WebSocket types

## No Breaking Changes

All changes are **additive only**. No existing types were modified, ensuring backward compatibility.
