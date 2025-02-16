
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

const Conta = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('nome, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        setNome(profile.nome || '');
        setImagem(profile.avatar_url || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil",
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        nome,
        avatar_url: imagem,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
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
        description: "Ocorreu um erro ao atualizar o perfil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const publicUrl = await uploadAvatar(file);
      setImagem(publicUrl);
    } catch (error) {
      console.error('Error changing avatar:', error);
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
        <Card className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={imagem} />
              <AvatarFallback>{nome?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => document.getElementById('avatar')?.click()}>
              Alterar foto
            </Button>
            <input
              id="avatar"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
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

          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Conta;
