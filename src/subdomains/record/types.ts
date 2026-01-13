export enum ActivityEnum {
  ALIMENTACAO,
  MOBILIDADE,
  DEJECOES,
  DIURESES,
  SINAIS_VITAIS,
  SONO,
  HIDRATACAO_PELE,
  MEDICAMENTOS,
}

export enum SleepTypeEnum {
  BOM = 'BOM',
  RUIM = 'RUIM',
  INTERRUPTIVO = 'INTERRUPTIVO',
}

export interface VitalSign {
  temperatura: number;
  frequenciaCardiaca: number;
  frequenciaRespiratoria: number;
  pressaoArterial: string;
  dataHoraRegistro: string | number[]; // Aceita string ou array Java LocalDateTime
}

export enum MobilityTypeEnum {
  AUTONOMO = 'AUTÔNOMO',
  RESTRITO = 'RESTRITO',
  IMÓVEL = 'IMÓVEL',
}

export enum DiuresisTypeEnum {
  NORMAL = 'NORMAL',
  ELEVADA = 'ELEVADA',
  REDUZIDA = 'REDUZIDA',
}

export enum DefecationTypeEnum {
  NORMAL = 'NORMAL',
  DIARRÉIA = 'DIARRÉIA',
  CONSTIPAÇÃO = 'CONSTIPAÇÃO',
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
  dataHora: string | number[]; // Aceita string ISO ou array Java LocalDateTime [year, month, day, hour, minute]
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

export type ActivityInput = ActivityUnion;
