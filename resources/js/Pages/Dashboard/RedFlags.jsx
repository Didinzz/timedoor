import React from 'react';
import { FiAlertCircle, FiStar, FiUser, FiChevronRight, FiClock } from 'react-icons/fi';

export default function RedFlags() {
    const alerts = [
        { id: 1, parent: 'Ibu Dina', teacher: 'Pak Budi', rating: 2, issue: 'AC di ruang kelas 2 tidak dingin, anak saya kepanasan.', time: '2h ago' },
        { id: 2, parent: 'Bapak Joko', teacher: 'Admin', rating: 1, issue: 'Admin sangat lambat merespon pesan konfirmasi pembayaran.', time: '1d ago' },
        { id: 3, parent: 'Ibu Sarah', teacher: 'Bu Siti', rating: 3, issue: 'Materi hari ini terlalu cepat dijelaskan, anak kurang paham.', time: '2d ago' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 dark:bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400">
                        <FiAlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Needs Attention</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Recent low ratings</p>
                    </div>
                </div>
                <span className="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 text-xs font-bold px-3 py-1 rounded-full">
                    {alerts.length} Issues
                </span>
            </div>

            {/* Alert Cards */}
            <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto pr-1 custom-scrollbar">
                {alerts.map((alert) => (
                    <div key={alert.id} className="relative p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden">

                        {/* Status Accent Line (Merah untuk rating 1-2, Oranye untuk rating 3) */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.rating <= 2 ? 'bg-rose-500' : 'bg-amber-400'}`}></div>

                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <FiUser className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{alert.parent}</span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 ml-1">
                                    <FiClock className="w-3 h-3" /> {alert.time}
                                </span>
                            </div>

                            {/* React Icons Stars */}
                            <div className="flex gap-0.5 bg-slate-50 dark:bg-slate-900/50 px-2 py-1.5 rounded-md border border-slate-100 dark:border-slate-700">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-3 h-3 ${i < alert.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                            "{alert.issue}"
                        </p>

                        {/* Footer Card */}
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-auto">
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                    <FiUser className="w-3 h-3" /> {alert.teacher}
                                </span>
                            </div>
                            <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                                Resolve <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}