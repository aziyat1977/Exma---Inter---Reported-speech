import React, { useState, useEffect } from 'react';
import { ItemType, AppMode, DisplayItem } from '../types';
import { Check, X, AlertCircle } from 'lucide-react';

interface ContentCardProps {
    items: DisplayItem[];
    mode: AppMode;
    isVisible: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ items, mode, isVisible }) => {
    // Determine card styling based on mode and content type
    const isScript = items.length > 0 && items[0].type === ItemType.SCRIPT;
    const isKahoot = mode === AppMode.KAHOOT;

    return (
        <div 
            className={`
                relative w-full max-w-4xl min-h-[400px] rounded-xl border border-white/10 
                backdrop-blur-xl shadow-2xl p-8 md:p-12 flex flex-col justify-center items-center gap-8
                transition-all duration-500 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
                ${isScript ? 'bg-black/40' : 'bg-cinema-panel'}
                ${isKahoot ? 'border-2 border-cinema-red bg-indigo-900/40' : ''}
            `}
        >
            {/* Cinematic Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-500/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-500/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/50 rounded-br-lg"></div>

            {items.map((item, idx) => (
                <ContentRow key={`${item.id}-${idx}`} item={item} mode={mode} index={idx} />
            ))}
        </div>
    );
};

const ContentRow: React.FC<{ item: DisplayItem; mode: AppMode; index: number }> = ({ item, mode, index }) => {
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
    const [showAnswer, setShowAnswer] = useState(mode === AppMode.TEACHER);

    useEffect(() => {
        // Reset state when item changes
        setInputValue('');
        setStatus('neutral');
        setShowAnswer(mode === AppMode.TEACHER);
    }, [item, mode]);

    const handleCheck = (val: string) => {
        setInputValue(val);
        if (mode === AppMode.KAHOOT) return; // Logic handled differently or manual

        if (!item.answer) return;
        
        const cleanVal = val.trim().toLowerCase();
        const cleanAns = item.answer.trim().toLowerCase();

        // Allow for slash alternatives (e.g. "if / whether")
        const answers = cleanAns.split('/').map(a => a.trim());
        
        if (answers.includes(cleanVal)) {
            setStatus('correct');
        } else if (cleanVal.length > 0) {
            setStatus('incorrect');
        } else {
            setStatus('neutral');
        }
    };

    // Render Script Line
    if (item.type === ItemType.SCRIPT) {
        // Highlight verbs if defined
        const highlightedContent = item.highlight 
            ? item.content.split(new RegExp(`(${item.highlight.split(', ').join('|')})`, 'gi')).map((part, i) => 
                item.highlight?.toLowerCase().includes(part.toLowerCase()) 
                ? <span key={i} className="text-cinema-red font-bold animate-pulse">{part}</span> 
                : part
            )
            : item.content;

        return (
            <div 
                className="w-full text-center space-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <div className="text-gold-400 font-bebas text-xl tracking-wider">{item.speakerOrTitle}</div>
                <div className="text-white font-montserrat text-2xl md:text-3xl leading-relaxed font-light">
                    "{highlightedContent}"
                </div>
            </div>
        );
    }

    // Render Exercise Line
    const questionParts = item.content.split('____');

    return (
        <div 
            className="w-full flex flex-col items-center gap-3 animate-fade-in"
             style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="text-gold-600/80 font-bebas text-lg uppercase tracking-widest">{item.speakerOrTitle}</div>
            
            <div className="text-xl md:text-2xl font-montserrat text-gray-200 text-center leading-loose">
                {questionParts[0]}
                <span className="inline-block relative mx-2">
                    <input 
                        type="text" 
                        value={mode === AppMode.TEACHER ? item.answer : inputValue}
                        onChange={(e) => handleCheck(e.target.value)}
                        readOnly={mode === AppMode.TEACHER}
                        className={`
                            bg-transparent border-b-2 text-center w-40 md:w-56 focus:outline-none transition-all font-bold
                            ${mode === AppMode.TEACHER ? 'text-green-400 border-green-500/50' : ''}
                            ${status === 'correct' ? 'text-green-400 border-green-500' : ''}
                            ${status === 'incorrect' ? 'text-cinema-red border-cinema-red' : ''}
                            ${status === 'neutral' && mode !== AppMode.TEACHER ? 'text-gold-100 border-gold-500/50 focus:border-gold-400 focus:w-64' : ''}
                        `}
                        placeholder={mode === AppMode.TEACHER ? '' : "?"}
                        autoComplete="off"
                    />
                    {/* Feedback Icon */}
                    <span className="absolute -right-8 top-1">
                        {status === 'correct' && <Check size={20} className="text-green-500" />}
                        {status === 'incorrect' && <X size={20} className="text-cinema-red" />}
                    </span>
                </span>
                {questionParts[1]}
            </div>

            {/* Answer Reveal Section */}
            <div className="h-8 flex items-center justify-center w-full">
                {mode === AppMode.STUDENT && (
                    <button 
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="text-xs text-gray-500 hover:text-gold-400 transition-colors uppercase font-bebas tracking-widest flex items-center gap-1"
                    >
                        {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
                    </button>
                )}
            </div>

            <div className={`
                overflow-hidden transition-all duration-300 ease-in-out w-full flex justify-center
                ${showAnswer || mode === AppMode.TEACHER ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="bg-green-900/20 border border-green-500/20 px-4 py-1 rounded text-green-400 font-mono text-sm shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                    KEY: {item.answer}
                </div>
            </div>
        </div>
    );
};

export default ContentCard;