import { FiSidebar, FiSun, FiMoon, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useTheme } from '@/Components/ThemeProvider';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePage, router } from '@inertiajs/react';

export default function Header({ headerTitle, isSidebarOpen, setIsSidebarOpen }) {
    const { theme, setTheme } = useTheme();
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <header className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0 sticky top-0 bg-background z-10">
            {/* BAGIAN KIRI: Tombol, LOGO, dan Judul */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted outline-none cursor-pointer"
                    title="Toggle Sidebar"
                >
                    <FiSidebar className="w-4.5 h-4.5" />
                </button>

                <div className="h-5 w-px bg-border hidden sm:block"></div>

                {/* Judul Halaman */}
                <h1 className="text-sm font-semibold text-foreground tracking-tight hidden sm:block ml-1">{headerTitle}</h1>
            </div>

            {/* BAGIAN KANAN: Aksi & Profil */}
            <div className="flex items-center gap-1.5 md:gap-2">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer"
                    title="Ubah Tema"
                >
                    {theme === 'dark' ? <FiSun className="w-4.5 h-4.5" /> : <FiMoon className="w-4.5 h-4.5" />}
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger className="relative p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none">
                        <FiBell className="w-4.5 h-4.5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 rounded-xl mt-1">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-semibold px-3 py-2">Notifikasi</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <div className="p-6 text-center text-xs text-muted-foreground flex flex-col items-center justify-center">
                            <FiBell className="w-6 h-6 mb-2 opacity-20" />
                            Belum ada notifikasi baru.
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-5 w-px bg-border mx-1 hidden md:block"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 ml-1 p-1 rounded-md hover:bg-muted transition-colors outline-none cursor-pointer">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl mt-1">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-normal p-2">
                                <div className="flex items-center gap-3 text-left text-sm">
                                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                        {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.name || 'Administrator'}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user?.email || 'admin@timedoor.net'}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <FiUser className="mr-2 h-4 w-4" /> <span>Profil Saya</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <FiSettings className="mr-2 h-4 w-4" /> <span>Pengaturan</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.post(route('logout'))}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer flex items-center"
                        >
                            <FiLogOut className="mr-2 h-4 w-4" /> <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}