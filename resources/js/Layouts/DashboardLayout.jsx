import { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';
import { useTheme } from '@/Components/ThemeProvider';

import { GooeyToaster, gooeyToast } from "@/components/ui/goey-toaster";
import "goey-toast/styles.css";

export default function DashboardLayout({ children, title, headerTitle = "Overview" }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const fireToast = (type, data) => {
            if (!data) return;
            const opsi = { preset: 'smooth' };
            let judul = data;
            if (typeof data === 'object' && data.title) {
                judul = data.title;
                opsi.description = data.description;
                opsi.borderWidth = 1.5;
                opsi.borderColor = theme === 'dark' ? '#27272a' : '#ffffff';
            }
            if (type === 'success') gooeyToast.success(judul, opsi);
            if (type === 'error') gooeyToast.error(judul, opsi);
            if (type === 'info') gooeyToast.info(judul, opsi);
            if (type === 'warning') gooeyToast.warning(judul, opsi);
        };

        fireToast('success', flash?.success);
        fireToast('error', flash?.error);
        fireToast('info', flash?.info);
        fireToast('warning', flash?.warning);
    }, [flash, theme]);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
            <Head>
                <title>{title ? `${title} - Timedoor` : 'Admin Timedoor'}</title>
            </Head>

            <GooeyToaster position="top-right" theme={theme} />

            {/* 👇 Lebar Sidebar diperkecil dari w-64 menjadi w-56 agar tidak kebesaran */}
            <div className={`hidden md:flex flex-col h-full border-r border-border bg-sidebar z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-56' : 'w-16'}`}>
                <Sidebar user={user} isOpen={isSidebarOpen} />
            </div>

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <Header
                    headerTitle={headerTitle}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div className="flex-1 p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}