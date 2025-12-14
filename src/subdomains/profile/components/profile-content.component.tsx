'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/modules/components/ui/card';
import { Input } from '@/src/shared/modules/components/ui/input';
import { Label } from '@/src/shared/modules/components/ui/label';
import { Button } from '@/src/shared/modules/components/ui/button';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  profileEditInputSchema,
  ProfileEditInputSchemaProps,
} from '../schemas';
import { ProfileFormProvider } from '../contexts/profile-form.context';
import { ProfileTextField } from './ui/form-fields';
import { Form } from '@/src/shared/modules/components/ui/form';
import { updateProfile } from '../actions';
import { toast } from 'sonner';
import { ClientResponse } from '../types';

export default function ProfileContent({
  profile,
}: Readonly<{ profile: ClientResponse }>) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileEditInputSchemaProps>({
    resolver: zodResolver(profileEditInputSchema),
    defaultValues: {
      nome: profile.nome || '',
      nomeApresentacao: profile.nomeApresentacao || '',
      telefone: profile.telefone || '',
      endereco: {
        rua: profile.endereco?.rua || '',
        cidade: profile.endereco?.cidade || '',
        estado: profile.endereco?.estado || '',
        cep: profile.endereco?.cep || '',
        bairro: profile.endereco?.bairro || '',
        complemento: profile.endereco?.complemento || '',
        numero: profile.endereco?.numero || '',
      },
      nacionalidade: profile.nacionalidade || '',
      estadoCivil: profile.estadoCivil || '',
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  useEffect(() => {
    if (!isEditing) {
      form.reset({
        nome: profile.nome || '',
        nomeApresentacao: profile.nomeApresentacao || '',
        telefone: profile.telefone || '',
        endereco: {
          rua: profile.endereco?.rua || '',
          cidade: profile.endereco?.cidade || '',
          estado: profile.endereco?.estado || '',
          cep: profile.endereco?.cep || '',
          bairro: profile.endereco?.bairro || '',
          complemento: profile.endereco?.complemento || '',
          numero: profile.endereco?.numero || '',
        },
        nacionalidade: profile.nacionalidade || '',
        estadoCivil: profile.estadoCivil || '',
      });
    }
  }, [isEditing, profile, form]);

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const onSubmit = async (data: ProfileEditInputSchemaProps) => {
    // Verificar se há campos modificados
    const hasChanges = Object.keys(dirtyFields).length > 0;

    if (!hasChanges) {
      toast.info('Nenhuma alteração detectada', {
        description: 'Não há dados para atualizar.',
      });
      setIsEditing(false);
      return;
    }

    // Validar e enviar todos os dados
    try {
      startTransition(async () => {
        const result = await updateProfile(data);

        if (result.error) {
          toast.error('Erro ao atualizar', {
            description: result.message,
          });
        } else {
          toast.success('Perfil atualizado', {
            description: result.message,
          });
          setIsEditing(false);
        }
      });
    } catch {
      toast.error('Erro de validação', {
        description: 'Por favor, verifique os dados inseridos.',
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize seus dados pessoais e informações do perfil.
          </CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        ) : (
          <Button variant="default" onClick={() => setIsEditing(true)}>
            Editar Perfil
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileFormProvider form={form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ProfileTextField
                  name="nome"
                  label="Nome"
                  placeholder="Seu nome completo"
                  disabled={!isEditing || isPending}
                />
                <ProfileTextField
                  name="nomeApresentacao"
                  label="Como gosta de ser chamado"
                  placeholder="Seu nome de apresentação"
                  disabled={!isEditing || isPending}
                />

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" defaultValue={profile.cpf} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input id="rg" defaultValue={profile.rg} disabled />
                </div>

                <ProfileTextField
                  name="telefone"
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  type="tel"
                  disabled={!isEditing || isPending}
                />

                <ProfileTextField
                  name="nacionalidade"
                  label="Nacionalidade"
                  placeholder="Brasileira"
                  disabled={!isEditing || isPending}
                />

                <ProfileTextField
                  name="estadoCivil"
                  label="Estado Civil"
                  placeholder="Solteiro(a)"
                  disabled={!isEditing || isPending}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ProfileTextField
                    name="endereco.rua"
                    label="Rua"
                    placeholder="Nome da rua"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.numero"
                    label="Número"
                    placeholder="123"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.complemento"
                    label="Complemento"
                    placeholder="Apt, bloco, etc. (opcional)"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.bairro"
                    label="Bairro"
                    placeholder="Nome do bairro"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.cidade"
                    label="Cidade"
                    placeholder="Nome da cidade"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.estado"
                    label="Estado"
                    placeholder="UF"
                    disabled={!isEditing || isPending}
                  />
                  <ProfileTextField
                    name="endereco.cep"
                    label="CEP"
                    placeholder="00000-000"
                    disabled={!isEditing || isPending}
                  />
                </div>
              </div>
            </form>
          </Form>
        </ProfileFormProvider>
      </CardContent>
    </Card>
  );
}
