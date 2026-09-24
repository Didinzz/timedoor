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

import TeacherForm from './TeacherForm';
import TrashedTeachersView from './TrashedTeachersView';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { FaChalkboardTeacher } from 'react-icons/fa';

export default function Index({ teachers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmState, setConfirmState] = useState({ isOpen: false, id: null, type: 'soft' });
    const [viewMode, setViewMode] = useState('active');

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: null,
        name: '',
        is_active: true,
    });

    const activeTeachers = teachers.filter(t => !t.deleted_at);
    const trashedTeachers = teachers.filter(t => t.deleted_at);

    const openCreateModal = () => {
        setIsEdit(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (teacher) => {
        setIsEdit(true);
        setData({
            id: teacher.id,
            name: teacher.name,
            is_active: !!teacher.is_active,
        });
        setIsModalOpen(true);
    };

    const promptDelete = (id) => setConfirmState({ isOpen: true, id, type: 'soft' });
    const promptForceDelete = (id) => setConfirmState({ isOpen: true, id, type: 'force' });

    const handleRestore = (id) => {
        router.post(route('admin.teachers.restore', id));
    };

    const executeDelete = () => {
        if (confirmState.type === 'soft') {
            destroy(route('admin.teachers.destroy', confirmState.id), {
                onSuccess: () => setConfirmState({ isOpen: false, id: null, type: 'soft' }),
            });
        } else {
            destroy(route('admin.teachers.forceDelete', confirmState.id), {
                onSuccess: () => {
                    setConfirmState({ isOpen: false, id: null, type: 'soft' });
                    if (trashedTeachers.length === 1) setViewMode('active');
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.teachers.update', data.id), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        } else {
            post(route('admin.teachers.store'), {
                onSuccess: () => { reset(); setIsModalOpen(false); },
            });
        }
    };

    const activeColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Teacher',
            cell: ({ row }) => <div className="font-bold text-foreground flex items-center gap-2"><FaChalkboardTeacher className="w-4 h-4 text-muted-foreground" /> {row.getValue('name')}</div>,
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
                const teacher = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(teacher)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer" title="Edit">
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => promptDelete(teacher.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Hapus">
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <DashboardLayout title="Daftar Teacher" headerTitle="Manajemen Teacher">

            {/* HEADER & TOMBOL-TOMBOL UTAMA */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">
                        {viewMode === 'active' ? 'Daftar Teacher Aktif' : 'Tempat Sampah Teacher'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {viewMode === 'active'
                            ? 'Kelola daftar teacher yang dapat dipilih di form penilaian.'
                            : 'Daftar teacher yang telah dihapus. Pulihkan atau hancurkan secara permanen.'}
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
                                {trashedTeachers.length > 0 && (
                                    <span className="bg-muted-foreground/10 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                                        {trashedTeachers.length}
                                    </span>
                                )}
                            </Button>
                            <Button onClick={openCreateModal} className="flex items-center gap-2 shadow-sm rounded-md cursor-pointer h-10">
                                <FiPlus className="w-4 h-4" /> Tambah Teacher
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
                    <DataTable
                        columns={activeColumns}
                        data={activeTeachers}
                    />
                </div>
            ) : (
                <TrashedTeachersView
                    trashedTeachers={trashedTeachers}
                    onRestore={handleRestore}
                    onForceDelete={promptForceDelete}
                />
            )}

            {/* MODAL FORM TAMBAH/EDIT TEACHER */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent preventClose={processing} className="sm:max-w-xl p-0 gap-0 overflow-hidden border-border/60">
                    <div className="px-7 pt-7 pb-5 border-b border-border/50">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                {isEdit ? 'Edit Data Teacher' : 'Tambah Teacher Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-base mt-1.5">
                                Masukkan nama lengkap beserta gelar panggilan (Mr./Miss).
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <TeacherForm
                        data={data}
                        setData={setData}
                        onSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
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
                        ? "Teacher ini akan disembunyikan dari tabel utama dan form survei. Anda bisa memulihkannya nanti melalui mode Tempat Sampah."
                        : "PERINGATAN KRITIS: Tindakan ini akan menghancurkan data dari database selamanya."
                }
                confirmText={confirmState.type === 'soft' ? "Ya, Hapus" : "Hancurkan Permanen"}
                cancelText="Batal"
                isDestructive={true}
                isLoading={processing}
            />

        </DashboardLayout>
    );
}