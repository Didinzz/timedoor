import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function TopTeachersChart({ data }) {
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
    const gridColor = isDark ? '#334155' : '#f1f5f9';
    const tooltipBg = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)';

    const option = {
        title: {
            text: 'Top Teachers by Rating',
            textStyle: { fontSize: 16, fontWeight: '600', color: textColor },
            left: '0'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: tooltipBg,
            borderColor: gridColor,
            textStyle: { color: textColor }
        },
        grid: { left: '0%', right: '0%', bottom: '5%', containLabel: true },
        xAxis: {
            type: 'category',
            data: data?.categories || [],
            axisLabel: { color: axisColor, fontWeight: '500', interval: 0 },
            axisLine: { lineStyle: { color: gridColor } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0, 
            max: 5, // Maksimal nilai rating adalah 5
            splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
            axisLabel: { color: axisColor }
        },
        series: [
            {
                name: 'Skor Rata-rata',
                type: 'bar', // Berubah jadi vertikal
                data: data?.series || [],
                barWidth: '36px',
                itemStyle: {
                    color: '#10AF13', // Warna Primary Timedoor SOLID, tanpa gradien
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    color: textColor,
                    fontWeight: 'bold'
                }
            }
        ]
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full hover:shadow-md transition-shadow">
            <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
        </div>
    );
}