
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";
import { db, Agendamento } from "@/data/mockDatabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO, compareAsc } from "date-fns";
import { ptBR } from "date-fns/locale";

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadAgendamentos = () => {
      const todosAgendamentos = db.agendamentos.getAll();
      // Ordenar por data e horário
      const sortedAgendamentos = todosAgendamentos.sort((a, b) => {
        const dateCompare = compareAsc(parseISO(a.data), parseISO(b.data));
        if (dateCompare === 0) {
          return a.horario.localeCompare(b.horario);
        }
        return dateCompare;
      });
      setAgendamentos(sortedAgendamentos);
    };

    loadAgendamentos();
  }, []);

  const handleDeleteAgendamento = (id: number) => {
    const newAgendamentos = agendamentos.filter(a => a.id !== id);
    setAgendamentos(newAgendamentos);
    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi removido com sucesso.",
    });
  };

  // Agrupar agendamentos por data
  const agendamentosPorDia = agendamentos.reduce((acc, agendamento) => {
    const data = agendamento.data;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(agendamento);
    return acc;
  }, {} as Record<string, Agendamento[]>);

  // Datas com agendamentos para o calendário
  const datasComAgendamento = new Set(Object.keys(agendamentosPorDia));

  const modifiers = {
    booked: (date: Date) => {
      const dateString = date.toISOString().split('T')[0];
      return datasComAgendamento.has(dateString);
    },
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: 'rgb(var(--primary) / 0.1)',
      color: 'rgb(var(--primary))',
      fontWeight: 'bold',
    },
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Próximos Agendamentos */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Próximos Agendamentos</h2>
          {Object.entries(agendamentosPorDia).map(([data, agendamentosDoDia]) => (
            <div key={data} className="space-y-4">
              <h3 className="text-md font-medium">
                {format(parseISO(data), "EEEE, d 'de' MMMM", { locale: ptBR })}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agendamentosDoDia.map((agendamento) => {
                  const cliente = db.clientes.getById(agendamento.clienteId);
                  return (
                    <Card key={agendamento.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{cliente?.nome}</h3>
                          <p className="text-sm text-gray-500">{agendamento.servico}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary">
                            {agendamento.valor}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAgendamento(agendamento.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{agendamento.horario}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Calendário */}
        <div className="flex justify-center p-4 bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
