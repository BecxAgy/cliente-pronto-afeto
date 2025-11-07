'use client';

import React from 'react';
import { ThemeToggler } from '@/src/shared/modules/components/theme/theme-toggler';
import { useTheme } from '@/src/shared/modules/hooks/use-theme';
import { Button } from '@/src/shared/modules/components/ui/button';
import { Separator } from '@/src/shared/modules/components/ui/separator';

/**
 * Componente de demonstração da paleta de cores
 * Mostra todas as cores disponíveis no tema
 */
export function ThemeDemo() {
  const { isDark, resolvedTheme } = useTheme();
  return (
    <div className="container mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Sistema de Temas - Pronto Afeto
          </h1>
          <p className="text-muted-foreground mt-2">
            Modo atual: <span className="font-semibold">{resolvedTheme}</span>
          </p>
        </div>
        <ThemeToggler />
      </div>

      <Separator />

      {/* Cores Principais */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Cores Principais
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ColorCard
            name="Primary"
            description="Azul da marca - Botões e links principais"
            bgClass="bg-primary"
            textClass="text-primary-foreground"
          />
          <ColorCard
            name="Secondary"
            description="Cinza claro - Elementos secundários"
            bgClass="bg-secondary"
            textClass="text-secondary-foreground"
          />
          <ColorCard
            name="Accent"
            description={isDark ? 'Branco - Destaque' : 'Preto - Destaque'}
            bgClass="bg-accent"
            textClass="text-accent-foreground"
          />
          <ColorCard
            name="Muted"
            description="Elementos desabilitados"
            bgClass="bg-muted"
            textClass="text-muted-foreground"
          />
          <ColorCard
            name="Destructive"
            description="Ações destrutivas e erros"
            bgClass="bg-destructive"
            textClass="text-destructive-foreground"
          />
          <ColorCard
            name="Success"
            description="Mensagens de sucesso"
            bgClass="bg-success"
            textClass="text-success-foreground"
          />
        </div>
      </section>

      <Separator />

      {/* Botões */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Variações de Botões
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Exemplos de Cards
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-lg font-semibold">Card Padrão</h3>
            <p className="text-muted-foreground mt-2">
              Card com background e border padrão do tema
            </p>
          </div>
          <div className="rounded-lg border bg-primary p-6 text-primary-foreground shadow-sm">
            <h3 className="text-lg font-semibold">Card Primary</h3>
            <p className="mt-2 opacity-90">
              Card com cor primária da aplicação
            </p>
          </div>
          <div className="rounded-lg border bg-accent p-6 text-accent-foreground shadow-sm">
            <h3 className="text-lg font-semibold">Card Accent</h3>
            <p className="mt-2 opacity-90">Card com cor de destaque</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Tipografia */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tipografia</h2>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
          <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
          <h3 className="text-2xl font-semibold text-foreground">Heading 3</h3>
          <h4 className="text-xl font-semibold text-foreground">Heading 4</h4>
          <p className="text-foreground">
            Texto padrão com cor foreground principal
          </p>
          <p className="text-muted-foreground">
            Texto secundário com cor muted-foreground
          </p>
        </div>
      </section>
    </div>
  );
}

interface ColorCardProps {
  name: string;
  description: string;
  bgClass: string;
  textClass: string;
}

function ColorCard({ name, description, bgClass, textClass }: ColorCardProps) {
  return (
    <div className={`rounded-lg p-6 ${bgClass} ${textClass}`}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm opacity-90">{description}</p>
    </div>
  );
}
