<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Indicator; // 👈 PENTING: Memanggil model Indikator
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with('indicator')->withTrashed()->orderBy('id', 'asc')->get();

        $indicators = Indicator::all();

        return Inertia::render('Questions/Index', [
            'questions' => $questions,
            'indicators' => $indicators, // 👈 Kirim indikator ke React
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'indicator_id' => 'required|exists:indicators,id',
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:rating,text',
            'is_active' => 'boolean',
        ], [
            'indicator_id.required' => 'Pilih indikator penilaian terlebih dahulu.',
            'question_text.required' => 'Kolom pertanyaan harus diisi.',
            'question_text.string' => 'Kolom pertanyaan harus berupa teks.',
            'question_text.max' => 'Kolom pertanyaan tidak boleh lebih dari 255 karakter.',
        ]);

        Question::create($validated);

        return redirect()->back()->with('success', 'Kriteria berhasil ditambahkan!');
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'indicator_id' => 'required|exists:indicators,id',
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:rating,text',
            'is_active' => 'boolean',
        ], [
            'indicator_id.required' => 'Pilih indikator penilaian terlebih dahulu.',
            'question_text.required' => 'Kolom pertanyaan harus diisi.',
            'question_text.string' => 'Kolom pertanyaan harus berupa teks.',
            'question_text.max' => 'Kolom pertanyaan tidak boleh lebih dari 255 karakter.',
        ]);

        $question->update($validated);

        return redirect()->back()->with('success', 'Kriteria berhasil diperbarui!');
    }

    public function destroy($id)
    {
        // Soft delete
        $question = Question::findOrFail($id);
        $question->delete();
        return redirect()->back()->with('success', 'Kriteria masuk ke tempat sampah!');
    }


    public function restore($id)
    {
        $question = Question::withTrashed()->findOrFail($id);
        $question->restore();
        return redirect()->back()->with('success', 'Kriteria berhasil dipulihkan!');
    }

    public function forceDelete($id)
    {
        $question = Question::withTrashed()->findOrFail($id);
        $question->forceDelete(); // Menghapus permanen dari database
        return redirect()->back()->with('success', 'Kriteria dihancurkan permanen!');
    }



}