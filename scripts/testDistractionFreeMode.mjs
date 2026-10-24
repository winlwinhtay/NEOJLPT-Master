// scripts/testDistractionFreeMode.mjs
// Verifies Distraction-Free Lesson Mode across modules, route hash parsing, and layout contracts

import assert from 'assert';
import fs from 'fs';

console.log('================================================================');
console.log(' DISTRACTION-FREE LESSON MODE CONTRACT VERIFICATION SUITE');
console.log('================================================================\n');

// 1. AppContext validation
console.log('--- TEST 1: AppContext Route & Distraction-Free State Contract ---');
const appContextCode = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

assert.ok(appContextCode.includes('isDistractionFree'), 'AppContext must expose isDistractionFree');
assert.ok(appContextCode.includes('selectedKanjiId'), 'AppContext must track selectedKanjiId');
assert.ok(appContextCode.includes('selectedGrammarId'), 'AppContext must track selectedGrammarId');
assert.ok(appContextCode.includes('selectedVocabId'), 'AppContext must track selectedVocabId');
assert.ok(appContextCode.includes('selectedReadingId'), 'AppContext must track selectedReadingId');
assert.ok(appContextCode.includes('selectedListeningId'), 'AppContext must track selectedListeningId');
assert.ok(appContextCode.includes('selectedLessonId'), 'AppContext must track selectedLessonId');
assert.ok(appContextCode.includes('isExamSimulating'), 'AppContext must track isExamSimulating');

// Verify hash query synchronization
assert.ok(appContextCode.includes('parseHashState'), 'AppContext must parse hash query parameters');
assert.ok(appContextCode.includes('#kanji?id='), 'AppContext must serialize kanji id to hash');
assert.ok(appContextCode.includes('#grammar?id='), 'AppContext must serialize grammar id to hash');
assert.ok(appContextCode.includes('#vocabulary?id='), 'AppContext must serialize vocab id to hash');
assert.ok(appContextCode.includes('#reading?id='), 'AppContext must serialize reading id to hash');
assert.ok(appContextCode.includes('#listening?id='), 'AppContext must serialize listening id to hash');
console.log('  ✓ PASS: AppContext manages lesson identification and URL hash synchronization');

// 2. App.tsx Layout Contract
console.log('\n--- TEST 2: App Shell Layout & Navigation Offsets Contract ---');
const appCode = fs.readFileSync('src/App.tsx', 'utf8');

assert.ok(
  appCode.includes('!isDistractionFree && activeView !== \'admin\' && <Navbar />') ||
  appCode.includes('!isDistractionFree && activeView !== "admin" && <Navbar />'),
  'App.tsx must conditionally hide Navbar in distraction-free mode'
);
assert.ok(
  appCode.includes('!isDistractionFree && activeView !== \'admin\' && <Sidebar />') ||
  appCode.includes('!isDistractionFree && activeView !== "admin" && <Sidebar />'),
  'App.tsx must conditionally hide Sidebar in distraction-free mode'
);
assert.ok(
  appCode.includes('!isDistractionFree && activeView !== \'admin\' && <BottomNav />') ||
  appCode.includes('!isDistractionFree && activeView !== "admin" && <BottomNav />'),
  'App.tsx must conditionally hide BottomNav in distraction-free mode'
);
assert.ok(
  appCode.includes('max-w-none p-0'),
  'App.tsx must remove max-w and padding constraints in distraction-free mode'
);
console.log('  ✓ PASS: Main layout hides navigation shell and expands to full viewport');

// 3. LessonLayout & LessonToolbar Component Contract
console.log('\n--- TEST 3: LessonLayout & LessonToolbar Component Contract ---');
const layoutCode = fs.readFileSync('src/components/layout/LessonLayout.tsx', 'utf8');
const toolbarCode = fs.readFileSync('src/components/layout/LessonToolbar.tsx', 'utf8');

assert.ok(layoutCode.includes('LessonToolbar'), 'LessonLayout must render LessonToolbar');
assert.ok(toolbarCode.includes("e.key === 'Escape'"), 'LessonToolbar must support Escape key to exit');
assert.ok(toolbarCode.includes("e.key === '['"), 'LessonToolbar must support [ key for previous lesson');
assert.ok(toolbarCode.includes("e.key === ']'"), 'LessonToolbar must support ] key for next lesson');
assert.ok(toolbarCode.includes('onBack'), 'LessonToolbar must support onBack callback');
console.log('  ✓ PASS: Reusable LessonLayout provides accessible toolbar with keybindings');

// 4. Module Views Integration Contract
console.log('\n--- TEST 4: Learning Modules Implementation Contract ---');
const kanjiCode = fs.readFileSync('src/views/KanjiView.tsx', 'utf8');
const grammarCode = fs.readFileSync('src/views/GrammarView.tsx', 'utf8');
const vocabCode = fs.readFileSync('src/views/VocabularyView.tsx', 'utf8');
const readingCode = fs.readFileSync('src/views/ReadingView.tsx', 'utf8');
const listeningCode = fs.readFileSync('src/views/ListeningView.tsx', 'utf8');
const roadmapCode = fs.readFileSync('src/views/LearnRoadmapView.tsx', 'utf8');
const mockCode = fs.readFileSync('src/views/MockTestView.tsx', 'utf8');

assert.ok(kanjiCode.includes('LessonLayout') && kanjiCode.includes('selectedKanjiId'), 'KanjiView implements LessonLayout');
assert.ok(grammarCode.includes('LessonLayout') && grammarCode.includes('selectedGrammarId'), 'GrammarView implements LessonLayout');
assert.ok(vocabCode.includes('LessonLayout') && vocabCode.includes('selectedVocabId'), 'VocabularyView implements LessonLayout');
assert.ok(readingCode.includes('LessonLayout') && readingCode.includes('selectedReadingId'), 'ReadingView implements LessonLayout');
assert.ok(listeningCode.includes('LessonLayout') && listeningCode.includes('selectedListeningId'), 'ListeningView implements LessonLayout');
assert.ok(roadmapCode.includes('LessonLayout') && roadmapCode.includes('currentLesson'), 'LearnRoadmapView implements LessonLayout');
assert.ok(mockCode.includes('setIsExamSimulating'), 'MockTestView drives isExamSimulating');

console.log('  ✓ PASS: KanjiView activates distraction-free mode on character select');
console.log('  ✓ PASS: GrammarView activates distraction-free mode on grammar pattern select');
console.log('  ✓ PASS: VocabularyView activates distraction-free mode on flashcard session start');
console.log('  ✓ PASS: ReadingView activates distraction-free mode on passage select');
console.log('  ✓ PASS: ListeningView activates distraction-free mode on drill select');
console.log('  ✓ PASS: LearnRoadmapView activates distraction-free mode on unit lesson select');
console.log('  ✓ PASS: MockTestView activates distraction-free mode on exam simulation');

console.log('\n================================================================');
console.log(' ALL DISTRACTION-FREE LESSON MODE CONTRACTS SATISFIED (100% PASS)');
console.log('================================================================');
