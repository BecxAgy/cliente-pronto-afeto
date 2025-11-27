'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { CheckCircle2, Clock, FileText, Mail, Phone } from 'lucide-react';
import { Button } from '@/src/shared/modules/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/modules/components/ui/card';
import Link from 'next/link';
import { associateUserToClient } from '../actions';
import { State } from '@/src/shared/modules/types/state.types';
import { Associate } from '../types';

interface ProposalSuccessInterfaceProps {
  readonly clientId?: string;
}

function ProposalSuccessInterface({ clientId }: ProposalSuccessInterfaceProps) {
  const initialState: State<Associate> = {
    errors: {},
    message: '',
    error: false,
  };
  const [state, action] = useActionState(associateUserToClient, initialState);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const hasSubmittedRef = useRef(false);

  // Submeter automaticamente quando houver clientId
  useEffect(() => {
    if (clientId && !hasSubmittedRef.current && submitButtonRef.current) {
      hasSubmittedRef.current = true;
      submitButtonRef.current.click();
    }
  }, [clientId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Animation */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse" />
              <CheckCircle2 className="w-24 h-24 text-success relative z-10 animate-scale-in" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Proposta Enviada com Sucesso! 🎉
            </h1>
            <p className="text-muted-foreground text-lg">
              Recebemos sua solicitação de cuidado
            </p>
          </div>
        </div>

        {/* Main Card - Inspired by BlueReceipt */}
        <Card className="animate-fade-in-up animation-delay-100 p-0">
          <CardHeader className="relative overflow-hidden rounded-t-xl py-4">
            {/* Gradient Background Similar to BlueReceipt */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
            </div>

            <div className="relative z-10 text-white space-y-2">
              <CardTitle className="text-2xl">Próximos Passos</CardTitle>
              <CardDescription className="text-white/80">
                O que acontece agora?
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Timeline Steps */}
            <div className="space-y-4">
              <TimelineStep
                icon={<Clock className="w-5 h-5" />}
                title="Análise da Proposta"
                description="Nossa equipe comercial está analisando sua solicitação e em breve entrará em contato."
                status="current"
              />

              <TimelineStep
                icon={<FileText className="w-5 h-5" />}
                title="Elaboração do Orçamento"
                description="Calcularemos o valor personalizado baseado nas suas necessidades específicas."
                status="pending"
              />

              <TimelineStep
                icon={<Mail className="w-5 h-5" />}
                title="Envio da Proposta"
                description="Você receberá a proposta detalhada com valores e possibilidade de assinatura do plano."
                status="pending"
              />
            </div>

            {/* Summary Info */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Phone className="w-5 h-5 text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Precisa de Ajuda?</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe está disponível para esclarecer qualquer dúvida
                    durante o processo.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form oculto para associação automática */}
        <form action={action} className="hidden">
          <input type="hidden" name="clientId" value={clientId} />
          <button ref={submitButtonRef} type="submit" hidden>
            Associar Cliente
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
          <Button asChild className="flex-1" size="lg">
            <Link href="/">Voltar à Página Inicial</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1" size="lg">
            <Link href="/proposal/all">Ver Minhas Propostas</Link>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
          💙 Tempo médio de resposta: <strong>24 horas</strong>
        </p>
      </div>
    </div>
  );
}

// Timeline Step Component
interface TimelineStepProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly status: 'current' | 'pending' | 'completed';
}

function TimelineStep({ icon, title, description, status }: TimelineStepProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'current':
        return {
          iconBg: 'bg-primary text-primary-foreground',
          line: 'bg-gradient-to-b from-primary to-border',
          title: 'text-foreground font-semibold',
        };
      case 'completed':
        return {
          iconBg: 'bg-success text-success-foreground',
          line: 'bg-success',
          title: 'text-foreground',
        };
      case 'pending':
        return {
          iconBg: 'bg-muted text-muted-foreground',
          line: 'bg-border',
          title: 'text-muted-foreground',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="flex gap-4 group">
      {/* Icon */}
      <div className="flex flex-col items-center">
        <div
          className={`p-3 rounded-full ${styles.iconBg} transition-all group-hover:scale-110`}
        >
          {icon}
        </div>
        <div className={`w-0.5 h-full mt-2 ${styles.line}`} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <h3 className={`font-medium mb-1 ${styles.title}`}>{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default ProposalSuccessInterface;
