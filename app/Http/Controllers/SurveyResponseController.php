<?php

namespace App\Http\Controllers;

use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyResponseController extends Controller
{
    public function index()
    {
        $responses = SurveyResponse::with([
            'teacher',
            'answers.question.indicator'
        ])->latest()->get();

        return Inertia::render('Admin/Response/Index', [
            'responses' => $responses
        ]);
    }


    public function show($id)
    {
        // Ambil data respons beserta teacher, jawaban, dan relasi pertanyaan/indikatornya
        $response = SurveyResponse::with(['teacher', 'answers.question.indicator'])
            ->findOrFail($id);
        return Inertia::render('Admin/Response/Show', [
            'response' => $response
        ]);
    }
}
