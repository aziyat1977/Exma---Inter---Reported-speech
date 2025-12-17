export enum SlideType {
    INTRO = 'intro',
    SCRIPT = 'script',
    EXERCISE_INTRO = 'exercise_intro',
    CHALLENGE = 'challenge',
    OUTRO = 'outro'
}

export interface ContentItem {
    sp?: string;
    text?: string;
    verb?: string;
}

export interface ExerciseData {
    title: string;
    description: string;
    rule?: string;
    questions: { q: string; a: string }[];
}

export interface SceneData {
    id: string;
    title: string;
    description: string;
    script: ContentItem[];
    exercises: ExerciseData[];
}

// The "Playbook" item - a single step in our linear user journey
export interface PlaybookItem {
    uuid: string;
    type: SlideType;
    sceneTitle?: string; // For context headers
    sceneDesc?: string;
    scriptContent?: ContentItem[];
    exerciseTitle?: string;
    exerciseRule?: string; // Grammar rule to show
    challengeQ?: string;
    challengeA?: string;
    options?: string[]; // The Word Bank for Drag & Drop
    totalInSet?: number;
    currentInSet?: number;
}
