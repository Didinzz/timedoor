import React, { useState, useMemo } from 'react';
import { DataTable } from '@/Components/ui/data-table';
import { FiEye, FiAlertCircle, FiStar } from 'react-icons/fi';
import ResponseDetailModal from '../Admin/Response/ResponseDetailModal';

export default function EvaluationTable({ responses }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState(null);

    const availableTeachers = useMemo(() => {
        const teachersMap = new Map();
        responses.forEach(r => {
            if (r.teacher) teachersMap.set(r.teacher.id, r.teacher.name);
        });
        return Array.from(teachersMap.entries()).map(([id, name]) => ({ label: name, value: name }));
    }, [responses]);

    // Opsi Filter Tambahan untuk Skor
    const scoreFilters = [
        { label: 'Sangat Kritis (< 3.0)', value: '<3' },
        { label: 'Perlu Evaluasi (3.0 - 3.9)', value: '3-4' },
    ];

    const customFilterOptions = [
        { columnId: "teacher_name", title: "Teacher", options: availableTeachers },
        { columnId: "average_rating", title: "Tingkat Kepuasan", options: scoreFilters }
    ];

    const columns = [
        {
            accessorKey: 'created_at',
            header: 'Tanggal Masuk',
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'));
                return <div className="text-sm font-medium text-muted-foreground">
                    {date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>;
            }
        },
        {
            accessorKey: 'respondent_name',
            header: 'Orang Tua / Wali',
            cell: ({ row }) => <div className="font-bold text-foreground">{row.getValue('respondent_name')}</div>,
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
        // TAMBAHAN: Kolom Rata-rata Skor
        {
            accessorKey: 'average_rating',
            id: 'average_rating',
            header: 'Rata-rata Skor',
            cell: ({ row }) => {
                const score = parseFloat(row.getValue('average_rating'));
                return (
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                        <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>{score.toFixed(1)}</span>
                    </div>
                );
            },
            // Logika Filter Rentang Skor
            filterFn: (row, id, filterValues) => {
                if (!filterValues?.length) return true;
                const score = parseFloat(row.getValue(id));
                return filterValues.some(val => {
                    if (val === '<3') return score < 3;
                    if (val === '3-4') return score >= 3 && score < 4;
                    return true;
                });
            }
        },
        {
            id: 'actions',
            header: 'Detail',
            cell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedResponse(row.original);
                        setIsDialogOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 rounded-md transition-colors cursor-pointer"
                >
                    <FiEye className="w-4 h-4" /> Lihat
                </button>
            ),
        },
    ];

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8 mt-2">
            <div className="mb-6 flex items-start gap-3">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Evaluasi Khusus (Rating Di Bawah 4)</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Daftar responden yang memberikan setidaknya satu nilai Bintang 1, 2, atau 3 pada tahun ini. Membutuhkan evaluasi lebih lanjut.
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={responses}
                filterOptions={customFilterOptions}
            />

            <ResponseDetailModal
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                response={selectedResponse}
            />
        </div>
    );
}