import React from 'react';
import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import WelcomeBanner from './Dashboard/WelcomeBanner'; // 👈 Memanggil komponen yang dipisah tadi
import KpiCards from './Dashboard/KpiCards';
import MonthlyTrendChart from './Dashboard/MonthlyTrendChart';
import IndicatorChart from './Dashboard/IndicatorChart';
import TopTeachersLeaderboard from './Dashboard/TopTeachersLeaderBoard';
import RedFlags from './Dashboard/RedFlags';
import RatingDistributionChart from './Dashboard/RatingDistributionChart';
import EvaluationTable from './Dashboard/EvaluationTable';

export default function Index({ currentYear, kpiData, chartsData, evaluationData }) {

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        router.get(route('admin.dashboard', { year: selectedYear }, {
            preserveState: true,
            preventScroll: true

        }));
    }

    const currentYearInt = new Date().getFullYear();
    const years = Array.from({ length: currentYearInt - 2022 }, (_, i) => currentYearInt - i);
    return (
        <DashboardLayout title="Analitik" headerTitle="Dashboard Utama">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">

                <WelcomeBanner currentYear={currentYear} handleYearChange={handleYearChange} years={years} />
                {/* 2. Oper datanya ke KpiCards */}
                <KpiCards data={kpiData} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <MonthlyTrendChart data={chartsData.monthlyTrend} />
                    <IndicatorChart data={chartsData.indicatorPerformance} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <TopTeachersLeaderboard data={chartsData.topTeachers} />
                    <RatingDistributionChart data={chartsData.ratingDistribution} />
                </div>

                <EvaluationTable responses={evaluationData} />

            </div>
        </DashboardLayout>
    );
}