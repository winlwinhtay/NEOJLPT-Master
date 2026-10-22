import { MockTest, JLPTLevel } from '../../types/practice';
import { N5_MOCK_TESTS } from './n5MockTests';
import { N4_MOCK_TESTS } from './n4MockTests';
import { N3_MOCK_TESTS } from './n3MockTests';
import { N2_MOCK_TESTS } from './n2MockTests';
import { N1_MOCK_TESTS } from './n1MockTests';

/**
 * 25 Complete Historical-Style JLPT Mock Tests (2020–2025 formats)
 * 5 Independent Practice Sets for each JLPT Level (N5, N4, N3, N2, N1)
 */
export const ALL_MOCK_TESTS: Record<string, MockTest> = {
  ...N5_MOCK_TESTS,
  ...N4_MOCK_TESTS,
  ...N3_MOCK_TESTS,
  ...N2_MOCK_TESTS,
  ...N1_MOCK_TESTS,
};

/**
 * Get all mock tests available for a given JLPT Level
 */
export function getMockTestsByLevel(level: JLPTLevel): MockTest[] {
  return Object.values(ALL_MOCK_TESTS)
    .filter((test) => test.level === level)
    .sort((a, b) => (a.setNumber ?? 1) - (b.setNumber ?? 1));
}

/**
 * Get a specific mock test by ID
 */
export function getMockTestById(id: string): MockTest | undefined {
  return ALL_MOCK_TESTS[id];
}
