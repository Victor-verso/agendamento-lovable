
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Scissors } from "lucide-react";

const MeusAgendamentos = () => {
  // TODO: Fetch real appointments from the database
  const agendamentos = [
    {
      id: 1,
      service: "Corte de Cabelo",
      date: "2024-03-20",
      time: "14:00",
      status: "confirmado"
    },
    {
      id: 2,
      service: "Barba",
      date: "2024-03-25",
      time: "10:00",
      status: "pendente"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {agendamentos.map((agendamento) => (
          <Card key={agendamento.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-primary" />
                    <span className="font-medium">{agendamento.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{agendamento.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{agendamento.time}</span>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-semibold rounded-full",
                  agendamento.status === "confirmado" 
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                )}>
                  {agendamento.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MeusAgendamentos;
