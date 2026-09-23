import React from 'react';
import { Button } from '@/Components/ui/button';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
    const scrollToForm = () => document.getElementById('survey-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <section className="relative w-full bg-background overflow-hidden pb-16 pt-24 lg:pt-32 lg:pb-32 min-h-[90vh] flex items-center">

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">

                <div className="flex flex-col items-start text-left z-20 w-full max-w-4xl">

                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground leading-[1.2] tracking-tight mb-6 min-h-25 md:min-h-35">
                        Bantu Timedoor Academy Untuk<br />
                        <TypeAnimation
                            sequence={[
                                'Lebih Baik untuk Anak Anda', 2500,
                                'Terus Meningkatkan Kualitas', 2500,
                                'Menciptakan Pengalaman Terbaik', 2500,
                                'Menjadi yang Terdepan', 2500
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            className="text-primary"
                        />
                    </h1>

                    <p className="text-muted-foreground md:text-xl mb-12 leading-relaxed max-w-3xl font-medium">
                        Bagaimana pengalaman belajar anak Anda di Timedoor Academy? Isi survei kepuasan ini agar kami dapat terus memperbaiki kualitas pengajaran, kurikulum, dan pelayanan untuk memberikan yang terbaik.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 w-full">
                        <div>
                            <h3 className="text-4xl font-extrabold text-primary mb-2">25.000+</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                Siswa aktif belajar coding & AI di Timedoor Academy
                            </p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-primary mb-2">20+</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                Negara tempat Timedoor beroperasi dan berkembang
                            </p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-primary mb-2">70+</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                Cabang tersebar di Indonesia dan mancanegara
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 text-muted-foreground text-sm font-medium">
                        <Button
                            onClick={scrollToForm}
                            size="lg"
                            className="rounded-full px-10 py-7 text-lg font-bold shadow-lg transition-all"
                        >
                            Isi Survei Sekarang
                        </Button>

                    </div>
                </div>

                {/* 3D Carousel (di-comment sementara) */}

            </div>
        </section>
    );
}