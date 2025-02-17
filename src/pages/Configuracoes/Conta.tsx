
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  photo_url: string | null;
}

const Conta = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sobre, setSobre] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
    loadProfessionals();
  }, []);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('barbershop_info')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setNome(data.name || '');
        setEndereco(data.address || '');
        setSobre(data.about || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as informações",
        variant: "destructive",
      });
    }
  };

  const loadProfessionals = async () => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*');

      if (error) throw error;

      setProfessionals(data || []);
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
  };

  const uploadImage = async (file: File, bucket: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updates = {
        name: nome,
        address: endereco,
        about: sobre,
      };

      const { error } = await supabase
        .from('barbershop_info')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as informações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfessional = async () => {
    const name = prompt("Nome do profissional:");
    if (!name) return;

    try {
      const { data, error } = await supabase
        .from('professionals')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;

      setProfessionals([...professionals, data]);
      toast({
        title: "Profissional adicionado",
        description: "O profissional foi adicionado com sucesso.",
      });
    } catch (error) {
      console.error('Error adding professional:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o profissional.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfessional = async (professional: Professional) => {
    const name = prompt("Nome do profissional:", professional.name);
    if (!name) return;

    try {
      const { error } = await supabase
        .from('professionals')
        .update({ name })
        .eq('id', professional.id);

      if (error) throw error;

      setProfessionals(professionals.map(p => 
        p.id === professional.id ? { ...p, name } : p
      ));

      toast({
        title: "Profissional atualizado",
        description: "As informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Error updating professional:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o profissional.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProfessional = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este profissional?")) return;

    try {
      const { error } = await supabase
        .from('professionals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProfessionals(professionals.filter(p => p.id !== id));
      toast({
        title: "Profissional removido",
        description: "O profissional foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting professional:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover o profissional.",
        variant: "destructive",
      });
    }
  };

  const handleProfessionalPhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    professionalId: string
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const publicUrl = await uploadImage(file, 'professionals');
      
      const { error } = await supabase
        .from('professionals')
        .update({ photo_url: publicUrl })
        .eq('id', professionalId);

      if (error) throw error;

      setProfessionals(professionals.map(p => 
        p.id === professionalId ? { ...p, photo_url: publicUrl } : p
      ));

      toast({
        title: "Foto atualizada",
        description: "A foto do profissional foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error('Error updating professional photo:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a foto.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Configurações da Conta</h2>
        
        {/* Informações do Estabelecimento */}
        <Card className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Informações do Estabelecimento</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Estabelecimento</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sobre">Sobre</Label>
              <Textarea
                id="sobre"
                value={sobre}
                onChange={(e) => setSobre(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </CardContent>
        </Card>

        {/* Profissionais */}
        <Card className="p-6">
          <CardHeader className="p-0 flex flex-row items-center justify-between">
            <CardTitle>Profissionais</CardTitle>
            <Button onClick={handleAddProfessional}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent className="p-0 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {professionals.map((professional) => (
                <Card key={professional.id} className="p-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={professional.photo_url || ''} />
                        <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-0 right-0"
                        onClick={() => document.getElementById(`photo-${professional.id}`)?.click()}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <input
                        id={`photo-${professional.id}`}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleProfessionalPhotoChange(e, professional.id)}
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="font-medium">{professional.name}</p>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateProfessional(professional)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProfessional(professional.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Conta;
