import { useMemo } from 'react'
import { useDateSelector } from '../contexts/date-selector.context'
import { useScreenSize } from '@/src/shared/modules/hooks/use-mobile'
import { getWeeksToShow } from '../helpers/day-selector.helper'

export function useDaySelector() {
  const { selectedDay, setSelectedDay, getWeekDays, startDate, endDate } = useDateSelector()
  const screenSize = useScreenSize()

  // Determina quantas semanas mostrar baseado no tamanho da tela
  const weeksToShow = useMemo(() => getWeeksToShow(screenSize), [screenSize])

  // Obtém os dias a serem exibidos
  const displayedDays = useMemo(() => getWeekDays(weeksToShow), [getWeekDays, weeksToShow])

  // Handler para seleção de dia
  const handleDayClick = (day: Date) => {
    setSelectedDay(new Date(day))
  }

  return {
    selectedDay,
    displayedDays,
    handleDayClick,
    weeksToShow,
    startDate,
    endDate,
  }
}
