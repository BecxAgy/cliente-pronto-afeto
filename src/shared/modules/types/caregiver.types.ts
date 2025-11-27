import { Status } from '@/src/subdomains/proposal/types';
import { Patology } from './patology.types';

export interface Address {
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  numero: string;
  complemento: string;
  pontoReferencia?: string;
}

export interface Caregiver {
  cuidadorId: number;
  fotoUrl: string;
  nome: string;
  nomeApresentacao: string;
  telefone: string;
  rg: string;
  endereco: Address;
  nomePai: string;
  nomeMae: string;
  mediaAvaliacao: number;
  dataNascimento: [number, number, number]; // [ano, mês, dia]
  peso: number;
  altura: number;
  escolaridade: string; //tipo específico para os níveis de escolaridade
  titulacao: string;
  tempoExperiencia: number;
  experiencias: Patology[]; // Uma lista de experiências, assumindo que seja uma lista de strings
  habilidades: string[]; // Uma lista de habilidades, também assumindo que seja uma lista de strings
  apresentacao: string;
  statusCuidador: Status;
}

export interface CaregiverDtoGet {
  content: Caregiver[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
}
