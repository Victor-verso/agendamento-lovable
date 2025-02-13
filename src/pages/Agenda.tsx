
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Clock } from "lucide-react";

// Dados de exemplo - posteriormente serão carregados do backend
const proximosAgendamentos = [
  {
    id: 1,
    cliente: "Maria Silva",
    servico: "Corte de Cabelo",
    data: "2024-03-20",
    horario: "14:30",
    valor: "R$ 50,00",
  },
  {
    id: 2,
    cliente: "João Santos",
    servico: "Barba",
    data: "2024-03-20",
    horario: "15:30",
    valor: "R$ 30,00",
  },
  {
    id: 3,
    cliente: "Ana Oliveira",
    servico: "Corte e Barba",
    data: "2024-03-21",
    horario: "10:00",
    valor: "R$ 70,00",
  },
];

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className="space-y-6">
        {/* Próximos Agendamentos */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Próximos Agendamentos</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proximosAgendamentos.map((agendamento) => (
              <Card key={agendamento.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{agendamento.cliente}</h3>
                    <p className="text-sm text-gray-500">{agendamento.servico}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {agendamento.valor}
                  </span>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(agendamento.data).toLocaleDateString('pt-BR')} às{' '}
                    {agendamento.horario}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Calendário */}
        <div className="flex justify-center p-4 bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
