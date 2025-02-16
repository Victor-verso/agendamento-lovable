
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import RecuperarSenha from "@/pages/auth/RecuperarSenha";
import Dashboard from "@/pages/Dashboard";
import Agenda from "@/pages/Agenda";
import Clientes from "@/pages/Clientes";
import Financeiro from "@/pages/Financeiro";
import Notificacoes from "@/pages/Notificacoes";
import NotFound from "@/pages/NotFound";

// Configurações
import Conta from "@/pages/Configuracoes/Conta";
import Horarios from "@/pages/Configuracoes/Horarios";
import Personalizacao from "@/pages/Configuracoes/Personalizacao";
import Servicos from "@/pages/Configuracoes/Servicos";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          
          {/* Rotas de Configurações */}
          <Route path="/configuracoes/conta" element={<Conta />} />
          <Route path="/configuracoes/horarios" element={<Horarios />} />
          <Route path="/configuracoes/personalizacao" element={<Personalizacao />} />
          <Route path="/configuracoes/servicos" element={<Servicos />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
