
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Agenda from "./pages/Agenda";
import Clientes from "./pages/Clientes";
import Dashboard from "./pages/Dashboard";
import Notificacoes from "./pages/Notificacoes";
import Financeiro from "./pages/Financeiro";
import Horarios from "./pages/Configuracoes/Horarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/configuracoes/horarios" element={<Horarios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
