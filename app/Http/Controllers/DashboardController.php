<?php

namespace App\Http\Controllers;

use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', date('Y'));

        $evaluationData = SurveyResponse::with(['teacher', 'answers.question.indicator'])
            // PERUBAHAN: Meminta Laravel menghitung rata-rata skor per responden
            ->withAvg([
                'answers as average_rating' => function ($query) {
                    $query->whereNotNull('answer_rating');
                }
            ], 'answer_rating')
            ->whereYear('created_at', $year)
            ->whereHas('answers', function ($query) {
                $query->where('answer_rating', '<', 4);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'currentYear' => $year,
            'kpiData' => $this->getKpiData($year),
            'evaluationData' => $evaluationData,
            'chartsData' => [
                'monthlyTrend' => $this->getMonthlyTrendData($year),
                'indicatorPerformance' => $this->getIndicatorPerformanceData($year),
                'topTeachers' => $this->getTopTeachersData($year),
                'ratingDistribution' => $this->getRatingDistributionData($year),
            ]
        ]);
    }

    // ==========================================
    // FUNGSI-FUNGSI PENGAMBILAN DATA (PRIVATE)
    // ==========================================

    protected function getKpiData($year)
    {
        // Base Query untuk filter tahun agar efisien
        $baseQuery = DB::table('survey_answers')
            ->join('survey_responses', 'survey_answers.survey_response_id', '=', 'survey_responses.id')
            ->whereYear('survey_responses.created_at', $year);

        $totalRespondents = DB::table('survey_responses')->whereYear('created_at', $year)->count();

        $averageScore = (clone $baseQuery)
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->where('questions.type', 'rating')
            ->avg('survey_answers.answer_rating');

        $totalRatings = (clone $baseQuery)
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->where('questions.type', 'rating')
            ->count();

        $positiveRatings = (clone $baseQuery)
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->where('questions.type', 'rating')
            ->whereIn('survey_answers.answer_rating', [4, 5])
            ->count();

        $positiveSentiment = $totalRatings > 0
            ? round(($positiveRatings / $totalRatings) * 100)
            : 0;

        $topIndicator = (clone $baseQuery)
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->join('indicators', 'questions.indicator_id', '=', 'indicators.id')
            ->where('questions.type', 'rating')
            ->select('indicators.name', DB::raw('AVG(CAST(survey_answers.answer_rating AS DECIMAL(10,2))) as avg_score'))
            ->groupBy('indicators.id', 'indicators.name')
            ->orderByDesc('avg_score')
            ->first();

        return [
            'totalRespondents' => $totalRespondents,
            'averageScore' => round((float) $averageScore, 1),
            'positiveSentiment' => $positiveSentiment,
            'topIndicator' => $topIndicator ? [
                'name' => $topIndicator->name,
                'score' => round((float) $topIndicator->avg_score, 1)
            ] : null
        ];
    }

    protected function getMonthlyTrendData($year)
    {
        $monthlyAverages = DB::table('survey_answers')
            ->join('survey_responses', 'survey_answers.survey_response_id', '=', 'survey_responses.id')
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->where('questions.type', 'rating')
            ->whereYear('survey_responses.created_at', $year)
            ->select(
                DB::raw('MONTH(survey_responses.created_at) as month'),
                DB::raw('AVG(CAST(survey_answers.answer_rating AS DECIMAL(10,2))) as avg_score')
            )
            ->groupBy('month')
            ->pluck('avg_score', 'month')
            ->toArray();

        $trendData = [];
        for ($i = 1; $i <= 12; $i++) {
            $trendData[] = isset($monthlyAverages[$i]) ? round((float) $monthlyAverages[$i], 1) : 0;
        }


        return $trendData;
    }

    protected function getIndicatorPerformanceData($year)
    {
        $indicators = DB::table('survey_answers')
            ->join('survey_responses', 'survey_answers.survey_response_id', '=', 'survey_responses.id')
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->join('indicators', 'questions.indicator_id', '=', 'indicators.id')
            ->where('questions.type', 'rating')
            ->whereYear('survey_responses.created_at', $year)
            ->select('indicators.name', DB::raw('AVG(CAST(survey_answers.answer_rating AS DECIMAL(10,2))) as avg_score'))
            ->groupBy('indicators.id', 'indicators.name')
            ->orderBy('avg_score', 'asc')
            ->get();

        return [
            'categories' => $indicators->pluck('name')->toArray(),
            'series' => $indicators->pluck('avg_score')->map(fn($val) => round((float) $val, 1))->toArray()
        ];
    }

    protected function getTopTeachersData($year)
    {
        $teachers = DB::table('survey_answers')
            ->join('survey_responses', 'survey_answers.survey_response_id', '=', 'survey_responses.id')
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->join('teachers', 'survey_responses.teacher_id', '=', 'teachers.id')
            ->where('questions.type', 'rating')
            ->whereYear('survey_responses.created_at', $year)
            ->select('teachers.name', DB::raw('AVG(CAST(survey_answers.answer_rating AS DECIMAL(10,2))) as avg_score'))
            ->groupBy('teachers.id', 'teachers.name')
            ->orderBy('avg_score', 'desc') // Terbesar di kiri (untuk vertical bar chart)
            ->limit(5)
            ->get();

        return [
            'categories' => $teachers->pluck('name')->toArray(),
            'series' => $teachers->pluck('avg_score')->map(fn($val) => round((float) $val, 1))->toArray()
        ];
    }


    protected function getRatingDistributionData($year)
    {
        $distribution = DB::table('survey_answers')
            ->join('survey_responses', 'survey_answers.survey_response_id', '=', 'survey_responses.id')
            ->join('questions', 'survey_answers.question_id', '=', 'questions.id')
            ->where('questions.type', 'rating')
            ->whereYear('survey_responses.created_at', $year)
            ->select('survey_answers.answer_rating', DB::raw('COUNT(*) as total'))
            ->groupBy('survey_answers.answer_rating')
            ->get()
            ->keyBy('answer_rating');

        return [
            ['value' => $distribution->get(5)->total ?? 0, 'name' => 'Bintang 5', 'itemStyle' => ['color' => '#166534']],
            ['value' => $distribution->get(4)->total ?? 0, 'name' => 'Bintang 4', 'itemStyle' => ['color' => '#16a34a']],
            ['value' => $distribution->get(3)->total ?? 0, 'name' => 'Bintang 3', 'itemStyle' => ['color' => '#4ade80']],
            ['value' => $distribution->get(2)->total ?? 0, 'name' => 'Bintang 2', 'itemStyle' => ['color' => '#86efac']],
            ['value' => $distribution->get(1)->total ?? 0, 'name' => 'Bintang 1', 'itemStyle' => ['color' => '#dcfce7']],
        ];
    }
}