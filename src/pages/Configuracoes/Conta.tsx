
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Conta = () => {
  const [nome, setNome] = useState("John Doe");
  const [imagem, setImagem] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    // Aqui implementaria a lógica de salvar no backend
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Configurações da Conta</h2>
        <Card className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={imagem} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => document.getElementById('avatar')?.click()}>
              Alterar foto
            </Button>
            <input
              id="avatar"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagem(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <Button onClick={handleSave}>Salvar alterações</Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Conta;
