import React from 'react';
import {
    FiUsers,
    FiStar,
    FiTrendingUp,
    FiAward,
    FiActivity,
    FiCheckCircle
} from 'react-icons/fi';

export default function KpiCards({ data }) {
    // Beri nilai default jika datanya kosong
    const total = data?.totalRespondents || 0;
    const avgScore = data?.averageScore || 0;
    const sentiment = data?.positiveSentiment || 0;
    const topIndName = data?.topIndicator?.name || 'Belum Ada';
    const topIndScore = data?.topIndicator?.score || 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* CARD 1: TOTAL RESPONDEN */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Responden</p>
                        <h3 className="text-3xl font-bold text-foreground">{total}</h3>
                    </div>
                    {/* Ikon seragam dengan warna Primary */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FiUsers className="w-5 h-5 text-primary" />
                    </div>
                </div>
                {/* Teks bawah bersih tanpa kotak warna-warni */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <FiActivity className="w-3.5 h-3.5" />
                    <span>Data Real-Time</span>
                </div>
            </div>

            {/* CARD 2: RATA-RATA KEPUASAN */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Skor Kepuasan</p>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-3xl font-bold text-foreground">{avgScore}</h3>
                            <span className="text-sm font-bold text-muted-foreground">/ 5.0</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FiStar className="w-5 h-5 text-primary fill-primary/20" />
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    <span>Kalkulasi Otomatis</span>
                </div>
            </div>

            {/* CARD 3: SENTIMEN POSITIF (NPS) */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Sentimen Positif</p>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-3xl font-bold text-foreground">{sentiment}</h3>
                            <span className="text-xl font-bold text-muted-foreground">%</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FiTrendingUp className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <FiStar className="w-3.5 h-3.5 fill-muted-foreground/20" />
                    <span>Bintang 4 & 5</span>
                </div>
            </div>

            {/* CARD 4: INDIKATOR TERKUAT */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div className="overflow-hidden pr-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Indikator Terkuat</p>
                        <h3 className="text-xl font-bold text-foreground truncate mt-1">
                            {topIndName}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FiAward className="w-5 h-5 text-primary" />
                    </div>
                </div>
                {/* Di sini text-primary digunakan karena menonjolkan data aktual (bukan sekadar tulisan statis) */}
                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                    <FiStar className="w-3.5 h-3.5 fill-primary/20" />
                    <span>Skor {topIndScore} / 5.0</span>
                </div>
            </div>

        </div>
    );
}