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

export interface TimelineData {
    tenseFrom: string;
    tenseTo: string;
    exampleDirect: string; // e.g. "I [am] Batman" (use brackets for highlight)
    exampleReported: string; // e.g. "He said he [was] Batman"
}

export interface ExerciseData {
    title: string;
    description: string;
    rule?: string;
    timeline?: TimelineData;
    questions: { q: string; a: string }[];
}

export interface SceneData {
    id: string;
    title: string;
    description: string;
    script: ContentItem[];
    exercises: ExerciseData[];
}

export interface PlaybookItem {
    uuid: string;
    type: SlideType;
    sceneTitle?: string;
    sceneDesc?: string;
    scriptContent?: ContentItem[];
    exerciseTitle?: string;
    exerciseRule?: string;
    timelineData?: TimelineData;
    challengeQ?: string;
    challengeA?: string;
    options?: string[];
    totalInSet?: number;
    currentInSet?: number;
}
