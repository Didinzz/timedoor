<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        // Mengambil semua data teacher (kecuali yang di-soft delete)
        $teachers = Teacher::withTrashed()->orderBy('name', 'asc')->get();

        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean'
        ],[
            'name.required' => 'Nama harus diisi.',
            'name.string' => 'Nama harus berupa string.',
            'name.max' => 'Nama tidak boleh lebih dari 255 karakter.',
        ]);

        Teacher::create([
            'name' => $request->name,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->back()->with('success', 'Data Teacher berhasil ditambahkan.');
    }

    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean'
        ],[
            'name.required' => 'Nama harus diisi.',
            'name.string' => 'Nama harus berupa string.',
            'name.max' => 'Nama tidak boleh lebih dari 255 karakter.',
        ]);

        $teacher->update([
            'name' => $request->name,
            'is_active' => $request->has('is_active') ? $request->is_active : $teacher->is_active,
        ]);

        return redirect()->back()->with('success', 'Data Teacher berhasil diperbarui.');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete(); 
        
        return redirect()->back()->with('success', 'Data Teacher berhasil dihapus (Soft Delete).');
    }


    public function restore($id)
    {
        $indicator = Teacher::withTrashed()->findOrFail($id);
        $indicator->restore();

        return redirect()->back()->with('success', 'Teacher berhasil dipulihkan!');
    }

    public function forceDelete($id)
    {
        $indicator = Teacher::withTrashed()->findOrFail($id);

        $indicator->forceDelete();

        return redirect()->back()->with('success', 'Teacher dihapus permanen!');
    }
}