
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DiaConfig {
  ativo: boolean;
  inicio: string;
  fim: string;
  intervalo: number;
}

const diasSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const configPadrao = diasSemana.map(() => ({
  ativo: false,
  inicio: "09:00",
  fim: "18:00",
  intervalo: 30,
}));

const Horarios = () => {
  const [config, setConfig] = useState<DiaConfig[]>(() => {
    const saved = localStorage.getItem("horarios-config");
    return saved ? JSON.parse(saved) : configPadrao;
  });
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("horarios-config");
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("horarios-config", JSON.stringify(config));
    toast({
      title: "Configurações salvas",
      description: "As configurações de horário foram atualizadas com sucesso.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Configuração de Horários</h2>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>

        <div className="grid gap-4">
          {diasSemana.map((dia, index) => (
            <Card key={dia} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config[index].ativo}
                      onCheckedChange={(checked) => {
                        const newConfig = [...config];
                        newConfig[index].ativo = checked;
                        setConfig(newConfig);
                      }}
                    />
                    <Label>{dia}</Label>
                  </div>
                  {config[index].ativo && (
                    <div className="flex gap-4">
                      <div>
                        <Label>Início</Label>
                        <Input
                          type="time"
                          value={config[index].inicio}
                          onChange={(e) => {
                            const newConfig = [...config];
                            newConfig[index].inicio = e.target.value;
                            setConfig(newConfig);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Fim</Label>
                        <Input
                          type="time"
                          value={config[index].fim}
                          onChange={(e) => {
                            const newConfig = [...config];
                            newConfig[index].fim = e.target.value;
                            setConfig(newConfig);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Intervalo (min)</Label>
                        <Input
                          type="number"
                          min="15"
                          step="15"
                          value={config[index].intervalo}
                          onChange={(e) => {
                            const newConfig = [...config];
                            newConfig[index].intervalo = Number(e.target.value);
                            setConfig(newConfig);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Horarios;
