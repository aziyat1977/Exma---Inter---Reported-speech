import React from 'react';
import { X, Film, GraduationCap, MonitorPlay, Users } from 'lucide-react';
import { AppMode } from '../types';
import { SCENES } from '../constants';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentMode: AppMode;
    onModeChange: (mode: AppMode) => void;
    currentSceneIndex: number;
    onSceneChange: (index: number) => void;
}

const Drawer: React.FC<DrawerProps> = ({ 
    isOpen, 
    onClose, 
    currentMode, 
    onModeChange, 
    currentSceneIndex,
    onSceneChange
}) => {
    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-cinema-black border-r border-gold-600/30 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-gold-900/20 to-transparent">
                    <h2 className="text-2xl font-cinzel text-gold-400">Studio Settings</h2>
                    <button onClick={onClose} className="text-white hover:text-gold-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    
                    {/* Modes Section */}
                    <div>
                        <h3 className="text-white/50 font-bebas text-xl tracking-wider mb-4 uppercase">Production Mode</h3>
                        <div className="space-y-3">
                            {[
                                { id: AppMode.STUDENT, icon: GraduationCap, label: 'Student' },
                                { id: AppMode.TEACHER, icon: Users, label: 'Teacher' },
                                { id: AppMode.KAHOOT, icon: MonitorPlay, label: 'Kahoot Mode' },
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        onModeChange(mode.id);
                                        onClose();
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded border transition-all duration-300 group ${
                                        currentMode === mode.id 
                                        ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.4)]' 
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-gold-500/50 hover:text-gold-400'
                                    }`}
                                >
                                    <mode.icon size={20} className={currentMode === mode.id ? 'animate-pulse' : ''} />
                                    <span className="font-montserrat font-semibold">{mode.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10"></div>

                    {/* Scenes Section */}
                    <div>
                        <h3 className="text-white/50 font-bebas text-xl tracking-wider mb-4 uppercase">Select Scene</h3>
                        <div className="space-y-3">
                            {SCENES.map((scene, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onSceneChange(index);
                                        onClose();
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded border transition-all duration-300 ${
                                        currentSceneIndex === index 
                                        ? 'bg-cinema-red text-white border-cinema-red shadow-[0_0_15px_rgba(229,9,20,0.4)]' 
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-cinema-red/50 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Film size={18} />
                                        <span className="font-montserrat text-sm font-semibold truncate">{scene.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="p-4 border-t border-white/10 text-center text-white/20 text-xs font-montserrat">
                    HOLLYWOOD GRAMMAR STUDIOS v2.0
                </div>
            </div>
        </>
    );
};

export default Drawer;