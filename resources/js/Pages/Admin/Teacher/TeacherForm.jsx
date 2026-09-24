import React from 'react';
import { Button } from '@/Components/ui/button';
import { FiUser } from 'react-icons/fi';

export default function TeacherForm({ data, setData, onSubmit, processing, errors, onCancel }) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col">
            <div className="p-6 space-y-6">

                {/* Field Nama Teacher */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                        Nama Teacher <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                        <FiUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Contoh: Mr. Budi Santoso"
                            className={`h-10 w-full appearance-none rounded-md border bg-background pl-9 pr-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 ${errors.name
                                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                                : 'border-input focus-visible:ring-ring'
                                }`}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>
                    )}
                </div>

                {/* Toggle Status Aktif */}
                <div className="flex flex-row items-center justify-between rounded-md border border-border p-4 shadow-sm">
                    <div className="flex flex-col space-y-0.5">
                        <label className="text-sm font-semibold text-foreground">Status Aktif</label>
                        <p className="text-[0.8rem] text-muted-foreground">Tampilkan teacher ini di form penilaian Landing Page.</p>
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

            {/* FOOTER FORM */}
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