import React from 'react';
import { ArrowDown, Clock } from 'lucide-react';
import { ItemType } from '../types';

interface TimelineProps {
    currentType: ItemType;
}

const Timeline: React.FC<TimelineProps> = ({ currentType }) => {
    const isPresent = currentType === ItemType.SCRIPT;

    return (
        <div className="flex items-center justify-center gap-4 w-full max-w-2xl py-6 relative">
             {/* Glowing connection line */}
            <div className={`absolute top-1/2 left-0 w-full h-0.5 transform -translate-y-1/2 transition-colors duration-500 ${isPresent ? 'bg-gradient-to-r from-gold-400 to-gray-700' : 'bg-gradient-to-r from-gray-700 to-gold-400'}`} />

            {/* Present Node */}
            <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${isPresent ? 'scale-110' : 'scale-90 opacity-60'}`}>
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-500 ${isPresent ? 'bg-gold-500 border-white text-black shadow-[0_0_20px_rgba(255,215,0,0.6)]' : 'bg-cinema-panel border-gray-600 text-gray-400'}`}>
                    <span className="font-bebas text-lg tracking-wider">NOW</span>
                </div>
                <div className="mt-2 text-xs font-montserrat uppercase tracking-widest text-gold-400 font-bold bg-black/50 px-2 rounded">Direct Speech</div>
            </div>

            {/* Transition Arrow */}
            <div className="relative z-10 mx-4">
                <div className={`p-2 rounded-full border border-gray-700 bg-black/80 transition-transform duration-500 ${!isPresent ? 'rotate-180 text-gold-500' : 'text-gray-500'}`}>
                    <ArrowDown size={24} />
                </div>
            </div>

            {/* Past Node */}
            <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${!isPresent ? 'scale-110' : 'scale-90 opacity-60'}`}>
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-500 ${!isPresent ? 'bg-gold-500 border-white text-black shadow-[0_0_20px_rgba(255,215,0,0.6)]' : 'bg-cinema-panel border-gray-600 text-gray-400'}`}>
                    <Clock size={24} />
                </div>
                <div className="mt-2 text-xs font-montserrat uppercase tracking-widest text-gold-400 font-bold bg-black/50 px-2 rounded">Reported Speech</div>
            </div>
        </div>
    );
};

export default Timeline;