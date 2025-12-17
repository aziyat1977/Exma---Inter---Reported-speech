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

// --- ALGORITHMS ---

/**
 * AutoFitStage: The "Ultra Strong Algorithm" for Responsiveness.
 * It measures the container and the content, then applies a precise CSS scale
 * transform to ensure the content perfectly fits the viewport without scrolling.
 * This handles Projectors (Huge) to iPhone SE (Tiny).
 */
const AutoFitStage: React.FC<{ children: React.ReactNode, className?: string, scaleUp?: boolean }> = ({ children, className = "", scaleUp = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            if (!containerRef.current || !contentRef.current) return;

            const containerW = containerRef.current.clientWidth;
            const containerH = containerRef.current.clientHeight;
            // Reset scale to measure true natural size
            contentRef.current.style.transform = 'none';
            const contentW = contentRef.current.scrollWidth;
            const contentH = contentRef.current.scrollHeight;

            const padding = 20; // Safe buffer
            const scaleX = (containerW - padding) / contentW;
            const scaleY = (containerH - padding) / contentH;
            
            // Choose the smaller scale to fit both dimensions
            let newScale = Math.min(scaleX, scaleY);
            
            // Limit upscaling to prevent excessive blurriness, unless explicitly allowed (for art slides)
            if (!scaleUp && newScale > 1) newScale = 1;
            
            // Ensure we never scale down to 0
            setScale(Math.max(newScale, 0.2));
        };

        const observer = new ResizeObserver(calculateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        window.addEventListener('resize', calculateScale);
        
        // Initial Calculation with slight delay for layout stability
        setTimeout(calculateScale, 50);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', calculateScale);
        };
    }, [children, scaleUp]);

    return (
        <div ref={containerRef} className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
            <div 
                ref={contentRef} 
                style={{ 
                    transform: `scale(${scale})`, 
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)' 
                }} 
                className="flex flex-col items-center justify-center shrink-0"
            >
                {children}
            </div>
        </div>
    );
};

// --- GENERATE PLAYBOOK ---
const generatePlaybook = (): PlaybookItem[] => {
    const playlist: PlaybookItem[] = [];
    let uuidCount = 0;
    const getID = () => `slide-${uuidCount++}`;

    SCENES.forEach(scene => {
        playlist.push({
            uuid: getID(),
            type: SlideType.INTRO,
            sceneTitle: scene.title,
            sceneDesc: scene.description,
            sceneDescTrans: scene.descriptionTrans
        });
        playlist.push({
            uuid: getID(),
            type: SlideType.SCRIPT,
            sceneTitle: scene.title,
            scriptContent: scene.script
        });
        scene.exercises.forEach(ex => {
            playlist.push({
                uuid: getID(),
                type: SlideType.EXERCISE_INTRO,
                sceneTitle: scene.title,
                exerciseTitle: ex.title,
                exerciseRule: ex.rule,
                sceneDesc: ex.description,
                exerciseTeaching: ex.teaching
            });
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
            const allAnswersInSet = ex.questions.map(q => q.a);
            ex.questions.forEach((q, qIdx) => {
                const otherAnswers = allAnswersInSet.filter(a => a !== q.a);
                const distractors = shuffleArray(otherAnswers).slice(0, 3);
                const fillers = ["is", "was", "had", "would", "told", "asked"];
                while (distractors.length < 3) {
                   const randomFiller = fillers[Math.floor(Math.random() * fillers.length)];
                   if (randomFiller !== q.a && !distractors.includes(randomFiller)) distractors.push(randomFiller);
                   else { distractors.push("did"); break; }
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
    playlist.push({ uuid: getID(), type: SlideType.OUTRO });
    return playlist;
};

const App: React.FC = () => {
    const playbook = useMemo(() => generatePlaybook(), []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [droppedValue, setDroppedValue] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [helpLang, setHelpLang] = useState<'ru' | 'uz' | null>(null);
    const [timelineStep, setTimelineStep] = useState(0);
    
    // --- TOUCH D&D STATE ---
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [touchGhostPos, setTouchGhostPos] = useState<{x: number, y: number} | null>(null);

    const currentSlide = playbook[currentIndex];

    // Reset state on slide change
    useEffect(() => {
        setDroppedValue(null);
        setFeedback("neutral");
        setDraggedItem(null);
        setTimelineStep(0);
        setHelpLang(null);
        if (currentSlide.type === SlideType.TIMELINE) {
            setTimeout(() => setTimelineStep(1), 1500);
            setTimeout(() => setTimelineStep(2), 2500);
        }
    }, [currentIndex, currentSlide]);

    const nextSlide = () => { if (currentIndex < playbook.length - 1) setCurrentIndex(prev => prev + 1); };
    const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };
    const jumpToSlide = (index: number) => { setCurrentIndex(index); setIsMenuOpen(false); };

    // --- UNIVERSAL DRAG & DROP LOGIC (MOUSE + TOUCH) ---
    
    // 1. Mouse Handlers
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
        finalizeDrop(draggedItem);
    };

    // 2. Touch Handlers (iOS Physics)
    const handleTouchStart = (e: React.TouchEvent, item: string) => {
        // Prevent scroll
        document.body.style.overflow = 'hidden'; 
        setDraggedItem(item);
        const touch = e.touches[0];
        setTouchGhostPos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!draggedItem) return;
        const touch = e.touches[0];
        setTouchGhostPos({ x: touch.clientX, y: touch.clientY });
        
        // Highlight Dropzone if hovering
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = element?.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.add('drag-over');
        } else {
            document.querySelectorAll('.drop-zone').forEach(el => el.classList.remove('drag-over'));
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        setTouchGhostPos(null);
        document.body.style.overflow = ''; // Restore
        document.querySelectorAll('.drop-zone').forEach(el => el.classList.remove('drag-over'));

        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.closest('.drop-zone')) {
            finalizeDrop(draggedItem);
        }
        setDraggedItem(null);
    };

    // 3. Shared Logic
    const finalizeDrop = (item: string | null) => {
        if (!item) return;
        setDroppedValue(item);
        const correct = currentSlide.challengeA;
        if (!correct) return;
        
        const isCorrect = correct.toLowerCase().split('/').map(s => s.trim()).includes(item.toLowerCase().trim());
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
    };

    // --- RENDERERS ---

    const renderLanguageToggle = (teaching: {ru: string, uz: string} | undefined, positionClass = "absolute top-4 right-4 md:top-20 md:right-4") => {
        if (!teaching) return null;
        return (
            <div className={`${positionClass} flex gap-2 z-40`}>
                <button 
                    onClick={() => setHelpLang(helpLang === 'ru' ? null : 'ru')}
                    className={`px-2 py-1 md:px-3 md:py-1 font-bebas text-sm md:text-lg rounded border transition-all ${helpLang === 'ru' ? 'bg-cinema-red text-white border-cinema-red' : 'bg-black/50 text-white/50 border-white/20 hover:text-white hover:border-white'}`}
                >
                    RU
                </button>
                <button 
                    onClick={() => setHelpLang(helpLang === 'uz' ? null : 'uz')}
                    className={`px-2 py-1 md:px-3 md:py-1 font-bebas text-sm md:text-lg rounded border transition-all ${helpLang === 'uz' ? 'bg-blue-600 text-white border-blue-600' : 'bg-black/50 text-white/50 border-white/20 hover:text-white hover:border-white'}`}
                >
                    UZ
                </button>
            </div>
        );
    };

    const renderHelpOverlay = (teaching: {ru: string, uz: string} | undefined) => {
        if (!teaching || !helpLang) return null;
        return (
            <div className="absolute top-20 md:top-32 right-4 left-4 md:left-auto md:w-80 p-4 md:p-6 bg-black/95 border border-gold-500/50 backdrop-blur-xl rounded-lg shadow-2xl z-50 slide-enter">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bebas text-gold-500 text-lg md:text-xl tracking-widest">
                        {helpLang === 'ru' ? 'GRAMMAR NOTE' : 'QOIDA'}
                    </h3>
                    <button onClick={() => setHelpLang(null)}><X size={16} className="text-gray-500 hover:text-white"/></button>
                </div>
                <p className="font-montserrat text-white text-xs md:text-sm leading-relaxed">
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
                    className="absolute top-safe-top right-safe-right p-6 text-white hover:text-gold-500 transition-colors"
                >
                    <X size={32} />
                </button>
                
                <div className="w-full h-full overflow-y-auto p-8 flex flex-col items-center justify-center">
                    <h2 className="text-center text-3xl md:text-4xl font-bebas text-gold-500 tracking-widest mb-8 border-b border-gray-800 pb-4">
                        SELECT A SCENE
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                        {scenes.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => jumpToSlide(s.index)}
                                className="group relative aspect-video bg-gray-900 border border-white/10 rounded-lg overflow-hidden hover:border-gold-500 transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                    <div className="text-gold-500 font-bebas text-xl mb-1">SCENE {i + 1}</div>
                                    <div className="text-white font-cinzel text-lg md:text-2xl leading-tight group-hover:text-gold-100">{s.title.replace('Video ' + (i+1) + ': ', '')}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderIntro = () => (
        <AutoFitStage className="p-8" scaleUp={true}>
            <div className="flex flex-col items-center text-center max-w-4xl relative">
                {renderLanguageToggle(currentSlide.sceneDescTrans, "absolute -top-12 right-0")}
                {renderHelpOverlay(currentSlide.sceneDescTrans)}
                
                <div className="text-gold-500 font-bebas text-2xl md:text-3xl tracking-[0.2em] mb-4">NOW SHOWING</div>
                <h1 className="font-cinzel text-5xl md:text-8xl text-white mb-8 leading-none drop-shadow-2xl px-4">
                    {currentSlide.sceneTitle?.replace('Video ', '').split(':')[0]}<br/>
                    <span className="text-3xl md:text-6xl text-gray-300">{currentSlide.sceneTitle?.split(':')[1]}</span>
                </h1>
                <p className="font-montserrat text-gray-400 text-lg md:text-2xl max-w-2xl font-light mb-12 leading-relaxed">
                    {currentSlide.sceneDesc}
                </p>
                <button onClick={nextSlide} className="flex items-center gap-3 px-8 py-4 bg-gold-500 text-black font-bold text-xl rounded hover:bg-white hover:scale-105 transition-all shadow-lg shadow-gold-500/20">
                    <Film size={24} /> START SCENE
                </button>
            </div>
        </AutoFitStage>
    );

    // SCRIPT IS EXPLICITLY SCROLLABLE - Does NOT use AutoFitStage
    const renderScript = () => (
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-4 md:px-12 py-safe-top pb-safe-bottom">
            <div className="flex justify-between items-center py-4 border-b border-white/10 shrink-0 mt-8 md:mt-12">
                <div className="font-bebas text-gold-500 text-xl tracking-widest">ORIGINAL SCRIPT</div>
                <div className="font-montserrat text-xs text-gray-500 uppercase">Read carefully</div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar my-4 selectable-text">
                {currentSlide.scriptContent?.map((line, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className="font-bebas text-gold-600/80 tracking-wider text-lg">{line.sp}</span>
                        <span className="font-montserrat text-white text-lg md:text-2xl font-light leading-relaxed">
                            "{line.text}"
                        </span>
                    </div>
                ))}
                {/* Spacer for bottom navigation */}
                <div className="h-24"></div>
            </div>
            
            <div className="shrink-0 py-4">
                 <button onClick={nextSlide} className="w-full py-4 bg-cinema-red hover:bg-red-700 text-white font-bebas text-xl tracking-widest transition-all rounded shadow-lg shadow-red-900/20 active:scale-95">
                    PROCEED TO EXERCISES
                </button>
            </div>
        </div>
    );

    const renderExerciseIntro = () => (
        <AutoFitStage className="p-8 bg-black/40 backdrop-blur-sm">
             <div className="relative w-full max-w-4xl flex flex-col items-center text-center">
                {renderLanguageToggle(currentSlide.exerciseTeaching, "absolute -top-12 right-0")}
                {renderHelpOverlay(currentSlide.exerciseTeaching)}

                <div className="mb-8 p-6 rounded-full border-4 border-gold-500 text-gold-500 animate-pulse bg-black/50">
                    <Clapperboard size={64} />
                </div>
                <h2 className="font-cinzel text-4xl md:text-7xl text-white mb-6 leading-tight">
                    {currentSlide.exerciseTitle}
                </h2>
                <div className="h-1 w-32 bg-cinema-red mb-8"></div>
                <p className="font-montserrat text-xl md:text-3xl text-gray-300 font-light max-w-3xl leading-relaxed mb-12">
                    {currentSlide.exerciseRule}
                </p>
                <button onClick={nextSlide} className="text-gold-500 font-bebas tracking-widest text-2xl border-b-2 border-gold-500 pb-1 hover:text-white hover:border-white transition-colors">
                    SEE TIMELINE
                </button>
            </div>
        </AutoFitStage>
    );

    const renderTimeline = () => {
        const data = currentSlide.timelineData;
        if (!data) return null;

        const parse = (text: string) => {
            const parts = text.split(/[\[\]]/);
            return { prefix: parts[0] || "", highlight: parts[1] || "", suffix: parts[2] || "" };
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
            <AutoFitStage className="bg-black/90 p-4" scaleUp={true}>
                <div className="relative w-[1200px] h-[600px] flex items-center justify-center">
                     {renderLanguageToggle(currentSlide.exerciseTeaching, "absolute top-0 right-0")}
                     {renderHelpOverlay(currentSlide.exerciseTeaching)}

                    <div className="time-portal"></div>

                    {/* Content Container */}
                    <div className="flex justify-between w-full relative z-10 px-12">
                        {/* LEFT */}
                        <div className={`flex flex-col items-start justify-center transition-all duration-1000 w-1/3 ${timelineStep >= 1 ? 'opacity-30 blur-sm scale-90' : 'opacity-100 scale-100'}`}>
                             <div className="text-gold-500 font-bebas text-3xl mb-4 flex items-center gap-2">
                                 <Clock size={32} /> DIRECT
                             </div>
                             <div className="text-5xl font-cinzel text-white leading-tight">
                                {direct.prefix}
                                <span className="text-cinema-red font-bold inline-block relative">{direct.highlight}</span>
                                {direct.suffix}
                             </div>
                             <div className="mt-6 text-gray-500 font-mono text-lg uppercase border border-gray-700 px-4 py-2 rounded">
                                 {data.tenseFrom}
                             </div>
                        </div>

                        {/* PARTICLE */}
                        {timelineStep >= 1 && <div className="ultra-particle">{direct.highlight}</div>}

                        {/* RIGHT */}
                        <div className={`flex flex-col items-end justify-center text-right transition-all duration-1000 delay-500 w-1/3 ${timelineStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                             <div className="text-gold-500 font-bebas text-3xl mb-4">REPORTED</div>
                             <div className="text-5xl font-cinzel text-white leading-tight">
                                {reported.prefix}
                                <span className={`text-green-400 font-bold scale-110 inline-block drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] ${timelineStep >= 2 ? 'impact-target' : ''}`}>
                                    {reported.highlight}
                                </span>
                                {reported.suffix}
                             </div>
                             <div className="mt-6 text-gray-500 font-mono text-lg uppercase border border-gray-700 px-4 py-2 rounded">
                                 {data.tenseTo}
                             </div>
                        </div>
                    </div>

                    <button onClick={handleReplay} className="absolute bottom-12 left-12 text-white/30 hover:text-gold-500 transition-colors flex items-center gap-2 z-50 group">
                        <RotateCcw size={24} className="group-hover:-rotate-180 transition-transform duration-700" /> 
                        <span className="font-bebas tracking-widest text-xl">REPLAY</span>
                    </button>

                    <button onClick={nextSlide} className={`absolute bottom-12 right-12 px-10 py-4 bg-white/10 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-500 font-bebas text-xl tracking-widest z-20 ${timelineStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        START EXERCISE
                    </button>
                </div>
            </AutoFitStage>
        );
    }

    const renderChallenge = () => {
        const parts = currentSlide.challengeQ?.split('____') || ["", ""];
        
        return (
            <div className="w-full h-full flex flex-col pt-safe-top pb-safe-bottom relative">
                {/* Fixed Header */}
                <div className="w-full flex justify-between items-start p-4 md:p-8 text-xs md:text-sm font-montserrat tracking-widest text-gray-500 uppercase shrink-0">
                    <div>{currentSlide.exerciseTitle}</div>
                    <div className="flex gap-4">
                        {renderLanguageToggle(currentSlide.exerciseTeaching, "relative")}
                        <div>{currentSlide.currentInSet} / {currentSlide.totalInSet}</div>
                    </div>
                </div>
                {renderHelpOverlay(currentSlide.exerciseTeaching)}

                {/* Flexible Center Area for Question */}
                <div className="flex-1 flex flex-col items-center justify-center w-full px-4 overflow-hidden">
                    <div className="text-center font-montserrat text-2xl md:text-4xl lg:text-5xl text-white font-light leading-loose md:leading-loose max-w-5xl">
                        {parts[0]}
                        {/* DROP ZONE */}
                        <div 
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`
                                inline-flex items-center justify-center
                                min-w-[120px] md:min-w-[180px] h-[50px] md:h-[70px] mx-2 align-middle
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
                                <span className="text-white/20 text-sm font-bebas tracking-widest pointer-events-none">DROP HERE</span>
                            )}
                        </div>
                        {parts[1]}
                    </div>

                    <div className="h-16 mt-4 flex items-center justify-center">
                        {feedback === 'correct' && <CheckCircle className="text-green-500 w-12 h-12 md:w-16 md:h-16 animate-bounce-short" />}
                        {feedback === 'incorrect' && <XCircle className="text-cinema-red w-12 h-12 md:w-16 md:h-16 animate-pulse" />}
                    </div>
                </div>

                {/* Bottom Word Bank - Auto-height but max 40% of screen */}
                <div className="w-full bg-black/80 backdrop-blur-md border-t border-white/10 p-4 md:p-8 rounded-t-3xl shrink-0 max-h-[40vh] overflow-y-auto">
                    <div className="text-center mb-4 text-gray-400 font-bebas tracking-widest text-sm">OPTIONS</div>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 pb-4">
                        {currentSlide.options?.map((opt, i) => {
                            const isUsed = droppedValue === opt;
                            return (
                                <div
                                    key={i}
                                    draggable={!isUsed}
                                    onDragStart={(e) => handleDragStart(e, opt)}
                                    onTouchStart={(e) => handleTouchStart(e, opt)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    className={`
                                        draggable-item
                                        px-4 py-2 md:px-6 md:py-3 rounded-lg text-lg md:text-2xl font-montserrat font-semibold
                                        bg-white/10 border border-white/20 text-white
                                        active:bg-gold-500 active:text-black
                                        hover:bg-gold-500 hover:text-black hover:border-gold-500
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
        <AutoFitStage scaleUp={true}>
             <div className="flex flex-col items-center justify-center text-center p-8">
                 <div className="text-gold-500 mb-8 animate-pulse"><Film size={96} /></div>
                 <h1 className="font-cinzel text-5xl md:text-8xl text-white mb-6">THAT'S A WRAP</h1>
                 <p className="font-montserrat text-gray-400 text-xl md:text-3xl mb-12">You have completed all scenes.</p>
                 <button 
                    onClick={() => setCurrentIndex(0)}
                    className="flex items-center gap-3 px-10 py-5 bg-white/10 hover:bg-gold-500 hover:text-black transition-all rounded text-white font-bebas text-2xl tracking-widest"
                >
                    <RotateCcw size={28} /> REPLAY FROM START
                </button>
            </div>
        </AutoFitStage>
    );

    // --- MAIN LAYOUT ---
    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right">
            
            {/* Ambient Effects */}
            <div className="film-grain opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10"></div>

            {/* Mobile Touch Ghost Element */}
            {draggedItem && touchGhostPos && (
                <div 
                    className="drag-ghost"
                    style={{ left: touchGhostPos.x, top: touchGhostPos.y }}
                >
                    {draggedItem}
                </div>
            )}

            {/* Header Controls */}
            <div className="absolute top-safe-top left-safe-left w-full p-4 flex justify-between items-center z-50 pointer-events-none">
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 text-white/50 hover:text-gold-500 transition-colors group pointer-events-auto"
                >
                    <Grid size={24} className="group-hover:scale-110 transition-transform"/>
                    <span className="font-bebas tracking-widest hidden md:inline">SCENES</span>
                </button>

                {/* Progress Dots */}
                <div className="flex gap-2 pointer-events-auto">
                    {SCENES.map((_, i) => {
                         const isCurrentScene = currentSlide.sceneTitle === _.title;
                         return (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${isCurrentScene ? 'bg-gold-500' : 'bg-gray-800'}`}></div>
                         );
                    })}
                </div>
                
                <div className="w-20"></div>
            </div>

            {/* Menu Overlay */}
            {renderMenu()}

            {/* Stage Content */}
            <div className="relative z-20 w-full h-full flex-1 flex items-center justify-center overflow-hidden">
                {currentSlide.type === SlideType.INTRO && renderIntro()}
                {currentSlide.type === SlideType.SCRIPT && renderScript()}
                {currentSlide.type === SlideType.EXERCISE_INTRO && renderExerciseIntro()}
                {currentSlide.type === SlideType.TIMELINE && renderTimeline()}
                {currentSlide.type === SlideType.CHALLENGE && renderChallenge()}
                {currentSlide.type === SlideType.OUTRO && renderOutro()}
            </div>

            {/* Navigation Buttons - Safe Area Aware */}
            <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-safe-left bottom-safe-bottom m-4 md:m-8 text-white/20 hover:text-white transition-colors z-50 p-4 disabled:opacity-0 active:scale-90"
            >
                <ChevronLeft size={48} />
            </button>
            
            <button 
                onClick={nextSlide}
                disabled={currentIndex === playbook.length - 1}
                className={`absolute right-safe-right bottom-safe-bottom m-4 md:m-8 transition-colors z-50 p-4 active:scale-90 ${currentSlide.type === SlideType.CHALLENGE && feedback !== 'correct' ? 'text-white/10 hover:text-white/30' : 'text-white/50 hover:text-gold-500'}`}
            >
                <ChevronRight size={48} />
            </button>
        </div>
    );
};

export default App;
