
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Clientes</h3>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Ganhos</h3>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Agendamentos</h3>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
