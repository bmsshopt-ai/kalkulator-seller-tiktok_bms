import React from 'react';
import { Menu, Calculator } from 'lucide-react';

interface HeaderProps {
    onToggleNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleNav }) => {
    return (
        <header className="bg-white shadow-sm p-4 sticky top-0 z-30">
            <div className="container mx-auto max-w-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={onToggleNav} className="p-2 rounded-full hover:bg-slate-100 md:hidden" aria-label="Buka menu">
                        <Menu className="w-6 h-6 text-slate-700" />
                    </button>
                    <div className="flex items-center gap-3">
                         <Calculator className="w-8 h-8 text-cyan-500 hidden sm:block" />
                         <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                            Kalkulator Seller TikTok
                         </h1>
                    </div>
                </div>
                 {/* Placeholder for potential future actions like a settings icon */}
                 <div></div>
            </div>
        </header>
    );
};
