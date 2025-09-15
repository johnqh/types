import { describe, it, expect } from 'vitest';
import { ChainType } from '../../../src/types/business/enums';
import { AddressValidator } from '../../../src/utils/validation/address-validator';

describe('AddressValidator', () => {
  describe('validateComprehensive', () => {
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
          const result = AddressValidator.validateComprehensive(address);
          
          expect(result.isValid).toBe(true);
          expect(result.addressType).toBe('evm');
          expect(result.normalizedAddress).toBe(address.toLowerCase());
          expect(result.formats.evm).toBe(true);
          expect(result.formats.solana).toBe(false);
          expect(result.formats.ens).toBe(false);
          expect(result.formats.sns).toBe(false);
          expect(result.error).toBeUndefined();
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
          const result = AddressValidator.validateComprehensive(address);
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
          expect(result.error).toContain('Invalid address format');
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
          const result = AddressValidator.validateComprehensive(address);
          
          expect(result.isValid).toBe(true);
          expect(result.addressType).toBe('solana');
          expect(result.normalizedAddress).toBe(address); // Keep case for Solana
          expect(result.formats.evm).toBe(false);
          expect(result.formats.solana).toBe(true);
          expect(result.formats.ens).toBe(false);
          expect(result.formats.sns).toBe(false);
          expect(result.error).toBeUndefined();
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
          const result = AddressValidator.validateComprehensive(address);
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
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
          const result = AddressValidator.validateComprehensive(name);
          
          expect(result.isValid).toBe(true);
          expect(result.addressType).toBe('ens');
          expect(result.normalizedAddress).toBe(name.toLowerCase());
          expect(result.formats.evm).toBe(false);
          expect(result.formats.solana).toBe(false);
          expect(result.formats.ens).toBe(true);
          expect(result.formats.sns).toBe(false);
          expect(result.error).toBeUndefined();
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
          const result = AddressValidator.validateComprehensive(name);
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
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
          const result = AddressValidator.validateComprehensive(name);
          
          expect(result.isValid).toBe(true);
          expect(result.addressType).toBe('sns');
          expect(result.normalizedAddress).toBe(name.toLowerCase());
          expect(result.formats.evm).toBe(false);
          expect(result.formats.solana).toBe(false);
          expect(result.formats.ens).toBe(false);
          expect(result.formats.sns).toBe(true);
          expect(result.error).toBeUndefined();
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
          const result = AddressValidator.validateComprehensive(name);
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
        });
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty and null inputs', () => {
        const emptyInputs = ['', null, undefined];
        
        emptyInputs.forEach((input) => {
          const result = AddressValidator.validateComprehensive(input as any);
          
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
          expect(result.error).toBe('Address parameter is required');
          expect(result.normalizedAddress).toBe(input || '');
        });
      });

      it('should handle whitespace inputs', () => {
        const whitespaceInputs = [' ', '  ', '\t', '\n'];
        
        whitespaceInputs.forEach((input) => {
          const result = AddressValidator.validateComprehensive(input);
          expect(result.isValid).toBe(false);
          expect(result.addressType).toBe('unknown');
        });
      });

      it('should prioritize EVM over other formats for ambiguous cases', () => {
        // This is a theoretical case - in practice, formats shouldn't overlap
        const evmAddress = '0x1234567890123456789012345678901234567890';
        const result = AddressValidator.validateComprehensive(evmAddress);
        
        expect(result.addressType).toBe('evm');
        expect(result.formats.evm).toBe(true);
      });

      it('should handle mixed case correctly', () => {
        const mixedCaseEVM = '0xAbCdEf1234567890123456789012345678901234';
        const result = AddressValidator.validateComprehensive(mixedCaseEVM);
        
        expect(result.isValid).toBe(true);
        expect(result.normalizedAddress).toBe(mixedCaseEVM.toLowerCase());
      });
    });
  });

  describe('validateBasic', () => {
    it('should validate EVM addresses for basic validation', () => {
      const evmAddress = '0x1234567890123456789012345678901234567890';
      const result = AddressValidator.validateBasic(evmAddress);
      
      expect(result.isValid).toBe(true);
      expect(result.addressType).toBe(ChainType.EVM);
      expect(result.normalizedAddress).toBe(evmAddress.toLowerCase());
    });

    it('should validate Solana addresses for basic validation', () => {
      const solanaAddress = 'So11111111111111111111111111111112';
      const result = AddressValidator.validateBasic(solanaAddress);
      
      expect(result.isValid).toBe(true);
      expect(result.addressType).toBe(ChainType.SOLANA);
      expect(result.normalizedAddress).toBe(solanaAddress);
    });

    it('should return UNKNOWN for invalid addresses', () => {
      const invalidAddress = 'invalid-address';
      const result = AddressValidator.validateBasic(invalidAddress);
      
      expect(result.isValid).toBe(false);
      expect(result.addressType).toBe(ChainType.UNKNOWN);
      expect(result.normalizedAddress).toBe(invalidAddress);
    });

    it('should handle empty input', () => {
      const result = AddressValidator.validateBasic('');
      
      expect(result.isValid).toBe(false);
      expect(result.addressType).toBe(ChainType.UNKNOWN);
      expect(result.normalizedAddress).toBe('');
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
          expect(AddressValidator.isValidEVMAddress(address)).toBe(true);
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
          expect(AddressValidator.isValidEVMAddress(address)).toBe(false);
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
          expect(AddressValidator.isValidSolanaAddress(address)).toBe(true);
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
          expect(AddressValidator.isValidSolanaAddress(address)).toBe(false);
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
          expect(AddressValidator.isValidENSName(name)).toBe(true);
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
          expect(AddressValidator.isValidENSName(name)).toBe(false);
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
          expect(AddressValidator.isValidSNSName(name)).toBe(true);
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
          expect(AddressValidator.isValidSNSName(name)).toBe(false);
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
        expect(AddressValidator.isValidSNSName(testName)).toBe(true);
      });
    });

    it('should reject unlisted SNS TLDs', () => {
      const invalidTLDs = ['com', 'net', 'org', 'eth', 'box', 'invalid'];
      
      invalidTLDs.forEach((tld) => {
        const testName = `test.${tld}`;
        expect(AddressValidator.isValidSNSName(testName)).toBe(false);
      });
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle very long strings gracefully', () => {
      const veryLongString = 'a'.repeat(1000);
      const result = AddressValidator.validateComprehensive(veryLongString);
      
      expect(result.isValid).toBe(false);
      expect(result.addressType).toBe('unknown');
    });

    it('should handle special characters', () => {
      const specialChars = ['test@domain.eth', 'test#domain.sol', 'test$domain.abc'];
      
      specialChars.forEach((address) => {
        const result = AddressValidator.validateComprehensive(address);
        expect(result.isValid).toBe(false);
      });
    });

    it('should be case insensitive for domain names', () => {
      const mixedCaseDomains = ['TEST.ETH', 'Example.BOX', 'User.SOL'];
      
      mixedCaseDomains.forEach((domain) => {
        const result = AddressValidator.validateComprehensive(domain);
        if (result.isValid) {
          expect(result.normalizedAddress).toBe(domain.toLowerCase());
        }
      });
    });

    it('should handle unicode characters', () => {
      const unicodeNames = ['tëst.eth', 'exämple.sol', 'ùser.abc'];
      
      unicodeNames.forEach((name) => {
        const result = AddressValidator.validateComprehensive(name);
        // Unicode should be rejected by current implementation
        expect(result.isValid).toBe(false);
      });
    });
  });
});