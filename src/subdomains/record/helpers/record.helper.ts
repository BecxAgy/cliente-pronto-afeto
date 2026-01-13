import {
  ActivityEnum,
  FeedingTypeEnum,
  FoodAdministrationTypeEnum,
} from '../types';

// Mapa reverso: String → Enum number (para transformar resposta da API)
const API_TO_ENUM_MAP: Record<string, ActivityEnum> = {
  ALIMENTACAO: ActivityEnum.ALIMENTACAO,
  MOBILIDADE: ActivityEnum.MOBILIDADE,
  DEJECOES: ActivityEnum.DEJECOES,
  DIURESES: ActivityEnum.DIURESES,
  SINAIS_VITAIS: ActivityEnum.SINAIS_VITAIS,
  SONO: ActivityEnum.SONO,
  HIDRATACAO_PELE: ActivityEnum.HIDRATACAO_PELE,
  MEDICAMENTOS: ActivityEnum.MEDICAMENTOS,
};
export const refeicaoImageMap: Record<FeedingTypeEnum, string> = {
  [FeedingTypeEnum.CafeDaManha]: '/icons/ovo.svg',
  [FeedingTypeEnum.LancheDaManha]: '/icons/sanduba.svg',
  [FeedingTypeEnum.Almoço]: '/icons/pasta.svg',
  [FeedingTypeEnum.LancheDaTarde]: '/icons/sanduba.svg',
  [FeedingTypeEnum.Jantar]: '/icons/pasta.svg',
  [FeedingTypeEnum.Ceia]: '/icons/uva.svg',
};

// Nome legível para refeição
export const refeicaoLabelMap: Record<FeedingTypeEnum, string> = {
  [FeedingTypeEnum.CafeDaManha]: 'Café da Manhã',
  [FeedingTypeEnum.LancheDaManha]: 'Lanche da Manhã',
  [FeedingTypeEnum.Almoço]: 'Almoço',
  [FeedingTypeEnum.LancheDaTarde]: 'Lanche da Tarde',
  [FeedingTypeEnum.Jantar]: 'Jantar',
  [FeedingTypeEnum.Ceia]: 'Ceia',
};

// Nome legível para tipo de alimentação
export const tipoAlimentacaoLabelMap: Record<
  FoodAdministrationTypeEnum,
  string
> = {
  [FoodAdministrationTypeEnum.ORAL]: 'Via Oral',
  [FoodAdministrationTypeEnum.SONDA_NASOENTRAL]: 'Sonda Nasoenteral',
  [FoodAdministrationTypeEnum.SOG]: 'SOG',
  [FoodAdministrationTypeEnum.GASTRONOMIA]: 'Gastrostomia',
};

/**
 * Transforma resposta da API (string enums) para formato interno (number enums)
 */
export function transformFromApiFormat(apiData: unknown): unknown {
  if (!apiData || typeof apiData !== 'object') return apiData;

  if (Array.isArray(apiData)) {
    return apiData.map(transformFromApiFormat);
  }

  const data = apiData as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    // Transformar tipo de string para enum number
    if (key === 'tipo' && typeof value === 'string') {
      const tipoEnum = API_TO_ENUM_MAP[value] ?? value;
      result[key] = tipoEnum;

      // Mapear campos específicos de volta baseado no tipo
      if (tipoEnum === ActivityEnum.ALIMENTACAO && data.estado) {
        result.estadoAlimentacao = transformFromApiFormat(data.estado);
      } else if (tipoEnum === ActivityEnum.MOBILIDADE && data.tipoMobilidade) {
        result.tipoMobilidade = data.tipoMobilidade;
      } else if (tipoEnum === ActivityEnum.DEJECOES && data.dejecao) {
        result.dejecoes = data.dejecao;
      } else if (tipoEnum === ActivityEnum.DIURESES && data.diurese) {
        result.tipoDiurese = data.diurese;
      } else if (tipoEnum === ActivityEnum.SONO && data.tipoSono) {
        result.tipoSono = data.tipoSono;
      } else if (
        tipoEnum === ActivityEnum.HIDRATACAO_PELE &&
        data.hidratacaoPelo !== undefined
      ) {
        result.hidratacaoPelo = data.hidratacaoPelo;
      } else if (tipoEnum === ActivityEnum.SINAIS_VITAIS && data.sinalVital) {
        result.sinalVital = transformFromApiFormat(data.sinalVital);
      } else if (tipoEnum === ActivityEnum.MEDICAMENTOS && data.posologia) {
        result.posologia = transformFromApiFormat(data.posologia);
      }
    }
    // Pular campos que já foram mapeados
    else if (!['estado', 'dejecao', 'diurese'].includes(key)) {
      // Recursivamente transformar objetos aninhados
      if (value && typeof value === 'object') {
        result[key] = transformFromApiFormat(value);
      }
      // Manter outros valores como estão
      else {
        result[key] = value;
      }
    }
  }

  return result;
}
