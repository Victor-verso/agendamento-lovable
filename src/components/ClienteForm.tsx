
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/data/mockDatabase";

const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const ClienteForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    servico: "",
    data: "",
    horario: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const servicos = db.servicos.getAll();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar novo cliente
    const novoCliente = db.clientes.create({
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
    });

    // Buscar serviço selecionado
    const servicoSelecionado = db.servicos.getById(Number(formData.servico));
    
    if (servicoSelecionado) {
      // Criar novo agendamento
      db.agendamentos.create({
        clienteId: novoCliente.id,
        servico: servicoSelecionado.nome,
        data: formData.data,
        horario: formData.horario,
        valor: servicoSelecionado.valor,
        status: "agendado",
      });
    }

    toast({
      title: "Agendamento realizado!",
      description: "O cliente foi cadastrado com sucesso.",
    });

    setOpen(false);
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      servico: "",
      data: "",
      horario: "",
    });
    
    // Redirecionar para a agenda
    navigate("/agenda");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente e agende um horário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Digite o nome do cliente"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="cliente@email.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="servico">Serviço</Label>
              <Select
                value={formData.servico}
                onValueChange={(value) => setFormData({ ...formData, servico: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicos.map((servico) => (
                    <SelectItem key={servico.id} value={String(servico.id)}>
                      {servico.nome} - {servico.valor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="horario">Horário</Label>
              <Select
                value={formData.horario}
                onValueChange={(value) => setFormData({ ...formData, horario: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((horario) => (
                    <SelectItem key={horario} value={horario}>
                      {horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Cadastrar Cliente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClienteForm;
