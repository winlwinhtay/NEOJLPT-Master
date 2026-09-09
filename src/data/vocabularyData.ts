import { VocabularyItem } from '../types';
import { generateFullVocabulary } from './generators/vocabGenerator';

export const VOCABULARY_DATA: VocabularyItem[] = generateFullVocabulary();
