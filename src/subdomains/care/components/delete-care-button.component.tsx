'use client';
import { Button } from '@/src/shared/modules/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/src/shared/modules/components/ui/dialog';
import { State } from '@/src/shared/modules/types/state.types';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Trash2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';
import { DeleteCare } from '../types';
import { deleteCare } from '../actions';

const DeleteCareButton = ({ careId }: { careId: number }) => {
  const initialState: State<DeleteCare> = {
    errors: {},
    message: '',
    error: false,
  };
  const [state, action] = useActionState(deleteCare, initialState);

  useEffect(() => {
    if (state.error === false && state.message) {
      // Ação após cancelamento bem-sucedido, como recarregar a página
      toast.success('Cuidado deletado com sucesso.');
    } else if (state.error === true && state.message) {
      toast.error(state.message || 'Erro ao deletar o cuidado.');
    }
  }, [state.error, state.message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start w-full hover:bg-destructive/10 hover:text-destructive "
        >
          <Trash2 className="mr-2 h-4 w-4" /> Deletar Cuidado
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Cuidado</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este cuidado?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <form action={action}>
              <input hidden defaultValue={careId} name="careId" />
              <Button variant="destructive">Prosseguir</Button>
            </form>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCareButton;
