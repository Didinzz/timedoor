import { Head, Link } from '@inertiajs/react';
import HeroSection from './LandingPage/HeroSection';
import SurveyNavbar from './LandingPage/Navbar';
import SurveyWizard from './LandingPage/SurveyWizard';
import { GooeyToaster } from '@/Components/ui/goey-toaster';
import { useEffect } from 'react';
import { useTheme } from '@/Components/ThemeProvider';

export default function Welcome({ auth, teachers, indicators }) {

    const { setTheme } = useTheme();
    
    useEffect(() => {
        // 2. Simpan tema asli (yang dipakai di Dashboard) sebelum kita ubah
        const originalTheme = localStorage.getItem('vite-ui-theme') || 'light'; // Cek nama key di localstorage Anda, biasanya 'vite-ui-theme' atau 'theme'
        // 3. Paksa ThemeProvider menjadi Light Mode khusus di halaman ini
        setTheme('light');
        // 4. (Opsional) Saat pindah kembali ke Dashboard, kembalikan ke tema aslinya
        return () => {
            setTheme(originalTheme);
        };
    }, []);


    return (
        <>
            <Head title="Survey Penilaian - Timedoor Academy" />
            <GooeyToaster position="top-center" theme='light' closeOnEscape={false} />

            <div className="bg-background text-foreground font-sans min-h-screen selection:bg-primary/20 selection:text-primary">

                <SurveyNavbar />

                {/* Hero Section */}
                <div className="w-full">
                    <HeroSection />
                </div>
                <main className="w-full relative z-20 pb-20">
                    <SurveyWizard teachers={teachers} indicators={indicators} />
                </main>

                {/* --- FOOTER --- */}
                <footer className="py-12 text-center text-sm text-muted-foreground border-t border-border bg-card">
                    <p>© 2026 Timedoor Academy. All rights reserved.</p>

                    <div className="mt-4">
                        {auth?.user ? (
                            <Link href={route('admin.dashboard')} className="text-primary hover:underline font-medium">
                                Masuk ke Dashboard Admin
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-muted-foreground hover:text-foreground transition-colors">
                                Admin Login
                            </Link>
                        )}
                    </div>
                </footer>
            </div>
        </>
    );
}