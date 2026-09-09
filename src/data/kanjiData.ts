import { KanjiItem } from '../types';
import { generateFullKanji } from './generators/kanjiGenerator';

export const KANJI_DATA: KanjiItem[] = generateFullKanji();
