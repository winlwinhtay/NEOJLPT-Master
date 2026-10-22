import { MockTest } from '../types/practice';
import { ALL_MOCK_TESTS, getMockTestsByLevel, getMockTestById } from './mockTests';

export { ALL_MOCK_TESTS, getMockTestsByLevel, getMockTestById };

/**
 * 25 Complete Historical-Style Practice Sets (2020–2025 Formats)
 * 5 Sets each for N5, N4, N3, N2, and N1
 */
export const MOCK_TESTS: Record<string, MockTest> = ALL_MOCK_TESTS;
