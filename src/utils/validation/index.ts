// Address validation
export type {
  AddressValidationResult,
  BasicValidationResult
} from './address-validator';

export {
  AddressValidator
} from './address-validator';

// Type validation
export type {
  ValidationResult
} from './type-validation';

export {
  createAssertion,
  createValidator,
  hasRequiredProperties,
  isApiResponse,
  isArray,
  isBoolean,
  isEmail,
  isErrorResponse,
  isNullish,
  isNumber,
  isObject,
  isString,
  isSuccessResponse,
  isUrl,
  isValidDate,
  optional,
  parseJson,
  validateArray
} from './type-validation';
