import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function RatingDistributionChart({ data }) {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkDark();
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const gridColor = isDark ? '#334155' : '#f1f5f9';
    const tooltipBg = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)';

    const option = {
        title: {
            text: 'Distribusi Total Rating',
            textStyle: { fontSize: 16, fontWeight: '600', color: textColor },
            left: '0'
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: tooltipBg,
            borderColor: gridColor,
            textStyle: { color: textColor },
            formatter: '{b}: {c} Review ({d}%)'
        },
        legend: {
            bottom: '0%',
            left: 'center',
            textStyle: { color: textColor },
            icon: 'circle'
        },
        series: [
            {
                name: 'Jumlah Rating',
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10, // KUNCI UTAMA: Membuat ujung irisan jadi melengkung elegan!
                    borderColor: isDark ? '#0f172a' : '#ffffff', // Celah pemisah mengikuti Dark/Light mode
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 24, // Teks yang muncul di tengah lubang saat kursor diarahkan
                        fontWeight: 'bold',
                        color: textColor,
                        formatter: '{b}'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data || []
            }
        ]
    };

    return (
        <div className="bg-card dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full hover:shadow-md transition-shadow">
            <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
        </div>
    );
}