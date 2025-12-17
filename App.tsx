import React, { useState, useEffect, useMemo } from 'react';
import { Menu, ChevronLeft, ChevronRight, Clapperboard, MonitorPlay } from 'lucide-react';
import { SCENES } from './constants';
import { AppMode, ItemType, DisplayItem, ContentItem } from './types';
import Drawer from './components/Drawer';
import Timeline from './components/Timeline';
import ContentCard from './components/ContentCard';

// Utility to chunk array into pairs
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
};

const ITEMS_PER_PAGE = 2;

const App: React.FC = () => {
    // --- State ---
    const [sceneIdx, setSceneIdx] = useState(0);
    const [mode, setMode] = useState<AppMode>(AppMode.STUDENT);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Flatten and normalize data for current scene
    const currentScene = SCENES[sceneIdx];
    
    // Combine scripts and exercises into a single timeline flow
    // Each group contains 1 script line and its corresponding exercise if available, or just pairs of whatever
    // Original Logic was: Script list then Exercise List. 
    // New Logic: We will paginate them separately as phases. 
    // Phase 1: Script. Phase 2: Exercise.
    
    // Actually, let's mix them or keep them distinct based on the data structure.
    // The visual timeline implies: Present (Script) -> Past (Exercise/Reported).
    // So we iterate through Script pages, then Exercise pages.
    
    const pages = useMemo(() => {
        const rawScriptItems: DisplayItem[] = currentScene.items.map((it, i) => ({
            id: `s-${i}`,
            type: ItemType.SCRIPT,
            speakerOrTitle: it.sp || "Narrator",
            content: it.text || "",
            highlight: it.verb
        }));

        const rawExerciseItems: DisplayItem[] = currentScene.exercises.map((it, i) => ({
            id: `e-${i}`,
            type: ItemType.EXERCISE,
            speakerOrTitle: it.title || "Exercise",
            content: it.q || "",
            answer: it.a
        }));

        const scriptPages = chunkArray(rawScriptItems, ITEMS_PER_PAGE);
        const exercisePages = chunkArray(rawExerciseItems, ITEMS_PER_PAGE);
        
        return [...scriptPages, ...exercisePages];
    }, [currentScene]);

    const [pageIdx, setPageIdx] = useState(0);
    const [animKey, setAnimKey] = useState(0); // Forces re-render for animation
    const [timer, setTimer] = useState(100); // For Kahoot mode

    const currentPageItems = pages[pageIdx] || [];
    const currentType = currentPageItems.length > 0 ? currentPageItems[0].type : ItemType.SCRIPT;
    const isKahoot = mode === AppMode.KAHOOT;

    // --- Effects ---
    useEffect(() => {
        // Reset page when scene changes
        setPageIdx(0);
        setAnimKey(prev => prev + 1);
    }, [sceneIdx]);

    useEffect(() => {
        setAnimKey(prev => prev + 1);
    }, [pageIdx]);

    // Kahoot Timer Logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isKahoot) {
            setTimer(100);
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 0) return 100; // Loop or stop
                    return prev - 0.5;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isKahoot, pageIdx]);

    // --- Handlers ---
    const handleNext = () => {
        if (pageIdx < pages.length - 1) {
            setPageIdx(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (pageIdx > 0) {
            setPageIdx(prev => prev - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    };

    return (
        <div 
            className="w-screen h-screen relative flex flex-col font-body bg-cinema-black text-white outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Background Effects */}
            <div className="film-grain"></div>
            <div className="absolute inset-0 spotlight pointer-events-none"></div>

            {/* Header */}
            <header className="absolute top-0 w-full p-6 flex justify-between items-center z-30">
                <button 
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors group"
                >
                    <Menu className="group-hover:scale-110 transition-transform" />
                    <span className="font-bebas text-xl tracking-widest hidden md:inline">MENU</span>
                </button>

                <div className="text-center">
                    <h1 className="font-cinzel text-gold-500 font-bold text-lg md:text-3xl tracking-widest drop-shadow-md">
                        {currentScene.title.toUpperCase()}
                    </h1>
                    {mode === AppMode.TEACHER && (
                        <span className="bg-cinema-red text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-widest uppercase animate-pulse">
                            Teacher Mode Active
                        </span>
                    )}
                </div>

                <div className="w-20"></div> {/* Spacer for alignment */}
            </header>

            {/* Main Stage */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-4">
                
                {/* Timeline Visual */}
                <div className="mb-6 w-full flex justify-center">
                    <Timeline currentType={currentType} />
                </div>

                {/* Content Area */}
                <div className="w-full flex justify-center min-h-[50vh]">
                     {/* Force remount on page change for animation */}
                    <ContentCard 
                        key={animKey}
                        items={currentPageItems} 
                        mode={mode}
                        isVisible={true}
                    />
                </div>

            </main>

            {/* Navigation Controls (Floating) */}
            <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 z-30">
                <button 
                    onClick={handlePrev}
                    disabled={pageIdx === 0}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20 bg-black/50 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed group backdrop-blur-sm"
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 z-30">
                <button 
                    onClick={handleNext}
                    disabled={pageIdx === pages.length - 1}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20 bg-cinema-red hover:bg-white hover:text-cinema-red transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(229,9,20,0.5)]"
                >
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Footer / Kahoot Bar */}
            <footer className="relative z-30 h-16 w-full flex items-center justify-center">
                 {isKahoot ? (
                     <div className="w-full h-full bg-indigo-900 flex flex-col justify-end relative overflow-hidden border-t-4 border-gold-500">
                         <div className="absolute top-2 left-4 text-white font-bebas tracking-widest animate-pulse flex items-center gap-2">
                             <MonitorPlay size={16} /> LIVE SESSION
                         </div>
                         <div 
                            className="h-full bg-cinema-red transition-all duration-100 ease-linear shadow-[0_0_20px_rgba(229,9,20,0.8)]"
                            style={{ width: `${timer}%` }}
                         ></div>
                     </div>
                 ) : (
                     <div className="flex gap-2 mb-4">
                         {pages.map((_, idx) => (
                             <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === pageIdx ? 'w-8 bg-gold-500 shadow-[0_0_10px_#ffd700]' : 'w-2 bg-gray-700'}`}
                             />
                         ))}
                     </div>
                 )}
            </footer>

            {/* Drawer Component */}
            <Drawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
                currentMode={mode}
                onModeChange={setMode}
                currentSceneIndex={sceneIdx}
                onSceneChange={setSceneIdx}
            />

        </div>
    );
};

export default App;