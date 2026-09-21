import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Dashboard() {
    return (
        <DashboardLayout title="Halaman Utama">

            <h1 className="text-3xl font-bold text-primary mb-4">Dashboard Sirepo</h1>
            <p className="text-muted-foreground">
                Selamat datang di panel admin. Sidebar di sebelah kiri sekarang terhubung langsung dengan sistem login (nama dan email Anda di pojok kiri bawah diambil dari database).
            </p>

            {/* Anda bisa menambahkan Chart, Tabel, atau Card statistik di sini */}

        </DashboardLayout>
    );
}