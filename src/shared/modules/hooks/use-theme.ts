'use client';

import { useTheme as useNextTheme } from 'next-themes';

/**
 * Hook customizado para gerenciar temas da aplicação
 * Extende o useTheme do next-themes com funcionalidades adicionais
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  /**
   * Retorna true se o tema atual é escuro
   */
  const isDark = resolvedTheme === 'dark';

  /**
   * Retorna true se o tema atual é claro
   */
  const isLight = resolvedTheme === 'light';

  /**
   * Retorna true se está usando o tema do sistema
   */
  const isSystem = theme === 'system';

  /**
   * Alterna entre light e dark
   */
  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    isDark,
    isLight,
    isSystem,
    toggleTheme,
  };
}
