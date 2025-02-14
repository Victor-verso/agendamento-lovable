
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { db, Agendamento } from "@/data/mockDatabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const [periodo, setPeriodo] = useState("dia");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    setAgendamentos(db.agendamentos.getAll());
  }, []);

  const calcularEstatisticas = () => {
    const hoje = new Date();
    let agendamentosFiltrados = [];

    switch (periodo) {
      case "dia":
        agendamentosFiltrados = agendamentos.filter(
          (a) => a.data === format(hoje, 'yyyy-MM-dd')
        );
        break;
      case "semana":
        const inicioSemana = startOfWeek(hoje, { locale: ptBR });
        const fimSemana = endOfWeek(hoje, { locale: ptBR });
        agendamentosFiltrados = agendamentos.filter((a) => {
          const dataAgendamento = parseISO(a.data);
          return dataAgendamento >= inicioSemana && dataAgendamento <= fimSemana;
        });
        break;
      case "mes":
        const inicioMes = startOfMonth(hoje);
        const fimMes = endOfMonth(hoje);
        agendamentosFiltrados = agendamentos.filter((a) => {
          const dataAgendamento = parseISO(a.data);
          return dataAgendamento >= inicioMes && dataAgendamento <= fimMes;
        });
        break;
    }

    const totalClientes = new Set(agendamentosFiltrados.map(a => a.clienteId)).size;
    const totalAgendamentos = agendamentosFiltrados.length;
    const totalValor = agendamentosFiltrados.reduce((acc, curr) => {
      const valor = parseFloat(curr.valor.replace('R$ ', '').replace(',', '.'));
      return acc + valor;
    }, 0);

    return {
      clientes: totalClientes,
      agendamentos: totalAgendamentos,
      valor: totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    };
  };

  const prepararDadosGrafico = () => {
    // Agrupa agendamentos por data e soma os valores
    const dadosAgrupados = agendamentos.reduce((acc, curr) => {
      const valor = parseFloat(curr.valor.replace('R$ ', '').replace(',', '.'));
      if (!acc[curr.data]) {
        acc[curr.data] = 0;
      }
      acc[curr.data] += valor;
      return acc;
    }, {} as Record<string, number>);

    // Converte para o formato esperado pelo gráfico
    return Object.entries(dadosAgrupados).map(([data, valor]) => ({
      data: format(parseISO(data), 'dd/MM'),
      valor: valor,
    })).sort((a, b) => a.data.localeCompare(b.data));
  };

  const estatisticas = calcularEstatisticas();
  const dadosGrafico = prepararDadosGrafico();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dia">Hoje</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mês</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Clientes</h3>
            <p className="text-2xl font-bold">{estatisticas.clientes}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Ganhos</h3>
            <p className="text-2xl font-bold">{estatisticas.valor}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Agendamentos</h3>
            <p className="text-2xl font-bold">{estatisticas.agendamentos}</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Evolução de Agendamentos</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Bar dataKey="valor" fill="#4f46e5" name="Valor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
