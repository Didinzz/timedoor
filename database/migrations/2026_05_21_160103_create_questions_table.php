<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('indicator_id')->constrained('indicators')->onDelete('cascade');
            $table->string('question_text');
            $table->enum('type', ['rating', 'text'])->default('rating'); // 'rating' untuk bintang, 'text' untuk saran
            $table->boolean('is_active')->default(true);
            // $table->integer('sort_order')->default(0); // Untuk mengatur urutan tampil
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};