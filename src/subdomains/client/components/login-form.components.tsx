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

export const LoginFormComponent = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
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
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
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
              <FieldDescription className="text-center">
                Não tem uma conta? <a href="#">Cadastre-se</a>
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
