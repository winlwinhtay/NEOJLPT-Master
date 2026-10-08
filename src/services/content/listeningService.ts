import { JLPTLevel, ListeningLesson } from '../../types';
import { LISTENING_DATA } from '../../data/listeningData';
import { ContentFilter } from './types';

export class ListeningService {
  private static cache = new Map<string, ListeningLesson>();
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;
    for (const l of LISTENING_DATA) {
      this.cache.set(l.id, l);
    }
    this.initialized = true;
  }

  public static getListeningByLevel(level: JLPTLevel): ListeningLesson[] {
    this.initialize();
    return Array.from(this.cache.values()).filter((l) => l.level === level);
  }

  public static getListeningById(id: string): ListeningLesson | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  public static filterListening(filter: ContentFilter): { items: ListeningLesson[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((l) => l.level === filter.level);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          (l.topic && l.topic.toLowerCase().includes(q)) ||
          l.dialogue.some((d) => d.text.toLowerCase().includes(q))
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
