import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { DataTable } from '@/Components/ui/data-table';
import { FiEye } from 'react-icons/fi';
// 1. Panggil komponen Modal yang baru kita buat
import ResponseDetailModal from './ResponseDetailModal';

export default function Index({ responses }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState(null);

    const availableTeachers = useMemo(() => {
        const teachersMap = new Map();
        responses.forEach(r => {
            if (r.teacher) teachersMap.set(r.teacher.id, r.teacher.name);
        });
        return Array.from(teachersMap.entries()).map(([id, name]) => ({ label: name, value: name }));
    }, [responses]);

    const availableYears = useMemo(() => {
        const years = new Set(responses.map(r => new Date(r.created_at).getFullYear().toString()));
        return Array.from(years).sort((a, b) => b - a).map(y => ({ label: y, value: y }));
    }, [responses]);

    const customFilterOptions = [
        { columnId: "teacher_name", title: "Teacher", options: availableTeachers },
        { columnId: "created_at", title: "Tahun", options: availableYears }
    ];

    const columns = [
        {
            accessorKey: 'created_at',
            id: 'created_at',
            header: 'Tanggal Masuk',
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'));
                return <div className="text-sm font-medium text-muted-foreground">
                    {date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>;
            },
            filterFn: (row, id, filterValues) => {
                if (!filterValues?.length) return true;
                const rowYear = new Date(row.getValue(id)).getFullYear().toString();
                return filterValues.includes(rowYear);
            },
        },
        {
            accessorKey: 'respondent_name',
            header: 'Orang Tua / Wali',
            cell: ({ row }) => <div className="font-bold text-foreground">{row.getValue('respondent_name')}</div>,
        },
        {
            accessorKey: 'child_name',
            header: 'Nama Anak Siswa',
            cell: ({ row }) => <div className="font-medium text-muted-foreground">{row.getValue('child_name')}</div>,
        },
        {
            accessorKey: 'teacher.name',
            id: 'teacher_name',
            header: 'Teacher Dinilai',
            cell: ({ row }) => <div className="font-semibold text-primary">{row.getValue('teacher_name') || '-'}</div>,
            filterFn: (row, id, filterValues) => {
                if (!filterValues?.length) return true;
                return filterValues.includes(row.getValue(id));
            }
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedResponse(row.original);
                        setIsDialogOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-200 rounded-md transition-colors cursor-pointer"
                >
                    <FiEye className="w-4 h-4" />
                </button>
                // <button onClick={() => openEditModal(teacher)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer" title="Edit">
                //     <FiEdit2 className="w-4 h-4" />
                // </button>

            ),
        },
    ];

    return (
        <DashboardLayout title="Hasil Responden" headerTitle="Data Survei Masuk">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Daftar Responden Masuk</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Berikut adalah semua data penilaian dan saran dari orang tua/wali murid.
                    </p>
                </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <DataTable
                    columns={columns}
                    data={responses}
                    filterOptions={customFilterOptions}
                />
            </div>

            {/* 2. Sisipkan Komponen Modal di sini */}
            <ResponseDetailModal
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                response={selectedResponse}
            />

        </DashboardLayout>
    );
}