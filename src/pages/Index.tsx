
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Clock, DollarSign } from "lucide-react";

const Index = () => {
  const stats = [
    {
      label: "Agendamentos Hoje",
      value: "8",
      icon: Calendar,
      color: "text-blue-500",
      trend: "+2",
    },
    {
      label: "Total de Clientes",
      value: "124",
      icon: Users,
      color: "text-green-500",
      trend: "+5",
    },
    {
      label: "Horários Disponíveis",
      value: "12",
      icon: Clock,
      color: "text-purple-500",
      trend: "-3",
    },
    {
      label: "Receita do Dia",
      value: "R$ 750",
      icon: DollarSign,
      color: "text-yellow-500",
      trend: "+R$ 150",
    },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades de hoje.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-full ${stat.color} bg-opacity-10`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${stat.color}`}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Novo agendamento - Maria Silva</p>
                  <p className="text-sm text-gray-500">Hoje às 14:30</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
