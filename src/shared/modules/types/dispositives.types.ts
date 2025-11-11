export declare interface Dispositives {
  id: number;
  nome: string;
}

export declare interface DispositivesDtoGet {
  content: Dispositives[];
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
