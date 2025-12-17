import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, Film, CheckCircle, XCircle, RotateCcw, Clapperboard, Menu, X, Grid } from 'lucide-react';
import { SCENES } from './constants';
import { SlideType, PlaybookItem } from './types';

// --- UTILS ---
const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// --- GENERATE PLAYBOOK ---
const generatePlaybook = (): PlaybookItem[] => {
    const playlist: PlaybookItem[] = [];
    let uuidCount = 0;
    const getID = () => `slide-${uuidCount++}`;

    SCENES.forEach(scene => {
        // 1. Scene Intro
        playlist.push({
            uuid: getID(),
            type: SlideType.INTRO,
            sceneTitle: scene.title,
            sceneDesc: scene.description
        });

        // 2. The Script
        playlist.push({
            uuid: getID(),
            type: SlideType.SCRIPT,
            sceneTitle: scene.title,
            scriptContent: scene.script
        });

        // 3. Exercises (Interleaved)
        scene.exercises.forEach(ex => {
            // Exercise Intro Card
            playlist.push({
                uuid: getID(),
                type: SlideType.EXERCISE_INTRO,
                sceneTitle: scene.title,
                exerciseTitle: ex.title,
                exerciseRule: ex.rule,
                sceneDesc: ex.description
            });

            // Gather all answers in this set to use as distractors
            const allAnswersInSet = ex.questions.map(q => q.a);

            // Specific Questions
            ex.questions.forEach((q, qIdx) => {
                // Create Word Bank: Correct Answer + 3 Random distractors from the set (or generic ones if set is small)
                // Filter out current answer first
                const otherAnswers = allAnswersInSet.filter(a => a !== q.a);
                // If we don't have enough distinct answers, duplication is actually fine for grammar drills 
                // but let's try to get 3 unique others if possible.
                const distractors = shuffleArray(otherAnswers).slice(0, 3);
                
                // If we still need more (e.g. set size 1), add generic fillers based on tense
                const fillers = ["is", "was", "had", "would", "told", "asked"];
                while (distractors.length < 3) {
                   const randomFiller = fillers[Math.floor(Math.random() * fillers.length)];
                   if (randomFiller !== q.a && !distractors.includes(randomFiller)) {
                       distractors.push(randomFiller);
                   } else {
                       // prevent infinite loop if extremely unlucky
                       distractors.push("did"); 
                       break;
                   }
                }

                const wordBank = shuffleArray([q.a, ...distractors]);

                playlist.push({
                    uuid: getID(),
                    type: SlideType.CHALLENGE,
                    sceneTitle: scene.title,
                    exerciseTitle: ex.title,
                    exerciseRule: ex.rule,
                    challengeQ: q.q,
                    challengeA: q.a,
                    options: wordBank,
                    currentInSet: qIdx + 1,
                    totalInSet: ex.questions.length
                });
            });
        });
    });

    // End Slide
    playlist.push({
        uuid: getID(),
        type: SlideType.OUTRO
    });

    return playlist;
};

const App: React.FC = () => {
    const playbook = useMemo(() => generatePlaybook(), []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [droppedValue, setDroppedValue] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const currentSlide = playbook[currentIndex];

    // Reset state on slide change
    useEffect(() => {
        setDroppedValue(null);
        setFeedback("neutral");
        setDraggedItem(null);
    }, [currentIndex]);

    // --- NAVIGATION ---
    const nextSlide = () => {
        if (currentIndex < playbook.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const jumpToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsMenuOpen(false);
    };

    // --- DRAG & DROP HANDLERS ---
    const handleDragStart = (e: React.DragEvent, item: string) => {
        setDraggedItem(item);
        // Effect for drag image if needed, but default is usually okay
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setData("text/plain", item); // Not strictly needed if using React state
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedItem) {
            setDroppedValue(draggedItem);
            
            // Check Answer Immediately
            const correct = currentSlide.challengeA;
            if (!correct) return;
            
            const isCorrect = correct.toLowerCase().split('/').map(s => s.trim()).includes(draggedItem.toLowerCase().trim());
            
            if (isCorrect) {
                setFeedback('correct');
                // Play simplified "snap" sound logic or just wait
                setTimeout(() => nextSlide(), 1000);
            } else {
                setFeedback('incorrect');
                // Clear incorrect value after a moment to let them try again
                setTimeout(() => {
                    setDroppedValue(null);
                    setFeedback('neutral');
                }, 1000);
            }
            setDraggedItem(null);
        }
    };

    // --- RENDERERS ---

    const renderMenu = () => {
        // Group slides by scene for the menu
        const scenes = SCENES.map((scene, idx) => {
            // Find the index of the INTRO slide for this scene
            const slideIdx = playbook.findIndex(s => s.type === SlideType.INTRO && s.sceneTitle === scene.title);
            return { title: scene.title, index: slideIdx };
        });

        return (
            <div className={`fixed inset-0 bg-black/95 z-[100] transition-opacity duration-300 flex items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors"
                >
                    <X size={48} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-6xl w-full">
                    <h2 className="col-span-1 md:col-span-3 text-center text-4xl font-bebas text-gold-500 tracking-widest mb-8 border-b border-gray-800 pb-4">
                        SELECT A SCENE
                    </h2>
                    {scenes.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => jumpToSlide(s.index)}
                            className="group relative aspect-video bg-gray-900 border border-white/10 rounded-lg overflow-hidden hover:border-gold-500 transition-all hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <div className="text-gold-500 font-bebas text-xl mb-1">SCENE {i + 1}</div>
                                <div className="text-white font-cinzel text-lg md:text-2xl leading-tight group-hover:text-gold-100">{s.title.replace('Video ' + (i+1) + ': ', '')}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderIntro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center slide-enter p-8">
            <div className="text-gold-500 font-bebas text-2xl tracking-widest mb-4">NOW SHOWING</div>
            <h1 className="font-cinzel text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
                {currentSlide.sceneTitle?.toUpperCase()}
            </h1>
            <p className="font-montserrat text-gray-400 text-xl md:text-2xl max-w-2xl font-light">
                {currentSlide.sceneDesc}
            </p>
            <div className="mt-12 flex gap-4">
                <button onClick={nextSlide} className="flex items-center gap-2 px-8 py-3 bg-gold-500 text-black font-bold rounded hover:bg-white transition-colors">
                    <Film size={20} /> START SCENE
                </button>
            </div>
        </div>
    );

    const renderScript = () => (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-6 md:p-12 slide-enter">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="font-bebas text-gold-500 text-xl tracking-widest">ORIGINAL SCRIPT</div>
                <div className="font-montserrat text-xs text-gray-500 uppercase">Read carefully</div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                {currentSlide.scriptContent?.map((line, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className="font-bebas text-gold-600/80 tracking-wider text-lg">{line.sp}</span>
                        <span className="font-montserrat text-white text-xl md:text-2xl font-light leading-relaxed">
                            "{line.text}"
                        </span>
                    </div>
                ))}
            </div>
            
            <button onClick={nextSlide} className="mt-8 w-full py-4 bg-cinema-red hover:bg-red-700 text-white font-bebas text-xl tracking-widest transition-all rounded shadow-lg shadow-red-900/20">
                PROCEED TO EXERCISES
            </button>
        </div>
    );

    const renderExerciseIntro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center slide-enter p-8 bg-black/40 backdrop-blur-sm">
             <div className="mb-6 p-4 rounded-full border-2 border-gold-500 text-gold-500 animate-pulse">
                <Clapperboard size={48} />
             </div>
            <h2 className="font-cinzel text-4xl md:text-6xl text-white mb-4">
                {currentSlide.exerciseTitle}
            </h2>
            <div className="h-1 w-24 bg-cinema-red mb-8"></div>
            <p className="font-montserrat text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
                {currentSlide.exerciseRule}
            </p>
            <button onClick={nextSlide} className="mt-12 text-gold-500 font-bebas tracking-widest text-xl border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors">
                ENTER DRILL
            </button>
        </div>
    );

    const renderChallenge = () => {
        const parts = currentSlide.challengeQ?.split('____') || ["", ""];
        
        return (
            <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto p-4 slide-enter relative">
                
                {/* Header Info */}
                <div className="absolute top-0 w-full flex justify-between items-start p-6 text-xs md:text-sm font-montserrat tracking-widest text-gray-500 uppercase">
                    <div>{currentSlide.exerciseTitle}</div>
                    <div>Question {currentSlide.currentInSet} / {currentSlide.totalInSet}</div>
                </div>

                {/* The Question Area */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="text-center font-montserrat text-2xl md:text-4xl text-white font-light leading-loose max-w-4xl">
                        {parts[0]}
                        
                        {/* DROP ZONE */}
                        <div 
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`
                                inline-flex items-center justify-center
                                min-w-[180px] h-[60px] mx-2 align-middle
                                border-b-4 rounded-t-lg transition-all duration-300
                                ${feedback === 'correct' ? 'bg-green-500/20 border-green-500' : ''}
                                ${feedback === 'incorrect' ? 'bg-red-500/20 border-cinema-red' : ''}
                                ${feedback === 'neutral' ? 'bg-white/5 border-gold-500/50 hover:bg-white/10' : ''}
                                drop-zone
                            `}
                        >
                            {droppedValue ? (
                                <span className={`font-bold ${feedback === 'correct' ? 'text-green-400' : (feedback === 'incorrect' ? 'text-cinema-red' : 'text-gold-400')}`}>
                                    {droppedValue}
                                </span>
                            ) : (
                                <span className="text-white/20 text-sm font-bebas tracking-widest pointer-events-none">DRAG HERE</span>
                            )}
                        </div>
                        
                        {parts[1]}
                    </div>

                    {/* Feedback Icon */}
                    <div className="h-16 mt-8 flex items-center justify-center">
                        {feedback === 'correct' && <CheckCircle className="text-green-500 w-12 h-12 animate-bounce-short" />}
                        {feedback === 'incorrect' && <XCircle className="text-cinema-red w-12 h-12 animate-pulse" />}
                    </div>
                </div>

                {/* WORD BANK */}
                <div className="w-full bg-black/60 backdrop-blur-md border-t border-white/10 p-8 rounded-t-3xl">
                    <div className="text-center mb-6 text-gray-400 font-bebas tracking-widest text-sm">OPTIONS</div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {currentSlide.options?.map((opt, i) => {
                            const isUsed = droppedValue === opt;
                            return (
                                <div
                                    key={i}
                                    draggable={!isUsed}
                                    onDragStart={(e) => handleDragStart(e, opt)}
                                    className={`
                                        draggable-item
                                        px-6 py-3 rounded-lg text-xl font-montserrat font-semibold
                                        bg-white/10 border border-white/20 text-white
                                        hover:bg-gold-500 hover:text-black hover:border-gold-500
                                        hover:shadow-[0_0_15px_#ffd700]
                                        ${isUsed ? 'opacity-20 pointer-events-none' : 'opacity-100'}
                                    `}
                                >
                                    {opt}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderOutro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 slide-enter">
             <div className="text-gold-500 mb-6"><Film size={64} /></div>
             <h1 className="font-cinzel text-5xl text-white mb-4">THAT'S A WRAP</h1>
             <p className="font-montserrat text-gray-400 mb-8">You have completed all scenes.</p>
             <button 
                onClick={() => setCurrentIndex(0)}
                className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-gold-500 hover:text-black transition-all rounded text-white font-bebas tracking-widest"
            >
                <RotateCcw size={20} /> REPLAY FROM START
            </button>
        </div>
    );

    // --- MAIN LAYOUT ---
    return (
        <div className="w-screen h-screen bg-cinema-black text-white overflow-hidden relative font-body selection:bg-gold-500 selection:text-black">
            
            {/* Ambient Effects */}
            <div className="film-grain opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10"></div>

            {/* Header Controls */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 text-white/50 hover:text-gold-500 transition-colors group"
                >
                    <Grid size={24} className="group-hover:scale-110 transition-transform"/>
                    <span className="font-bebas tracking-widest hidden md:inline">SCENES</span>
                </button>

                {/* Progress Dots (Mini) */}
                <div className="flex gap-1">
                    {SCENES.map((_, i) => {
                         // Simple check to see if current slide belongs to this scene
                         const isCurrentScene = currentSlide.sceneTitle === _.title;
                         return (
                            <div key={i} className={`w-2 h-2 rounded-full ${isCurrentScene ? 'bg-gold-500' : 'bg-gray-800'}`}></div>
                         );
                    })}
                </div>
                
                <div className="w-20"></div> {/* Spacer */}
            </div>

            {/* Menu Overlay */}
            {renderMenu()}

            {/* Stage Content */}
            <div className="relative z-20 w-full h-full flex items-center justify-center">
                {currentSlide.type === SlideType.INTRO && renderIntro()}
                {currentSlide.type === SlideType.SCRIPT && renderScript()}
                {currentSlide.type === SlideType.EXERCISE_INTRO && renderExerciseIntro()}
                {currentSlide.type === SlideType.CHALLENGE && renderChallenge()}
                {currentSlide.type === SlideType.OUTRO && renderOutro()}
            </div>

            {/* Linear Navigation (Bottom corners for distraction-free center) */}
            <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-4 bottom-4 text-white/20 hover:text-white transition-colors z-50 p-2 disabled:opacity-0"
            >
                <ChevronLeft size={32} />
            </button>
            
            <button 
                onClick={nextSlide}
                // Allow skip if not challenge, or if challenge is done. 
                // Strict mode: Only allow next if correct.
                disabled={currentIndex === playbook.length - 1}
                className={`absolute right-4 bottom-4 transition-colors z-50 p-2 ${currentSlide.type === SlideType.CHALLENGE && feedback !== 'correct' ? 'text-white/10 hover:text-white/30' : 'text-white/50 hover:text-gold-500'}`}
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
};

export default App;
