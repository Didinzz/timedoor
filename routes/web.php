<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\SurveyResponseController;
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



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');


    Route::resource('admin/questions', QuestionController::class)->names('admin.questions');

    Route::post('admin/question/{id}/restore', [QuestionController::class, 'restore'])->name('admin.questions.restore');

    Route::delete('admin/questions/{id}/force-delete', [QuestionController::class, 'forceDelete'])->name('admin.questions.force-delete');

    Route::resource('admin/indicators', IndicatorController::class)->names('admin.indicators');

    Route::post('indicators/{id}/restore', [IndicatorController::class, 'restore'])->name('admin.indicators.restore');
    Route::delete('indicators/{id}/force', [IndicatorController::class, 'forceDelete'])->name('admin.indicators.forceDelete');


    Route::get('/admin/teachers', [TeacherController::class, 'index'])->name('admin.teachers.index');
    Route::post('/admin/teachers', [TeacherController::class, 'store'])->name('admin.teachers.store');
    Route::put('/admin/teachers/{teacher}', [TeacherController::class, 'update'])->name('admin.teachers.update');
    Route::delete('/admin/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('admin.teachers.destroy');

    Route::post('teachers/{id}/restore', [TeacherController::class, 'restore'])->name('admin.teachers.restore');
    Route::delete('teachers/{id}/force', [TeacherController::class, 'forceDelete'])->name('admin.teachers.forceDelete');


    Route::get('/admin/responses', [SurveyResponseController::class, 'index'])->name('admin.responses.index');
    Route::get('/admin/responses/{id}', [surveyResponseController::class, 'show'])->name('admin.responses.show');

});

require __DIR__ . '/auth.php';
