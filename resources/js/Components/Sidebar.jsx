import { Link } from '@inertiajs/react';
import { FiCheckSquare, FiFolder, FiList, FiMessageSquare, FiUsers } from 'react-icons/fi';
import { useTheme } from '@/Components/ThemeProvider';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { LucideLayoutDashboard } from 'lucide-react';

const MENU_CONFIG = [
    // --- KATEGORI 2: KELOLA SURVEY ---
    {
        label: 'Dashboard',
        icon: LucideLayoutDashboard,
        routeName: 'admin.dashboard',
        activePattern: 'admin.dashboard',
        roles: ['admin']
    },
    {
        isGroup: true,
        label: "Kelola Survey",
        roles: ["admin"]
    },
    {
        label: "Daftar Pernyataan",
        icon: FiCheckSquare,
        routeName: "admin.questions.index",
        activePattern: "admin.questions.*",
        roles: ["admin"]
    },
    {
        label: "Hasil Responden",
        icon: FiMessageSquare,
        routeName: "admin.responses.index", 
        activePattern: "admin.responses.*",
        roles: ["admin"]
    },
    // --- KATEGORI 1: MASTER DATA ---
    {
        isGroup: true,
        label: "Master Data",
        roles: ["admin"]
    },
    {
        label: "Data Teacher",
        icon: FaChalkboardTeacher,
        routeName: "admin.teachers.index",
        activePattern: "admin.teachers.*",
        roles: ["admin"]
    },
    {
        label: "Daftar Indikator",
        icon: FiFolder,
        routeName: "admin.indicators.index",
        activePattern: "admin.indicators.*",
        roles: ["admin"]
    },
   
];


export default function Sidebar({ user, isOpen = true }) {
    const userRole = user?.role || 'admin';
    const { theme } = useTheme(); 

    return (
        <div className="w-full h-full flex-col py-3 overflow-y-auto hidden md:flex no-scrollbar">

          
            <div className={`flex items-center mb-6 transition-all duration-300 ${isOpen ? 'px-5 py-2' : 'justify-center py-2'}`}>
               
                <a href="/">
                    <div className={`relative overflow-hidden transition-all duration-300 flex items-center justify-center ${isOpen ? 'w-40 h-11' : 'w-10 h-10'}`}>
                        <img
                        
                            src={theme === 'dark' ? "/images/timedoor-logo-putih.png" : "/images/timedoor-logo.png"}
                            alt="Timedoor Academy"
                            className={`w-full h-full transition-all duration-300 ${isOpen ? 'object-contain object-left' : 'object-cover object-left'}`}
                        />
                    </div>
                </a>
            </div>

           
            <nav className="flex-1 space-y-1 px-2">
                {MENU_CONFIG.map((item, index) => {
                    if (!item.roles.includes(userRole)) return null;

                    if (item.isGroup) {
                        return (
                            <div key={index} className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'pt-5 pb-2 px-2 max-h-12 opacity-100' : 'max-h-0 opacity-0 m-0 p-0'}`}>
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