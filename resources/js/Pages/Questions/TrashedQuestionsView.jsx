import React from 'react';
import { DataTable } from '@/Components/ui/data-table';
import { FiRefreshCcw, FiTrash2 } from 'react-icons/fi';

export default function TrashedQuestionsView({ trashedQuestions, onRestore, onForceDelete }) {
    const trashColumns = [
        {
            accessorKey: 'indicator.name',
            header: 'Indikator Penilaian',
            cell: ({ row }) => <div className="font-bold text-muted-foreground">{row.original.indicator?.name || '-'}</div>,
        },
        {
            accessorKey: 'question_text',
            header: 'Pertanyaan Terhapus',
            cell: ({ row }) => <div className="font-medium text-muted-foreground">{row.getValue('question_text')}</div>,
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const question = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onRestore(question.id)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer"
                            title="Pulihkan Data"
                        >
                            <FiRefreshCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onForceDelete(question.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors cursor-pointer"
                            title="Hapus Permanen"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Langsung panggil DataTable, biarkan dia mengurus tampilan kosongnya secara bawaan (native) */}
            <DataTable
                columns={trashColumns}
                data={trashedQuestions}
            />
        </div>
    );
}