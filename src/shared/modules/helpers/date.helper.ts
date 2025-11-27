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
  fallback: Date = new Date()
): Date {
  if (!dateArray) return fallback;

  const date = convertBackendDateArrayToDate(dateArray);
  return date || fallback;
}
