/**
 * Helpers para gerenciamento de avaliações de atendimento
 */

/**
 * Verifica se passou o período mínimo desde o início do atendimento
 * para habilitar a avaliação (30 dias)
 *
 * @param startDate - Data de início do atendimento
 * @param minimumDays - Número mínimo de dias (padrão: 30)
 * @returns true se passou o período mínimo
 */
export function canEvaluate(
  startDate: string | Date | number[],
  minimumDays: number = 30
): boolean {
  try {
    let date: Date;

    // Se for array (formato Java LocalDateTime: [year, month, day, hour, minute, second])
    if (Array.isArray(startDate)) {
      const [year, month, day] = startDate;
      date = new Date(year, month - 1, day); // month é 0-indexed no JS
    } else {
      date = new Date(startDate);
    }

    if (isNaN(date.getTime())) {
      console.error('Data inválida para avaliação:', startDate);
      return false;
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays >= minimumDays;
  } catch (error) {
    console.error('Erro ao verificar período de avaliação:', error);
    return false;
  }
}

/**
 * Calcula quantos dias faltam para poder avaliar
 *
 * @param startDate - Data de início do atendimento
 * @param minimumDays - Número mínimo de dias (padrão: 30)
 * @returns Número de dias restantes (0 se já pode avaliar)
 */
export function daysUntilCanEvaluate(
  startDate: string | Date | number[],
  minimumDays: number = 30
): number {
  try {
    let date: Date;

    if (Array.isArray(startDate)) {
      const [year, month, day] = startDate;
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(startDate);
    }

    if (isNaN(date.getTime())) {
      return minimumDays;
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const remaining = minimumDays - diffInDays;

    return remaining > 0 ? remaining : 0;
  } catch (error) {
    console.error('Erro ao calcular dias restantes:', error);
    return minimumDays;
  }
}

/**
 * Formata o nome do cuidador para exibição
 * Remove sobrenomes extras para ficar mais pessoal
 *
 * @param fullName - Nome completo
 * @returns Primeiro nome + primeiro sobrenome
 */
export function formatCaregiverNameForEvaluation(fullName: string): string {
  const parts = fullName.trim().split(' ');

  if (parts.length === 1) {
    return parts[0];
  }

  // Retorna primeiro nome + primeiro sobrenome
  return `${parts[0]} ${parts[1]}`;
}
