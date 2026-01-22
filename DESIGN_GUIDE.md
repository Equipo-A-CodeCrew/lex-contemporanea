# Guía de Diseño UI - Lex Contemporánea

## 🎨 Sistema de Diseño

### Filosofía
**Editorial Minimalista con Autoridad Gubernamental**
- Inspirado en documentos oficiales pero con diseño moderno
- Claridad y legibilidad ante todo
- Detalles sutiles que demuestran profesionalismo
- Animaciones suaves y no intrusivas

---

## 🎯 Paleta de Colores

```css
/* Primarios */
--color-primary: #1a1a2e       /* Azul oscuro - Headers, texto importante */
--color-accent: #d4af37         /* Dorado - CTAs, destacados */
--color-secondary: #e94560      /* Rojo coral - Alertas, secundario */

/* Neutrales */
--color-background: #fafafa     /* Fondo principal */
--color-surface: #ffffff        /* Cards, superficies */
--color-text: #2d2d2d          /* Texto principal */
--color-text-light: #666666     /* Texto secundario */
--color-border: #e0e0e0         /* Bordes sutiles */

/* Estados */
--color-success: #2ecc71        /* Éxito */
--color-warning: #f39c12        /* Advertencia */
--color-error: #e74c3c          /* Error */
```

### Cómo usar los colores

**Para componentes de lista/cards de leyes:**
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
color: var(--color-text);
```

**Para botones principales:**
```css
background: var(--color-primary);
color: white;
&:hover { background: var(--color-accent); }
```

---

## ✍️ Tipografía

### Fuentes
- **Display (Títulos):** Fraunces - Serif elegante con personalidad
- **Body (Texto):** Public Sans - Sans-serif clara y legible

### Escala tipográfica
```css
h1: clamp(2rem, 5vw, 3.5rem)    /* Títulos principales */
h2: clamp(1.5rem, 4vw, 2.5rem)  /* Subtítulos */
h3: clamp(1.25rem, 3vw, 1.875rem) /* Secciones */
body: 1rem (16px)                 /* Texto base */
small: 0.875rem (14px)            /* Texto secundario */
tiny: 0.75rem (12px)              /* Labels, metadatos */
```

---

## 📏 Espaciado

```css
--space-xs: 0.5rem    /* 8px - Espacios muy pequeños */
--space-sm: 0.75rem   /* 12px - Espacios pequeños */
--space-md: 1rem      /* 16px - Espaciado estándar */
--space-lg: 1.5rem    /* 24px - Espaciado generoso */
--space-xl: 2rem      /* 32px - Secciones */
--space-2xl: 3rem     /* 48px - Entre bloques */
--space-3xl: 4rem     /* 64px - Hero, márgenes grandes */
```

---

## 🎭 Componentes Comunes

### 1. Card de Ley/Norma
```html
<div class="law-card">
  <div class="law-header">
    <span class="law-type">Real Decreto</span>
    <span class="law-date">20/01/2026</span>
  </div>
  <h4 class="law-title">Título de la norma...</h4>
  <p class="law-department">Ministerio de Hacienda</p>
  <div class="law-actions">
    <a href="#" class="btn-secondary btn-small">Ver PDF</a>
  </div>
</div>
```

**Estilos sugeridos:**
```scss
.law-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--color-accent);
  }
}

.law-type {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  background: rgba(212, 175, 55, 0.1);
  color: var(--color-accent-dark);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 2. Filtros
```html
<div class="filter-group">
  <label class="filter-label">Tipo de norma</label>
  <select class="filter-select">
    <option>Todas</option>
    <option>Ley Orgánica</option>
    <option>Real Decreto</option>
    <option>Orden Ministerial</option>
  </select>
</div>
```

### 3. Estadísticas
```html
<div class="stat-card">
  <span class="stat-value">248</span>
  <span class="stat-label">Normas hoy</span>
</div>
```

---

## 🎬 Animaciones

### Transiciones estándar
```css
transition: all var(--transition-base); /* 250ms para la mayoría */
transition: all var(--transition-fast); /* 150ms para hovers */
```

### Animaciones de entrada
```scss
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

// Para listas con stagger
.list-item {
  animation: fadeIn 0.4s ease-out backwards;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  // etc...
}
```

---

## 📱 Responsive

### Breakpoints
```scss
// Mobile first approach
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }

// O mobile-last
@media (max-width: 768px) { /* Mobile */ }
```

---

## ✅ Checklist de Componente

Antes de considerar un componente terminado:

- [ ] Usa las variables CSS del sistema de diseño
- [ ] Tiene estados hover/focus/active
- [ ] Es responsive (funciona en mobile)
- [ ] Tiene transiciones suaves
- [ ] Usa la tipografía correcta (Fraunces para títulos, Public Sans para body)
- [ ] Tiene espaciado consistente
- [ ] Está accesible (labels, aria-labels cuando sea necesario)
- [ ] Tiene animación de entrada (fade-in o slide-in)

---

## 🎨 Tipos de Normas - Colores Sugeridos

Para diferenciar visualmente los tipos de normas:

```scss
.law-type {
  &.ley-organica { 
    background: rgba(231, 76, 60, 0.1);
    color: #c0392b;
  }
  
  &.real-decreto { 
    background: rgba(52, 152, 219, 0.1);
    color: #2980b9;
  }
  
  &.orden-ministerial { 
    background: rgba(46, 204, 113, 0.1);
    color: #27ae60;
  }
  
  &.resolucion { 
    background: rgba(243, 156, 18, 0.1);
    color: #d68910;
  }
}
```

---

## 🚀 Tips para JAM (4 horas)

### Prioridades de diseño:

1. **Hora 1-2:** Implementar estilos globales y componente principal
2. **Hora 2-3:** Trabajar en componentes individuales (usa los ejemplos de arriba)
3. **Hora 3-4:** Pulir detalles, añadir animaciones, responsive

### Shortcuts de productividad:

```scss
// Usa utility classes cuando tengas prisa
.mb-lg { margin-bottom: var(--space-lg); }
.text-muted { color: var(--color-text-light); }
.card { /* Estilos de card ya definidos */ }
```

### No reinventes la rueda:
- Copia las estructuras HTML de ejemplo
- Usa las clases CSS ya definidas
- Enfócate en la funcionalidad, no en perfeccionar cada píxel

---

## 📦 Estructura de Archivos

```
src/
├── styles.scss                 # Estilos globales y variables
├── app/
│   ├── app.scss               # Layout principal
│   └── components/
│       ├── daily-summary/
│       │   └── daily-summary.scss
│       ├── law-list/
│       │   └── law-list.scss
│       └── search-filters/
│           └── search-filters.scss
```

Cada componente usa las variables globales, no reinventa estilos.

---

## 🎯 Objetivo Final

Una aplicación que luzca:
- **Profesional** - Como si fuera un producto real
- **Clara** - Fácil de navegar y entender
- **Moderna** - No genérica, con personalidad
- **Confiable** - Digna de datos gubernamentales

¡Buena suerte en la JAM! 🚀
