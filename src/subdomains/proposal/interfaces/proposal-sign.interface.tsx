'use client';
import { State } from '@/src/shared/modules/types/state.types';
import React, { useActionState, useEffect } from 'react';
import { ProposalSign } from '../types';
import { sendSignature } from '../actions';
import { Button } from '@/src/shared/modules/components/ui/button';
import SignaturField from '../components/signature-field.component';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/modules/components/ui/card';
import CardDownloadContract from '../components/card-download-contract';
import { toast } from 'sonner';

export const ProposalSignInterface = ({
  proposalId,
}: {
  proposalId: string;
}) => {
  const initialState: State<ProposalSign> = {
    errors: {},
    message: '',
    error: false,
  };
  const [state, action, loading] = useActionState(sendSignature, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.message || 'Erro ao enviar assinatura');
    } else if (state.message && !state.error) {
      toast.success(state.message);
    }
  }, [state.error, state.message]);

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-background/95 to-primary/10 dark:from-background dark:via-background/95 dark:to-primary/20" />
      <Card className="w-full max-w-3xl mx-auto mt-10 p-6 relative z-10">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="text-2xl font-bold ">
              Assinar Proposta
            </CardTitle>
            <CardDescription className="text-accent ">
              Por favor, envie sua assinatura para concluir o processo.
            </CardDescription>
          </div>
          <CardDownloadContract proposalId={proposalId} />
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <input type="hidden" name="id" defaultValue={proposalId} />
            <SignaturField />
            <Button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Assinatura'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
