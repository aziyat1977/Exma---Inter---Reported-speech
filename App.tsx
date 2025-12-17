import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, Film, CheckCircle, XCircle, RotateCcw, Clapperboard, Menu, X, Grid, Clock, ArrowRight, BookOpen } from 'lucide-react';
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
            sceneDesc: scene.description,
            sceneDescTrans: scene.descriptionTrans
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
                sceneDesc: ex.description,
                exerciseTeaching: ex.teaching
            });

            // TIMELINE SLIDE (Before exercises)
            if (ex.timeline) {
                playlist.push({
                    uuid: getID(),
                    type: SlideType.TIMELINE,
                    sceneTitle: scene.title,
                    exerciseTitle: ex.title,
                    timelineData: ex.timeline,
                    exerciseTeaching: ex.teaching
                });
            }

            // Gather all answers in this set to use as distractors
            const allAnswersInSet = ex.questions.map(q => q.a);

            // Specific Questions
            ex.questions.forEach((q, qIdx) => {
                const otherAnswers = allAnswersInSet.filter(a => a !== q.a);
                const distractors = shuffleArray(otherAnswers).slice(0, 3);
                
                const fillers = ["is", "was", "had", "would", "told", "asked"];
                while (distractors.length < 3) {
                   const randomFiller = fillers[Math.floor(Math.random() * fillers.length)];
                   if (randomFiller !== q.a && !distractors.includes(randomFiller)) {
                       distractors.push(randomFiller);
                   } else {
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
                    exerciseTeaching: ex.teaching,
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
    const [helpLang, setHelpLang] = useState<'ru' | 'uz' | null>(null);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [timelineStep, setTimelineStep] = useState(0);

    const currentSlide = playbook[currentIndex];

    // Reset state on slide change
    useEffect(() => {
        setDroppedValue(null);
        setFeedback("neutral");
        setDraggedItem(null);
        setTimelineStep(0);
        setHelpLang(null); // Close help on slide change
        
        // Auto-play timeline animation sequence
        if (currentSlide.type === SlideType.TIMELINE) {
            // Step 1: Show Direct (0ms)
            // Step 2: Start Move (1500ms)
            setTimeout(() => setTimelineStep(1), 1500);
            // Step 3: Show Reported (2500ms - synced with animation duration)
            setTimeout(() => setTimelineStep(2), 2500);
        }

    }, [currentIndex, currentSlide]);

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
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedItem) {
            setDroppedValue(draggedItem);
            
            const correct = currentSlide.challengeA;
            if (!correct) return;
            
            const isCorrect = correct.toLowerCase().split('/').map(s => s.trim()).includes(draggedItem.toLowerCase().trim());
            
            if (isCorrect) {
                setFeedback('correct');
                setTimeout(() => nextSlide(), 1000);
            } else {
                setFeedback('incorrect');
                setTimeout(() => {
                    setDroppedValue(null);
                    setFeedback('neutral');
                }, 1000);
            }
            setDraggedItem(null);
        }
    };

    // --- RENDERERS ---

    const renderLanguageToggle = (teaching: {ru: string, uz: string} | undefined, positionClass = "top-20 right-4") => {
        if (!teaching) return null;
        return (
            <div className={`absolute ${positionClass} flex gap-2 z-40`}>
                <button 
                    onClick={() => setHelpLang(helpLang === 'ru' ? null : 'ru')}
                    className={`px-3 py-1 font-bebas text-lg rounded border transition-all ${helpLang === 'ru' ? 'bg-cinema-red text-white border-cinema-red' : 'bg-black/50 text-white/50 border-white/20 hover:text-white hover:border-white'}`}
                >
                    RU
                </button>
                <button 
                    onClick={() => setHelpLang(helpLang === 'uz' ? null : 'uz')}
                    className={`px-3 py-1 font-bebas text-lg rounded border transition-all ${helpLang === 'uz' ? 'bg-blue-600 text-white border-blue-600' : 'bg-black/50 text-white/50 border-white/20 hover:text-white hover:border-white'}`}
                >
                    UZ
                </button>
            </div>
        );
    };

    const renderHelpOverlay = (teaching: {ru: string, uz: string} | undefined) => {
        if (!teaching || !helpLang) return null;
        return (
            <div className="absolute top-32 right-4 w-64 md:w-80 p-6 bg-black/90 border border-gold-500/50 backdrop-blur-xl rounded-lg shadow-2xl z-40 slide-enter">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bebas text-gold-500 text-xl tracking-widest">
                        {helpLang === 'ru' ? 'GRAMMAR NOTE' : 'QOIDA'}
                    </h3>
                    <button onClick={() => setHelpLang(null)}><X size={16} className="text-gray-500 hover:text-white"/></button>
                </div>
                <p className="font-montserrat text-white text-sm leading-relaxed">
                    {helpLang === 'ru' ? teaching.ru : teaching.uz}
                </p>
            </div>
        );
    }

    const renderMenu = () => {
        const scenes = SCENES.map((scene, idx) => {
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
        <div className="flex flex-col items-center justify-center h-full text-center slide-enter p-8 relative w-full">
            {renderLanguageToggle(currentSlide.sceneDescTrans)}
            {renderHelpOverlay(currentSlide.sceneDescTrans)}
            
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
        <div className="flex flex-col items-center justify-center h-full text-center slide-enter p-8 bg-black/40 backdrop-blur-sm relative w-full">
             {renderLanguageToggle(currentSlide.exerciseTeaching)}
             {renderHelpOverlay(currentSlide.exerciseTeaching)}

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
                SEE TIMELINE
            </button>
        </div>
    );

    // --- TIMELINE COMPONENT ---
    const renderTimeline = () => {
        const data = currentSlide.timelineData;
        if (!data) return null;

        const parse = (text: string) => {
            const parts = text.split(/[\[\]]/);
            return {
                prefix: parts[0] || "",
                highlight: parts[1] || "",
                suffix: parts[2] || ""
            };
        };

        const direct = parse(data.exampleDirect);
        const reported = parse(data.exampleReported);

        const handleReplay = () => {
             setTimelineStep(0);
             setTimeout(() => {
                 setTimelineStep(1);
                 setTimeout(() => setTimelineStep(2), 1000);
             }, 100);
        };

        return (
            <div className="w-full h-full flex flex-col items-center justify-center relative p-8 overflow-hidden bg-black/90">
                {renderLanguageToggle(currentSlide.exerciseTeaching)}
                {renderHelpOverlay(currentSlide.exerciseTeaching)}

                {/* Replay Button */}
                <button 
                    onClick={handleReplay}
                    className="absolute bottom-8 left-8 text-white/30 hover:text-gold-500 transition-colors flex items-center gap-2 z-50 group"
                    title="Replay Animation"
                >
                    <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-700" /> 
                    <span className="font-bebas tracking-widest text-sm">REPLAY</span>
                </button>

                {/* THE TIME PORTAL */}
                <div className="time-portal"></div>

                {/* VISUAL ELEMENTS */}
                <div className="flex justify-between w-full max-w-5xl relative z-10 h-64">
                    
                    {/* LEFT: DIRECT (NOW) */}
                    <div className={`
                        flex flex-col items-start justify-center transition-all duration-1000 w-1/3
                        ${timelineStep >= 1 ? 'opacity-30 blur-sm scale-90' : 'opacity-100 scale-100'}
                    `}>
                         <div className="text-gold-500 font-bebas text-xl mb-2 flex items-center gap-2">
                             <Clock size={16} /> DIRECT
                         </div>
                         <div className="text-3xl md:text-5xl font-cinzel text-white leading-tight">
                            {direct.prefix}
                            <span className="text-cinema-red font-bold inline-block relative">
                                {direct.highlight}
                            </span>
                            {direct.suffix}
                         </div>
                         <div className="mt-4 text-gray-500 font-mono text-sm uppercase border border-gray-700 px-2 py-1 rounded">
                             {data.tenseFrom}
                         </div>
                    </div>

                    {/* ULTRA PARTICLE ANIMATION */}
                    {timelineStep >= 1 && (
                        <div className="ultra-particle">
                            {direct.highlight}
                        </div>
                    )}

                    {/* RIGHT: REPORTED (THEN) */}
                    <div className={`
                        flex flex-col items-end justify-center text-right transition-all duration-1000 delay-500 w-1/3
                        ${timelineStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
                    `}>
                         <div className="text-gold-500 font-bebas text-xl mb-2">REPORTED</div>
                         <div className="text-3xl md:text-5xl font-cinzel text-white leading-tight">
                            {reported.prefix}
                            <span className={`text-green-400 font-bold scale-110 inline-block drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] ${timelineStep >= 2 ? 'impact-target' : ''}`}>
                                {reported.highlight}
                            </span>
                            {reported.suffix}
                         </div>
                         <div className="mt-4 text-gray-500 font-mono text-sm uppercase border border-gray-700 px-2 py-1 rounded">
                             {data.tenseTo}
                         </div>
                    </div>
                </div>

                <button 
                    onClick={nextSlide}
                    className={`
                        mt-32 px-8 py-3 bg-white/10 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-500 font-bebas tracking-widest z-20
                        ${timelineStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                    `}
                >
                    START EXERCISE
                </button>
            </div>
        );
    }

    const renderChallenge = () => {
        const parts = currentSlide.challengeQ?.split('____') || ["", ""];
        
        return (
            <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto p-4 slide-enter relative">
                {renderLanguageToggle(currentSlide.exerciseTeaching)}
                {renderHelpOverlay(currentSlide.exerciseTeaching)}

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
                {currentSlide.type === SlideType.TIMELINE && renderTimeline()}
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