export declare interface Patology {
  id: number;
  nome: string;
}

export declare interface Skill {
  id: number;
  nome: string;
}

export declare interface SkillDtoGet {
  content: Skill[];
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

export declare interface PatologyDtoGet {
  content: Patology[];
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
