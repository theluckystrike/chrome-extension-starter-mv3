// Chrome Extension Storage Utility
// Type-safe wrapper around chrome.storage API

interface StorageArea {
    get(keys: string | string[] | null): Promise<Record<string, unknown>>;
    set(items: Record<string, unknown>): Promise<void>;
    remove(keys: string | string[]): Promise<void>;
    clear(): Promise<void>;
}

type StorageType = 'local' | 'sync' | 'session';

export class Storage {
    private area: StorageType;

    constructor(area: StorageType = 'local') {
        this.area = area;
    }

    private getStorage(): chrome.storage.StorageArea {
        return chrome.storage[this.area];
    }

    async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
        const result = await this.getStorage().get(key);
        return (result[key] as T) ?? defaultValue;
    }

    async set<T>(key: string, value: T): Promise<void> {
        await this.getStorage().set({ [key]: value });
    }

    async remove(key: string | string[]): Promise<void> {
        await this.getStorage().remove(key);
    }

    async clear(): Promise<void> {
        await this.getStorage().clear();
    }

    async getAll(): Promise<Record<string, unknown>> {
        return this.getStorage().get(null);
    }
}

export const storage = new Storage('local');
export const syncStorage = new Storage('sync');
