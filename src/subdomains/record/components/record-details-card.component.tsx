import React from 'react';
import { Proposal } from '../../proposal/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/shared/modules/components/ui/card';
import { Clock, MapPin, User, Phone, Stethoscope, Bell } from 'lucide-react';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';
import { Badge } from '@/src/shared/modules/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/modules/components/ui/avatar';
import { Patology } from '@/src/shared/modules/types/patology.types';

export const RecordDetailsCard = ({ proposal }: { proposal: Proposal }) => {
  const dataHoraInicio = parseBackendDate(
    proposal.plantao.dataHoraInicioPlantao
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'bg-info text-info-foreground';
      case 'Assinada':
        return 'bg-success text-success-foreground';
      case 'Observacao':
        return 'bg-warning text-warning-foreground';
      case 'Negada':
        return 'bg-destructive text-destructive-foreground';
      case 'Finalizada':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full h-fit sticky top-4">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="mb-2">
              Prontuário
            </Badge>
            <CardTitle className="text-xl md:text-2xl wrap-break-word">
              {proposal.cuidado.nome}
            </CardTitle>
          </div>
          <Badge
            className={`${getStatusColor(proposal.statusProposta)} shrink-0`}
          >
            {proposal.statusProposta}
          </Badge>
        </div>

        {/* Cuidadores */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {proposal.cuidadores.slice(0, 3).map((cuidador, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage src={cuidador.fotoUrl} alt={cuidador.nome} />
                <AvatarFallback>{getInitials(cuidador.nome)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          {proposal.cuidadores.length > 3 && (
            <span className="text-sm text-muted-foreground">
              +{proposal.cuidadores.length - 3}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Data e Horário do Plantão */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {dataHoraInicio.toLocaleDateString('pt-BR', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                •{' '}
                {dataHoraInicio.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {proposal.plantao.diasDaSemana.join(', ')} •{' '}
                {proposal.plantao.turno.join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* Cuidado e Saúde */}
        <section className="space-y-3 pt-3 border-t">
          <div className="flex items-start gap-2">
            <Stethoscope className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Cuidado e Saúde</h4>
              <div className="space-y-2 text-sm">
                {proposal.saude.patologias &&
                proposal.saude.patologias.length > 0 ? (
                  <div>
                    <span className="text-muted-foreground">Patologias:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proposal.saude.patologias.map((pat: Patology, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {pat.nome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    <strong>{proposal.cliente.nomeApresentacao}</strong> não
                    possui patologia registrada.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Local de Atendimento */}
        <section className="space-y-3 pt-3 border-t">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Local de Atendimento</h4>
              <p className="text-sm text-muted-foreground">
                {proposal.localAtendimento.cidade},{' '}
                {proposal.localAtendimento.bairro}
              </p>
              <p className="text-sm text-muted-foreground">
                {proposal.localAtendimento.complemento &&
                  `${proposal.localAtendimento.complemento}, `}
                {proposal.localAtendimento.numero}
              </p>
            </div>
          </div>
        </section>

        {/* Cliente e Contato */}
        <section className="space-y-3 pt-3 border-t">
          <div className="flex items-start gap-2">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Cliente</h4>
              <p className="text-sm font-medium">{proposal.cliente.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-7">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a
              href={`tel:${proposal.cliente.telefone}`}
              className="text-sm text-primary hover:underline font-medium"
            >
              {proposal.cliente.telefone}
            </a>
          </div>
        </section>

        {/* Observações */}
        {proposal.observacao && (
          <section className="space-y-2 pt-3 border-t">
            <div className="flex items-start gap-2">
              <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Observações</h4>
                <p className="text-sm text-muted-foreground">
                  {proposal.observacao}
                </p>
              </div>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
