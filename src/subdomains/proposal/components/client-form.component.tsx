'use client';

import { User, Phone, FileText, MapPin, Home } from 'lucide-react';

import { SelectItem } from '@/src/shared/modules/components/ui/select';
import {
  SelectField,
  TextField,
} from '@/src/shared/modules/components/ui/form-field.component';

const CIVIL_STATES = [
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
] as const;

interface ClientFormStepProps {
  readonly hasExistingClient?: boolean;
}

function ClientFormStep({ hasExistingClient = false }: ClientFormStepProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Dados do Cliente</h2>
        <p className="text-muted-foreground">
          {hasExistingClient
            ? 'Seus dados já estão cadastrados. Você pode prosseguir para a próxima etapa.'
            : 'Preencha seus dados pessoais para prosseguir com a proposta.'}
        </p>
      </section>

      {/* Informações Pessoais */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Informações Pessoais</h3>

        <TextField
          name="client.nome"
          label="Nome Completo"
          placeholder="João Silva"
          icon={User}
          disabled={hasExistingClient}
        />

        <TextField
          name="client.nomeApresentacao"
          label="Como gostaria de ser chamado?"
          placeholder="João"
          icon={User}
          disabled={hasExistingClient}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="client.nacionalidade"
            label="Nacionalidade"
            placeholder="Brasileiro"
            disabled={hasExistingClient}
          />

          <SelectField
            name="client.estadoCivil"
            label="Estado Civil"
            placeholder="Selecione"
            disabled={hasExistingClient}
          >
            {CIVIL_STATES.map(state => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectField>
        </div>
      </section>

      {/* Documentos e Contato */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Documentos e Contato</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="client.cpf"
            label="CPF"
            placeholder="000.000.000-00"
            icon={FileText}
            disabled={hasExistingClient}
          />

          <TextField
            name="client.rg"
            label="RG"
            placeholder="00.000.000-0"
            icon={FileText}
            disabled={hasExistingClient}
          />
        </div>

        <TextField
          name="client.telefone"
          label="Telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          icon={Phone}
          disabled={hasExistingClient}
        />
      </section>

      {/* Endereço */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Endereço</h3>

        <TextField
          name="client.endereco.cep"
          label="CEP"
          placeholder="00000-000"
          icon={MapPin}
          disabled={hasExistingClient}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="client.endereco.estado"
            label="Estado"
            placeholder="Bahia"
            disabled={hasExistingClient}
          />

          <TextField
            name="client.endereco.cidade"
            label="Cidade"
            placeholder="Salvador"
            disabled={hasExistingClient}
          />
        </div>

        <TextField
          name="client.endereco.bairro"
          label="Bairro"
          placeholder="Pituba"
          disabled={hasExistingClient}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TextField
              name="client.endereco.rua"
              label="Rua"
              placeholder="Rua das Flores"
              icon={Home}
              disabled={hasExistingClient}
            />
          </div>

          <TextField
            name="client.endereco.numero"
            label="Número"
            placeholder="123"
            disabled={hasExistingClient}
          />
        </div>

        <TextField
          name="client.endereco.complemento"
          label="Complemento (opcional)"
          placeholder="Apto 101, Bloco A"
          disabled={hasExistingClient}
        />
      </section>
    </div>
  );
}

export default ClientFormStep;
