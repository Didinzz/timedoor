import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { Button } from '@/Components/ui/button';

export default function WelcomeBanner({ currentYear, handleYearChange, years }) {
    return (
        <div className="flex flex-col lg:flex-row gap-5 mb-8 mt-6">

            <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm relative flex items-center md:justify-end">

                <div className="hidden md:flex absolute left-4 lg:left-8 bottom-0 h-[140%] z-20 items-end justify-start pointer-events-none w-[40%] lg:w-[45%]">

                    <img
                        src="/images/illustration-review3.svg"
                        alt="Review Illustration"
                        className="h-full w-auto object-contain object-bottom drop-shadow-sm dark:hidden"
                    />
                    <img
                        src="/images/illustration-review3-dark.svg"
                        alt="Review Illustration"
                        className="h-full w-auto object-contain object-bottom drop-shadow-sm hidden dark:block"
                    />

                </div>

                <div className="p-6 md:p-8 z-10 relative w-full md:w-2/3">
                    <p className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                        Dashboard Evaluasi
                    </p>
                    <h1 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">
                        Selamat Datang Di Dashboard Kepuasan Pengguna Timedoor Academy
                    </h1>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        Pantau tingkat kepuasan, kelola evaluasi teacher, dan temukan <i>insight</i> penting dari laporan orang tua.
                    </p>
                </div>

            </div>

            {/* 2. FILTER DATA GLOBAL */}
            {/* PERBAIKAN: Mengganti bg-white menjadi bg-card & w-70 menjadi w-[280px] agar valid Tailwind */}
            <div className="w-full lg:w-70 bg-card border border-border rounded-2xl shadow-sm p-5 flex flex-col justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <FiFilter className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <h2 className="font-bold text-sm text-foreground">Filter Data</h2>
                    </div>

                    <div className="space-y-1.5 mb-4">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Tahun Anggaran / Ajaran
                        </label>
                        {/* PERBAIKAN: Menambahkan text-foreground pada select agar teksnya terang di dark mode */}
                        <select
                        value={currentYear}
                        onChange={handleYearChange}
                         className="w-full border-border rounded-lg text-sm text-foreground focus:ring-primary focus:border-primary px-3 py-1.5 bg-background cursor-pointer hover:bg-muted">
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                    <Button 
                    onClick={() => handleYearChange({ target: { value: new Date().getFullYear() } })}
                    variant="outline" size="sm" className="w-full bg-muted/20 text-muted-foreground hover:bg-muted/50 cursor-pointer hover:text-foreground">
                        Reset
                    </Button>
                </div>
            </div>

        </div>
    );
}