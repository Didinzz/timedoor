<?php

namespace App\Http\Controllers;

use App\Models\SurveyAnswer;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function store(Request $request)
    {

        // 1. Validasi Input
        $validated = $request->validate([
            'respondent_name' => 'required|string|max:255',
            'child_name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'answers' => 'required|array',
            'text_answers' => 'nullable|array',
        ],[
            'teacher_id.exists' => 'Guru tidak ditemukan',
            'respondent_name.required' => 'Nama Responden harus diisi',
            'child_name.required' => 'Nama Anak harus diisi',
            'answers.required' => 'Jawaban harus diisi',
            'text_answers.required' => 'Jawaban harus diisi',
        ]);
        // 2. Simpan Identitas (SurveyResponse)
        $response = SurveyResponse::create([
            'respondent_name' => $validated['respondent_name'],
            'child_name' => $validated['child_name'],
            'teacher_id' => $validated['teacher_id'],
        ]);
        // 3. Simpan Jawaban Rating (Bintang)
        foreach ($validated['answers'] as $questionId => $rating) {
            SurveyAnswer::create([
                'survey_response_id' => $response->id,
                'question_id' => $questionId,
                'answer_rating' => $rating,
            ]);
        }
        // 4. Simpan Jawaban Teks (Saran)
        if (isset($validated['text_answers'])) {
            foreach ($validated['text_answers'] as $questionId => $text) {
                if (!empty($text)) {
                    SurveyAnswer::create([
                        'survey_response_id' => $response->id,
                        'question_id' => $questionId,
                        'answer_text' => $text,
                    ]);
                }
            }
        }
        // Kembali ke frontend dan bawa pesan sukses
        return redirect()->back()->with('success', [
            'title' => 'Terima Kasih!',
            'description' => 'Terima kasih telah mengisi survey, masukkan dari anda sangat berarti bagi kami.',
        ]);
    }
}
