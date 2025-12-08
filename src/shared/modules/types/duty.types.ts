export interface Duty {
  turno: string[];
  diasDaSemana: string[]; // Tipagem como array de strings para dias da semana
  alimentacaoFornecida: boolean;
  dataHoraInicioPlantao: [number, number, number, number, number]; // [ano, mês, dia, hora, minuto]
  observacoes: string;
}
