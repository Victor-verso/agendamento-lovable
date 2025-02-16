import { useState } from "react";
import { Calendar, Users, LayoutDashboard, Settings, Bell, Clock, type LucideIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: NavItem[];
}
const navItems: NavItem[] = [{
  icon: Calendar,
  label: "Agenda",
  href: "/agenda"
}, {
  icon: Users,
  label: "Clientes",
  href: "/clientes"
}, {
  icon: LayoutDashboard,
  label: "Dashboard",
  href: "/dashboard"
}, {
  icon: Settings,
  label: "Configurações",
  href: "/configuracoes",
  subItems: [{
    icon: User,
    label: "Conta",
    href: "/configuracoes/conta"
  }, {
    icon: Clock,
    label: "Horários",
    href: "/configuracoes/horarios"
  }, {
    icon: Bell,
    label: "Notificações",
    href: "/notificacoes"
  }, {
    icon: Settings,
    label: "Personalização",
    href: "/configuracoes/personalizacao"
  }]
}];
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({
  children
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };
  return <div className="min-h-screen flex bg-background">
      <aside className={cn("fixed lg:static lg:flex flex-col w-64 h-screen transition-all duration-300 ease-in-out bg-white border-r shadow-sm", sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-semibold text-primary">ServiceHub</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">VM</span>
            </div>
            <div>
              <p className="font-medium">Victor Martins</p>
              <p className="text-sm text-gray-500">Profissional</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.href === location.pathname)?.label || "Dashboard"}
          </h1>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>;
};
export default Layout;