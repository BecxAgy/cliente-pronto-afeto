'use client';

import { useActionState, useEffect, useRef } from 'react';

import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { State } from '../../types';
import { Button } from '@/src/shared/modules/components/ui/button';
import { loginWithGoogle } from '../../actions';

export const CallbackInterface = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { token } = searchParams;
  const initialState: State<undefined> = {
    errors: undefined,
    message: '',
    error: false,
  };

  const [formState, formAction] = useActionState(loginWithGoogle, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (token && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [token]);

  useEffect(() => {
    if (formState) {
      if (
        !formState.error &&
        formState.message === 'Login efetuado com sucesso'
      ) {
        redirect('/home');
      } else if (formState.message) {
        redirect('auth/login');
      }
    }
  }, [formState.error, formState.message, formState]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col items-center gap-5"
    >
      <input type="hidden" name="token" value={token} />
      <Button
        className=" flex items-center justify-center h-screen w-full"
        type="submit"
      >
        <Loader2
          className="animate-spin text-purple-primary text-8xl"
          width={100}
          height={100}
        />
      </Button>
    </form>
  );
};
