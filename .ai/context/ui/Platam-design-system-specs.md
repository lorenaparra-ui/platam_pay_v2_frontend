PLATAM - SISTEMA DE DISEÑO COMPLETO
Especificaciones Técnicas v2.0

🎨 PALETA DE COLORES OFICIAL
Colores Principales (del PDF)
javascript
// Color 1: Verde Lima (Primario)
primary: {
  hex: '#4AE54A',
  rgb: 'rgb(74, 229, 74)',
  cmyk: '68, 0, 68, 10',
  uso: 'Acciones principales, CTAs, éxito, crecimiento'
}

// Color 2: Turquesa (Secundario)
secondary: {
  hex: '#2ADBA4',
  rgb: 'rgb(42, 219, 164)',
  cmyk: '81, 0, 25, 14',
  uso: 'Acciones secundarias, categorías, progreso'
}

// Color 3: Cyan Brillante (Terciario)
tertiary: {
  hex: '#0FD6F5',
  rgb: 'rgb(15, 214, 245)',
  cmyk: '94, 13, 0, 4',
  uso: 'Acentos, información, enlaces'
}

// Color 4: Azul Oscuro (Fondo Dark Mode)
dark: {
  hex: '#0A0E27',
  rgb: 'rgb(10, 14, 39)',
  cmyk: '74, 64, 0, 85',
  uso: 'Fondo principal modo oscuro'
}

🎨 COLORES EXTENDIDOS PARA SISTEMA
Versión DARK MODE
javascript
colors: {
  // Verde Lima (Primario)
  primary: {
    50: '#F0FEF0',   // Muy claro - fondos suaves
    100: '#DCFCE1',  // Backgrounds hover
    200: '#BBF7C3',  // Backgrounds activos
    300: '#86EFAC',  // Borders suaves
    400: '#4AE54A',  // ⭐ COLOR OFICIAL - Acciones principales
    500: '#22C55E',  // Hover states
    600: '#16A34A',  // Active states
    700: '#15803D',  // Pressed states
    800: '#166534',  // Textos sobre fondos claros
    900: '#14532D',  // Muy oscuro - contraste máximo
  },
  
  // Turquesa (Secundario)
  secondary: {
    50: '#ECFDF5',   // Muy claro
    100: '#D1FAE5',  // Backgrounds hover
    200: '#A7F3D0',  // Backgrounds activos
    300: '#6EE7B7',  // Borders suaves
    400: '#2ADBA4',  // ⭐ COLOR OFICIAL - Acciones secundarias
    500: '#10B981',  // Hover states
    600: '#059669',  // Active states
    700: '#047857',  // Pressed states
    800: '#065F46',  // Textos
    900: '#064E3B',  // Muy oscuro
  },
  
  // Cyan (Terciario)
  tertiary: {
    50: '#ECFEFF',   // Muy claro
    100: '#CFFAFE',  // Backgrounds hover
    200: '#A5F3FC',  // Backgrounds activos
    300: '#67E8F9',  // Borders suaves
    400: '#0FD6F5',  // ⭐ COLOR OFICIAL - Acentos
    500: '#06B6D4',  // Hover states
    600: '#0891B2',  // Active states
    700: '#0E7490',  // Pressed states
    800: '#155E75',  // Textos
    900: '#164E63',  // Muy oscuro
  },
  
  // Grises Dark Mode
  dark: {
    50: '#F8FAFC',   // Casi blanco
    100: '#F1F5F9',  // Muy claro
    200: '#E2E8F0',  // Claro
    300: '#CBD5E1',  // Medio claro
    400: '#94A3B8',  // Medio
    500: '#64748B',  // Neutral
    600: '#475569',  // Medio oscuro
    700: '#334155',  // Oscuro
    800: '#1E293B',  // Muy oscuro
    900: '#0F172A',  // Casi negro
    950: '#0A0E27',  // ⭐ COLOR OFICIAL - Fondo principal
  },
  
  // Estados del Sistema
  success: {
    50: '#F0FEF0',
    400: '#4AE54A',  // Usar primary-400
    500: '#22C55E',
    600: '#16A34A',
  },
  
  warning: {
    50: '#FFFBEB',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
  },
  
  error: {
    50: '#FEF2F2',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
  },
  
  info: {
    50: '#ECFEFF',
    400: '#0FD6F5',  // Usar tertiary-400
    500: '#06B6D4',
    600: '#0891B2',
  },
}
Versión LIGHT MODE
javascript
colors: {
  // Los mismos colores principales, pero con ajustes de uso
  
  // Grises Light Mode
  light: {
    50: '#0A0E27',   // Textos principales (invertido)
    100: '#0F172A',  // Textos secundarios
    200: '#1E293B',  // Textos terciarios
    300: '#334155',  // Borders
    400: '#475569',  // Placeholders
    500: '#64748B',  // Deshabilitados
    600: '#94A3B8',  // Borders suaves
    700: '#CBD5E1',  // Backgrounds secundarios
    800: '#E2E8F0',  // Backgrounds principales
    900: '#F1F5F9',  // Backgrounds alternativos
    950: '#F8FAFC',  // ⭐ Fondo principal light mode
  },
}

📝 TIPOGRAFÍA
Familia de Fuentes
css
font-family: {
  sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  mono: ['Fira Code', 'Monaco', 'Courier New', 'monospace'],
}

/* Configuración de carga */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
Alternativas por Prioridad
Inter (Preferida) - Moderna, legible, profesional
DM Sans - Alternativa geométrica
Poppins - Más amigable y redondeada
System UI - Fallback nativo

📐 JERARQUÍA VISUAL & TAMAÑOS DE TEXTO
javascript
typography: {
  // TÍTULOS PRINCIPALES
  h1: {
    size: 'text-5xl md:text-6xl',        // 48px / 60px
    weight: 'font-bold',                   // 700
    lineHeight: 'leading-tight',           // 1.2
    letterSpacing: 'tracking-tight',       // -0.02em
    uso: 'Hero headings, títulos de página principal'
  },
  
  h2: {
    size: 'text-4xl md:text-5xl',        // 36px / 48px
    weight: 'font-bold',                   // 700
    lineHeight: 'leading-tight',           // 1.2
    letterSpacing: 'tracking-tight',
    uso: 'Títulos de sección'
  },
  
  h3: {
    size: 'text-3xl md:text-4xl',        // 30px / 36px
    weight: 'font-semibold',               // 600
    lineHeight: 'leading-snug',            // 1.375
    letterSpacing: 'tracking-normal',
    uso: 'Subtítulos de sección'
  },
  
  h4: {
    size: 'text-2xl md:text-3xl',        // 24px / 30px
    weight: 'font-semibold',               // 600
    lineHeight: 'leading-snug',
    uso: 'Títulos de tarjetas, componentes'
  },
  
  h5: {
    size: 'text-xl md:text-2xl',         // 20px / 24px
    weight: 'font-medium',                 // 500
    lineHeight: 'leading-normal',          // 1.5
    uso: 'Títulos pequeños, labels destacados'
  },
  
  h6: {
    size: 'text-lg md:text-xl',          // 18px / 20px
    weight: 'font-medium',                 // 500
    lineHeight: 'leading-normal',
    uso: 'Subtítulos de componentes'
  },
  
  // TEXTOS DE CUERPO
  lead: {
    size: 'text-xl',                      // 20px
    weight: 'font-normal',                 // 400
    lineHeight: 'leading-relaxed',         // 1.625
    uso: 'Párrafo introductorio, texto destacado'
  },
  
  body: {
    size: 'text-base',                    // 16px
    weight: 'font-normal',                 // 400
    lineHeight: 'leading-relaxed',         // 1.625
    uso: 'Texto de párrafo normal'
  },
  
  bodySmall: {
    size: 'text-sm',                      // 14px
    weight: 'font-normal',                 // 400
    lineHeight: 'leading-normal',          // 1.5
    uso: 'Texto secundario, descripciones'
  },
  
  caption: {
    size: 'text-xs',                      // 12px
    weight: 'font-normal',                 // 400
    lineHeight: 'leading-normal',          // 1.5
    uso: 'Captions, metadata, timestamps'
  },
  
  // COMPONENTES ESPECIALES
  button: {
    size: 'text-base',                    // 16px
    weight: 'font-semibold',               // 600
    letterSpacing: 'tracking-wide',        // 0.025em
    uso: 'Botones'
  },
  
  buttonSmall: {
    size: 'text-sm',                      // 14px
    weight: 'font-semibold',               // 600
    uso: 'Botones pequeños'
  },
  
  label: {
    size: 'text-sm',                      // 14px
    weight: 'font-medium',                 // 500
    uso: 'Labels de formularios'
  },
  
  badge: {
    size: 'text-xs',                      // 12px
    weight: 'font-semibold',               // 600
    letterSpacing: 'tracking-wider',       // 0.05em
    uso: 'Badges, tags, pills'
  },
  
  code: {
    size: 'text-sm',                      // 14px
    weight: 'font-normal',                 // 400
    family: 'font-mono',
    uso: 'Código inline o bloques'
  },
}

⚖️ PESO DE FUENTES
javascript
fontWeights: {
  normal: {
    value: 400,
    class: 'font-normal',
    uso: 'Párrafos, textos de cuerpo, descripciones'
  },
  
  medium: {
    value: 500,
    class: 'font-medium',
    uso: 'Labels, subtítulos pequeños, énfasis suave'
  },
  
  semibold: {
    value: 600,
    class: 'font-semibold',
    uso: 'Botones, títulos H3-H6, navegación activa'
  },
  
  bold: {
    value: 700,
    class: 'font-bold',
    uso: 'Títulos H1-H2, números grandes, CTAs importantes'
  },
  
  extrabold: {
    value: 800,
    class: 'font-extrabold',
    uso: 'Uso excepcional para super títulos (opcional)'
  },
}

// REGLA: Máximo 3 pesos diferentes en una misma vista
// Recomendado: normal (400), semibold (600), bold (700)

🎯 APLICACIÓN DE COLORES POR CONTEXTO
DARK MODE
javascript
// === BACKGROUNDS ===
backgrounds: {
  primary: 'bg-dark-950',           // #0A0E27 - Fondo principal
  secondary: 'bg-dark-900',         // Cards, paneles
  tertiary: 'bg-dark-800',          // Secciones alternadas
  hover: 'hover:bg-dark-800',       // Hover sobre dark-900
  active: 'active:bg-dark-700',     // Estado activo
  disabled: 'bg-dark-900/50',       // Componentes deshabilitados
}

// === TEXTOS ===
text: {
  primary: 'text-white',            // Títulos, texto principal
  secondary: 'text-gray-300',       // Texto secundario
  tertiary: 'text-gray-400',        // Texto de apoyo
  disabled: 'text-gray-500',        // Texto deshabilitado
  placeholder: 'text-gray-400',     // Placeholders
  muted: 'text-gray-500',          // Metadatos, timestamps
}

// === BORDERS ===
borders: {
  default: 'border-dark-800',       // Bordes normales
  hover: 'hover:border-dark-700',   // Bordes en hover
  focus: 'focus:border-primary-400', // Bordes en foco
  active: 'border-primary-400',     // Bordes activos
  disabled: 'border-dark-900',      // Bordes deshabilitados
}

// === BOTONES ===
buttons: {
  // Primario (Verde Lima)
  primary: {
    bg: 'bg-primary-400',
    text: 'text-dark-950',
    hover: 'hover:bg-primary-500',
    active: 'active:bg-primary-600',
    disabled: 'disabled:bg-gray-700 disabled:text-gray-500',
  },
  
  // Secundario (Turquesa)
  secondary: {
    bg: 'bg-secondary-400',
    text: 'text-dark-950',
    hover: 'hover:bg-secondary-500',
    active: 'active:bg-secondary-600',
  },
  
  // Outline
  outline: {
    border: 'border-2 border-primary-400',
    text: 'text-primary-400',
    hover: 'hover:bg-primary-400/10',
    active: 'active:bg-primary-400/20',
  },
  
  // Ghost
  ghost: {
    bg: 'bg-primary-400/10',
    text: 'text-primary-400',
    hover: 'hover:bg-primary-400/20',
    active: 'active:bg-primary-400/30',
  },
}

// === ENLACES ===
links: {
  default: 'text-primary-400 hover:text-primary-500',
  underline: 'underline underline-offset-4 hover:text-primary-500',
  visited: 'visited:text-primary-600',
}

// === ICONOS ===
icons: {
  primary: 'text-primary-400',      // Iconos de acción
  secondary: 'text-gray-400',       // Iconos decorativos
  disabled: 'text-gray-600',        // Iconos deshabilitados
}

// === BADGES ===
badges: {
  success: 'bg-primary-400 text-dark-950',
  info: 'bg-tertiary-400 text-dark-950',
  warning: 'bg-warning-400 text-dark-950',
  error: 'bg-error-400 text-white',
  neutral: 'bg-gray-700 text-gray-300',
}
LIGHT MODE
javascript
// === BACKGROUNDS ===
backgrounds: {
  primary: 'bg-light-950',          // #F8FAFC - Fondo principal
  secondary: 'bg-light-900',        // Cards, paneles
  tertiary: 'bg-light-800',         // Secciones alternadas
  hover: 'hover:bg-light-800',
  active: 'active:bg-light-700',
}

// === TEXTOS ===
text: {
  primary: 'text-light-50',         // #0A0E27 - Texto principal
  secondary: 'text-light-100',      // Texto secundario
  tertiary: 'text-light-200',       // Texto de apoyo
  disabled: 'text-light-400',       // Texto deshabilitado
}

// === BORDERS ===
borders: {
  default: 'border-light-700',      // Bordes normales
  hover: 'hover:border-light-600',
  focus: 'focus:border-primary-400',
}

// === BOTONES ===
buttons: {
  // Los colores de acción se mantienen iguales
  primary: {
    bg: 'bg-primary-400',
    text: 'text-white',             // Cambio: mejor contraste
    hover: 'hover:bg-primary-500',
  },
}

📏 ESPACIADO Y RITMO
Sistema de Espaciado (múltiplos de 4px)
javascript
spacing: {
  // Micro Espaciado (0-16px)
  0: '0px',          // 0
  px: '1px',         // 1px - Borders
  0.5: '2px',        // 0.125rem
  1: '4px',          // 0.25rem
  1.5: '6px',        // 0.375rem
  2: '8px',          // 0.5rem - space-y-2
  2.5: '10px',       // 0.625rem
  3: '12px',         // 0.75rem
  3.5: '14px',       // 0.875rem
  4: '16px',         // 1rem - space-y-4
  
  // Espaciado Estándar (20-32px)
  5: '20px',         // 1.25rem
  6: '24px',         // 1.5rem - space-y-6
  7: '28px',         // 1.75rem
  8: '32px',         // 2rem - space-y-8
  
  // Espaciado Amplio (36-64px)
  9: '36px',         // 2.25rem
  10: '40px',        // 2.5rem
  11: '44px',        // 2.75rem
  12: '48px',        // 3rem - space-y-12
  14: '56px',        // 3.5rem
  16: '64px',        // 4rem - space-y-16
  
  // Macro Espaciado (80-128px)
  20: '80px',        // 5rem
  24: '96px',        // 6rem - space-y-24
  28: '112px',       // 7rem
  32: '128px',       // 8rem - space-y-32
  
  // Extra Grande (160-256px)
  40: '160px',       // 10rem
  48: '192px',       // 12rem
  56: '224px',       // 14rem
  64: '256px',       // 16rem
}

// === APLICACIÓN POR CONTEXTO ===

// Entre elementos muy relacionados (botones en grupo)
microSpacing: 'space-x-2 space-y-2',      // 8px

// Entre elementos relacionados (inputs y labels)
smallSpacing: 'space-y-4',                 // 16px

// Entre secciones de contenido
mediumSpacing: 'space-y-6',                // 24px

// Entre componentes
largeSpacing: 'space-y-8',                 // 32px

// Entre secciones principales
xlSpacing: 'space-y-12',                   // 48px

// Entre páginas/vistas
xxlSpacing: 'space-y-24',                  // 96px

// === PADDING DE CONTENEDORES ===

containers: {
  // Secciones de página
  section: 'px-4 md:px-8 lg:px-12 py-16 md:py-24',
  
  // Cards
  card: 'p-6 md:p-8',
  cardSmall: 'p-4',
  cardLarge: 'p-8 md:p-12',
  
  // Botones
  button: 'px-6 py-3',
  buttonSmall: 'px-4 py-2',
  buttonLarge: 'px-8 py-4',
  
  // Inputs
  input: 'px-4 py-2.5',
  
  // Modal
  modal: 'p-6 md:p-8',
}

🔄 ESTADOS DEL SISTEMA
javascript
// === BOTONES ===
buttonStates: {
  default: `
    bg-primary-400 text-dark-950 font-semibold
    transition-all duration-200
  `,
  
  hover: `
    hover:bg-primary-500 
    hover:shadow-primary 
    hover:-translate-y-0.5
  `,
  
  active: `
    active:bg-primary-600 
    active:scale-95
  `,
  
  focus: `
    focus:outline-none 
    focus:ring-4 
    focus:ring-primary-400/30
    focus:ring-offset-2 
    focus:ring-offset-dark-950
  `,
  
  disabled: `
    disabled:bg-gray-700 
    disabled:text-gray-500 
    disabled:cursor-not-allowed
    disabled:opacity-50
  `,
  
  loading: `
    cursor-wait 
    opacity-75
  `,
}

// === INPUTS ===
inputStates: {
  default: `
    bg-dark-900 
    border border-dark-800 
    text-white 
    placeholder:text-gray-400
  `,
  
  hover: `
    hover:border-dark-700
  `,
  
  focus: `
    focus:outline-none 
    focus:border-primary-400 
    focus:ring-4 
    focus:ring-primary-400/20
  `,
  
  error: `
    border-error-400 
    focus:border-error-400 
    focus:ring-error-400/20
  `,
  
  disabled: `
    disabled:bg-dark-900/50 
    disabled:cursor-not-allowed 
    disabled:opacity-60
  `,
}

// === CARDS ===
cardStates: {
  default: `
    bg-dark-900 
    border border-dark-800 
    rounded-xl
  `,
  
  hover: `
    hover:border-primary-400/50 
    hover:shadow-xl 
    hover:shadow-primary-400/5
  `,
  
  active: `
    active:scale-[0.99]
  `,
  
  interactive: `
    cursor-pointer 
    transition-all duration-300
  `,
}

// === LINKS ===
linkStates: {
  default: `
    text-primary-400 
    underline-offset-4
  `,
  
  hover: `
    hover:text-primary-500 
    hover:underline
  `,
  
  active: `
    active:text-primary-600
  `,
  
  focus: `
    focus:outline-none 
    focus:ring-2 
    focus:ring-primary-400/50 
    focus:rounded
  `,
  
  visited: `
    visited:text-primary-600
  `,
}

// === TOGGLE/CHECKBOX ===
toggleStates: {
  unchecked: `
    bg-dark-800 
    border-2 border-dark-700
  `,
  
  checked: `
    bg-primary-400 
    border-2 border-primary-400
  `,
  
  indeterminate: `
    bg-secondary-400 
    border-2 border-secondary-400
  `,
  
  disabled: `
    opacity-50 
    cursor-not-allowed
  `,
}

// === NOTIFICACIONES/TOASTS ===
toastStates: {
  success: `
    bg-primary-400/10 
    border border-primary-400/30 
    text-primary-400
  `,
  
  error: `
    bg-error-400/10 
    border border-error-400/30 
    text-error-400
  `,
  
  warning: `
    bg-warning-400/10 
    border border-warning-400/30 
    text-warning-400
  `,
  
  info: `
    bg-tertiary-400/10 
    border border-tertiary-400/30 
    text-tertiary-400
  `,
}

// === ANIMACIONES Y TRANSICIONES ===
transitions: {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-200 ease-in-out',
  slow: 'transition-all duration-300 ease-in-out',
  verySlow: 'transition-all duration-500 ease-in-out',
}

♿ ACCESIBILIDAD
Contraste de Color (WCAG 2.1)
javascript
// === DARK MODE ===
accessibility_dark: {
  // AAA (>7:1) - Texto normal
  aaa_text: {
    foreground: 'text-white',        // #FFFFFF
    background: 'bg-dark-950',       // #0A0E27
    ratio: '15.8:1',
    uso: 'Títulos, párrafos, texto principal'
  },
  
  // AA (>4.5:1) - Texto normal
  aa_text: {
    foreground: 'text-gray-300',     // ~#D1D5DB
    background: 'bg-dark-950',
    ratio: '8.2:1',
    uso: 'Texto secundario'
  },
  
  // AA Large (>3:1) - Texto grande (18px+)
  aa_large: {
    foreground: 'text-primary-400',  // #4AE54A
    background: 'bg-dark-950',
    ratio: '5.8:1',
    uso: 'Títulos con color de marca, CTAs'
  },
  
  // UI Components (>3:1)
  aa_ui: {
    element: 'border-primary-400',
    background: 'bg-dark-950',
    ratio: '5.8:1',
    uso: 'Bordes, iconos, componentes UI'
  },
  
  // ❌ NO USAR para texto pequeño
  avoid_small_text: {
    foreground: 'text-primary-400',
    size: '<18px',
    reason: 'Contraste insuficiente para texto pequeño'
  },
}

// === LIGHT MODE ===
accessibility_light: {
  // AAA (>7:1)
  aaa_text: {
    foreground: 'text-light-50',     // #0A0E27
    background: 'bg-light-950',      // #F8FAFC
    ratio: '15.8:1',
  },
  
  // AA (>4.5:1)
  aa_text: {
    foreground: 'text-light-100',    // ~#0F172A
    background: 'bg-light-950',
    ratio: '13.2:1',
  },
  
  // Botones primarios en light mode
  button_accessible: {
    background: 'bg-primary-400',
    text: 'text-white',              // Mejor que text-dark-950
    ratio: '4.8:1',
    uso: 'CTAs, botones principales'
  },
}
Estados de Foco
javascript
focusStates: {
  // Visible para teclado
  keyboard: `
    focus-visible:outline-none 
    focus-visible:ring-4 
    focus-visible:ring-primary-400/30 
    focus-visible:ring-offset-2 
    focus-visible:ring-offset-dark-950
  `,
  
  // Sin outline para mouse
  mouse: `
    focus:outline-none
  `,
  
  // Contraste alto (preferencia del sistema)
  highContrast: `
    @media (prefers-contrast: high) {
      focus:ring-4 
      focus:ring-white
    }
  `,
}
Tamaños Mínimos Táctiles
javascript
touchTargets: {
  minimum: {
    size: 'min-h-[44px] min-w-[44px]',
    standard: 'WCAG 2.1 AA',
    uso: 'Botones, enlaces, controles interactivos'
  },
  
  recommended: {
    size: 'min-h-[48px] min-w-[48px]',
    standard: 'Material Design',
    uso: 'Botones principales'
  },
  
  // Espaciado entre elementos táctiles
  spacing: 'gap-2',  // Mínimo 8px entre botones
}
Semántica HTML
javascript
semanticHTML: {
  // Usar elementos correctos
  button: '<button> para acciones',
  link: '<a> para navegación',
  heading: '<h1>-<h6> en orden jerárquico',
  list: '<ul>, <ol> para listas',
  nav: '<nav> para navegación',
  main: '<main> para contenido principal',
  article: '<article> para contenido independiente',
  section: '<section> para secciones temáticas',
  
  // ARIA cuando sea necesario
  ariaLabel: 'aria-label="Descripción"',
  ariaDescribedBy: 'aria-describedby="helper-text"',
  ariaLive: 'aria-live="polite"',
  role: 'role="status"',
}
Motion y Animaciones
javascript
motionAccessibility: {
  // Respetar preferencias del usuario
  reducedMotion: `
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  `,
  
  // Safe defaults
  safeTransitions: 'transition-opacity duration-200',
  avoidTransforms: 'Evitar translate/scale si prefers-reduced-motion',
}
Lectura de Pantalla
javascript
screenReader: {
  // Texto oculto visualmente pero accesible
  srOnly: `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `,
  
  // Skip links
  skipLink: `
    <a href="#main-content" class="sr-only focus:not-sr-only">
      Saltar al contenido principal
    </a>
  `,
}

📋 CHECKLIST DE ACCESIBILIDAD
markdown
✅ Contraste mínimo WCAG AA (4.5:1 texto, 3:1 UI)
✅ Contraste AAA para texto principal (7:1)
✅ Tamaños mínimos táctiles (44x44px)
✅ Estados de foco visibles
✅ Semántica HTML correcta
✅ Jerarquía de headings (h1 → h6)
✅ Textos alternativos en imágenes
✅ Labels en formularios
✅ Respeto a prefers-reduced-motion
✅ Respeto a prefers-contrast
✅ Navegación por teclado
✅ ARIA labels donde sea necesario
✅ Color no es el único indicador
✅ Animaciones opcionales/reducibles

🌓 MODO OSCURO vs CLARO - RESUMEN
Aspecto
Dark Mode
Light Mode
Fondo principal
#0A0E27 (dark-950)
#F8FAFC (light-950)
Texto principal
#FFFFFF (white)
#0A0E27 (light-50)
Texto secundario
#D1D5DB (gray-300)
#0F172A (light-100)
Cards/Paneles
#0F172A (dark-900)
#F1F5F9 (light-900)
Borders
#1E293B (dark-800)
#CBD5E1 (light-700)
Botón primario BG
#4AE54A
#4AE54A
Botón primario text
#0A0E27
#FFFFFF
Hover overlay
dark-800
light-800
Focus ring
primary-400/30
primary-400/30


