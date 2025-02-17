
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Search, MapPin, Star } from "lucide-react";

const AgendarServico = () => {
  const [step, setStep] = useState<'estabelecimento' | 'agendamento'>('estabelecimento');
  const [selectedEstablishment, setSelectedEstablishment] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  // Mock data for establishments
  const estabelecimentos = [
    {
      id: "1",
      nome: "Barbearia do João",
      endereco: "Rua das Flores, 123",
      avaliacao: 4.8,
      imagem: "https://placehold.co/600x400"
    },
    {
      id: "2",
      nome: "Cortes & Cia",
      endereco: "Av. Principal, 456",
      avaliacao: 4.5,
      imagem: "https://placehold.co/600x400"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Agendamento realizado!",
      description: "Seu horário foi agendado com sucesso.",
    });
  };

  const handleEstablishmentSelect = (establishmentId: string) => {
    setSelectedEstablishment(establishmentId);
    setStep('agendamento');
  };

  if (step === 'estabelecimento') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Selecione o Estabelecimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Buscar estabelecimento..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {estabelecimentos.map((estabelecimento) => (
            <Card
              key={estabelecimento.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleEstablishmentSelect(estabelecimento.id)}
            >
              <div className="aspect-video relative">
                <img
                  src={estabelecimento.imagem}
                  alt={estabelecimento.nome}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg mb-2">{estabelecimento.nome}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{estabelecimento.endereco}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{estabelecimento.avaliacao}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => setStep('estabelecimento')}
      >
        ← Voltar para estabelecimentos
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Selecione a Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Serviço</label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corte">Corte de Cabelo</SelectItem>
                    <SelectItem value="barba">Barba</SelectItem>
                    <SelectItem value="combo">Combo (Corte + Barba)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Horário</label>
                <Select
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Confirmar Agendamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgendarServico;
