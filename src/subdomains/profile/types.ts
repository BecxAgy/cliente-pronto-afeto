import { Client } from '@/src/subdomains/client/types';

export interface Endereco {
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  complemento?: string;
  numero: string;
}

export interface ClientResponse extends Client {
  email: string;
}

export interface ClientRequest {
  nome?: string;
  nomeApresentacao?: string;
  telefone?: string;
  endereco?: Endereco;
  nacionalidade?: string;
  estadoCivil?: string;
}
