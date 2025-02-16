
import { useState } from "react";
import { Calendar, User, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  {
    icon: Calendar,
    label: "Agendar Serviço",
    href: "/cliente/agendar"
  },
  {
    icon: Clock,
    label: "Meus Agendamentos",
    href: "/cliente/agendamentos"
  },
  {
    icon: User,
    label: "Meu Perfil",
    href: "/cliente/perfil"
  }
];

const ClienteLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={cn(
        "fixed lg:static lg:flex flex-col w-64 h-screen transition-all duration-300 ease-in-out bg-white border-r shadow-sm",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-semibold text-primary">Área do Cliente</span>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors group",
                  isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 mr-3 transition-colors",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Cliente</p>
              <p className="text-sm text-gray-500">Área do Cliente</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.href === location.pathname)?.label || "Área do Cliente"}
          </h1>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ClienteLayout;
