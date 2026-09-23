import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';

export default function SurveyNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => document.getElementById('survey-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        // 👇 Navbar mulanya transparan, saat di-scroll baru muncul background putih + blur
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

                <div className="flex items-center">
                    <img
                        src="/images/timedoor-logo.png"
                        alt="Timedoor Academy"
                        className="h-10 md:h-12 object-contain cursor-pointer transition-all"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {auth?.user ? (
                        <Link href={route('dashboard')}>
                            {/* Warna teks disesuaikan agar tetap terlihat elegan */}
                            <Button variant="ghost" className={`rounded-full font-bold hidden sm:flex px-5 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'bg-white/20 text-gray-800 hover:bg-white'}`}>
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href={route('login')}>
                            <Button variant="ghost" className={`rounded-full font-bold hidden sm:flex px-5 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'bg-white/20 text-gray-800 hover:bg-white'}`}>
                                Login Admin
                            </Button>
                        </Link>
                    )}

                    <Button
                        onClick={scrollToForm}
                        className="rounded-full px-6 md:px-8 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Isi Survey
                    </Button>
                </div>
            </div>
        </nav>
    );
}