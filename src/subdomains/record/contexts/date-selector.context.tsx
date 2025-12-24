'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface DateSelectorContextType {
  selectedWeekStart: Date
  selectedDay: Date
  setSelectedWeekStart: (date: Date) => void
  setSelectedDay: (date: Date) => void
  getWeekDays: (weeks?: number) => Date[]
  startDate: Date
  endDate: Date
  canNavigatePrevious: boolean
  canNavigateNext: boolean
}

const DateSelectorContext = createContext<DateSelectorContextType | undefined>(undefined)

interface DateSelectorProviderProps {
  children: ReactNode
  startDate: Date
}

export const DateSelectorProvider = ({ children, startDate: initialStartDate }: DateSelectorProviderProps) => {
  // Garante que startDate seja uma nova instância e não seja mutado
  const startDate = new Date(initialStartDate)
  startDate.setHours(0, 0, 0, 0)
  
  const getStartOfWeek = (date: Date): Date => {
    const newDate = new Date(date)
    const day = newDate.getDay()
    const diff = newDate.getDate() - day
    newDate.setDate(diff)
    newDate.setHours(0, 0, 0, 0)
    return newDate
  }

  // Calcula a data final (30 dias a partir da data de início)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 29) // 30 dias (0-29)
  endDate.setHours(23, 59, 59, 999)

  // Verifica se hoje está dentro do range
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isWithinRange = today >= startDate && today <= endDate

  // Define o dia inicial: hoje se estiver no range, senão a data de início
  const initialDay = isWithinRange ? today : new Date(startDate)
  
  const [selectedWeekStart, setSelectedWeekStartState] = useState<Date>(getStartOfWeek(new Date(initialDay)))
  const [selectedDay, setSelectedDay] = useState<Date>(new Date(initialDay))

  const setSelectedWeekStart = (date: Date) => {
    const weekStart = getStartOfWeek(new Date(date))
    
    // Valida se a semana está dentro do range permitido
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    // Não permite navegar para semanas completamente fora do range
    if (weekEnd < startDate || weekStart > endDate) {
      return
    }
    
    setSelectedWeekStartState(weekStart)
    
    // Seleciona o primeiro dia válido da semana
    let firstValidDay = new Date(weekStart)
    if (firstValidDay < startDate) {
      firstValidDay = new Date(startDate)
    }
    if (firstValidDay > endDate) {
      firstValidDay = new Date(endDate)
    }
    
    setSelectedDay(firstValidDay)
  }

  const getWeekDays = (weeks = 1): Date[] => {
    const days: Date[] = []
    const totalDays = weeks * 7
    for (let i = 0; i < totalDays; i++) {
      const day = new Date(selectedWeekStart)
      day.setDate(selectedWeekStart.getDate() + i)
      days.push(day)
    }
    return days
  }

  // Verifica se pode navegar para semana anterior
  const canNavigatePrevious = selectedWeekStart > startDate

  // Verifica se pode navegar para próxima semana
  const lastDayOfCurrentWeek = new Date(selectedWeekStart)
  lastDayOfCurrentWeek.setDate(selectedWeekStart.getDate() + 6)
  const canNavigateNext = lastDayOfCurrentWeek < endDate

  return (
    <DateSelectorContext.Provider
      value={{
        selectedWeekStart,
        selectedDay,
        setSelectedWeekStart,
        setSelectedDay,
        getWeekDays,
        startDate,
        endDate,
        canNavigatePrevious,
        canNavigateNext,
      }}
    >
      {children}
    </DateSelectorContext.Provider>
  )
}

export const useDateSelector = (): DateSelectorContextType => {
  const context = useContext(DateSelectorContext)
  if (context === undefined) {
    throw new Error('useDateSelector must be used within a DateSelectorProvider')
  }
  return context
}
