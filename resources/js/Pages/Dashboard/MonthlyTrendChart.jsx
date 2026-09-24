import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function MonthlyTrendChart({ data }) {
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
            text: 'Tren Kepuasan Keseluruhan (CSAT)',
            textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor },
            left: '0'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: tooltipBg,
            borderColor: gridColor,
            textStyle: { color: textColor }
        },
        grid: { left: '0%', right: '4%', bottom: '0%', containLabel: true },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
            axisLabel: { color: axisColor },
            axisLine: { show: false },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 5,
            axisLabel: { color: axisColor },
            splitLine: { lineStyle: { color: gridColor, type: 'dashed' } }
        },
        series: [
            {
                name: 'Rata-rata Skor',
                type: 'line',
                data: data || [],
                smooth: true,
                showSymbol: false,
                lineStyle: { color: '#10AF13', width: 4 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(16, 175, 19, 0.3)' },
                            { offset: 1, color: 'rgba(16, 175, 19, 0.0)' }
                        ]
                    }
                }
            }
        ]
    };

    return (
        // PERBAIKAN: Menggunakan bg-card & border-border
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm transition-all hover:shadow-md h-full">
            <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
        </div>
    );
}