import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/Components/ui/button';

// Komponen bintang read-only sederhana
const StarDisplay = ({ value }) => {
    const val = parseFloat(value) || 0;
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < val ? 'text-amber-400 fill-amber-400' : 'text-border fill-border'}`} viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{val}/5</span>
        </div>
    );
};

export default function ResponseDetailModal({ isOpen, onOpenChange, response }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState('right'); // 👈 State untuk arah animasi

    const submittedDate = response ? new Date(response.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }) : '';

    const steps = useMemo(() => {
        if (!response?.answers) return [];
        const groups = response.answers.reduce((acc, answer) => {
            const name = answer.question?.indicator?.name || 'Lain-lain';
            if (!acc[name]) acc[name] = [];
            acc[name].push(answer);
            return acc;
        }, {});
        return Object.entries(groups).map(([name, answers]) => ({ name, answers }));
    }, [response]);

    const totalSteps = steps.length;
    const activeStep = steps[currentStep];

    const handleOpenChange = (open) => {
        if (!open) setCurrentStep(0);
        onOpenChange(open);
    };

    // 👈 Fungsi khusus agar animasi bergeser sesuai arah klik
    const goToNext = () => {
        setDirection('right');
        setCurrentStep(prev => prev + 1);
    };

    const goToPrev = () => {
        setDirection('left');
        setCurrentStep(prev => prev - 1);
    };

    const jumpToStep = (index) => {
        setDirection(index > currentStep ? 'right' : 'left');
        setCurrentStep(index);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {/* 1. Modal diperbesar menjadi max-w-3xl */}
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden">

                <div className="p-6 pb-0">
                    <DialogHeader>
                        <DialogTitle>Detail Hasil Resonded</DialogTitle>
                        <DialogDescription>{submittedDate}</DialogDescription>
                    </DialogHeader>
                </div>

                {response ? (
                    <>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-6 pt-4 pb-5 text-sm border-b border-border">
                            <div>
                                <p className="text-muted-foreground text-xs mb-1">Orang Tua / Wali</p>
                                <p className="font-semibold text-foreground">{response.respondent_name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-xs mb-1">Nama Siswa</p>
                                <p className="font-semibold text-foreground">{response.child_name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-xs mb-1">Teacher Dinilai</p>
                                <p className="font-semibold text-foreground">{response.teacher?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-xs mb-1">Total Pertanyaan</p>
                                <p className="font-semibold text-foreground">{response.answers?.length || 0} pertanyaan</p>
                            </div>
                        </div>

                        {totalSteps > 0 && (
                            <div className="px-6 py-4 border-b border-border bg-muted/10">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                    {steps.map((step, index) => {
                                        const isActive = currentStep === index;
                                        const isCompleted = currentStep > index;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => jumpToStep(index)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive
                                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                                        : isCompleted
                                                            ? 'bg-muted text-foreground'
                                                            : 'text-muted-foreground hover:bg-muted/50'
                                                    }`}
                                            >
                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isActive
                                                        ? 'bg-primary-foreground text-primary'
                                                        : isCompleted
                                                            ? 'bg-foreground/20 text-foreground'
                                                            : 'bg-muted text-muted-foreground'
                                                    }`}>
                                                    {isCompleted ? '✓' : index + 1}
                                                </span>
                                                {step.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Area Konten dengan Batasan Lebar Tambahan (overflow-x-hidden agar animasi slide tidak membuat scroll horizontal) */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 relative">
                            {activeStep && (
                                /* 2. Animasi Transisi Halus (Slide & Fade) berdasarkan arah */
                                <div
                                    key={currentStep}
                                    className={`space-y-4 animate-in fade-in duration-300 ease-out fill-mode-forwards ${direction === 'right' ? 'slide-in-from-right-6' : 'slide-in-from-left-6'
                                        }`}
                                >
                                    {activeStep.answers.map((answer, i) => (
                                        <div key={answer.id} className="space-y-2">
                                            <p className="text-sm font-medium text-foreground leading-relaxed">
                                                <span className="text-muted-foreground mr-1.5">{i + 1}.</span>
                                                {answer.question?.question_text}
                                            </p>

                                            {answer.question?.type === 'rating' ? (
                                                <StarDisplay value={answer.answer_rating} />
                                            ) : (
                                                <div className="pl-4 py-1">
                                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                                        {answer.answer_text
                                                                ? `"${answer.answer_text}"`
                                                            : <span className="text-muted-foreground not-italic">(Tidak ada saran)</span>
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {i < activeStep.answers.length - 1 && (
                                                <hr className="border-border/50 mt-4 mb-2" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t border-border px-6 py-3 flex items-center justify-between shrink-0 bg-muted/10">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={goToPrev}
                                disabled={currentStep === 0}
                                className="cursor-pointer"
                            >
                                ← Sebelumnya
                            </Button>

                            <span className="text-xs text-muted-foreground font-medium">
                                Indikator {currentStep + 1} dari {totalSteps}
                            </span>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={goToNext}
                                disabled={currentStep === totalSteps - 1}
                                className="cursor-pointer"
                            >
                                Selanjutnya →
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="py-12 text-center text-sm text-muted-foreground">Memuat data...</div>
                )}
            </DialogContent>
        </Dialog>
    );
}