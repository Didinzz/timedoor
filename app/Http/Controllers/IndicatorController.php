<?php

namespace App\Http\Controllers;

use App\Models\Indicator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndicatorController extends Controller
{
    public function index()
    {
        // Tambahkan withTrashed() agar data indikator yang dihapus ikut terkirim ke React
        $indicators = Indicator::withCount('questions')
            ->withTrashed()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Indicators/Index', [
            'indicators' => $indicators
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:indicators,name'
        ]);

        Indicator::create(['name' => $request->name]);
        return redirect()->back()->with('success', 'Kategori Indikator berhasil ditambahkan!');
    }

    public function update(Request $request, Indicator $indicator)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:indicators,name,' . $indicator->id
        ]);

        $indicator->update(['name' => $request->name]);
        return redirect()->back()->with('success', 'Kategori Indikator berhasil diperbarui!');
    }

    public function destroy(Indicator $indicator)
    {
        // Soft delete
        $indicator->delete();
        return redirect()->back()->with('success', 'Kategori Indikator dipindahkan ke tempat sampah!');
    }

    public function restore($id)
    {
        $indicator = Indicator::withTrashed()->findOrFail($id);
        $indicator->restore();

        return redirect()->back()->with('success', 'Kategori Indikator berhasil dipulihkan!');
    }

    public function forceDelete($id)
    {
        $indicator = Indicator::withTrashed()->findOrFail($id);

        $indicator->forceDelete();

        return redirect()->back()->with('success', 'Kategori Indikator dihancurkan permanen!');
    }
}