
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

const Personalizacao = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Personalização</h2>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sun className="h-5 w-5" />
              <Label>Tema Escuro</Label>
              <Moon className="h-5 w-5" />
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Personalizacao;
