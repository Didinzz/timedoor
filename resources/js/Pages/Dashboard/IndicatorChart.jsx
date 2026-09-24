import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function IndicatorChart({ data }) {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkDark();

        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const axisColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';

    const option = {
        title: {
            text: 'Analisis per Indikator',
            textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor },
            left: '0'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: tooltipBg,
            borderColor: gridColor,
            textStyle: { color: textColor }
        },
        grid: { left: '0%', right: '10%', bottom: '0%', containLabel: true },
        xAxis: {
            type: 'value',
            max: 5,
            splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
            axisLabel: { show: false }
        },
        yAxis: {
            type: 'category',
            data: data?.categories || [],
            axisLabel: { color: axisColor, fontWeight: '500' },
            axisLine: { show: false },
            axisTick: { show: false }
        },
        series: [
            {
                name: 'Skor Indikator',
                type: 'bar',
                data: data?.series || [],
                barWidth: '32px',
                itemStyle: {
                    color: '#10AF13', // Diubah ke warna Primary Timedoor
                    borderRadius: 0   // Dibuat kotak flat agar tegas (tidak slop)
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    color: textColor,
                    fontWeight: 'bold'
                }
            }
        ]
    };

    return (
        // PERBAIKAN: Menggunakan bg-card & border-border agar 100% konsisten warnanya dengan komponen lain
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm transition-all hover:shadow-md h-full">
            <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
        </div>
    );
}