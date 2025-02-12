
import { useState } from "react";
import { Calendar, Users, Clock, BellRing, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Calendar, label: "Agenda", href: "/agenda" },
  { icon: Users, label: "Clientes", href: "/clientes" },
  { icon: Clock, label: "Horários", href: "/horarios" },
  { icon: BellRing, label: "Notificações", href: "/notificacoes" },
  { icon: DollarSign, label: "Financeiro", href: "/financeiro" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static lg:flex flex-col w-64 h-screen transition-all duration-300 ease-in-out bg-white border-r shadow-sm",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-semibold text-primary">ServiceHub</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary transition-colors" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">Profissional</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-white flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
