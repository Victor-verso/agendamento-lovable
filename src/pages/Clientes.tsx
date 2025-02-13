
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { SearchIcon, Trash2 } from "lucide-react";
import ClienteForm from "@/components/ClienteForm";
import { db } from "@/data/mockDatabase";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Clientes = () => {
  const [clientes, setClientes] = useState(db.clientes.getAll());
  const { toast } = useToast();

  useEffect(() => {
    // Atualizar lista de clientes quando houver mudanças
    setClientes(db.clientes.getAll());
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Buscar clientes..."
            />
          </div>
          <ClienteForm />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{cliente.nome}</h3>
                  <p className="text-sm text-gray-500">{cliente.telefone}</p>
                  <p className="text-sm text-gray-500">{cliente.email}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Clientes;
