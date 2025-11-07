/**
 * Configuração de Temas - Pronto Afeto
 *
 * Este arquivo documenta a paleta de cores e temas da aplicação
 */

export const themeConfig = {
  /**
   * Paleta de Cores Principal
   */
  colors: {
    brand: {
      blue: '#6B9FF7', // Azul principal da aplicação
      blueDark: '#4F88E8', // Azul escuro para hover/active
      blueLight: '#A5C7FA', // Azul claro para backgrounds
    },
    neutral: {
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
    },
    semantic: {
      success: '#10B981', // Verde para sucesso
      warning: '#F59E0B', // Laranja para avisos
      error: '#EF4444', // Vermelho para erros
      info: '#3B82F6', // Azul para informações
    },
  },

  /**
   * Modos de Tema Disponíveis
   */
  modes: ['light', 'dark', 'system'] as const,

  /**
   * Configuração de Radius
   */
  radius: {
    sm: '0.625rem - 4px', // 6px
    md: '0.625rem - 2px', // 8px
    lg: '0.625rem', // 10px (padrão)
    xl: '0.625rem + 4px', // 14px
    '2xl': '0.625rem + 8px', // 18px
  },

  /**
   * Guia de Uso das Cores
   */
  usage: {
    primary:
      'Azul da marca (#6B9FF7) - Usado em CTAs principais, links e elementos interativos',
    secondary: 'Cinza claro - Usado em botões secundários e backgrounds sutis',
    accent:
      'Preto/Branco - Usado em botões de destaque e elementos de alta prioridade',
    muted: 'Cinza médio - Usado em texto secundário e elementos desabilitados',
    destructive: 'Vermelho - Usado em ações destrutivas e mensagens de erro',
    success: 'Verde - Usado em mensagens de sucesso e confirmações',
    warning: 'Laranja - Usado em avisos e alertas',
    info: 'Azul - Usado em mensagens informativas',
  },

  /**
   * Classes Tailwind Customizadas
   */
  customClasses: {
    brandBlue: 'bg-primary text-primary-foreground',
    brandButton: 'bg-accent text-accent-foreground hover:bg-accent/90',
    card: 'bg-card text-card-foreground rounded-lg border shadow-sm',
    input:
      'border-input bg-background ring-offset-background focus-visible:ring-ring',
  },
} as const;

export type ThemeMode = (typeof themeConfig.modes)[number];

/**
 * Exemplo de uso:
 *
 * ```tsx
 * import { themeConfig } from '@/src/shared/modules/config/theme.config';
 *
 * // Usar cores da marca
 * <div className="bg-primary text-primary-foreground">
 *   Botão Principal
 * </div>
 *
 * // Usar botão de destaque
 * <button className="bg-accent text-accent-foreground">
 *   Ação Importante
 * </button>
 *
 * // Card com a paleta
 * <div className="bg-card text-card-foreground rounded-lg border">
 *   Conteúdo do Card
 * </div>
 * ```
 */
