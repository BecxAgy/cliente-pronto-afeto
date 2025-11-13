import { DatePickerField, TextField } from './ui/form-fields';
import { User, Weight } from 'lucide-react';
import React from 'react';

const CareForm = () => {
  return (
    <div className="space-y-6">
      <TextField
        name="nome"
        label="Nome Completo"
        placeholder="Nome do paciente"
        icon={User}
      />

      <TextField
        name="nomeApresentacao"
        label="Como o paciente gostaria de ser chamado?"
        placeholder="Apelido ou nome de apresentação"
        icon={User}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField name="cpf" label="CPF" placeholder="000.000.000-00" />

        <TextField
          name="peso"
          label="Peso (kg)"
          type="number"
          placeholder="70"
          icon={Weight}
        />
      </div>

      <DatePickerField
        name="dataNascimento"
        label="Data de Nascimento"
        placeholder="DD/MM/AAAA"
      />
    </div>
  );
};

export default CareForm;
