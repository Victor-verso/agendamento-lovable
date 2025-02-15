
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import RecuperarSenha from "@/pages/auth/RecuperarSenha";
import Agenda from "@/pages/Agenda";
import Servicos from "@/pages/Servicos";
import Dashboard from "@/pages/Dashboard";
import Clientes from "@/pages/Clientes";
import Financeiro from "@/pages/Financeiro";
import Notificacoes from "@/pages/Notificacoes";
import ConfiguracoesConta from "@/pages/Configuracoes/Conta";
import ConfiguracoesHorarios from "@/pages/Configuracoes/Horarios";
import ConfiguracoesPersonalizacao from "@/pages/Configuracoes/Personalizacao";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/cadastro" element={<Register />} />
          <Route path="/auth/recuperar-senha" element={<RecuperarSenha />} />

          {/* Protected Routes */}
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/configuracoes/conta" element={<ConfiguracoesConta />} />
          <Route path="/configuracoes/horarios" element={<ConfiguracoesHorarios />} />
          <Route
            path="/configuracoes/personalizacao"
            element={<ConfiguracoesPersonalizacao />}
          />
          
          {/* Redirect root to services */}
          <Route path="/" element={<Navigate to="/servicos" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
