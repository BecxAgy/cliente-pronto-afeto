'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/modules/components/ui/card';
import { Button } from '@/src/shared/modules/components/ui/button';
import React from 'react';
import CareForm from '../components/care-form';
import { useCareFormContext } from '../contexts/care-form.context';
import { useFormSubmission } from '@/src/shared/modules/hooks/use-form-submission';
import { Form } from '@/src/shared/modules/components/ui/form';
import { updateCare } from '../actions';
import { toast } from 'sonner';
import { Care } from '../types';
import { useRouter } from 'next/navigation';

interface CareEditInterfaceProps {
  careId: string;
}

const CareEditInterface = ({ careId }: CareEditInterfaceProps) => {
  const { form } = useCareFormContext();
  const { isSubmitting, submitWithLoading } = useFormSubmission();
  const router = useRouter();

  const onSubmit = form.handleSubmit(async data => {
    await submitWithLoading(
      async () => {
        const careUpdateData: Omit<Care, 'id'> = {
          nome: data.nome,
          nomeApresentacao: data.nomeApresentacao,
          cpf: data.cpf,
          peso: data.peso,
          dataNascimento: data.dataNascimento.toISOString(),
        };

        const result = await updateCare(Number(careId), careUpdateData);

        if (result.error) {
          throw new Error(result.message);
        }

        return result;
      },
      {
        onSuccess: result => {
          toast.success(result.message || 'Cuidado atualizado com sucesso!');
          router.push('/care/all');
        },
        onError: error => {
          toast.error(error.message || 'Erro ao atualizar cuidado');
        },
      }
    );
  });

  return (
    <main className="h-full w-full relative">
      {/* Gradient Background - Adapts to theme */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-background/95 to-primary/10 dark:from-background dark:via-background/95 dark:to-primary/20" />

      <Card className="w-full max-w-3xl mx-auto mt-10 p-6 relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl">
            Editar <span className="text-primary">cuidado</span>
          </CardTitle>
          <CardDescription>
            Atualize as informações do cuidado abaixo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <CareForm />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/care/all')}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CareEditInterface;
