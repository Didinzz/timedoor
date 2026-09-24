<?php

namespace Database\Seeders;

use App\Models\Indicator;
use App\Models\Question;
use App\Models\Teacher;
use App\Models\SurveyResponse;
use App\Models\SurveyAnswer;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;

class SurveySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inisialisasi Faker dengan nama orang Indonesia
        $faker = Faker::create('id_ID');

        // ==========================================
        // 1. DATA TEACHER
        // ==========================================
        $teachersData = [
            'Mr. Budi Santoso',
            'Mr. Kevin Pratama',
            'Mr. Rio Dewanto',
            'Miss Sarah Amalia',
            'Miss Alice Wonderland',
            'Miss Jessica Mila',
        ];

        $teacherIds = [];
        foreach ($teachersData as $name) {
            $t = Teacher::create(['name' => $name]);
            $teacherIds[] = $t->id; // Simpan ID untuk di-random nanti
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
            ['text' => 'Ketepatan waktu teacher dalam memulai dan mengakhiri sesi kelas.', 'type' => 'rating'],
            ['text' => 'Kemampuan teacher dalam memberikan laporan perkembangan (feedback) berkala kepada orang tua.', 'type' => 'rating'],
            ['text' => 'Penampilan, sikap profesional, dan kerapian teacher saat mengajar di kelas.', 'type' => 'rating'],
            ['text' => 'Cara teacher merespon pertanyaan dari siswa atau orang tua dengan ramah dan sabar.', 'type' => 'rating'],
            ['text' => 'Sejauh mana teacher mampu beradaptasi dengan karakter dan gaya belajar unik tiap anak.', 'type' => 'rating'],
        ];

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
            ['text' => 'Kemudahan akses lokasi dan keamanan tempat parkir di area cabang Timedoor.', 'type' => 'rating'],
            ['text' => 'Kebersihan, kenyamanan, dan kelayakan fasilitas toilet/kamar mandi di gedung.', 'type' => 'rating'],
            ['text' => 'Ketersediaan fasilitas keamanan (seperti pengawasan staf/CCTV) di area belajar anak.', 'type' => 'rating'],
            ['text' => 'Kelengkapan alat tulis atau perlengkapan pendukung fisik lainnya di dalam kelas.', 'type' => 'rating'],
            ['text' => 'Suasana lingkungan belajar secara keseluruhan (bebas dari kebisingan/gangguan luar).', 'type' => 'rating'],
        ];

        // ==========================================
        // 4. DATA INDICATOR 3: KURIKULUM & MATERI
        // ==========================================
        $ind3 = Indicator::create(['name' => 'Kurikulum & Materi']);
        $questions3 = [
            ['text' => 'Kesesuaian tingkat kesulitan materi pelajaran dengan minat dan usia anak.', 'type' => 'rating'],
            ['text' => 'Keseimbangan antara teori dan praktik (hands-on) di dalam modul kurikulum.', 'type' => 'rating'],
            ['text' => 'Seberapa relevan materi yang diajarkan dengan perkembangan teknologi masa kini.', 'type' => 'rating'],
            ['text' => 'Kejelasan instruksi dan kualitas visual dari bahan ajar/modul yang diberikan kepada siswa.', 'type' => 'rating'],
            ['text' => 'Kemampuan kurikulum dalam merangsang kreativitas dan kemampuan problem-solving anak.', 'type' => 'rating'],
            ['text' => 'Ketersediaan project akhir atau tantangan yang menarik minat anak untuk berkreasi mandiri.', 'type' => 'rating'],
            ['text' => 'Sejauh mana kurikulum membantu logika berpikir runut anak (seperti matematika dasar).', 'type' => 'rating'],
            ['text' => 'Ketersediaan akses platform belajar online untuk anak mereview materi di rumah.', 'type' => 'rating'],
            ['text' => 'Variasi topik dan aktivitas agar anak tidak merasa bosan selama proses pembelajaran.', 'type' => 'rating'],
            ['text' => 'Apakah ada kritik, saran, atau harapan tambahan untuk kurikulum Timedoor ke depannya?', 'type' => 'text'],
        ];

        // Insert Pertanyaan ke Database
        $allQuestions = [];

        foreach ($questions1 as $q) {
            $allQuestions[] = Question::create(['indicator_id' => $ind1->id, 'question_text' => $q['text'], 'type' => $q['type']]);
        }
        foreach ($questions2 as $q) {
            $allQuestions[] = Question::create(['indicator_id' => $ind2->id, 'question_text' => $q['text'], 'type' => $q['type']]);
        }
        foreach ($questions3 as $q) {
            $allQuestions[] = Question::create(['indicator_id' => $ind3->id, 'question_text' => $q['text'], 'type' => $q['type']]);
        }

        // ==========================================
        // 5. GENERATOR DATA RESPONDEN & JAWABAN
        // ==========================================
        $years = [2024, 2025, 2026];
        $textFeedback = [
            'Semuanya sudah bagus, tolong dipertahankan!',
            'Anak saya sangat senang belajar disini, jadi lebih kreatif.',
            'Tolong AC di ruangan agak didinginkan ya.',
            'Kurikulumnya mantap, sangat relevan dengan zaman sekarang.',
            'Teacher sangat sabar mengajari anak saya yang aktif.',
            'Semoga ada tambahan materi/robotik tingkat lanjut.',
            'Mohon staf front desk lebih senyum dan ramah.',
            'Fasilitas PC sangat cepat, anak tidak pernah mengeluh nge-lag.',
            'Tidak ada saran, luar biasa Timedoor!',
            'Semoga semakin sukses dan buka cabang lebih dekat!'
        ];

        $currentYear = (int) date('Y');
        $currentMonth = (int) date('m');

        foreach ($years as $year) {
            for ($month = 1; $month <= 12; $month++) {

                // Mencegah pembuatan data di "Masa Depan"
                if ($year > $currentYear || ($year == $currentYear && $month > $currentMonth)) {
                    continue; // Skip bulan/tahun yang belum terjadi
                }

                // Random jumlah orang tua (responden) yang mengisi tiap bulan (10 - 25 orang)
                $respondentsCount = rand(10, 25);

                for ($i = 0; $i < $respondentsCount; $i++) {
                    // Buat tanggal acak di bulan tersebut
                    $day = rand(1, 28);
                    $date = Carbon::createFromDate($year, $month, $day)->setTime(rand(8, 20), rand(0, 59));

                    // Buat 1 Responden
                    $response = SurveyResponse::create([
                        'teacher_id' => $faker->randomElement($teacherIds),
                        'respondent_name' => $faker->name, // Nama Acak
                        'child_name' => $faker->firstName . ' ' . $faker->lastName,
                        'created_at' => $date,
                        'updated_at' => $date,
                    ]);

                    // Tentukan karakteristik / sentimen orang tua ini (agar grafiknya natural)
                    $sentimentType = rand(1, 100);
                    if ($sentimentType <= 70) {
                        $minScore = 4;
                        $maxScore = 5; // 70% Orang tua Puas (Pilih bintang 4-5)
                    } elseif ($sentimentType <= 90) {
                        $minScore = 3;
                        $maxScore = 4; // 20% Biasa saja (Pilih bintang 3-4)
                    } else {
                        $minScore = 1;
                        $maxScore = 3; // 10% Sangat Kritis (Pilih bintang 1-3)
                    }

                    // Kumpulkan semua 30 jawaban untuk 1 responden
                    $answers = [];
                    foreach ($allQuestions as $q) {
                        if ($q->type === 'rating') {
                            $answers[] = [
                                'survey_response_id' => $response->id,
                                'question_id' => $q->id,
                                'answer_rating' => rand($minScore, $maxScore),
                                'answer_text' => null,
                                'created_at' => $date,
                                'updated_at' => $date,
                            ];
                        } else {
                            $answers[] = [
                                'survey_response_id' => $response->id,
                                'question_id' => $q->id,
                                'answer_rating' => null,
                                'answer_text' => $faker->randomElement($textFeedback),
                                'created_at' => $date,
                                'updated_at' => $date,
                            ];
                        }
                    }

                    // Gunakan fungsi 'insert' untuk memasukkan 30 baris jawaban sekaligus (Sangat cepat!)
                    SurveyAnswer::insert($answers);
                }
            }
        }
    }
}