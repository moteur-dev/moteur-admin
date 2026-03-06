
export interface Audit {
    createdAt?: string; // ISO date string for creation time
    updatedAt?: string; // ISO date string for last update time
    createdBy?: string; // User ID or name of the creator
    updatedBy?: string; // User ID or name of the last updater
    revision?: number; // Revision number for version control
}

export interface LayoutItem {
    id: string; // Unique layout ID   
    name: string; // Human-readable name for the layout
}

export interface Entry {
  id: string; // Unique entry ID
  title: string; // Title or name of the entry
  content?: string; // Optional content or body of the entry
}

export interface ProjectDetails extends ProjectSchema {
  layouts: LayoutItem[]; // List of layouts in this project
  entries: Entry[]; // List of entries in this project
}


export interface ProjectSchema {
    id: string; // Unique project ID (same as folder name)
    label: string; // Human-readable name
    description?: string; // Optional description
    defaultLocale: string; // Default language for fallbacks
    supportedLocales?: string[]; // Other supported locales

    isActive?: boolean;

    users?: string[]; // Optional list of authorized users

    storage?: string; // Storage adapter ID (e.g., 'core/local', 'core/s3')
    storageOptions?: Record<string, any>; // Options for the storage adapter

    features?: {
        pages: boolean; // Enable pages & templates
        layouts: boolean; // Enable layouts and blocks
        models: boolean; // Enable models and entries
    };

    namespaces?: string[]; // List of namespaces for this project

    workflow?: {
        enabled: boolean;
        mode: 'auto_publish';
        requireReview: boolean;
    };

    meta?: {
        audit?: Audit;
    };
}