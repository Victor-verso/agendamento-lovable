
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Financeiro = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Faturamento do Dia</h3>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Faturamento do Mês</h3>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Comparativo</h3>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Financeiro;
