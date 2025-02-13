
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ClienteForm from "@/components/ClienteForm";

const Clientes = () => {
  return (
    <Layout>
      <div className="space-y-4">
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
      </div>
    </Layout>
  );
};

export default Clientes;
