import { TestResult } from '../types';

const STORAGE_KEY = 'murajaa_history';

export class HistoryService {
    static saveTest(result: TestResult): void {
        const history = this.getHistory();
        history.unshift(result); // Add new result to the beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    static getHistory(): TestResult[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse history', e);
            return [];
        }
    }

    static deleteTest(id: string): void {
        const history = this.getHistory();
        const filtered = history.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }

    static clearHistory(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}
