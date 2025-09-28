
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
// Removida a referência global simples para @testing-library/jest-dom
// /// <reference types="@testing-library/jest-dom" />

// Importação explícita dos tipos de matchers
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// Augment Vitest's Assertion interface
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<typeof expect.stringContaining, unknown> {}
}

