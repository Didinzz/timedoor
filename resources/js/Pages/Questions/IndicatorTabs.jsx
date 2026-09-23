import React from 'react';

export default function IndicatorTabs({ indicators, activeTab, onTabChange }) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-px mb-4 border-b border-border/60 hide-scrollbar">
            <button
                onClick={() => onTabChange('all')}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${activeTab === 'all'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/80'
                    }`}
            >
                Semua Kriteria
            </button>

            {indicators && indicators.map(ind => (
                <button
                    key={ind.id}
                    onClick={() => onTabChange(ind.id)}
                    className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === ind.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/80'
                        }`}
                >
                    {ind.name}
                </button>
            ))}
        </div>
    );
}