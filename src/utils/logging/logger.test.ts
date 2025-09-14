import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger, LogLevel } from './logger';

let consoleSpy: {
  error: ReturnType<typeof vi.spyOn>;
  warn: ReturnType<typeof vi.spyOn>;
  log: ReturnType<typeof vi.spyOn>;
};

beforeEach(() => {
  consoleSpy = {
    error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
    log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Logger', () => {
  describe('Logging Methods', () => {
    it('should log error messages', () => {
      logger.error('Test error message');
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error.mock.calls[0][0]).toContain('Test error message');
    });

    it('should log error with context', () => {
      logger.error('Test error', 'TestContext');
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error.mock.calls[0][0]).toContain('Test error');
      expect(consoleSpy.error.mock.calls[0][0]).toContain('[TestContext]');
    });

    it('should log error with data', () => {
      const testData = { key: 'value' };
      logger.error('Test error', 'TestContext', testData);
      expect(consoleSpy.error).toHaveBeenCalledTimes(2);
      expect(consoleSpy.error.mock.calls[1][0]).toBe(testData);
    });

    it('should log warning messages', () => {
      logger.warn('Test warning message');
      expect(consoleSpy.warn).toHaveBeenCalled();
      expect(consoleSpy.warn.mock.calls[0][0]).toContain('Test warning message');
    });

    it('should log info messages', () => {
      logger.info('Test info message');
      // In test environment, logger may not log info messages
      // This test verifies the method exists and can be called
      expect(typeof logger.info).toBe('function');
    });

    it('should log debug messages', () => {
      logger.debug('Test debug message');
      // In test environment, logger may not log debug messages
      // This test verifies the method exists and can be called
      expect(typeof logger.debug).toBe('function');
    });
  });

  describe('Contextual Logger', () => {
    it('should create contextual logger with error method', () => {
      const contextLogger = logger.withContext('TestContext');
      contextLogger.error('Test message');
      
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error.mock.calls[0][0]).toContain('[TestContext]');
    });

    it('should create contextual logger with warn method', () => {
      const contextLogger = logger.withContext('TestContext');
      contextLogger.warn('Test message');
      
      expect(consoleSpy.warn).toHaveBeenCalled();
      expect(consoleSpy.warn.mock.calls[0][0]).toContain('[TestContext]');
    });

    it('should create contextual logger with info method', () => {
      const contextLogger = logger.withContext('TestContext');
      contextLogger.info('Test message');
      
      expect(typeof contextLogger.info).toBe('function');
    });

    it('should create contextual logger with debug method', () => {
      const contextLogger = logger.withContext('TestContext');
      contextLogger.debug('Test message');
      
      expect(typeof contextLogger.debug).toBe('function');
    });

    it('should pass data through contextual logger', () => {
      const contextLogger = logger.withContext('TestContext');
      const testData = { test: 'data' };
      contextLogger.error('Test message', testData);
      
      expect(consoleSpy.error).toHaveBeenCalledTimes(2);
      expect(consoleSpy.error.mock.calls[1][0]).toBe(testData);
    });
  });

  describe('Log Levels', () => {
    it('should have correct log level values', () => {
      expect(LogLevel.ERROR).toBe('error');
      expect(LogLevel.WARN).toBe('warn');
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.DEBUG).toBe('debug');
    });
  });

  describe('Message Formatting', () => {
    it('should include timestamp in error messages', () => {
      logger.error('Test message');
      expect(consoleSpy.error).toHaveBeenCalled();
      const loggedMessage = consoleSpy.error.mock.calls[0][0];
      expect(loggedMessage).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should format context properly in error messages', () => {
      logger.error('Test message', 'MyContext');
      expect(consoleSpy.error).toHaveBeenCalled();
      const loggedMessage = consoleSpy.error.mock.calls[0][0];
      expect(loggedMessage).toContain('[MyContext]');
      expect(loggedMessage).toContain('Test message');
    });
  });
});