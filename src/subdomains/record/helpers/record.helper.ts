import { FeedingTypeEnum, FoodAdministrationTypeEnum } from '../types';

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
