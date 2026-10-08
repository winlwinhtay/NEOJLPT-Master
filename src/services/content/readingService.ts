import { JLPTLevel, ReadingLesson } from '../../types';
import { READING_DATA } from '../../data/readingData';
import { ContentFilter } from './types';

export class ReadingService {
  private static cache = new Map<string, ReadingLesson>();
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;
    for (const r of READING_DATA) {
      this.cache.set(r.id, r);
    }
    this.initialized = true;
  }

  public static getReadingsByLevel(level: JLPTLevel): ReadingLesson[] {
    this.initialize();
    return Array.from(this.cache.values()).filter((r) => r.level === level);
  }

  public static getReadingById(id: string): ReadingLesson | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  public static filterReadings(filter: ContentFilter): { items: ReadingLesson[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((r) => r.level === filter.level);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.titleEn && r.titleEn.toLowerCase().includes(q)) ||
          r.passagePlain.toLowerCase().includes(q)
      );
    }

    const total = result.length;
    if (filter.offset !== undefined && filter.limit !== undefined) {
      result = result.slice(filter.offset, filter.offset + filter.limit);
    } else if (filter.limit !== undefined) {
      result = result.slice(0, filter.limit);
    }

    return { items: result, total };
  }
}
