import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, Volume2, Sparkles, Film, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { SCENES } from './constants';
import { SlideType, PlaybookItem } from './types';

// --- GENERATE PLAYBOOK ---
// This flattens the nested data into a linear "Film Reel" of slides
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

            // Specific Questions (One per slide for focus)
            ex.questions.forEach((q, qIdx) => {
                playlist.push({
                    uuid: getID(),
                    type: SlideType.CHALLENGE,
                    sceneTitle: scene.title,
                    exerciseTitle: ex.title,
                    exerciseRule: ex.rule,
                    challengeQ: q.q,
                    challengeA: q.a,
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
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
    const [isTeacherMode, setIsTeacherMode] = useState(false);
    
    const currentSlide = playbook[currentIndex];
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset state on slide change
    useEffect(() => {
        setInputValue("");
        setFeedback("neutral");
        if (currentSlide.type === SlideType.CHALLENGE && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [currentIndex, currentSlide]);

    // --- NAVIGATION ---
    const nextSlide = () => {
        if (currentIndex < playbook.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const checkAnswer = () => {
        if (!currentSlide.challengeA) return;
        
        const possibleAnswers = currentSlide.challengeA.toLowerCase().split('/').map(s => s.trim());
        const userVal = inputValue.toLowerCase().trim();
        
        // Check exact or partial match for multi-answer keys
        const isCorrect = possibleAnswers.some(ans => userVal === ans);
        
        if (isCorrect || isTeacherMode) {
            setFeedback('correct');
            // Auto advance after small delay for flow
            setTimeout(() => nextSlide(), 1200);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (currentSlide.type === SlideType.CHALLENGE) {
                if (feedback === 'correct') {
                     nextSlide(); // Already correct, move on
                } else {
                    checkAnswer();
                }
            } else {
                nextSlide();
            }
        }
    };

    // --- RENDERERS ---

    const renderIntro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in p-8">
            <div className="text-gold-500 font-bebas text-2xl tracking-widest mb-4">NOW SHOWING</div>
            <h1 className="font-cinzel text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
                {currentSlide.sceneTitle?.toUpperCase()}
            </h1>
            <p className="font-montserrat text-gray-400 text-xl md:text-2xl max-w-2xl font-light">
                {currentSlide.sceneDesc}
            </p>
            <div className="mt-12 animate-bounce text-white/50">Press Enter to Begin</div>
        </div>
    );

    const renderScript = () => (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-6 md:p-12 animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="font-bebas text-gold-500 text-xl tracking-widest">ORIGINAL SCRIPT</div>
                <div className="font-montserrat text-xs text-gray-500 uppercase">Read the scene carefully</div>
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
            
            <button onClick={nextSlide} className="mt-8 w-full py-4 bg-cinema-red hover:bg-red-700 text-white font-bebas text-xl tracking-widest transition-all">
                START EXERCISES
            </button>
        </div>
    );

    const renderExerciseIntro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in p-8 bg-black/40 backdrop-blur-sm">
             <div className="mb-6 p-4 rounded-full border-2 border-gold-500 text-gold-500">
                <Sparkles size={48} />
             </div>
            <h2 className="font-cinzel text-4xl md:text-6xl text-white mb-4">
                {currentSlide.exerciseTitle}
            </h2>
            <div className="h-1 w-24 bg-cinema-red mb-8"></div>
            <p className="font-montserrat text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
                {currentSlide.exerciseRule}
            </p>
            <div className="mt-12 text-gray-500 font-bebas tracking-widest">PRESS ENTER TO START DRILL</div>
        </div>
    );

    const renderChallenge = () => {
        const parts = currentSlide.challengeQ?.split('____') || ["", ""];
        
        return (
            <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto p-4 animate-fade-in relative">
                
                {/* Header Info */}
                <div className="absolute top-0 w-full flex justify-between items-start p-6 text-xs md:text-sm font-montserrat tracking-widest text-gray-500 uppercase">
                    <div>{currentSlide.exerciseTitle}</div>
                    <div>Question {currentSlide.currentInSet} / {currentSlide.totalInSet}</div>
                </div>

                {/* The Question */}
                <div className="w-full text-center">
                    <div className="font-montserrat text-2xl md:text-4xl text-white font-light leading-loose">
                        {parts[0]}
                        <div className="inline-block relative mx-2 align-baseline">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setFeedback('neutral');
                                }}
                                className={`
                                    bg-transparent border-b-4 text-center min-w-[200px] max-w-[400px]
                                    focus:outline-none transition-all duration-300 font-bold
                                    ${feedback === 'correct' ? 'border-green-500 text-green-400' : ''}
                                    ${feedback === 'incorrect' ? 'border-cinema-red text-cinema-red' : ''}
                                    ${feedback === 'neutral' ? 'border-gold-500/50 text-gold-100 focus:border-gold-400' : ''}
                                `}
                                placeholder="type here"
                                autoComplete="off"
                                autoFocus
                            />
                            {/* Visual Feedback Floating */}
                            <div className={`absolute -right-12 top-1/2 -translate-y-1/2 transition-all duration-300 ${feedback === 'neutral' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                                {feedback === 'correct' && <CheckCircle className="text-green-500" size={32} />}
                                {feedback === 'incorrect' && <XCircle className="text-cinema-red" size={32} />}
                            </div>
                        </div>
                        {parts[1]}
                    </div>
                </div>

                {/* Hint / Rule Reminder */}
                <div className="mt-12 text-center max-w-2xl bg-white/5 p-4 rounded border border-white/10">
                    <span className="text-gold-500 font-bebas tracking-wider mr-2">RULE:</span>
                    <span className="text-gray-400 font-montserrat text-sm">{currentSlide.exerciseRule}</span>
                </div>

                {/* Controls */}
                <div className="mt-12 flex gap-4">
                     {feedback === 'incorrect' && (
                         <div className="font-mono text-cinema-red bg-black/50 px-4 py-2 rounded border border-cinema-red/30 animate-pulse">
                             Try Again!
                         </div>
                     )}
                     {feedback === 'incorrect' && isTeacherMode && (
                        <div className="font-mono text-green-500 bg-black/50 px-4 py-2 rounded border border-green-500/30">
                            Answer: {currentSlide.challengeA}
                        </div>
                     )}
                </div>
            </div>
        );
    };

    const renderOutro = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
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

    // --- MAIN RENDER ---
    return (
        <div 
            className="w-screen h-screen bg-cinema-black text-white overflow-hidden relative font-body selection:bg-gold-500 selection:text-black"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Ambient Effects */}
            <div className="film-grain opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10"></div>

            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div 
                    className="h-full bg-gold-500 transition-all duration-500 ease-out shadow-[0_0_10px_#ffd700]"
                    style={{ width: `${((currentIndex + 1) / playbook.length) * 100}%` }}
                ></div>
            </div>

            {/* Hidden Controls for Teacher Mode Toggle (Top Right Corner Click) */}
            <div 
                className="absolute top-0 right-0 w-16 h-16 z-50 cursor-default"
                onClick={() => setIsTeacherMode(!isTeacherMode)}
                title="Toggle Teacher Mode"
            ></div>
            {isTeacherMode && (
                <div className="absolute top-4 right-4 z-40 text-[10px] font-mono text-cinema-red uppercase tracking-widest border border-cinema-red px-2 py-1 rounded">
                    Teacher Mode
                </div>
            )}

            {/* Stage Content */}
            <div className="relative z-20 w-full h-full flex items-center justify-center">
                {currentSlide.type === SlideType.INTRO && renderIntro()}
                {currentSlide.type === SlideType.SCRIPT && renderScript()}
                {currentSlide.type === SlideType.EXERCISE_INTRO && renderExerciseIntro()}
                {currentSlide.type === SlideType.CHALLENGE && renderChallenge()}
                {currentSlide.type === SlideType.OUTRO && renderOutro()}
            </div>

            {/* Navigation Arrows (Subtle) */}
            <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 hover:text-gold-500 transition-colors z-50 p-4 disabled:opacity-0"
            >
                <ChevronLeft size={48} />
            </button>
            
            <button 
                onClick={nextSlide}
                disabled={currentIndex === playbook.length - 1 || (currentSlide.type === SlideType.CHALLENGE && feedback !== 'correct' && !isTeacherMode)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors z-50 p-4 ${currentSlide.type === SlideType.CHALLENGE && feedback !== 'correct' ? 'text-white/5 cursor-not-allowed' : 'text-white/10 hover:text-gold-500 cursor-pointer'}`}
            >
                <ChevronRight size={48} />
            </button>

            {/* Footer Status */}
            <div className="absolute bottom-4 w-full text-center text-white/20 text-xs font-mono tracking-widest z-30 pointer-events-none">
                SLIDE {currentIndex + 1} / {playbook.length} • HOLLYWOOD GRAMMAR STUDIOS
            </div>
        </div>
    );
};

export default App;
