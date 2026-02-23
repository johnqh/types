# Improvement Plans for @sudobility/types

## Priority 1 - High Impact

### 1. Add Comprehensive JSDoc to All Exported Types
- Many interfaces and types lack `@description`, `@example`, and `@since` tags
- Add `@example` blocks to utility functions like `safeAsync`, `withTimeout`, `withCache`
- Document all enum values with descriptions

### 2. Increase Test Coverage
- Current coverage is moderate; add tests for edge cases in validators (`validateAddress`, `validateAmount`)
- Add property-based tests for pure utility functions in `utils/`
- Test all type guard functions with both positive and negative cases

### 3. Extract Blockchain Types to Separate Entry Point
- `src/types/blockchain/` could be a separate export path (`@sudobility/types/blockchain`)
- This avoids importing blockchain-heavy types in projects that don't need them
- Follows the pattern already used by entity and subscription types

## Priority 2 - Medium Impact

### 4. Add Zod Schema Validation
- Consider adding Zod schemas alongside TypeScript types for runtime validation
- Would allow shared validation between client and server
- Start with request/response types in `entity/requests.ts` and `entity/responses.ts`

### 5. Consolidate Enum Definitions
- Some enums are defined in multiple places across the ecosystem
- Ensure `types` is the single source of truth for all shared enums
- Add deprecation notices for any duplicated enums in downstream packages

### 6. Add Changelog or Migration Guide
- Document breaking changes between versions
- Help downstream consumers know what changed when upgrading

## Priority 3 - Nice to Have

### 7. Bundle Size Optimization
- Audit tree-shaking effectiveness of the dual CJS/ESM build
- Consider splitting large files (e.g., `common.ts`) into smaller modules
- Add bundle size tracking to CI

### 8. Add Type-Level Tests
- Use `expectType` or `tsd` to verify type inference works correctly
- Especially important for generic types like `Result<T>`, `Optional<T>`, `PaginatedResponse<T>`

### 9. Generate API Documentation
- Use TypeDoc or similar to auto-generate HTML docs from JSDoc
- Publish to a docs site for easy reference by downstream consumers
