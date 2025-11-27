export interface Care {
  id: number;
  nome: string;
  nomeApresentacao: string;
  cpf: string;
  peso: string;
  dataNascimento: string;
}

export interface CareDTOGet {
  content: Care[];
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
