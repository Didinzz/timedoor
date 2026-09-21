import { Link } from '@inertiajs/react';
import {
    FiMoreHorizontal, FiLogOut, FiUser, FiBell,
    FiSun, FiMoon, FiList, FiMessageSquare
} from 'react-icons/fi';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from '@/Components/ThemeProvider';
import { LuLayoutDashboard } from 'react-icons/lu';

const MENU_CONFIG = [
    // {
    //     label: "Dashboard",
    //     icon: LuLayoutDashboard,
    //     routeName: "survey.create", 
    //     activePattern: "dashboard",
    //     roles: ["admin"]
    // },
    // {
    //     isGroup: true,
    //     label: "Kelola Survey",
    //     roles: ["admin"]
    // },
    // {
    //     label: "Daftar Kriteria",
    //     icon: FiList,
    //     routeName: "survey.create",
    //     activePattern: "kriteria.*",
    //     roles: ["admin"]
    // },
    // {
    //     label: "Hasil Responden",
    //     icon: FiMessageSquare,
    //     routeName: "survey.create",
    //     activePattern: "hasil.*",
    //     roles: ["admin"]
    // }
];

export default function Sidebar({ user, isOpen = true }) {
    const { theme, setTheme } = useTheme();
    const userRole = user?.role || 'admin';

    return (
        <div className="w-full h-full flex-col py-3 overflow-y-auto hidden md:flex no-scrollbar">

            {/* Logo Timedoor */}
            <div className={`flex items-center py-2 mb-6 text-sidebar-foreground transition-all duration-300 ${isOpen ? 'px-4' : 'justify-center'}`}>
                <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground font-bold rounded drop-shadow-sm">
                    T
                </div>
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-w-48 ml-3' : 'opacity-0 max-w-0 ml-0'}`}>
                    {/* Font size dibesarkan sedikit */}
                    <span className="font-bold text-xl leading-none tracking-tight">TIMEDOOR</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Academy</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-2">
                {MENU_CONFIG.map((item, index) => {
                    if (!item.roles.includes(userRole)) return null;

                    if (item.isGroup) {
                        return (
                            <div key={index} className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'pt-6 pb-2 px-2 max-h-12 opacity-100' : 'max-h-0 opacity-0 m-0 p-0'}`}>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                        );
                    }

                    const Icon = item.icon;
                    return (
                        <SidebarItem
                            key={index}
                            icon={<Icon className="w-5 h-5" />}
                            label={item.label}
                            href={route(item.routeName)}
                            active={route().current(item.activePattern)}
                            isOpen={isOpen}
                        />
                    );
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 pt-4 px-2">
                {/* Tombol Tema */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`flex items-center rounded-lg transition-colors font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground cursor-pointer ${isOpen ? 'px-3 py-2.5' : 'p-2.5 justify-center'}`}
                >
                    <div className="shrink-0 relative w-5 h-5 flex items-center justify-center">
                        <FiSun className="absolute h-5 w-5 transition-all duration-500 scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                        <FiMoon className="absolute h-5 w-5 transition-all duration-500 scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
                    </div>
                    <span className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out text-left ${isOpen ? 'opacity-100 max-w-48 ml-3' : 'opacity-0 max-w-0 ml-0'}`}>
                        {theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                    </span>
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger className={`flex w-full outline-none items-center rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${isOpen ? 'px-2 py-2 gap-3' : 'p-2 justify-center'}`}>
                        <div className="shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors">
                            {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                        </div>
                        <div className={`flex flex-col text-left overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-w-48' : 'opacity-0 max-w-0'}`}>
                            <p className="text-sm font-medium leading-none text-sidebar-foreground truncate group-hover:text-sidebar-accent-foreground transition-colors">
                                {user?.name || 'Administrator'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate mt-1 group-hover:text-sidebar-accent-foreground transition-colors">
                                {user?.email || 'admin@timedoor.net'}
                            </p>
                        </div>
                        {isOpen && <FiMoreHorizontal className="shrink-0 w-4 h-4 ml-auto text-muted-foreground group-hover:text-sidebar-accent-foreground transition-colors" />}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align={isOpen ? "end" : "start"} side="right" sideOffset={16} className="w-56 rounded-xl">
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
                            <DropdownMenuItem className="cursor-pointer"><FiUser className="mr-2 h-4 w-4" /> <span>Profil Saya</span></DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer"><FiBell className="mr-2 h-4 w-4" /> <span>Notifikasi</span></DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                            <Link href="#" method="post" as="button" className="w-full flex items-center"><FiLogOut className="mr-2 h-4 w-4" /> <span>Log out</span></Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active, href = "#", isOpen }) {
    return (
        <Link
            href={href}
            title={!isOpen ? label : undefined}
            className={`flex items-center rounded-lg transition-colors font-medium hover:text-sidebar-accent-foreground group ${active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'} ${isOpen ? 'px-3 py-2.5' : 'p-2.5 justify-center'}`}
        >
            <div className="shrink-0">{icon}</div>
            <span className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-w-48 ml-3' : 'opacity-0 max-w-0 ml-0'}`}>
                {label}
            </span>
        </Link>
    );
}