import React from 'react';
import { DataTable } from '@/Components/ui/data-table';
import { FiRefreshCcw, FiTrash2, FiFolder } from 'react-icons/fi';

export default function TrashedIndicatorsView({ trashedIndicators, onRestore, onForceDelete }) {
    const trashColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Kelompok Indikator (Terhapus)',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-bold text-muted-foreground line-through">
                    <FiFolder className="w-4 h-4" />
                    {row.getValue('name')}
                </div>
            ),
        },
        {
            accessorKey: 'questions_count',
            header: 'Total Pertanyaan',
            cell: ({ row }) => (
                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold tracking-wide">
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
                        <button
                            onClick={() => onRestore(indicator.id)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer"
                            title="Pulihkan Data"
                        >
                            <FiRefreshCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onForceDelete(indicator.id)}
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
            <DataTable
                columns={trashColumns}
                data={trashedIndicators}
            />
        </div>
    );
}