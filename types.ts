export enum SlideType {
    INTRO = 'intro',
    SCRIPT = 'script',
    EXERCISE_INTRO = 'exercise_intro',
    TIMELINE = 'timeline',
    CHALLENGE = 'challenge',
    OUTRO = 'outro'
}

export interface ContentItem {
    sp?: string;
    text?: string;
    verb?: string;
}

export interface TranslationData {
    ru: string;
    uz: string;
}

export interface TimelineData {
    tenseFrom: string;
    tenseTo: string;
    exampleDirect: string; // e.g. "I [am] Batman"
    exampleReported: string; // e.g. "He said he [was] Batman"
}

export interface ExerciseData {
    title: string;
    description: string;
    rule?: string;
    teaching?: TranslationData; // Added for RU/UZ support
    timeline?: TimelineData;
    questions: { q: string; a: string }[];
}

export interface SceneData {
    id: string;
    title: string;
    description: string;
    descriptionTrans?: TranslationData; // Added for Scene Intro
    script: ContentItem[];
    exercises: ExerciseData[];
}

export interface PlaybookItem {
    uuid: string;
    type: SlideType;
    sceneTitle?: string;
    sceneDesc?: string;
    sceneDescTrans?: TranslationData;
    scriptContent?: ContentItem[];
    exerciseTitle?: string;
    exerciseRule?: string;
    exerciseTeaching?: TranslationData;
    timelineData?: TimelineData;
    challengeQ?: string;
    challengeA?: string;
    options?: string[];
    totalInSet?: number;
    currentInSet?: number;
}
