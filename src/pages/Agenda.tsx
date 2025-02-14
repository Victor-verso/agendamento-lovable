
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Clock, Trash2, Grid, List } from "lucide-react";
import { db, Agendamento } from "@/data/mockDatabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO, compareAsc, isAfter, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { toast } = useToast();

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = () => {
    const todosAgendamentos = db.agendamentos.getAll();
    const sortedAgendamentos = todosAgendamentos.sort((a, b) => {
      const dateCompare = compareAsc(parseISO(a.data), parseISO(b.data));
      if (dateCompare === 0) {
        return a.horario.localeCompare(b.horario);
      }
      return dateCompare;
    });
    setAgendamentos(sortedAgendamentos);
  };

  const handleDeleteAgendamento = (id: number) => {
    const newAgendamentos = agendamentos.filter(a => a.id !== id);
    setAgendamentos(newAgendamentos);
    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi removido com sucesso.",
    });
  };

  const agora = new Date();
  const proximosAgendamentos = agendamentos.filter(agendamento => {
    const dataHoraAgendamento = parseISO(`${agendamento.data}T${agendamento.horario}`);
    if (date) {
      return isSameDay(parseISO(agendamento.data), date);
    }
    return isAfter(dataHoraAgendamento, agora);
  });

  const historicoAgendamentos = agendamentos.filter(agendamento => {
    const dataHoraAgendamento = parseISO(`${agendamento.data}T${agendamento.horario}`);
    return !isAfter(dataHoraAgendamento, agora);
  });

  const getAgendamentosPorDia = (data: Date) => {
    return agendamentos.filter(agendamento => 
      isSameDay(parseISO(agendamento.data), data)
    ).length;
  };

  const renderDayContent = (day: Date) => {
    const count = getAgendamentosPorDia(day);
    if (count > 0) {
      return (
        <div className="relative">
          <span>{day.getDate()}</span>
          <Badge variant="secondary" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs">
            {count}
          </Badge>
        </div>
      );
    }
    return <span>{day.getDate()}</span>;
  };

  const renderAgendamentosTabela = (agendamentos: Agendamento[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Horário</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agendamentos.map(agendamento => {
          const cliente = db.clientes.getById(agendamento.clienteId);
          return (
            <TableRow key={agendamento.id}>
              <TableCell>{format(parseISO(agendamento.data), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{agendamento.horario}</TableCell>
              <TableCell>{cliente?.nome}</TableCell>
              <TableCell>{agendamento.servico}</TableCell>
              <TableCell>{agendamento.valor}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteAgendamento(agendamento.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  const renderAgendamentosCard = (agendamentos: Agendamento[]) => {
    const agendamentosPorDia = agendamentos.reduce((acc, agendamento) => {
      const data = agendamento.data;
      if (!acc[data]) {
        acc[data] = [];
      }
      acc[data].push(agendamento);
      return acc;
    }, {} as Record<string, Agendamento[]>);

    return Object.entries(agendamentosPorDia).map(([data, agendamentosDoDia]) => (
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
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Próximos Agendamentos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {date ? `Agendamentos para ${format(date, "dd 'de' MMMM", { locale: ptBR })}` : 'Próximos Agendamentos'}
            </h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("card")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {viewMode === "card" 
            ? renderAgendamentosCard(proximosAgendamentos)
            : renderAgendamentosTabela(proximosAgendamentos)
          }
        </div>

        {/* Calendário */}
        <div className="flex justify-center p-4 bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (date && isSameDay(date, newDate || new Date())) {
                setDate(undefined);
              } else {
                setDate(newDate);
              }
            }}
            locale={ptBR}
            className="rounded-md border"
            components={{
              DayContent: ({ date: dayDate }) => renderDayContent(dayDate)
            }}
          />
        </div>

        {/* Histórico de Agendamentos - Always visible */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Histórico de Agendamentos</h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("card")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {viewMode === "card" 
            ? renderAgendamentosCard(historicoAgendamentos)
            : renderAgendamentosTabela(historicoAgendamentos)
          }
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
