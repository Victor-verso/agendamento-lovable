
interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

interface Agendamento {
  id: number;
  clienteId: number;
  servico: string;
  data: string;
  horario: string;
  valor: string;
  status: "agendado" | "concluido" | "cancelado";
}

interface Servico {
  id: number;
  nome: string;
  duracao: string;
  valor: string;
}

// Mock de dados iniciais
let clientes: Cliente[] = [
  {
    id: 1,
    nome: "Maria Silva",
    telefone: "(11) 99999-9999",
    email: "maria@email.com",
  },
  {
    id: 2,
    nome: "João Santos",
    telefone: "(11) 88888-8888",
    email: "joao@email.com",
  },
];

let agendamentos: Agendamento[] = [
  {
    id: 1,
    clienteId: 1,
    servico: "Corte de Cabelo",
    data: "2024-03-20",
    horario: "14:30",
    valor: "R$ 50,00",
    status: "agendado",
  },
  {
    id: 2,
    clienteId: 2,
    servico: "Barba",
    data: "2024-03-20",
    horario: "15:30",
    valor: "R$ 30,00",
    status: "agendado",
  },
];

const servicos: Servico[] = [
  { id: 1, nome: "Corte de Cabelo", duracao: "30min", valor: "R$ 50,00" },
  { id: 2, nome: "Barba", duracao: "20min", valor: "R$ 30,00" },
  { id: 3, nome: "Corte e Barba", duracao: "50min", valor: "R$ 70,00" },
];

// Funções para simular operações de banco de dados
export const db = {
  clientes: {
    getAll: () => [...clientes],
    getById: (id: number) => clientes.find(c => c.id === id),
    create: (cliente: Omit<Cliente, "id">) => {
      const newCliente = { ...cliente, id: clientes.length + 1 };
      clientes.push(newCliente);
      return newCliente;
    },
  },
  agendamentos: {
    getAll: () => [...agendamentos],
    getByDate: (data: string) => agendamentos.filter(a => a.data === data),
    create: (agendamento: Omit<Agendamento, "id">) => {
      const newAgendamento = { ...agendamento, id: agendamentos.length + 1 };
      agendamentos.push(newAgendamento);
      return newAgendamento;
    },
  },
  servicos: {
    getAll: () => [...servicos],
    getById: (id: number) => servicos.find(s => s.id === id),
  },
};

export type { Cliente, Agendamento, Servico };
