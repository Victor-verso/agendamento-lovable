
import Layout from "@/components/Layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Notificacoes = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Configurações de Notificação</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="novos-agendamentos">Novos agendamentos</Label>
              <Switch id="novos-agendamentos" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notificacoes;
