export interface ExtensionConfig {
    name: string;
    version: string;
    storageArea: 'local' | 'sync' | 'session';
}

export interface TabInfo {
    tabId?: number;
    url?: string;
    title?: string;
}

export interface PageInfo {
    title: string;
    url: string;
    description: string;
}

export interface StorageSchema {
    settings: Record<string, unknown>;
    data: Record<string, unknown>;
}
