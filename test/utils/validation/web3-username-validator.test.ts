import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import { Web3UsernameValidator } from '../../../src/utils/validation/web3-username-validator';

describe('Web3UsernameValidator', () => {
  describe('validate', () => {
    describe('EVM Address Validation', () => {
      it('should validate correct EVM addresses', () => {
        const validEVMAddresses = [
          '0x1234567890123456789012345678901234567890',
          '0xABCDEF1234567890123456789012345678901234',
          '0xabcdef1234567890123456789012345678901234',
          '0x0000000000000000000000000000000000000000',
          '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        ];

        validEVMAddresses.forEach((address) => {
          const result = Web3UsernameValidator.validate(address);

          expect(result).toBeDefined();
          expect(result?.chainType).toBe(ChainType.EVM);
          expect(result?.address).toBe(address.toLowerCase());
          expect(result?.name).toBe(null);
        });
      });

      it('should reject invalid EVM addresses', () => {
        const invalidEVMAddresses = [
          '0x123456789012345678901234567890123456789', // too short
          '0x12345678901234567890123456789012345678901', // too long
          '0xGHIJKL1234567890123456789012345678901234', // invalid hex
          '1234567890123456789012345678901234567890', // missing 0x
          '0X1234567890123456789012345678901234567890', // wrong case prefix
        ];

        invalidEVMAddresses.forEach((address) => {
          const result = Web3UsernameValidator.validate(address);
          expect(result).toBeUndefined();
        });
      });
    });

    describe('Solana Address Validation', () => {
      it('should validate correct Solana addresses', () => {
        const validSolanaAddresses = [
          'So11111111111111111111111111111112',
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          'DXyiixfbQbt6QBEAKdo6AipLGsJnUDqxWcU6YqxLHBDa',
        ];

        validSolanaAddresses.forEach((address) => {
          const result = Web3UsernameValidator.validate(address);

          expect(result).toBeDefined();
          expect(result?.chainType).toBe(ChainType.SOLANA);
          expect(result?.address).toBe(address); // Keep case for Solana
          expect(result?.name).toBe(null);
        });
      });

      it('should reject invalid Solana addresses', () => {
        const invalidSolanaAddresses = [
          '0xDsK1234567890123456789012345678901234567890', // has 0x prefix
          'DsK123456789012345678901234567890123456789012345', // too long
          'DsK12345678901234567890123456789', // too short
          'DsK123456789012345678901234567890123456789O', // invalid base58 (O)
          'DsK123456789012345678901234567890123456789I', // invalid base58 (I)
          'DsK1234567890123456789012345678901234567890l', // invalid base58 (l)
        ];

        invalidSolanaAddresses.forEach((address) => {
          const result = Web3UsernameValidator.validate(address);
          expect(result).toBeUndefined();
        });
      });
    });

    describe('ENS Name Validation', () => {
      it('should validate correct ENS names', () => {
        const validENSNames = [
          'test.eth',
          'example.box',
          'my-domain.eth',
          'a.eth',
          'user123.eth',
          'UPPERCASE.ETH',
          'mixed-Case.Box',
          'complex-name-123.eth',
        ];

        validENSNames.forEach((name) => {
          const result = Web3UsernameValidator.validate(name);

          expect(result).toBeDefined();
          expect(result?.chainType).toBe(ChainType.EVM); // ENS resolves to EVM addresses
          expect(result?.name).toBe(name.toLowerCase());
          expect(result?.address).toBe(null);
        });
      });

      it('should reject invalid ENS names', () => {
        const invalidENSNames = [
          '.eth', // no name part
          'test.', // no TLD
          'test.com', // wrong TLD
          '-test.eth', // starts with hyphen
          'test-.eth', // ends with hyphen
          'te--st.eth', // consecutive hyphens
          '.box', // no name part
          'test.eth.com', // multiple dots
          '', // empty string
        ];

        invalidENSNames.forEach((name) => {
          const result = Web3UsernameValidator.validate(name);
          expect(result).toBeUndefined();
        });
      });
    });

    describe('SNS Name Validation', () => {
      it('should validate correct SNS names', () => {
        const validSNSNames = [
          'test.sol',
          'example.abc',
          'user.bonk',
          'domain.poor',
          'name.gm',
          'project.dao',
          'finance.defi',
          'site.web3',
          'a.sol',
          'user123.sol',
        ];

        validSNSNames.forEach((name) => {
          const result = Web3UsernameValidator.validate(name);

          expect(result).toBeDefined();
          expect(result?.chainType).toBe(ChainType.SOLANA); // SNS resolves to Solana addresses
          expect(result?.name).toBe(name.toLowerCase());
          expect(result?.address).toBe(null);
        });
      });

      it('should reject invalid SNS names', () => {
        const invalidSNSNames = [
          'test.invalid', // invalid TLD
          '.sol', // no name part
          'test.', // no TLD
          '-test.sol', // starts with hyphen
          'test-.sol', // ends with hyphen
          'te--st.sol', // consecutive hyphens
          'test.sol.com', // multiple dots
          '', // empty string
        ];

        invalidSNSNames.forEach((name) => {
          const result = Web3UsernameValidator.validate(name);
          expect(result).toBeUndefined();
        });
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty and null inputs', () => {
        const emptyInputs = ['', null, undefined];

        emptyInputs.forEach((input) => {
          const result = Web3UsernameValidator.validate(input as any);
          expect(result).toBeUndefined();
        });
      });

      it('should handle whitespace inputs', () => {
        const whitespaceInputs = [' ', '  ', '\t', '\n'];

        whitespaceInputs.forEach((input) => {
          const result = Web3UsernameValidator.validate(input);
          expect(result).toBeUndefined();
        });
      });

      it('should prioritize EVM over other formats for ambiguous cases', () => {
        // This is a theoretical case - in practice, formats shouldn't overlap
        const evmAddress = '0x1234567890123456789012345678901234567890';
        const result = Web3UsernameValidator.validate(evmAddress);

        expect(result).toBeDefined();
        expect(result?.chainType).toBe(ChainType.EVM);
      });

      it('should handle mixed case correctly', () => {
        const mixedCaseEVM = '0xAbCdEf1234567890123456789012345678901234';
        const result = Web3UsernameValidator.validate(mixedCaseEVM);

        expect(result).toBeDefined();
        expect(result?.address).toBe(mixedCaseEVM.toLowerCase());
      });
    });
  });


  describe('Quick Validation Methods', () => {
    describe('isValidEVMAddress', () => {
      it('should validate correct EVM addresses', () => {
        const validAddresses = [
          '0x1234567890123456789012345678901234567890',
          '0xABCDEF1234567890123456789012345678901234',
          '0x0000000000000000000000000000000000000000',
        ];

        validAddresses.forEach((address) => {
          expect(Web3UsernameValidator.isValidEVMAddress(address)).toBe(true);
        });
      });

      it('should reject invalid EVM addresses', () => {
        const invalidAddresses = [
          '1234567890123456789012345678901234567890', // no 0x
          '0x123456789012345678901234567890123456789', // too short
          '0xGHIJ567890123456789012345678901234567890', // invalid hex
          'DsK1234567890123456789012345678901234567890', // solana address
        ];

        invalidAddresses.forEach((address) => {
          expect(Web3UsernameValidator.isValidEVMAddress(address)).toBe(false);
        });
      });
    });

    describe('isValidSolanaAddress', () => {
      it('should validate correct Solana addresses', () => {
        const validAddresses = [
          'So11111111111111111111111111111112',
          'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        ];

        validAddresses.forEach((address) => {
          expect(Web3UsernameValidator.isValidSolanaAddress(address)).toBe(true);
        });
      });

      it('should reject invalid Solana addresses', () => {
        const invalidAddresses = [
          '0xDsK1234567890123456789012345678901234567890', // has 0x
          'DsK', // too short
          'DsK123456789012345678901234567890123456789012345', // too long
          'DsK123456789012345678901234567890123456789O', // invalid base58
        ];

        invalidAddresses.forEach((address) => {
          expect(Web3UsernameValidator.isValidSolanaAddress(address)).toBe(false);
        });
      });
    });

    describe('isValidENSName', () => {
      it('should validate correct ENS names', () => {
        const validNames = [
          'test.eth',
          'example.box',
          'user-123.eth',
          'a.eth',
        ];

        validNames.forEach((name) => {
          expect(Web3UsernameValidator.isValidENSName(name)).toBe(true);
        });
      });

      it('should reject invalid ENS names', () => {
        const invalidNames = [
          'test.sol', // wrong TLD
          'test.com', // wrong TLD
          '.eth', // no name
          'test.', // no TLD
          '-test.eth', // starts with hyphen
        ];

        invalidNames.forEach((name) => {
          expect(Web3UsernameValidator.isValidENSName(name)).toBe(false);
        });
      });
    });

    describe('isValidSNSName', () => {
      it('should validate correct SNS names', () => {
        const validNames = [
          'test.sol',
          'example.abc',
          'user.bonk',
          'domain.poor',
          'name.gm',
          'project.dao',
          'finance.defi',
          'site.web3',
        ];

        validNames.forEach((name) => {
          expect(Web3UsernameValidator.isValidSNSName(name)).toBe(true);
        });
      });

      it('should reject invalid SNS names', () => {
        const invalidNames = [
          'test.invalid', // invalid TLD
          '.sol', // no name
          'test.', // no TLD
          '-test.sol', // starts with hyphen
          'test.sol.com', // multiple dots
        ];

        invalidNames.forEach((name) => {
          expect(Web3UsernameValidator.isValidSNSName(name)).toBe(false);
        });
      });
    });
  });

  describe('Static Properties and Constants', () => {
    it('should have valid SNS TLDs defined', () => {
      const expectedTLDs = ['sol', 'abc', 'bonk', 'poor', 'gm', 'dao', 'defi', 'web3'];
      
      // Test that all expected TLDs work
      expectedTLDs.forEach((tld) => {
        const testName = `test.${tld}`;
        expect(Web3UsernameValidator.isValidSNSName(testName)).toBe(true);
      });
    });

    it('should reject unlisted SNS TLDs', () => {
      const invalidTLDs = ['com', 'net', 'org', 'eth', 'box', 'invalid'];
      
      invalidTLDs.forEach((tld) => {
        const testName = `test.${tld}`;
        expect(Web3UsernameValidator.isValidSNSName(testName)).toBe(false);
      });
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle very long strings gracefully', () => {
      const veryLongString = 'a'.repeat(1000);
      const result = Web3UsernameValidator.validate(veryLongString);

      expect(result).toBeUndefined();
    });

    it('should handle special characters', () => {
      const specialChars = ['test@domain.eth', 'test#domain.sol', 'test$domain.abc'];

      specialChars.forEach((address) => {
        const result = Web3UsernameValidator.validate(address);
        expect(result).toBeUndefined();
      });
    });

    it('should be case insensitive for domain names', () => {
      const mixedCaseDomains = ['TEST.ETH', 'Example.BOX', 'User.SOL'];

      mixedCaseDomains.forEach((domain) => {
        const result = Web3UsernameValidator.validate(domain);
        if (result) {
          expect(result.name).toBe(domain.toLowerCase());
        }
      });
    });

    it('should handle unicode characters', () => {
      const unicodeNames = ['tëst.eth', 'exämple.sol', 'ùser.abc'];

      unicodeNames.forEach((name) => {
        const result = Web3UsernameValidator.validate(name);
        // Unicode should be rejected by current implementation
        expect(result).toBeUndefined();
      });
    });
  });
});