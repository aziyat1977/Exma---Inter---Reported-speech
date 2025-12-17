export enum AppMode {
    STUDENT = 'student',
    TEACHER = 'teacher',
    KAHOOT = 'kahoot'
}

export enum ItemType {
    SCRIPT = 'script',
    EXERCISE = 'exercise'
}

export interface ContentItem {
    t: string; // 'script' or 'exercise' mapped from original data
    // Script props
    sp?: string;
    text?: string;
    verb?: string;
    // Exercise props
    title?: string;
    q?: string;
    a?: string;
}

export interface SceneData {
    title: string;
    type: string;
    items: ContentItem[];
    exercises: ContentItem[]; // Original data separates them, we will merge them for display
}

// Normalized display item for our components
export interface DisplayItem {
    id: string;
    type: ItemType;
    speakerOrTitle: string;
    content: string; // Text or Question
    highlight?: string; // Verbs
    answer?: string;
}
