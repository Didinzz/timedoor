import React from 'react';
import { Button } from '@/Components/ui/button';
import { FiLayers, FiMessageSquare, FiList } from 'react-icons/fi';

export default function QuestionForm({ data, setData, onSubmit, processing, errors, isEdit, onCancel, indicators }) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col">
            <div className="p-6 space-y-6">

                {/* BARIS 1: Grid 2 Kolom (Indikator & Tipe Jawaban) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Field Indikator */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                            Indikator Pertanyaan <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <FiLayers className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <select
                                value={data.indicator_id}
                                onChange={e => setData('indicator_id', e.target.value)}
                                // 👇 LOGIKA BORDER MERAH DITAMBAHKAN DI SINI 👇
                                className={`h-10 w-full appearance-none rounded-md border bg-background pl-9 pr-10 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer ${errors.indicator_id
                                        ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                                        : 'border-input focus-visible:ring-ring'
                                    }`}
                                
                            >
                                <option value="" disabled>Pilih Indikator</option>
                                {indicators && indicators.map((ind) => (
                                    <option key={ind.id} value={ind.id}>{ind.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                            </div>
                        </div>
                        {errors.indicator_id && (
                            <p className="text-[0.8rem] font-medium text-destructive">{errors.indicator_id}</p>
                        )}
                    </div>

                    {/* Field Tipe Jawaban */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                            Tipe Jawaban
                        </label>
                        <div className="relative">
                            <FiList className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <select
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                // 👇 LOGIKA BORDER MERAH DITAMBAHKAN DI SINI 👇
                                className={`h-10 w-full appearance-none rounded-md border bg-background pl-9 pr-10 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer ${errors.type
                                        ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                                        : 'border-input focus-visible:ring-ring'
                                    }`}
                            >
                                <option value="rating">Skala Rating (1-5)</option>
                                <option value="text">Teks Bebas (Esai)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                            </div>
                        </div>
                        {errors.type && (
                            <p className="text-[0.8rem] font-medium text-destructive">{errors.type}</p>
                        )}
                    </div>
                </div>

                {/* BARIS 2: Pertanyaan (Textarea) */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-foreground">
                        Pertanyaan Survey <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <textarea
                            value={data.question_text}
                            onChange={e => setData('question_text', e.target.value)}
                            placeholder="Bagaimana kebersihan dan kenyamanan ruang kelas saat proses belajar mengajar?"
                            // 👇 LOGIKA BORDER MERAH DITAMBAHKAN DI SINI 👇
                            className={`min-h-25 w-full resize-none rounded-md border bg-background pl-9 pr-4 py-2.5 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 leading-relaxed ${errors.question_text
                                    ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                                    : 'border-input focus-visible:ring-ring'
                                }`}
                            
                        />
                    </div>
                    {errors.question_text && (
                        <p className="text-[0.8rem] font-medium text-destructive">{errors.question_text}</p>
                    )}
                </div>

                {/* BARIS 3: Toggle Status Aktif (Clean Card) */}
                <div className="flex flex-row items-center justify-between rounded-md border border-border p-4 shadow-sm">
                    <div className="flex flex-col space-y-0.5">
                        <label className="text-sm font-semibold text-foreground">
                            Status Aktif
                        </label>
                        <p className="text-[0.8rem] text-muted-foreground">
                            Tampilkan pertanyaan ini di form penilaian Landing Page.
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            disabled={processing}
                        />
                        <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>

            {/* FOOTER FORM (Minimalist) */}
            <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/40 px-6 py-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={processing} className="h-9">
                    Batal
                </Button>
                <Button type="submit" disabled={processing} className="h-9">
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}