/**
 * Converte array de data do backend para objeto Date
 * Formato esperado: [ano, mês, dia, hora, minuto] ou [ano, mês, dia, hora, minuto, segundo]
 * @param dateArray - Array com [ano, mês, dia, hora, minuto, segundo?]
 * @returns Date object ou null se inválido
 */
export function convertBackendDateArrayToDate(
  dateArray: number[] | string
): Date | null {
  // Se já for string, tenta converter diretamente
  if (typeof dateArray === 'string') {
    const date = new Date(dateArray);
    return isNaN(date.getTime()) ? null : date;
  }

  // Se for array, converte
  if (Array.isArray(dateArray) && dateArray.length >= 3) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;

    // Mês no JavaScript é 0-indexed, então subtraímos 1
    const date = new Date(year, month - 1, day, hour, minute, second);

    return isNaN(date.getTime()) ? null : date;
  }

  return null;
}

/**
 * Converte e formata data do backend
 * @param dateArray - Array com [ano, mês, dia, hora, minuto, segundo?]
 * @param fallback - Valor padrão se conversão falhar
 * @returns Date object ou fallback
 */
export function parseBackendDate(
  dateArray: number[] | string | undefined | null,
  fallback: Date = new Date('1970-01-01T00:00:00Z')
): Date {
  if (!dateArray) return fallback;

  const date = convertBackendDateArrayToDate(dateArray);
  return date || fallback;
}

/**
 * Formata o nome do dia da semana
 * @param date - Data a ser formatada
 * @param locale - Locale para formatação (padrão: 'en-US')
 * @returns Nome do dia da semana abreviado
 */
export function formatDayName(date: Date, locale = 'pt-BR'): string {
  return date.toLocaleDateString(locale, { weekday: 'short' });
}

/**
 * Retorna o número do dia do mês
 * @param date - Data
 * @returns Número do dia
 */
export function formatDayNumber(date: Date): number {
  return date.getDate();
}

/**
 * Verifica se duas datas são o mesmo dia
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns true se forem o mesmo dia
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

/**
 * Formata um intervalo de datas (semana)
 * @param startDate - Data de início
 * @param endDate - Data de fim (opcional, padrão: startDate + 6 dias)
 * @param locale - Locale para formatação (padrão: 'en-US')
 * @returns String formatada (ex: "Apr 22 - 28, 2024")
 */
export function formatDateRange(
  startDate: Date,
  endDate?: Date,
  locale = 'pt-BR'
): string {
  const end =
    endDate ||
    (() => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + 6);
      return date;
    })();

  const startMonth = startDate.toLocaleDateString(locale, { month: 'short' });
  const endMonth = end.toLocaleDateString(locale, { month: 'short' });
  const startDay = startDate.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}
