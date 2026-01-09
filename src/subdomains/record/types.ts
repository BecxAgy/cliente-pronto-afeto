export enum ActivityEnum {
  ALIMENTACAO,
  MOBILIDADE,
  DEJECOES,
  DIURESES,
  SINAIS_VITAIS,
  ESTADO_GERAL,
  SONO,
  HIDRATACAO_PELE,
  MEDICAMENTOS,
}

export enum SleepTypeEnum {
  BOM,
  RUIM,
  INTERRUPTIVO,
}

export interface VitalSign {
  temperatura: number;
  frequenciaCardiaca: number;
  frequenciaRespiratoria: number;
  pressaoArterial: string;
  dataHoraRegistro: string;
}

export enum MobilityTypeEnum {
  AUTONOMO,
  RESTRITO,
  IMÓVEL,
}

export enum DiuresisTypeEnum {
  NORMAL,
  ELEVADA,
  REDUZIDA,
}

export enum DefecationTypeEnum {
  NORMAL,
  DIARRÉIA,
  CONSTIPAÇÃO,
}
export enum FeedingTypeEnum {
  CafeDaManha,
  Almoço,
  Jantar,
  LancheDaManha,
  LancheDaTarde,
  Ceia,
}
export enum FoodAdministrationTypeEnum {
  ORAL,
  SONDA_NASOENTRAL,
  SOG,
  GASTRONOMIA,
}

export interface FeedingState {
  aceitou: boolean;
  refeicao: FeedingTypeEnum;
  tipoAlimentacao: FoodAdministrationTypeEnum;
}

export interface Posology {
  nomeMedicamento: string;
  dosagem: number;
  unidadeDosagem: string;
  frequencia: number;
  dataInicio: string;
  dataFim: string;
}

export interface Activity {
  tipo: ActivityEnum;
  dataHora: string;
  cuidadorId: number;
}

export interface SleepActivity extends Activity {
  tipoSono: SleepTypeEnum;
}

export interface VitalSignsActivity extends Activity {
  sinalVital: VitalSign;
}

export interface MobilityActivity extends Activity {
  tipoMobilidade: MobilityTypeEnum;
}

export interface DrugAdministrationActivity extends Activity {
  posologia: Posology;
}

export interface HydrationSkinActivity extends Activity {
  hidratacaoPelo: number;
}

export interface GeneralStateActivity extends Activity {
  estadoGeral: {
    estado: string;
  };
}

export interface DiuresisActivity extends Activity {
  tipoDiurese: DiuresisTypeEnum;
}

export interface DefecationActivity extends Activity {
  dejecoes: DefecationTypeEnum;
}

export interface FeedingActivity extends Activity {
  estadoAlimentacao: FeedingState;
}

// Union type de todas as atividades possíveis
export type ActivityUnion =
  | FeedingActivity
  | DefecationActivity
  | DiuresisActivity
  | GeneralStateActivity
  | HydrationSkinActivity
  | DrugAdministrationActivity
  | MobilityActivity
  | VitalSignsActivity
  | SleepActivity;

export interface RecordResponse {
  prontuarioId: number;
  data: string;
  atividades: ActivityUnion[];
}

export interface RecordRequest {
  status?: ActivityEnum;
  data_hora: string;
}
