'use client';

import React, { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Popover } from '@radix-ui/react-popover';
import {
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/modules/components/ui/popover';
import { Button } from '@/src/shared/modules/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { downloadContract } from '../actions';
import { State } from '@/src/shared/modules/types/state.types';

interface CardDownloadContractProps {
  proposalId: string;
}

const CardDownloadContract: React.FC<CardDownloadContractProps> = ({
  proposalId,
}) => {
  const initialState: State<{ pdfBase64?: string }> = {
    errors: {},
    message: '',
    error: false,
  };

  const [state, action, loading] = useActionState(
    downloadContract,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.message || 'Erro ao baixar contrato');
    }

    if (!state.error && state.data?.pdfBase64) {
      // Converte base64 para blob e faz download
      const base64Data = state.data.pdfBase64.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.codePointAt(i) ?? 0;
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = globalThis.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `contract_${proposalId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      globalThis.URL.revokeObjectURL(url);

      toast.success('Contrato baixado com sucesso');
    }
  }, [state, proposalId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <form action={action}>
          <input type="hidden" name="proposalId" defaultValue={proposalId} />
          <Button
            type="submit"
            variant={'outline'}
            size={'sm'}
            disabled={loading}
            className="hover:bg-slate-100 bg-purple-primary/40 flex rounded-full justify-center w-fit h-fit p-3 items-center"
          >
            {loading ? (
              <Loader2 className="animate-spin text-purple-pastel text-xl" />
            ) : (
              <UploadCloud className="text-xl" />
            )}
          </Button>
        </form>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-2 rounded-xl w-fit">
        Baixar Contrato
      </PopoverContent>
    </Popover>
  );
};

export default CardDownloadContract;
