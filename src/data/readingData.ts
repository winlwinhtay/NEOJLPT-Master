import { ReadingLesson } from '../types';
import { READING_N5_EXERCISES } from './reading/readingN5';
import { READING_N4_EXERCISES } from './reading/readingN4';
import { READING_N3_EXERCISES } from './reading/readingN3';
import { READING_N2_EXERCISES } from './reading/readingN2';
import { READING_N1_EXERCISES } from './reading/readingN1';

/**
 * Complete 50-Exercise Japanese University Reading Curriculum Library
 * N5: 10 exercises (r-n5-01 to r-n5-10)
 * N4: 10 exercises (r-n4-01 to r-n4-10)
 * N3: 10 exercises (r-n3-01 to r-n3-10)
 * N2: 10 exercises (r-n2-01 to r-n2-10)
 * N1: 10 exercises (r-n1-01 to r-n1-10)
 * Total: 50 distinct Japanese educational reading passages across 10 distinct curricular topics.
 */
export const READING_DATA: ReadingLesson[] = [
  ...READING_N5_EXERCISES,
  ...READING_N4_EXERCISES,
  ...READING_N3_EXERCISES,
  ...READING_N2_EXERCISES,
  ...READING_N1_EXERCISES,
] as unknown as ReadingLesson[];
