// Chrome Extension Storage Utility
// Type-safe wrapper around chrome.storage API

export class StorageError extends Error {
    constructor(
        message: string,
        public code: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'StorageError';
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}

export const StorageErrorCode = {
    GET_FAILED: 'GET_FAILED',
    SET_FAILED: 'SET_FAILED',
    REMOVE_FAILED: 'REMOVE_FAILED',
    CLEAR_FAILED: 'CLEAR_FAILED',
    QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
} as const;

type StorageType = 'local' | 'sync' | 'session';

export class Storage {
    private area: StorageType;

    constructor(area: StorageType = 'local') {
        this.area = area;
    }

    private getStorage(): chrome.storage.StorageArea {
        return chrome.storage[this.area];
    }

    /**
     * Get a value from storage
     * @throws {StorageError} When storage read fails
     */
    async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
        try {
            const result = await this.getStorage().get(key);
            return (result[key] as T) ?? defaultValue;
        } catch (error) {
            const err = error as Error;
            throw new StorageError(
                `Failed to read "${key}" from chrome.storage.${this.area}: ${err.message}. ` +
                `Check if the extension has storage permission and the key exists.`,
                StorageErrorCode.GET_FAILED,
                err
            );
        }
    }

    /**
     * Set a value in storage
     * @throws {StorageError} When storage write fails (including quota issues)
     */
    async set<T>(key: string, value: T): Promise<void> {
        try {
            await this.getStorage().set({ [key]: value });
        } catch (error) {
            const err = error as Error;
            const isQuotaError = err.message?.includes('QUOTA_BYTES') || err.message?.includes('quota');
            throw new StorageError(
                isQuotaError
                    ? `Failed to write "${key}" to chrome.storage.${this.area}: Storage quota exceeded. ` +
                      `Try removing unused data or reducing the size of stored items.`
                    : `Failed to write "${key}" to chrome.storage.${this.area}: ${err.message}.`,
                isQuotaError ? StorageErrorCode.QUOTA_EXCEEDED : StorageErrorCode.SET_FAILED,
                err
            );
        }
    }

    /**
     * Remove a key or keys from storage
     * @throws {StorageError} When storage removal fails
     */
    async remove(key: string | string[]): Promise<void> {
        try {
            await this.getStorage().remove(key);
        } catch (error) {
            const err = error as Error;
            throw new StorageError(
                `Failed to remove "${key}" from chrome.storage.${this.area}: ${err.message}.`,
                StorageErrorCode.REMOVE_FAILED,
                err
            );
        }
    }

    /**
     * Clear all storage for this area
     * @throws {StorageError} When storage clear fails
     */
    async clear(): Promise<void> {
        try {
            await this.getStorage().clear();
        } catch (error) {
            const err = error as Error;
            throw new StorageError(
                `Failed to clear chrome.storage.${this.area}: ${err.message}.`,
                StorageErrorCode.CLEAR_FAILED,
                err
            );
        }
    }

    /**
     * Get all data from storage
     * @throws {StorageError} When storage read fails
     */
    async getAll(): Promise<Record<string, unknown>> {
        try {
            return await this.getStorage().get(null);
        } catch (error) {
            const err = error as Error;
            throw new StorageError(
                `Failed to get all data from chrome.storage.${this.area}: ${err.message}.`,
                StorageErrorCode.GET_FAILED,
                err
            );
        }
    }
}

export const storage = new Storage('local');
export const syncStorage = new Storage('sync');
