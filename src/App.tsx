
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Cliente
import ClienteLayout from "@/components/ClienteLayout";
import ClienteLogin from "@/pages/cliente/auth/ClienteLogin";
import ClienteRegister from "@/pages/cliente/auth/ClienteRegister";
import AgendarServico from "@/pages/cliente/AgendarServico";
import MeusAgendamentos from "@/pages/cliente/MeusAgendamentos";
import PerfilCliente from "@/pages/cliente/PerfilCliente";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          
          {/* Client Auth Routes */}
          <Route path="/cliente/auth/login" element={<ClienteLogin />} />
          <Route path="/cliente/auth/registrar" element={<ClienteRegister />} />
          
          {/* Protected Client Routes */}
          <Route 
            path="/cliente" 
            element={session ? <ClienteLayout /> : <Navigate to="/cliente/auth/login" />}
          >
            <Route path="agendar" element={<AgendarServico />} />
            <Route path="agendamentos" element={<MeusAgendamentos />} />
            <Route path="perfil" element={<PerfilCliente />} />
          </Route>

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
