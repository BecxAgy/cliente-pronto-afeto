export interface Login {
  email?: string[];
  password?: string;
}

export interface State<T> {
  errors: {
    [K in keyof T]?: string[];
  };
  message?: string | null;
  error?: boolean;
}

interface Address {
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  numero: string;
  complemento: string;
  pontoReferencia?: string;
}

export interface Client {
  id: number;
  cpf: string;
  nome: string;
  nomeApresentacao: string;
  telefone: string;
  rg: string;
  endereco: Address;
  nacionalidade: string;
  estadoCivil: string;
}
