'use client';
import { Button } from '@/src/shared/modules/components/ui/button';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/src/shared/modules/components/ui/field';
import { Input } from '@/src/shared/modules/components/ui/input';
import { cn } from '@/src/shared/modules/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { login } from '../actions';
import { Login } from '../types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ErrorMessage } from '@/src/shared/modules/components/ui/error-message';
import { State } from '@/src/shared/modules/types/state.types';

export const LoginFormComponent = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const initialState: State<Login> = { errors: {}, message: '', error: false };
  const [state, formAction] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (!state.error && state.message === 'Login efetuado com sucesso') {
        router.push('/');
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state.error, state.message, state, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-muted-foreground text-balance">
                  Entre com sua conta para continuar
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <ErrorMessage name="email" errors={state.errors?.email || []} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input name="password" type="password" required />
                <ErrorMessage
                  name="password"
                  errors={state.errors?.password || []}
                />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}auth/google`}>
                <Field className="grid grid-cols-1 gap-4">
                  <Button variant="outline" type="button">
                    <Image
                      src={'/icons/google.svg'}
                      width={28}
                      height={28}
                      alt="Icone da empresa google"
                    />
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </Field>
              </Link>

              <FieldDescription className="text-center">
                Não tem uma conta? <Link href="/auth/signup">Cadastre-se</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              fill
              src="/images/background-afeto.png"
              alt="Pessoa segurando a mão de uma idosa negra, simbolizando cuidado e apoio."
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao entrar você concorda com nossos <a href="#">Termos de Serviço</a> e{' '}
        <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
};
