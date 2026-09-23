<?php

namespace Database\Seeders;

use App\Models\Indicator;
use App\Models\Question;
use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SurveySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. DATA TEACHER (Laki-laki = Mr. , Perempuan = Miss.)
        $teachers = [
            ['name' => 'Mr. Budi Santoso'],
            ['name' => 'Mr. Kevin Pratama'],
            ['name' => 'Mr. Rio Dewanto'],
            ['name' => 'Miss Sarah Amalia'],
            ['name' => 'Miss Alice Wonderland'],
            ['name' => 'Miss Jessica Mila'],
        ];

        foreach ($teachers as $teacher) {
            Teacher::create($teacher);
        }

        // ==========================================
        // 2. DATA INDICATOR 1: PENGAJARAN TEACHER
        // ==========================================
        $ind1 = Indicator::create(['name' => 'Pengajaran Teacher']);

        $questions1 = [
            ['text' => 'Kemampuan teacher dalam menjelaskan materi agar mudah dipahami anak.', 'type' => 'rating'],
            ['text' => 'Perhatian, kesabaran, dan empati teacher terhadap masing-masing anak di kelas.', 'type' => 'rating'],
            ['text' => 'Kemampuan teacher dalam membangun suasana belajar yang interaktif dan menyenangkan.', 'type' => 'rating'],
            ['text' => 'Kesiapan dan penguasaan materi yang ditunjukkan teacher saat mengajar.', 'type' => 'rating'],
            ['text' => 'Cara teacher dalam memotivasi dan membantu anak saat menghadapi kesulitan koding.', 'type' => 'rating'],
        ];

        foreach ($questions1 as $q) {
            Question::create([
                'indicator_id' => $ind1->id,
                'question_text' => $q['text'],
                'type' => $q['type']
            ]);
        }

        // ==========================================
        // 3. DATA INDICATOR 2: SARANA & PRASARANA
        // ==========================================
        $ind2 = Indicator::create(['name' => 'Sarana & Prasarana']);

        $questions2 = [
            ['text' => 'Kenyamanan, keamanan, dan kebersihan ruang kelas Timedoor.', 'type' => 'rating'],
            ['text' => 'Kelengkapan dan kecepatan perangkat keras (PC/Laptop/Perangkat Robotik) saat digunakan.', 'type' => 'rating'],
            ['text' => 'Kestabilan dan kecepatan koneksi internet selama kegiatan praktik berlangsung.', 'type' => 'rating'],
            ['text' => 'Ketersediaan dan kenyamanan ruang tunggu atau area fasilitas umum untuk orang tua/siswa.', 'type' => 'rating'],
            ['text' => 'Kondisi fasilitas pendukung kelas (proyektor, AC, pencahayaan kelas, meja/kursi).', 'type' => 'rating'],
        ];

        foreach ($questions2 as $q) {
            Question::create([
                'indicator_id' => $ind2->id,
                'question_text' => $q['text'],
                'type' => $q['type']
            ]);
        }

        // ==========================================
        // 4. DATA INDICATOR 3: KURIKULUM & MATERI
        // ==========================================
        $ind3 = Indicator::create(['name' => 'Kurikulum & Materi']);

        $questions3 = [
            ['text' => 'Kesesuaian tingkat kesulitan materi pelajaran dengan minat dan usia anak.', 'type' => 'rating'],
            ['text' => 'Keseimbangan antara teori dan praktik (hands-on) di dalam modul kurikulum.', 'type' => 'rating'],
            ['text' => 'Seberapa relevan materi yang diajarkan dengan perkembangan teknologi digital masa kini.', 'type' => 'rating'],
            ['text' => 'Kejelasan instruksi dan kualitas visual dari bahan ajar/modul yang diberikan kepada siswa.', 'type' => 'rating'],
            ['text' => 'Apakah ada kritik, saran, atau harapan tambahan untuk kurikulum Timedoor ke depannya?', 'type' => 'text'],
        ];

        foreach ($questions3 as $q) {
            Question::create([
                'indicator_id' => $ind3->id,
                'question_text' => $q['text'],
                'type' => $q['type']
            ]);
        }
    }
}
