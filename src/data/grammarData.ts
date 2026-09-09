import { GrammarItem } from '../types';
import { generateFullGrammar } from './generators/grammarGenerator';

export const GRAMMAR_DATA: GrammarItem[] = generateFullGrammar();
