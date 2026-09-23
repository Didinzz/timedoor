<?php

use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Models\Indicator;
use App\Models\Teacher;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {


    $teachers = Teacher::where('is_active', true)->get();
    $indicators = Indicator::with('questions')->get();
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'teachers' => $teachers,
        'indicators' => $indicators
    ]);
})->name('welcome');

Route::post('/survey', [SurveyController::class, 'store'])->name('survey.store');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::resource('admin/questions', QuestionController::class)->names('admin.questions');

    Route::post('admin/question/{id}/restore', [QuestionController::class, 'restore'])->name('admin.questions.restore');

    Route::delete('admin/questions/{id}/force-delete', [QuestionController::class, 'forceDelete'])->name('admin.questions.force-delete');

    Route::resource('admin/indicators', IndicatorController::class)->names('admin.indicators');

    Route::post('indicators/{id}/restore', [IndicatorController::class, 'restore'])->name('admin.indicators.restore');
    Route::delete('indicators/{id}/force', [IndicatorController::class, 'forceDelete'])->name('admin.indicators.forceDelete');

});

require __DIR__ . '/auth.php';
