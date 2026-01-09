import {
  RecordResponse,
  ActivityEnum,
  FeedingTypeEnum,
  FoodAdministrationTypeEnum,
  DefecationTypeEnum,
  DiuresisTypeEnum,
  MobilityTypeEnum,
  SleepTypeEnum,
} from './types';

export const mockRecordResponse: RecordResponse = {
  prontuarioId: 1,
  data: '2025-12-25',
  atividades: [
    // Alimentação - Café da Manhã
    {
      tipo: ActivityEnum.ALIMENTACAO,
      dataHora: '2025-12-25T07:30:00.000Z',
      cuidadorId: 1,
      estadoAlimentacao: {
        tipoAlimentacao: FoodAdministrationTypeEnum.ORAL,
        refeicao: FeedingTypeEnum.CafeDaManha,
        aceitou: true,
      },
    },
    // Alimentação - Lanche da Manhã
    {
      tipo: ActivityEnum.ALIMENTACAO,
      dataHora: '2025-12-25T10:00:00.000Z',
      cuidadorId: 1,
      estadoAlimentacao: {
        tipoAlimentacao: FoodAdministrationTypeEnum.ORAL,
        refeicao: FeedingTypeEnum.LancheDaManha,
        aceitou: true,
      },
    },
    // Alimentação - Almoço
    {
      tipo: ActivityEnum.ALIMENTACAO,
      dataHora: '2025-12-25T12:30:00.000Z',
      cuidadorId: 2,
      estadoAlimentacao: {
        tipoAlimentacao: FoodAdministrationTypeEnum.ORAL,
        refeicao: FeedingTypeEnum.Almoço,
        aceitou: false,
      },
    },
    // Dejecões
    {
      tipo: ActivityEnum.DEJECOES,
      dataHora: '2025-12-25T08:15:00.000Z',
      cuidadorId: 1,
      dejecoes: DefecationTypeEnum.NORMAL,
    },
    // Diurese
    {
      tipo: ActivityEnum.DIURESES,
      dataHora: '2025-12-25T09:00:00.000Z',
      cuidadorId: 1,
      tipoDiurese: DiuresisTypeEnum.NORMAL,
    },
    {
      tipo: ActivityEnum.DIURESES,
      dataHora: '2025-12-25T14:30:00.000Z',
      cuidadorId: 2,
      tipoDiurese: DiuresisTypeEnum.ELEVADA,
    },
    // Estado Geral
    {
      tipo: ActivityEnum.ESTADO_GERAL,
      dataHora: '2025-12-25T08:00:00.000Z',
      cuidadorId: 1,
      estadoGeral: {
        estado: 'Paciente acordou bem disposto, comunicativo e colaborativo.',
      },
    },
    {
      tipo: ActivityEnum.ESTADO_GERAL,
      dataHora: '2025-12-25T15:00:00.000Z',
      cuidadorId: 2,
      estadoGeral: {
        estado:
          'Paciente apresentou cansaço após atividades, repouso orientado.',
      },
    },
    // Hidratação da Pele
    {
      tipo: ActivityEnum.HIDRATACAO_PELE,
      dataHora: '2025-12-25T09:30:00.000Z',
      cuidadorId: 1,
      hidratacaoPelo: 85,
    },
    // Medicamentos
    {
      tipo: ActivityEnum.MEDICAMENTOS,
      dataHora: '2025-12-25T08:00:00.000Z',
      cuidadorId: 1,
      posologia: {
        nomeMedicamento: 'Losartana',
        dosagem: 50,
        unidadeDosagem: 'mg',
        frequencia: 1,
        dataInicio: '2025-12-01',
        dataFim: '2025-12-31',
      },
    },
    {
      tipo: ActivityEnum.MEDICAMENTOS,
      dataHora: '2025-12-25T14:00:00.000Z',
      cuidadorId: 2,
      posologia: {
        nomeMedicamento: 'Paracetamol',
        dosagem: 750,
        unidadeDosagem: 'mg',
        frequencia: 3,
        dataInicio: '2025-12-25',
        dataFim: '2025-12-27',
      },
    },
    // Mobilidade
    {
      tipo: ActivityEnum.MOBILIDADE,
      dataHora: '2025-12-25T10:30:00.000Z',
      cuidadorId: 1,
      tipoMobilidade: MobilityTypeEnum.AUTONOMO,
    },
    {
      tipo: ActivityEnum.MOBILIDADE,
      dataHora: '2025-12-25T16:00:00.000Z',
      cuidadorId: 2,
      tipoMobilidade: MobilityTypeEnum.RESTRITO,
    },
    // Sinais Vitais
    {
      tipo: ActivityEnum.SINAIS_VITAIS,
      dataHora: '2025-12-25T08:00:00.000Z',
      cuidadorId: 1,
      sinalVital: {
        temperatura: 36.5,
        frequenciaCardiaca: 72,
        frequenciaRespiratoria: 16,
        pressaoArterial: '120/80',
        dataHoraRegistro: '2025-12-25T08:00:00.000Z',
      },
    },
    {
      tipo: ActivityEnum.SINAIS_VITAIS,
      dataHora: '2025-12-25T14:00:00.000Z',
      cuidadorId: 2,
      sinalVital: {
        temperatura: 36.8,
        frequenciaCardiaca: 78,
        frequenciaRespiratoria: 18,
        pressaoArterial: '125/82',
        dataHoraRegistro: '2025-12-25T14:00:00.000Z',
      },
    },
    // Sono
    {
      tipo: ActivityEnum.SONO,
      dataHora: '2025-12-25T22:00:00.000Z',
      cuidadorId: 2,
      tipoSono: SleepTypeEnum.BOM,
    },
  ],
};

export const mockRecordEmpty: RecordResponse = {
  prontuarioId: 1,
  data: '2025-12-26',
  atividades: [],
};

export const mockRecordWithFewActivities: RecordResponse = {
  prontuarioId: 1,
  data: '2025-12-24',
  atividades: [
    {
      tipo: ActivityEnum.SINAIS_VITAIS,
      dataHora: '2025-12-24T08:00:00.000Z',
      cuidadorId: 1,
      sinalVital: {
        temperatura: 36.3,
        frequenciaCardiaca: 68,
        frequenciaRespiratoria: 14,
        pressaoArterial: '118/75',
        dataHoraRegistro: '2025-12-24T08:00:00.000Z',
      },
    },
    {
      tipo: ActivityEnum.ALIMENTACAO,
      dataHora: '2025-12-24T12:00:00.000Z',
      cuidadorId: 1,
      estadoAlimentacao: {
        tipoAlimentacao: FoodAdministrationTypeEnum.ORAL,
        refeicao: FeedingTypeEnum.Almoço,
        aceitou: true,
      },
    },
  ],
};
