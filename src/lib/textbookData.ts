// Types
export interface TextbookBlock {
  type: 'heading' | 'paragraph' | 'example' | 'keyterm' | 'diagram' | 'quiz' | 'summary' | 'funfact' | 'tip';
  text?: string;
  term?: string;
  definition?: string;
  emoji?: string;
  question?: string;
  options?: string[];
  answer?: number;
}

export interface TextbookPage {
  title: string;
  blocks: TextbookBlock[];
}

export interface TextbookChapter {
  id: string;
  title: string;
  emoji: string;
  pages: TextbookPage[];
}

export interface TextbookSubject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  chapters: TextbookChapter[];
}

export interface TextbookLevel {
  id: string;
  name: string;
  emoji: string;
  color: string;
  subjects: TextbookSubject[];
}

// Helper functions for concise block creation
function h(text: string): TextbookBlock { return { type: 'heading', text }; }
function p(text: string): TextbookBlock { return { type: 'paragraph', text }; }
function ex(text: string): TextbookBlock { return { type: 'example', text }; }
function kt(term: string, definition: string): TextbookBlock { return { type: 'keyterm', term, definition }; }
function d(emoji: string, text: string): TextbookBlock { return { type: 'diagram', emoji, text }; }
function q(question: string, options: string[], answer: number): TextbookBlock { return { type: 'quiz', question, options, answer }; }
function s(text: string): TextbookBlock { return { type: 'summary', text }; }
function ff(text: string): TextbookBlock { return { type: 'funfact', text }; }
function tip(text: string): TextbookBlock { return { type: 'tip', text }; }

// Generate 10 pages per chapter with 10 content blocks each
function generateChapterPages(chapterTitle: string, prefix: string): TextbookPage[] {
  const pages: TextbookPage[] = [];
  
  for (let pageNum = 1; pageNum <= 10; pageNum++) {
    pages.push({
      title: `${chapterTitle} - Part ${pageNum}`,
      blocks: [
        h(`${chapterTitle}: Section ${pageNum}`),
        p(`This is part ${pageNum} of our comprehensive lesson on ${chapterTitle}. We explore important concepts and real-world applications that will help you understand this subject better.`),
        ex(`Example: In ${chapterTitle}, we see how ${prefix} concepts apply to everyday life in the Philippines.`),
        kt(`Key Concept ${pageNum}`, `Understanding the definition and importance of core concept number ${pageNum} within ${chapterTitle}.`),
        d('📚', `Visual diagram showing the relationships and structure of ${chapterTitle} - Section ${pageNum}`),
        q(`What is the main topic covered in Part ${pageNum}?`, [
          `A common misconception about part ${pageNum}`,
          `The correct understanding of the main concept in part ${pageNum}`,
          `A secondary concept related to part ${pageNum}`,
          `An unrelated topic`
        ], 1),
        s(`Part ${pageNum} teaches us that ${chapterTitle} requires consistent practice and understanding of foundational concepts.`),
        ff(`Did you know? ${chapterTitle} has fascinating history and continues to evolve in modern times!`),
        tip(`Helpful tip: Review part ${pageNum} multiple times and discuss it with classmates for deeper understanding.`),
        q(`Which statement about Part ${pageNum} is correct?`, [
          `Statement 1 about this section`,
          `Statement 2 about this section`,
          `Statement 3 about this section`,
          `All of the above`
        ], 3)
      ]
    });
  }
  
  return pages;
}

// Create 10 chapters with 10 pages each
function createSubjectChapters(subjectName: string, prefix: string, startEmoji: string): TextbookChapter[] {
  const chapters: TextbookChapter[] = [];
  const emojis = ['📖', '📕', '📗', '📘', '📙', '📔', '✍️', '📝', '📑', '📄'];
  
  for (let i = 1; i <= 10; i++) {
    chapters.push({
      id: `chap-${i}`,
      title: `${subjectName} Chapter ${i}`,
      emoji: emojis[i - 1] || '📖',
      pages: generateChapterPages(`${subjectName} Lesson ${i}`, prefix)
    });
  }
  
  return chapters;
}

// Create all 5 subjects for each level with 10 chapters x 10 pages
function createLevelSubjects(): TextbookSubject[] {
  return [
    {
      id: 'subject-1',
      name: 'English & Language Arts',
      emoji: '🔤',
      color: 'from-blue-400 to-blue-600',
      chapters: createSubjectChapters('English', 'language and communication', '📖')
    },
    {
      id: 'subject-2',
      name: 'Mathematics',
      emoji: '🔢',
      color: 'from-green-400 to-green-600',
      chapters: createSubjectChapters('Mathematics', 'numerical problem-solving', '📊')
    },
    {
      id: 'subject-3',
      name: 'Science',
      emoji: '🔬',
      color: 'from-purple-400 to-purple-600',
      chapters: createSubjectChapters('Science', 'scientific inquiry', '🧬')
    },
    {
      id: 'subject-4',
      name: 'Social Studies',
      emoji: '🌍',
      color: 'from-red-400 to-red-600',
      chapters: createSubjectChapters('Social Studies', 'society and culture', '🏛️')
    },
    {
      id: 'subject-5',
      name: 'Integrated Arts & Values',
      emoji: '🎨',
      color: 'from-pink-400 to-pink-600',
      chapters: createSubjectChapters('Arts & Values', 'creativity and character', '🎭')
    }
  ];
}

// Define all 6 levels (Kinder, Grades 1-2, Grades 3-4, Grades 5-6, Junior High, Senior High)
export const TEXTBOOK_LEVELS: TextbookLevel[] = [
  {
    id: 'level-kinder',
    name: 'Kindergarten',
    emoji: '👶',
    color: 'from-yellow-400 to-orange-500',
    subjects: createLevelSubjects()
  },
  {
    id: 'level-g12',
    name: 'Grades 1-2',
    emoji: '🎓',
    color: 'from-blue-400 to-blue-600',
    subjects: createLevelSubjects()
  },
  {
    id: 'level-g34',
    name: 'Grades 3-4',
    emoji: '📚',
    color: 'from-green-400 to-green-600',
    subjects: createLevelSubjects()
  },
  {
    id: 'level-g56',
    name: 'Grades 5-6',
    emoji: '✏️',
    color: 'from-purple-400 to-purple-600',
    subjects: createLevelSubjects()
  },
  {
    id: 'level-jhs',
    name: 'Junior High School (7-9)',
    emoji: '🎯',
    color: 'from-red-400 to-red-600',
    subjects: createLevelSubjects()
  },
  {
    id: 'level-shs',
    name: 'Senior High School (10-12)',
    emoji: '🏫',
    color: 'from-indigo-500 to-indigo-700',
    subjects: createLevelSubjects()
  }
];

// Search functionality
export interface SearchResult {
  levelId: string;
  levelName: string;
  levelColor: string;
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  subjectColor: string;
  chapterId: string;
  chapterTitle: string;
  chapterEmoji: string;
  pageTitle: string;
  pageIdx: number;
}

export function searchPages(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();
  if (!q) return results;

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      for (const chapter of subject.chapters) {
        for (let pageIdx = 0; pageIdx < chapter.pages.length; pageIdx++) {
          const page = chapter.pages[pageIdx];
          const haystack = (page.title + ' ' + page.blocks.map(b => b.text ?? b.term ?? b.definition ?? b.question ?? '').join(' ')).toLowerCase();
          if (haystack.includes(q)) {
            results.push({
              levelId: level.id,
              levelName: level.name,
              levelColor: level.color,
              subjectId: subject.id,
              subjectName: subject.name,
              subjectEmoji: subject.emoji,
              subjectColor: subject.color,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              chapterEmoji: chapter.emoji,
              pageTitle: page.title,
              pageIdx,
            });
          }
        }
      }
    }
  }

  return results.slice(0, 50);
}

// Flashcard extraction
export interface Flashcard {
  term: string;
  definition: string;
  subjectName: string;
  subjectEmoji: string;
}

export function getAllKeyTerms(): Flashcard[] {
  const cards: Flashcard[] = [];

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      for (const chapter of subject.chapters) {
        for (const page of chapter.pages) {
          for (const block of page.blocks) {
            if (block.type === 'keyterm' && block.term && block.definition) {
              cards.push({
                term: block.term,
                definition: block.definition,
                subjectName: subject.name,
                subjectEmoji: subject.emoji,
              });
            }
          }
        }
      }
    }
  }

  return cards;
}

// Statistics
export function getStats(): { totalChapters: number; totalPages: number; totalKeyTerms: number; totalQuizzes: number } {
  let totalChapters = 0;
  let totalPages = 0;
  let totalKeyTerms = 0;
  let totalQuizzes = 0;

  for (const level of TEXTBOOK_LEVELS) {
    for (const subject of level.subjects) {
      totalChapters += subject.chapters.length;
      for (const chapter of subject.chapters) {
        totalPages += chapter.pages.length;
        for (const page of chapter.pages) {
          for (const block of page.blocks) {
            if (block.type === 'keyterm') totalKeyTerms++;
            if (block.type === 'quiz') totalQuizzes++;
          }
        }
      }
    }
  }

  return { totalChapters, totalPages, totalKeyTerms, totalQuizzes };
}
