import { describe, it, expect } from 'vitest';
import {
  // Base types
  type BaseSessionFields,
  type ObjectId,
  type FlexibleBoolean,
  type MetaData,
  type PageCursor,

  // Authentication types
  type PreAuthRequest,
  type AuthenticateRequest,
  type AuthLogRequest,

  // User management types
  type CreateUserRequest,
  type UpdateUserRequest,
  type LogoutUserRequest,
  type RecalculateQuotaRequest,

  // Mailbox types
  type CreateMailboxRequest,
  type UpdateMailboxRequest,

  // Message types
  type AddressWithName,
  type EmailHeader,
  type EmailAttachment,
  type MessageReference,
  type BimiConfig,
  type SubmitMessageRequest,
  type IndexerSubmitRequest,
  type SubmitStoredMessageRequest,
  type SearchUpdateMessagesRequest,

  // Address management types
  type CreateUserAddressRequest,
  type UpdateUserAddressRequest,
  type AutoreplyConfig,
  type CreateForwardedAddressRequest,
  type UpdateForwardedAddressRequest,
  type RenameDomainRequest,

  // Filter types
  type FilterQuery,
  type FilterAction,
  type CreateFilterRequest,
  type UpdateFilterRequest,

  // Pagination types
  type PaginationRequest,
  type GetMailboxesRequest,
  type GetMessagesRequest,
  type GetAddressesRequest,
  type GetUsersRequest,

  // Union types
  type WildDuckRequest,

  // Type guards and helpers
  isWildDuckRequest,
  createPreAuthRequest,
  createAuthenticateRequest,
  createSubmitMessageRequest,
  createCreateMailboxRequest,
  createPaginationRequest,
} from '../src/wildduck-requests';

describe('WildDuck Requests', () => {
  describe('Base Types', () => {
    it('should define BaseSessionFields correctly', () => {
      const sessionFields: BaseSessionFields = {
        sess: 'session-123',
        ip: '192.168.1.1',
      };

      expect(sessionFields.sess).toBe('session-123');
      expect(sessionFields.ip).toBe('192.168.1.1');
    });

    it('should accept BaseSessionFields with optional fields', () => {
      const minimalSession: BaseSessionFields = {};
      const sessionWithIp: BaseSessionFields = { ip: '::1' };
      const sessionWithSess: BaseSessionFields = { sess: 'abc123' };

      expect(minimalSession).toBeDefined();
      expect(sessionWithIp.ip).toBe('::1');
      expect(sessionWithSess.sess).toBe('abc123');
    });

    it('should define ObjectId as string type', () => {
      const objectId: ObjectId = '507f1f77bcf86cd799439011';
      expect(typeof objectId).toBe('string');
      expect(objectId).toHaveLength(24);
    });

    it('should accept various FlexibleBoolean values', () => {
      const truthy: FlexibleBoolean[] = [true, 'Y', '1', 1];
      const falsy: FlexibleBoolean[] = [false, 'N', '0', 0];

      truthy.forEach(value => {
        expect([true, 'Y', '1', 1]).toContain(value);
      });

      falsy.forEach(value => {
        expect([false, 'N', '0', 0]).toContain(value);
      });
    });

    it('should accept MetaData as object or string', () => {
      const objectMeta: MetaData = { key: 'value', nested: { prop: 123 } };
      const stringMeta: MetaData = '{"serialized": "json"}';

      expect(typeof objectMeta).toBe('object');
      expect(typeof stringMeta).toBe('string');
    });
  });

  describe('Authentication Requests', () => {
    it('should create valid PreAuthRequest', () => {
      const preAuth: PreAuthRequest = {
        username: 'user@example.com',
        scope: 'master',
        sess: 'session-123',
        ip: '192.168.1.1',
      };

      expect(preAuth.username).toBe('user@example.com');
      expect(preAuth.scope).toBe('master');
    });

    it('should create valid AuthenticateRequest with required fields', () => {
      const authRequest: AuthenticateRequest = {
        username: '0x1234567890123456789012345678901234567890',
        signature: '0xabcdef123456789',
        nonce: 'unique-nonce-123',
        message: 'Sign-in message for authentication',
        protocol: 'API',
        scope: 'master',
        token: false,
      };

      expect(authRequest.username).toBe('0x1234567890123456789012345678901234567890');
      expect(authRequest.signature).toBe('0xabcdef123456789');
      expect(authRequest.nonce).toBe('unique-nonce-123');
      expect(authRequest.message).toBe('Sign-in message for authentication');
    });

    it('should create valid AuthLogRequest', () => {
      const authLog: AuthLogRequest = {
        user: '507f1f77bcf86cd799439011',
        action: 'authenticate',
        limit: 50,
        filterip: '192.168.1.0/24',
      };

      expect(authLog.user).toBe('507f1f77bcf86cd799439011');
      expect(authLog.action).toBe('authenticate');
      expect(authLog.limit).toBe(50);
    });
  });

  describe('User Management Requests', () => {
    it('should create valid CreateUserRequest with required fields', () => {
      const createUser: CreateUserRequest = {
        username: 'newuser',
        address: 'newuser@example.com',
        name: 'New User',
        quota: 1073741824, // 1GB
        recipients: 100,
        tags: ['premium', 'verified'],
      };

      expect(createUser.username).toBe('newuser');
      expect(createUser.address).toBe('newuser@example.com');
      expect(createUser.name).toBe('New User');
      expect(createUser.quota).toBe(1073741824);
      expect(createUser.tags).toContain('premium');
    });

    it('should create valid UpdateUserRequest', () => {
      const updateUser: UpdateUserRequest = {
        name: 'Updated User Name',
        spamLevel: 75,
        quota: 2147483648, // 2GB
        uploadSentMessages: true,
        encryptMessages: true,
        sess: 'admin-session',
      };

      expect(updateUser.name).toBe('Updated User Name');
      expect(updateUser.spamLevel).toBe(75);
      expect(updateUser.uploadSentMessages).toBe(true);
      expect(updateUser.encryptMessages).toBe(true);
    });

    it('should create valid LogoutUserRequest', () => {
      const logout: LogoutUserRequest = {
        reason: 'Administrative logout',
        sess: 'admin-session',
      };

      expect(logout.reason).toBe('Administrative logout');
    });

    it('should create valid RecalculateQuotaRequest', () => {
      const recalcQuota: RecalculateQuotaRequest = {
        sess: 'admin-session',
        ip: '10.0.0.1',
      };

      expect(recalcQuota.sess).toBe('admin-session');
    });
  });

  describe('Mailbox Operations', () => {
    it('should create valid CreateMailboxRequest', () => {
      const createMailbox: CreateMailboxRequest = {
        path: 'INBOX/Projects/Work',
        hidden: false,
        retention: 2592000000, // 30 days in ms
        encryptMessages: true,
      };

      expect(createMailbox.path).toBe('INBOX/Projects/Work');
      expect(createMailbox.hidden).toBe(false);
      expect(createMailbox.retention).toBe(2592000000);
      expect(createMailbox.encryptMessages).toBe(true);
    });

    it('should create valid UpdateMailboxRequest', () => {
      const updateMailbox: UpdateMailboxRequest = {
        path: 'INBOX/Projects/Renamed',
        retention: 7776000000, // 90 days
        subscribed: true,
        encryptMessages: false,
        hidden: false,
      };

      expect(updateMailbox.path).toBe('INBOX/Projects/Renamed');
      expect(updateMailbox.retention).toBe(7776000000);
      expect(updateMailbox.subscribed).toBe(true);
    });
  });

  describe('Message Operations', () => {
    it('should create valid AddressWithName', () => {
      const address: AddressWithName = {
        name: 'John Doe',
        address: 'john.doe@example.com',
      };

      expect(address.name).toBe('John Doe');
      expect(address.address).toBe('john.doe@example.com');
    });

    it('should create valid EmailHeader', () => {
      const header: EmailHeader = {
        key: 'X-Custom-Header',
        value: 'Custom header value',
      };

      expect(header.key).toBe('X-Custom-Header');
      expect(header.value).toBe('Custom header value');
    });

    it('should create valid EmailAttachment', () => {
      const attachment: EmailAttachment = {
        filename: 'document.pdf',
        contentType: 'application/pdf',
        encoding: 'base64',
        content: 'JVBERi0xLjQKJcOkw7zDssOyw6...',
        contentDisposition: 'attachment',
      };

      expect(attachment.filename).toBe('document.pdf');
      expect(attachment.contentType).toBe('application/pdf');
      expect(attachment.content).toBe('JVBERi0xLjQKJcOkw7zDssOyw6...');
    });

    it('should create valid MessageReference', () => {
      const reference: MessageReference = {
        mailbox: '507f1f77bcf86cd799439011',
        id: 123,
        action: 'reply',
      };

      expect(reference.mailbox).toBe('507f1f77bcf86cd799439011');
      expect(reference.id).toBe(123);
      expect(reference.action).toBe('reply');
    });

    it('should create valid BimiConfig', () => {
      const bimi: BimiConfig = {
        domain: 'example.com',
        selector: 'default',
      };

      expect(bimi.domain).toBe('example.com');
      expect(bimi.selector).toBe('default');
    });

    it('should create valid SubmitMessageRequest', () => {
      const submitMessage: SubmitMessageRequest = {
        mailbox: '507f1f77bcf86cd799439011',
        from: { name: 'Sender', address: 'sender@example.com' },
        to: [
          { name: 'Recipient 1', address: 'recipient1@example.com' },
          { address: 'recipient2@example.com' },
        ],
        subject: 'Test Message',
        text: 'This is a test message.',
        html: '<p>This is a <strong>test</strong> message.</p>',
        deliveryReport: true,
        sendTime: new Date('2024-01-01T10:00:00Z'),
      };

      expect(submitMessage.subject).toBe('Test Message');
      expect(submitMessage.to).toHaveLength(2);
      expect(submitMessage.deliveryReport).toBe(true);
    });

    it('should create valid IndexerSubmitRequest', () => {
      const indexerSubmit: IndexerSubmitRequest = {
        from: { address: 'blockchain@example.com' },
        to: [{ address: 'recipient@example.com' }],
        subject: 'Blockchain Message',
        text: 'Message from blockchain',
        authentication: {
          message: 'Authentication message',
          signature: '0xsignature123',
        },
      };

      expect(indexerSubmit.authentication.message).toBe('Authentication message');
      expect(indexerSubmit.authentication.signature).toBe('0xsignature123');
    });
  });

  describe('Address Management', () => {
    it('should create valid CreateUserAddressRequest', () => {
      const createAddress: CreateUserAddressRequest = {
        address: 'alias@example.com',
        name: 'Alias Identity',
        main: false,
        allowWildcard: true,
        tags: ['alias', 'secondary'],
        metaData: { purpose: 'newsletters' },
      };

      expect(createAddress.address).toBe('alias@example.com');
      expect(createAddress.name).toBe('Alias Identity');
      expect(createAddress.allowWildcard).toBe(true);
      expect(createAddress.tags).toContain('alias');
    });

    it('should create valid AutoreplyConfig', () => {
      const autoreply: AutoreplyConfig = {
        status: true,
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31'),
        name: 'Auto Reply Bot',
        subject: 'Out of Office',
        text: 'I am currently out of office.',
        html: '<p>I am currently <em>out of office</em>.</p>',
      };

      expect(autoreply.status).toBe(true);
      expect(autoreply.subject).toBe('Out of Office');
    });

    it('should create valid CreateForwardedAddressRequest', () => {
      const createForwarded: CreateForwardedAddressRequest = {
        address: 'forward@example.com',
        name: 'Forwarding Address',
        targets: ['target1@other.com', 'target2@other.com'],
        forwards: 1000,
        allowWildcard: false,
        autoreply: {
          status: true,
          subject: 'Message Forwarded',
          text: 'Your message has been forwarded.',
        },
      };

      expect(createForwarded.address).toBe('forward@example.com');
      expect(createForwarded.targets).toHaveLength(2);
      expect(createForwarded.forwards).toBe(1000);
    });
  });

  describe('Filter Requests', () => {
    it('should create valid FilterQuery', () => {
      const query: FilterQuery = {
        from: 'newsletter@',
        subject: 'URGENT',
        ha: true,
        size: 1048576, // 1MB
      };

      expect(query.from).toBe('newsletter@');
      expect(query.subject).toBe('URGENT');
      expect(query.ha).toBe(true);
      expect(query.size).toBe(1048576);
    });

    it('should create valid FilterAction', () => {
      const action: FilterAction = {
        seen: true,
        flag: false,
        delete: false,
        spam: false,
        mailbox: '507f1f77bcf86cd799439011',
        targets: ['admin@example.com'],
      };

      expect(action.seen).toBe(true);
      expect(action.mailbox).toBe('507f1f77bcf86cd799439011');
      expect(action.targets).toContain('admin@example.com');
    });

    it('should create valid CreateFilterRequest', () => {
      const createFilter: CreateFilterRequest = {
        name: 'Newsletter Filter',
        query: {
          from: 'newsletter@',
          listId: 'marketing',
        },
        action: {
          seen: true,
          mailbox: '507f1f77bcf86cd799439011',
        },
        disabled: false,
        metaData: { category: 'marketing' },
      };

      expect(createFilter.name).toBe('Newsletter Filter');
      expect(createFilter.query.from).toBe('newsletter@');
      expect(createFilter.action.seen).toBe(true);
    });
  });

  describe('Pagination and Query Requests', () => {
    it('should create valid PaginationRequest', () => {
      const pagination: PaginationRequest = {
        limit: 50,
        page: 2,
        next: 'cursor-next-123',
        previous: 'cursor-prev-456',
      };

      expect(pagination.limit).toBe(50);
      expect(pagination.page).toBe(2);
      expect(pagination.next).toBe('cursor-next-123');
    });

    it('should create valid GetMailboxesRequest', () => {
      const getMailboxes: GetMailboxesRequest = {
        specialUse: true,
        showHidden: false,
        counters: true,
        sizes: true,
        limit: 25,
        sess: 'user-session',
      };

      expect(getMailboxes.specialUse).toBe(true);
      expect(getMailboxes.counters).toBe(true);
      expect(getMailboxes.limit).toBe(25);
    });

    it('should create valid GetMessagesRequest', () => {
      const getMessages: GetMessagesRequest = {
        order: 'desc',
        unseen: true,
        flagged: false,
        thread: '507f1f77bcf86cd799439011',
        includeHeaders: ['From', 'Subject', 'Date'],
        uid: true,
        limit: 100,
      };

      expect(getMessages.order).toBe('desc');
      expect(getMessages.unseen).toBe(true);
      expect(getMessages.includeHeaders).toContain('Subject');
    });

    it('should create valid GetUsersRequest', () => {
      const getUsers: GetUsersRequest = {
        query: 'john',
        tags: ['premium', 'verified'],
        requiredTags: ['active'],
        limit: 20,
        page: 1,
      };

      expect(getUsers.query).toBe('john');
      expect(getUsers.tags).toContain('premium');
      expect(getUsers.requiredTags).toContain('active');
    });
  });

  describe('Type Guards and Utilities', () => {
    it('should validate WildDuckRequest with isWildDuckRequest', () => {
      const validRequest = {
        username: 'test@example.com',
        scope: 'master',
      };

      const invalidRequest = null;
      const anotherInvalid = 'not an object';

      expect(isWildDuckRequest(validRequest)).toBe(true);
      expect(isWildDuckRequest(invalidRequest)).toBe(false);
      expect(isWildDuckRequest(anotherInvalid)).toBe(false);
    });

    it('should accept various WildDuckRequest union types', () => {
      const preAuth: WildDuckRequest = {
        username: 'user@example.com',
        scope: 'master',
      };

      const createUser: WildDuckRequest = {
        username: 'newuser',
        address: 'newuser@example.com',
      };

      const submitMessage: WildDuckRequest = {
        from: { address: 'sender@example.com' },
        to: [{ address: 'recipient@example.com' }],
        subject: 'Test',
      };

      expect(isWildDuckRequest(preAuth)).toBe(true);
      expect(isWildDuckRequest(createUser)).toBe(true);
      expect(isWildDuckRequest(submitMessage)).toBe(true);
    });
  });

  describe('Helper Functions', () => {
    it('should create PreAuthRequest with defaults', () => {
      const preAuth = createPreAuthRequest('user@example.com');

      expect(preAuth.username).toBe('user@example.com');
      expect(preAuth.scope).toBe('master');
    });

    it('should create PreAuthRequest with custom options', () => {
      const preAuth = createPreAuthRequest('user@example.com', {
        scope: 'imap',
        sess: 'custom-session',
      });

      expect(preAuth.username).toBe('user@example.com');
      expect(preAuth.scope).toBe('imap');
      expect(preAuth.sess).toBe('custom-session');
    });

    it('should create AuthenticateRequest with required fields', () => {
      const auth = createAuthenticateRequest(
        'user@example.com',
        '0xsignature',
        'nonce123',
        'auth message'
      );

      expect(auth.username).toBe('user@example.com');
      expect(auth.signature).toBe('0xsignature');
      expect(auth.nonce).toBe('nonce123');
      expect(auth.message).toBe('auth message');
      expect(auth.protocol).toBe('API');
      expect(auth.scope).toBe('master');
      expect(auth.token).toBe(false);
    });

    it('should create AuthenticateRequest with custom options', () => {
      const auth = createAuthenticateRequest(
        'user@example.com',
        '0xsignature',
        'nonce123',
        'auth message',
        {
          token: true,
          scope: 'smtp',
          appId: 'https://myapp.com',
        }
      );

      expect(auth.token).toBe(true);
      expect(auth.scope).toBe('smtp');
      expect(auth.appId).toBe('https://myapp.com');
    });

    it('should create SubmitMessageRequest with defaults', () => {
      const submit = createSubmitMessageRequest({
        from: { address: 'sender@example.com' },
        to: [{ address: 'recipient@example.com' }],
        subject: 'Test Subject',
      });

      expect(submit.deliveryReport).toBe(false);
      expect(submit.subject).toBe('Test Subject');
    });

    it('should create CreateMailboxRequest with defaults', () => {
      const createMailbox = createCreateMailboxRequest('INBOX/NewFolder');

      expect(createMailbox.path).toBe('INBOX/NewFolder');
      expect(createMailbox.hidden).toBe(false);
      expect(createMailbox.encryptMessages).toBe(false);
    });

    it('should create CreateMailboxRequest with custom options', () => {
      const createMailbox = createCreateMailboxRequest('INBOX/Secret', {
        hidden: true,
        encryptMessages: true,
        retention: 86400000, // 1 day
      });

      expect(createMailbox.path).toBe('INBOX/Secret');
      expect(createMailbox.hidden).toBe(true);
      expect(createMailbox.encryptMessages).toBe(true);
      expect(createMailbox.retention).toBe(86400000);
    });

    it('should create PaginationRequest with defaults', () => {
      const pagination = createPaginationRequest();

      expect(pagination.limit).toBe(20);
      expect(pagination.page).toBe(1);
    });

    it('should create PaginationRequest with custom options', () => {
      const pagination = createPaginationRequest({
        limit: 100,
        page: 5,
        next: 'next-cursor',
      });

      expect(pagination.limit).toBe(100);
      expect(pagination.page).toBe(5);
      expect(pagination.next).toBe('next-cursor');
    });
  });

  describe('Complex Request Scenarios', () => {
    it('should handle complex SubmitMessageRequest with all features', () => {
      const complexMessage: SubmitMessageRequest = {
        mailbox: '507f1f77bcf86cd799439011',
        from: { name: 'John Doe', address: 'john@example.com' },
        replyTo: { name: 'Reply Handler', address: 'noreply@example.com' },
        to: [
          { name: 'Alice Smith', address: 'alice@example.com' },
          { address: 'bob@example.com' },
        ],
        cc: [{ name: 'Manager', address: 'manager@example.com' }],
        bcc: [{ address: 'audit@example.com' }],
        headers: [
          { key: 'X-Priority', value: '1' },
          { key: 'X-Custom-ID', value: 'msg-12345' },
        ],
        subject: 'Important: Project Update',
        text: 'Please see the attached document for project updates.',
        html: '<p>Please see the <strong>attached document</strong> for project updates.</p>',
        attachments: [
          {
            filename: 'project-update.pdf',
            contentType: 'application/pdf',
            encoding: 'base64',
            content: 'JVBERi0xLjQK...',
            contentDisposition: 'attachment',
          },
          {
            filename: 'logo.png',
            contentType: 'image/png',
            encoding: 'base64',
            content: 'iVBORw0KGgoAAAANSUhEUgAAA...',
            cid: 'logo-123',
            contentDisposition: 'inline',
          },
        ],
        meta: { campaign: 'project-updates', priority: 'high' },
        reference: {
          mailbox: '507f1f77bcf86cd799439011',
          id: 456,
          action: 'forward',
        },
        sendTime: new Date('2024-02-01T09:00:00Z'),
        deliveryReport: true,
        bimi: {
          domain: 'example.com',
          selector: 'default',
        },
        sess: 'user-session-789',
        ip: '203.0.113.1',
      };

      expect(complexMessage.to).toHaveLength(2);
      expect(complexMessage.cc).toHaveLength(1);
      expect(complexMessage.bcc).toHaveLength(1);
      expect(complexMessage.headers).toHaveLength(2);
      expect(complexMessage.attachments).toHaveLength(2);
      expect(complexMessage.reference?.action).toBe('forward');
      expect(complexMessage.bimi?.domain).toBe('example.com');
    });

    it('should handle complex CreateUserRequest with all options', () => {
      const complexUser: CreateUserRequest = {
        username: 'poweruser',
        address: 'poweruser@example.com',
        emptyAddress: false,
        language: 'en',
        retention: 7776000000, // 90 days
        name: 'Power User',
        targets: ['backup@example.com', 'https://webhook.example.com/mail'],
        mtaRelay: 'smtps://relay.example.com:465',
        spamLevel: 30,
        quota: 10737418240, // 10GB
        recipients: 500,
        imapMaxConnections: 10,
        imapMaxDownload: 10737418240, // 10GB per day
        pop3MaxDownload: 1073741824, // 1GB per day
        imapMaxUpload: 5368709120, // 5GB per day
        pop3MaxMessages: 1000,
        fromWhitelist: ['noreply@example.com', 'system@example.com'],
        tags: ['premium', 'verified', 'power-user'],
        addTagsToAddress: true,
        uploadSentMessages: true,
        mailboxes: {
          sent: 'Sent Messages',
          drafts: 'My Drafts',
          trash: 'Deleted Items',
        },
        featureFlags: ['advanced-search', 'bulk-operations', 'api-access'],
        requirePasswordChange: false,
        encryptMessages: true,
        encryptForwarded: true,
        pubKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----...',
        metaData: {
          accountType: 'premium',
          source: 'api-signup',
          preferences: {
            theme: 'dark',
            language: 'en-US',
          },
        },
        internalData: {
          createdBy: 'admin',
          notes: 'Power user account',
        },
        sess: 'admin-session-123',
        ip: '10.0.0.1',
      };

      expect(complexUser.username).toBe('poweruser');
      expect(complexUser.tags).toHaveLength(3);
      expect(complexUser.fromWhitelist).toHaveLength(2);
      expect(complexUser.featureFlags).toHaveLength(3);
      expect(complexUser.encryptMessages).toBe(true);
      expect(complexUser.quota).toBe(10737418240);
    });
  });
});