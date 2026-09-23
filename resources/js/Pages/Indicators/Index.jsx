import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Button } from '@/Components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit2, FiTrash2, FiPlus, FiFolder, FiArrowLeft } from 'react-icons/fi';
import { DataTable } from '@/Components/ui/data-table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import TrashedIndicatorsView from './TrashedIndicatorsView';
import ConfirmDialog from '@/Components/ConfirmDialog';

export default function Index({ indicators }) {
    // STATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [viewMode, setViewMode] = useState('active'); // 'active' | 'trash'
    const [confirmState, setConfirmState] = useState({ isOpen: false, id: null, type: 'soft' });

    const { data, setData, post, put, delete: destroy, reset, processing, errors, clearErrors } = useForm({
        id: null,
        name: '',
    });

    // PISAHKAN DATA (Aktif & Sampah)
    const activeIndicators = indicators.filter(ind => !ind.deleted_at);
    const trashedIndicators = indicators.filter(ind => ind.deleted_at);

    // HANDLER MODAL (TAMBAH & EDIT)
    const openCreateModal = () => {
        setIsEdit(false);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (indicator) => {
        setIsEdit(true);
        setData({
            id: indicator.id,
            name: indicator.name,
        });
        clearErrors();
        setIsModalOpen(true);
    };

    // LOGIKA HAPUS & RESTORE
    const promptDelete = (id) => setConfirmState({ isOpen: true, id, type: 'soft' });
    const promptForceDelete = (id) => setConfirmState({ isOpen: true, id, type: 'force' });

    const handleRestore = (id) => {
        // Asumsi rute Anda bernama 'admin.indicators.restore'
        router.post(route('admin.indicators.restore', id));
    };

    const executeDelete = () => {
        if (confirmState.type === 'soft') {
            destroy(route('admin.indicators.destroy', confirmState.id), {
                onSuccess: () => setConfirmState({ isOpen: false, id: null, type: 'soft' }),
            });
        } else {
            destroy(route('admin.indicators.forceDelete', confirmState.id), {
                onSuccess: () => {
                    setConfirmState({ isOpen: false, id: null, type: 'soft' });
                    // Kembali ke view utama jika tong sampah kosong
                    if (trashedIndicators.length === 1) setViewMode('active');
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.indicators.update', data.id), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        } else {
            post(route('admin.indicators.store'), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        }
    };

    // KOLOM TABEL UTAMA (AKTIF)
    const activeColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Kelompok Indikator',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-primary">
                    <FiFolder className="text-muted-foreground w-4 h-4" />
                    {row.getValue('name')}
                </div>
            ),
        },
        {
            accessorKey: 'questions_count',
            header: 'Total Pertanyaan',
            cell: ({ row }) => (
                <span className="px-3 py-1 rounded-full text-foreground text-xs font-bold tracking-wide">
                    {row.getValue('questions_count')} Pertanyaan
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const indicator = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(indicator)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer" title="Edit">
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => promptDelete(indicator.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors cursor-pointer" title="Hapus">
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <DashboardLayout title="Manajemen Indikator" headerTitle="Kategori Penilaian">

            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">
                        {viewMode === 'active' ? 'Daftar Kategori Indikator' : 'Tempat Sampah Indikator'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {viewMode === 'active'
                            ? 'Kelola kategori untuk mengelompokkan pertanyaan kuesioner Anda.'
                            : 'Daftar kategori yang telah dihapus beserta total pertanyaannya.'}
                    </p>
                </div>

                <div className="flex gap-3">
                    {viewMode === 'active' ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setViewMode('trash')}
                                className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10 border-border bg-background hover:bg-muted font-semibold"
                            >
                                <FiTrash2 className="w-4 h-4 text-muted-foreground" />
                                <span className="hidden sm:inline">Tempat Sampah</span>
                                {/* Notifikasi elegan bergaya GitHub */}
                                {trashedIndicators.length > 0 && (
                                    <span className="bg-muted-foreground/10 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                                        {trashedIndicators.length}
                                    </span>
                                )}
                            </Button>
                            <Button onClick={openCreateModal} className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10">
                                <FiPlus className="w-4 h-4" /> Tambah Indikator
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => setViewMode('active')}
                            className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10 border-border bg-background hover:bg-muted font-semibold"
                        >
                            <FiArrowLeft className="w-4 h-4" /> Kembali ke Daftar Utama
                        </Button>
                    )}
                </div>
            </div>

            {/* --- KONTEN TABEL --- */}
            {viewMode === 'active' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <DataTable
                        columns={activeColumns}
                        data={activeIndicators}
                    />
                </div>
            ) : (
                <TrashedIndicatorsView
                    trashedIndicators={trashedIndicators}
                    onRestore={handleRestore}
                    onForceDelete={promptForceDelete}
                />
            )}

            {/* --- MODAL TAMBAH/EDIT INDIKATOR --- */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent preventClose={processing} className="sm:max-w-md p-6 border-border/60 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">
                            {isEdit ? 'Edit Indikator' : 'Tambah Indikator Baru'}
                        </DialogTitle>
                        <DialogDescription className="text-sm mt-1.5 text-muted-foreground">
                            Berikan nama kategori yang jelas untuk mengelompokkan pertanyaan Anda.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="indicatorName" className="font-semibold text-foreground">Nama Indikator</Label>
                            <Input
                                id="indicatorName"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Contoh: Kualitas Materi"
                                className={`h-11 rounded-md shadow-sm transition-colors ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-primary'}`}
                                required
                                autoFocus
                            />
                            {errors.name && <p className="text-[0.8rem] text-destructive font-medium">{errors.name}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={processing} className="h-10 px-5">
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="h-10 px-6 font-bold shadow-md">
                                {processing ? 'Menyimpan...' : 'Simpan Indikator'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* --- CONFIRM DIALOG DINAMIS --- */}
            <ConfirmDialog
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ isOpen: false, id: null, type: 'soft' })}
                onConfirm={executeDelete}
                title={confirmState.type === 'soft' ? "Masukkan ke Tempat Sampah?" : "Hancurkan Permanen?"}
                description={
                    confirmState.type === 'soft'
                        ? "Indikator ini akan disembunyikan. Anda masih bisa memulihkannya kembali lewat Tempat Sampah."
                        : "PERINGATAN KRITIS: Menghapus indikator ini akan MENGHAPUS SEMUA pertanyaan di dalamnya secara permanen. Tindakan ini tidak dapat dibatalkan."
                }
                confirmText={confirmState.type === 'soft' ? "Ya, Hapus" : "Hancurkan Permanen"}
                cancelText="Batal"
                isDestructive={true}
                isLoading={processing}
            />

        </DashboardLayout>
    );
}