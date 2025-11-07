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
import { signUp } from '../actions';
import { SignUp, State } from '../types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ErrorMessage } from '@/src/shared/modules/components/ui/error-message';
import { Loader2 } from 'lucide-react';

export const SignUpComponent = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const initialState: State<SignUp> = {
    errors: {},
    message: '',
    error: false,
  };
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      console.log('🚀 ~ SignUpComponent ~ state.message:', state.message);
      if (!state.error) {
        toast.success(state.message);
        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
      } else {
        console.log('🚀 ~ SignUpComponent ~ state.message:', state.message);
        toast.error(state.message);
      }
    }
  }, [state.error, state.message, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Crie sua conta!</h1>
                <p className="text-muted-foreground text-balance">
                  O cuidado que você merece, a um clique de distância.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="fullname">Nome Completo</FieldLabel>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="João Silva"
                  disabled={isPending}
                  defaultValue=""
                />
                <ErrorMessage
                  name="fullname"
                  errors={state.errors?.fullname || []}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="joao@example.com"
                  disabled={isPending}
                  defaultValue=""
                />
                <ErrorMessage name="email" errors={state.errors?.email || []} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={isPending}
                  placeholder="Min. 8 caracteres"
                />
                <ErrorMessage
                  name="password"
                  errors={state.errors?.password || []}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirme sua senha
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  disabled={isPending}
                  placeholder="Digite a senha novamente"
                />
                <ErrorMessage
                  name="confirmPassword"
                  errors={state.errors?.confirmPassword || []}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar conta'
                  )}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>

              <Link href={`${process.env.NEXT_PUBLIC_API_URL}auth/google`}>
                <Field className="grid grid-cols-1 gap-4">
                  <Button variant="outline" type="button" disabled={isPending}>
                    <Image
                      src={'/icons/google.svg'}
                      width={28}
                      height={28}
                      alt="Ícone da empresa Google"
                    />
                    <span className="sr-only">Entrar com Google</span>
                  </Button>
                </Field>
              </Link>

              <FieldDescription className="text-center">
                Já possui uma conta? <Link href="/auth/login">Entrar</Link>
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
        Ao criar uma conta você concorda com nossos{' '}
        <a href="#">Termos de Serviço</a> e{' '}
        <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
};
