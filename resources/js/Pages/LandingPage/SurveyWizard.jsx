import React, { useState, useMemo } from 'react';
import { Button } from '@/Components/ui/button';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// Import Goey Toaster persis seperti milik Anda
import { gooeyToast } from "@/components/ui/goey-toaster";
import "goey-toast/styles.css";
import { router } from '@inertiajs/react';

// --- DATA BAWAAN (3 Indikator Utama) ---
const DEFAULT_TEACHERS = [
    { id: 1, name: 'Mr. Budi Santoso' },
    { id: 2, name: 'Miss Sarah Amalia' },
    { id: 3, name: 'Miss Alice' },
];

const DEFAULT_INDICATORS = [
    {
        id: 1, name: 'Pengajaran Teacher',
        questions: [
            { id: 1, question_text: 'Kemampuan teacher dalam menjelaskan materi agar mudah dipahami anak.', type: 'rating' },
            { id: 2, question_text: 'Perhatian, kesabaran, dan empati teacher terhadap anak di kelas.', type: 'rating' },
        ]
    },
    {
        id: 2, name: 'Sarana & Prasarana',
        questions: [
            { id: 3, question_text: 'Kenyamanan, keamanan, dan kebersihan ruang kelas Timedoor.', type: 'rating' },
            { id: 4, question_text: 'Kelengkapan dan performa perangkat praktik (PC/Laptop/Robotik).', type: 'rating' },
        ]
    },
    {
        id: 3, name: 'Kurikulum & Materi',
        questions: [
            { id: 5, question_text: 'Kesesuaian tingkat kesulitan materi pelajaran dengan minat dan usia anak.', type: 'rating' },
            { id: 6, question_text: 'Apakah ada saran tambahan untuk materi kurikulum kami ke depannya?', type: 'text' },
        ]
    }
];

const ratingStyle = {
    itemShapes: (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    ),
    activeFillColor: '#F59E0B',
    inactiveFillColor: '#E5E7EB',
};

export default function SurveyWizard({ teachers = DEFAULT_TEACHERS, indicators = DEFAULT_INDICATORS }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk Loading
    const [isSuccess, setIsSuccess] = useState(false);       // State untuk Layar Terima Kasih

    const [formData, setFormData] = useState({
        respondent_name: '',
        child_name: '',
        teacher_id: '',
        answers: {},
        text_answers: {}
    });

    // Susun alur step otomatis (Tanpa Step Konfirmasi)
    const steps = useMemo(() => {
        const s = [{ type: 'identity', label: 'Identitas' }];
        indicators.forEach(ind => {
            s.push({ type: 'indicator', label: ind.name, indicator: ind });
        });
        return s;
    }, [indicators]);

    const totalSteps = steps.length;
    const current = steps[currentStep];

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
            setTimeout(() => {
                document.getElementById('survey-card')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleRating = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            answers: { ...prev.answers, [questionId]: value }
        }));
    };

    const handleTextAnswer = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            text_answers: { ...prev.text_answers, [questionId]: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Mulai loading spinner

        // Mengirim data form ke Route POST '/survey'
        router.post(route('survey.store'), formData, {

            onSuccess: () => {
                setIsSubmitting(false); // Matikan loading
                setIsSuccess(true);     // Munculkan layar terima kasih
                gooeyToast.success('Terimakasih! Masukkan berhasil dikirimkan.', {
                    description: 'Masukkan dan saran dari anda sangat berarti bagi kami',
                    preset: 'smooth',
                    showTimestamp: false,
                });
            },
            onError: (errors) => {
                setIsSubmitting(false); // Matikan loading
                gooeyToast.error('Gagal mengirim survei. Silakan periksa kembali form Anda.');
                console.log(errors);
            }
        });
    };

    const canProceed = () => {
        if (current.type === 'identity') {
            return formData.respondent_name.trim() && formData.child_name.trim() && formData.teacher_id;
        }
        if (current.type === 'indicator') {
            const ratingQuestions = current.indicator.questions.filter(q => q.type === 'rating');
            return ratingQuestions.every(q => formData.answers[q.id] && formData.answers[q.id] > 0);
        }
        return true;
    };

    // ==========================================
    // LAYAR TERIMA KASIH (CLOSING SCREEN)
    // ==========================================
    if (isSuccess) {
        return (
            <div id="survey-card" className="w-full">
                <div className="bg-card rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border overflow-hidden p-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-foreground mb-4">Terima Kasih!</h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        Survei dan masukan Anda telah berhasil kami terima. Saran yang Anda berikan sangat berarti bagi kami untuk terus meningkatkan kualitas pelayanan dan kurikulum pendidikan di Timedoor Academy.
                    </p>
                    <Button
                        type="button"
                        onClick={() => {
                            setIsSuccess(false);
                            setCurrentStep(0);
                            setFormData({ respondent_name: '', child_name: '', teacher_id: '', answers: {}, text_answers: {} });
                        }}
                        className="rounded-full px-10 py-6 text-base font-bold shadow-lg"
                    >
                        Kirim Survei Lainnya
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div id="survey-card" className="w-full">
            <div className="bg-card rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border overflow-hidden">

                {/* --- HEADER & STEPPER --- */}
                <div className="bg-muted/30 px-6 pt-10 pb-8 border-b border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-10 text-center">
                        Formulir Evaluasi
                    </h2>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Garis Stepper Tepat di Tengah Lingkaran */}
                        <div className="absolute left-0 top-5 -translate-y-1/2 w-full h-[3px] bg-border z-0"></div>
                        <div
                            className="absolute left-0 top-5 -translate-y-1/2 h-[3px] bg-primary z-0 transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                        ></div>

                        <div className="flex items-start justify-between relative z-10">
                            {steps.map((step, index) => {
                                const isActive = currentStep === index;
                                const isCompleted = currentStep > index;

                                return (
                                    <div key={index} className="flex flex-col items-center w-24">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isActive
                                                ? 'bg-primary text-primary-foreground shadow-lg scale-110 ring-4 ring-primary/20'
                                                : isCompleted
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-background text-muted-foreground border-2 border-border'
                                                }`}
                                        >
                                            {isCompleted ? '✓' : index + 1}
                                        </div>
                                        <span className={`mt-3 text-xs text-center font-semibold ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* --- KONTEN FORM --- */}
                <div className="p-6 sm:p-12 min-h-[400px]">
                    <form onSubmit={handleSubmit}>

                        {/* 1. STEP IDENTITAS */}
                        {current.type === 'identity' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                                <div className="text-center mb-10">
                                    <h3 className="text-3xl font-extrabold text-foreground mb-3">Identitas Responden</h3>
                                    <p className="text-muted-foreground">Silakan lengkapi data diri Anda terlebih dahulu.</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">Nama Orang Tua / Wali <span className="text-destructive">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Budi Santoso"
                                            className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                            value={formData.respondent_name}
                                            onChange={(e) => setFormData({ ...formData, respondent_name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">Nama Anak (Siswa) <span className="text-destructive">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Kevin Santoso"
                                            className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                            value={formData.child_name}
                                            onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">Pilih Teacher <span className="text-destructive">*</span></label>
                                        <select
                                            className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
                                            value={formData.teacher_id}
                                            onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>— Silakan pilih teacher —</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. STEP INDIKATOR & RATING */}
                        {current.type === 'indicator' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                                <div className="mb-10 text-center">
                                    <h3 className="text-3xl font-extrabold text-foreground mb-3">{current.indicator.name}</h3>
                                    <p className="text-muted-foreground">Berikan penilaian Anda dengan menyentuh bintang di bawah ini.</p>
                                </div>

                                <div className="space-y-8">
                                    {current.indicator.questions.map((q, index) => (
                                        <div key={q.id} className="bg-muted/20 rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
                                            <p className="font-semibold text-lg text-foreground mb-6 leading-relaxed">
                                                <span className="text-primary mr-3">{index + 1}.</span>
                                                {q.question_text}
                                            </p>

                                            {q.type === 'rating' ? (
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <Rating
                                                        value={formData.answers[q.id] || 0}
                                                        onChange={(val) => handleRating(q.id, val)}
                                                        items={5}
                                                        style={{ maxWidth: 220 }}
                                                        itemStyles={ratingStyle}
                                                        transition="zoom"
                                                    />
                                                    <div className="text-sm font-medium px-4 py-2 bg-muted rounded-full text-muted-foreground inline-block w-fit">
                                                        {formData.answers[q.id] ? `${formData.answers[q.id]} / 5 Bintang` : 'Belum dinilai'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <textarea
                                                    rows={4}
                                                    placeholder="Tulis saran atau masukan Anda di sini..."
                                                    className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                                    value={formData.text_answers[q.id] || ''}
                                                    onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- TOMBOL NAVIGASI BAWAH --- */}
                        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between max-w-3xl mx-auto">
                            <Button
                                type="button"
                                variant="ghost"
                                size="lg"
                                onClick={handleBack}
                                className={`text-muted-foreground hover:text-foreground text-base ${currentStep === 0 ? 'invisible' : ''}`}
                            >
                                ← Kembali
                            </Button>

                            {currentStep < totalSteps - 1 ? (
                                <Button
                                    type="button"
                                    size="lg"
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className="rounded-full px-10 py-6 text-base font-bold shadow-lg"
                                >
                                    Selanjutnya →
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={!canProceed() || isSubmitting}
                                    className="rounded-full px-10 py-6 text-base font-bold shadow-xl shadow-primary/30 flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            {/* Animasi Spinner */}
                                            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        "Kirim Penilaian ✓"
                                    )}
                                </Button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}