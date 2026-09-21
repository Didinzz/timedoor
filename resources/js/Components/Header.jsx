import { FiSidebar } from 'react-icons/fi';

export default function Header({ headerTitle, isSidebarOpen, setIsSidebarOpen }) {
    return (
        // 👇 Tinggi diperkecil jadi h-12 (48px)
        <header className="flex items-center gap-4 px-5 h-12 border-b border-border shrink-0 sticky top-0 bg-background z-10">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                title="Toggle Sidebar"
            >
                <FiSidebar className="w-[18px] h-[18px]" />
            </button>
            <div className="h-4 w-px bg-border"></div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">{headerTitle}</h1>
        </header>
    );
}