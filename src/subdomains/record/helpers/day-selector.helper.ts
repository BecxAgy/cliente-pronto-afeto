/**
 * Calcula quantas semanas devem ser exibidas baseado no tamanho da tela
 * @param screenSize - Tamanho da tela atual
 * @returns Número de semanas a exibir
 */
export function getWeeksToShow(screenSize?: 'mobile' | 'tablet' | 'desktop' | 'wide'): number {
  if (!screenSize) return 1
  
  switch (screenSize) {
    case 'mobile': return 1   // 7 dias
    case 'tablet': return 2   // 14 dias
    case 'desktop': return 2  // 14 dias
    case 'wide': return 3     // 21 dias
    default: return 1
  }
}

/**
 * Verifica se um dia deve estar desabilitado
 * @param day - Data a verificar
 * @param startDate - Data de início do período válido (opcional)
 * @param endDate - Data de fim do período válido (opcional)
 * @returns true se o dia está fora do período válido
 */
export function isDayDisabled(
  day: Date,
  startDate?: Date,
  endDate?: Date
): boolean {
  if (!startDate && !endDate) return false
  
  const dayTime = day.getTime()
  
  if (startDate && dayTime < startDate.getTime()) return true
  if (endDate && dayTime > endDate.getTime()) return true
  
  return false
}
