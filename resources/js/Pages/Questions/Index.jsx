import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Button } from '@/Components/ui/button';
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { DataTable } from '@/Components/ui/data-table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// 👇 KOMPONEN YANG DIPISAH-PISAH AGAR RAPI 👇
import QuestionForm from './QuestionForm';
import IndicatorTabs from './IndicatorTabs';
import TrashedQuestionsView from './TrashedQuestionsView';
import ConfirmDialog from '@/Components/ConfirmDialog';

export default function Index({ questions, indicators }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [confirmState, setConfirmState] = useState({ isOpen: false, id: null, type: 'soft' });
    const [viewMode, setViewMode] = useState('active');

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: null,
        indicator_id: '',
        question_text: '',
        type: 'rating',
        is_active: true,
    });

    const activeQuestions = questions.filter(q => !q.deleted_at);
    const trashedQuestions = questions.filter(q => q.deleted_at);

    const filteredActiveQuestions = activeTab === 'all'
        ? activeQuestions
        : activeQuestions.filter(q => q.indicator_id === activeTab);

    const openCreateModal = () => {
        setIsEdit(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (question) => {
        setIsEdit(true);
        setData({
            id: question.id,
            indicator_id: question.indicator_id || '',
            question_text: question.question_text,
            type: question.type,
            is_active: !!question.is_active,
        });
        setIsModalOpen(true);
    };

    const promptDelete = (id) => setConfirmState({ isOpen: true, id, type: 'soft' });
    const promptForceDelete = (id) => setConfirmState({ isOpen: true, id, type: 'force' });

    const handleRestore = (id) => {
        router.post(route('admin.questions.restore', id));
    };

    const executeDelete = () => {
        if (confirmState.type === 'soft') {
            destroy(route('admin.questions.destroy', confirmState.id), {
                onSuccess: () => setConfirmState({ isOpen: false, id: null, type: 'soft' }),
            });
        } else {
            destroy(route('admin.questions.force-delete', confirmState.id), {
                onSuccess: () => {
                    setConfirmState({ isOpen: false, id: null, type: 'soft' });
                    if (trashedQuestions.length === 1) setViewMode('active');
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.questions.update', data.id), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        } else {
            post(route('admin.questions.store'), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        }
    };

    const activeColumns = [
        {
            accessorKey: 'indicator.name',
            header: 'Indikator Penilaian',
            cell: ({ row }) => <div className="font-bold text-primary">{row.original.indicator?.name || '-'}</div>,
        },
        {
            accessorKey: 'question_text',
            header: 'Pertanyaan Survey',
            cell: ({ row }) => <div className="font-medium text-foreground">{row.getValue('question_text')}</div>,
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => {
                const isActive = row.getValue('is_active');
                return (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-500'}`}>
                        {isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                );
            }
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const question = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(question)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer" title="Edit">
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => promptDelete(question.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Hapus">
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <DashboardLayout title="Daftar Kriteria" headerTitle="Manajemen Kriteria Survey">

            {/* HEADER & TOMBOL-TOMBOL UTAMA */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">
                        {viewMode === 'active' ? 'Daftar Pertanyaan Survey' : 'Tempat Sampah'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {viewMode === 'active'
                            ? 'Kelola kriteria dan pertanyaan yang akan tampil di form responden.'
                            : 'Daftar pertanyaan yang telah dihapus. Pulihkan atau hancurkan secara permanen.'}
                    </p>
                </div>

                <div className="flex gap-3">
                    {viewMode === 'active' ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setViewMode('trash')}
                                className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10 border-border bg-background hover:bg-accent font-semibold"
                            >
                                <FiTrash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Tempat Sampah</span>
                                {trashedQuestions.length > 0 && (
                                    <span className="bg-muted-foreground/10 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                                        {trashedQuestions.length}
                                    </span>
                                )}
                            </Button>
                            <Button onClick={openCreateModal} className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10">
                                <FiPlus className="w-4 h-4" /> Tambah Pertanyaan
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => setViewMode('active')}
                            className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10 border-border bg-background hover:bg-accent font-semibold "
                        >
                            <FiArrowLeft className="w-4 h-4" /> Kembali ke Daftar Utama
                        </Button>
                    )}
                </div>
            </div>

            {/* KONTEN TABEL BERDASARKAN VIEW MODE */}
            {viewMode === 'active' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <IndicatorTabs
                        indicators={indicators}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <DataTable
                        columns={activeColumns}
                        data={filteredActiveQuestions}
                    />
                </div>
            ) : (
                // 👇 PANGGIL KOMPONEN YANG SUDAH KITA PISAH TADI 👇
                <TrashedQuestionsView
                    trashedQuestions={trashedQuestions}
                    onRestore={handleRestore}
                    onForceDelete={promptForceDelete}
                />
            )}

            {/* MODAL FORM TAMBAH/EDIT PERTANYAAN */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent preventClose={processing} className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-border/60">
                    <div className="px-7 pt-7 pb-5 border-b border-border/50">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                {isEdit ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-base mt-1.5">
                                Pilih indikator dan masukkan kalimat pertanyaan yang mudah dipahami.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <QuestionForm
                        data={data}
                        setData={setData}
                        onSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                        isEdit={isEdit}
                        indicators={indicators}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* CONFIRM DIALOG DINAMIS */}
            <ConfirmDialog
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ isOpen: false, id: null, type: 'soft' })}
                onConfirm={executeDelete}
                title={confirmState.type === 'soft' ? "Masukkan ke Tempat Sampah?" : "Hancurkan Permanen?"}
                description={
                    confirmState.type === 'soft'
                        ? "Pertanyaan ini akan disembunyikan dari tabel utama. Anda bisa memulihkannya nanti melalui mode Tempat Sampah."
                        : "PERINGATAN KRITIS: Tindakan ini akan menghancurkan data dari database selamanya. Laporan responden terkait pertanyaan ini juga akan ikut terhapus."
                }
                confirmText={confirmState.type === 'soft' ? "Ya, Hapus" : "Hancurkan Permanen"}
                cancelText="Batal"
                isDestructive={true}
                isLoading={processing}
            />

        </DashboardLayout>
    );
}