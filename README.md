# 🎬 Movies Recommends Page

Una aplicación web interactiva para descubrir, comparar y obtener recomendaciones de películas basadas en tus preferencias.

## 📋 Descripción

Movies Recommends Page es una aplicación frontend construida con React y TypeScript que te permite explorar películas, comparar títulos y recibir recomendaciones personalizadas. La aplicación combina datos de múltiples APIs para ofrecer una experiencia completa de descubrimiento cinematográfico.

## ✨ Características

- 🔍 **Búsqueda avanzada de películas** con autocompletado
- 📊 **Comparación detallada** entre dos películas
- 🎯 **Recomendaciones personalizadas** basadas en tus selecciones
- 🖼️ **Visualización de pósters** y detalles de películas
- ⚡ **Interfaz moderna y responsiva**
- 🎨 **Componentes modulares** y reutilizables
- 📱 **Diseño adaptable** a diferentes dispositivos

## 🏗️ Estructura del Proyecto

```
src/
├── 📂components/
│   └── 📂formOptions/
│       ├── 📂components/
│       │   ├── CompareResults.tsx    # Componente para mostrar comparaciones
│       │   ├── ErrorDisplay.tsx      # Manejo de errores
│       │   ├── MovieInput.tsx        # Input de búsqueda de películas
│       │   ├── MoviePoster.tsx       # Visualización de pósters
│       │   ├── RecommendationResults.tsx  # Resultados de recomendaciones
│       │   └── SubmitButton.tsx      # Botón de envío
│       └── FormOptions.tsx           # Formulario principal
├── 📂hooks/
│   └── useMovieSearch.ts             # Hook personalizado para búsqueda
├── 📂models/
│   ├── compare.model.ts              # Modelos para comparación
│   ├── options.model.ts              # Modelos de opciones
│   ├── recoments.model.ts            # Modelos de recomendaciones
│   └── search.models.ts              # Modelos de búsqueda
└── 📂services/
    ├── compareMovies.service.ts      # Servicio de comparación
    ├── getPosteImage.service.ts      # Servicio de imágenes
    ├── recomentsMovies.service.ts    # Servicio de recomendaciones
    └── searchNamesMovies.service.ts  # Servicio de búsqueda

```

## 🔧 Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Herramienta de construcción y desarrollo rápido
- **CSS Modules** - Estilos modulares y encapsulados
- **Hooks Personalizados** - Lógica reutilizable de React

## 🌐 APIs Utilizadas

### 🚀 API Personalizada - Movies Recommendation API
**Repositorio:** [https://github.com/Lobosanplay/movies-recomendation-api](https://github.com/Lobosanplay/movies-recomendation-api)

Esta aplicación consume una API REST personalizada desarrollada específicamente para este proyecto, que proporciona:

- **Endpoints de recomendación**: Obtiene películas similares basadas en preferencias
- **Comparación de películas**: Analiza y compara detalles entre dos títulos
- **Búsqueda inteligente**: Búsqueda optimizada en la base de datos de películas

### 🎥 OMDb API
**Sitio oficial:** [https://www.omdbapi.com/](https://www.omdbapi.com/)

La aplicación integra la OMDb API (The Open Movie Database) para obtener:

- **Pósters de películas**: Imágenes de alta calidad
- **Metadatos detallados**: Información completa sobre cada película
- **Calificaciones y reseñas**: Datos de calificación de diversas fuentes

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/movies-recomends-page.git
cd movies-recomends-page
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
VITE_APIKEY=tu_api_key_de_omdb
```

4. **Iniciar la aplicación en desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Construir para producción**
```bash
npm run build
# o
yarn build
```

## 📖 Uso

### Búsqueda de Películas
1. Utiliza el campo de búsqueda para encontrar películas por título
2. El autocompletado te sugerirá opciones mientras escribes
3. Selecciona una película para ver sus detalles

### Comparación
1. Selecciona dos películas para comparar
2. Haz clic en "Comparar" para ver un análisis detallado
3. Visualiza diferencias en género, calificación, año y más

### Recomendaciones
1. Selecciona tus preferencias o películas favoritas
2. Obtén recomendaciones personalizadas basadas en tus elecciones
3. Explora nuevas películas que podrían interesarte

## 🔌 Servicios Disponibles

La aplicación incluye los siguientes servicios:

### `searchNamesMovies.service.ts`
- Búsqueda de películas por nombre
- Autocompletado en tiempo real
- Filtrado inteligente de resultados

### `compareMovies.service.ts`
- Comparación detallada entre dos películas
- Análisis de similitudes y diferencias
- Presentación de datos comparativos

### `recomentsMovies.service.ts`
- Generación de recomendaciones personalizadas
- Algoritmos de filtrado colaborativo
- Sugerencias basadas en preferencias

### `getPosteImage.service.ts`
- Obtención de imágenes de pósters
- Manejo de URLs y caché de imágenes
- Fallback a imágenes por defecto

## 🧩 Componentes Principales

### `FormOptions.tsx`
Componente principal que orquesta toda la funcionalidad del formulario, integrando:
- Búsqueda de películas
- Selección de opciones
- Lógica de envío y procesamiento

### `MovieInput.tsx`
Input inteligente con:
- Búsqueda en tiempo real
- Sugerencias de autocompletado
- Validación en el cliente

### `CompareResults.tsx`
Visualización de comparaciones con:
- Diseño comparativo lado a lado
- Métricas y estadísticas
- Análisis visual de diferencias

### `RecommendationResults.tsx`
Presentación de recomendaciones con:
- Grid de películas sugeridas
- Información relevante de cada título
- Navegación entre resultados

## 🎨 Estilos y Diseño

La aplicación utiliza:
- **CSS Modules** para estilos encapsulados
- **Diseño responsivo** para todos los dispositivos
- **Paleta de colores cinematográfica**
- **Animaciones sutiles** para mejor UX
- **Tipografía legible** y moderna

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👥 Autor

**Lobosanplay**
- GitHub: [@Lobosanplay](https://github.com/Lobosanplay)
- Proyecto API: [Movies Recommendation API](https://github.com/Lobosanplay/movies-recomendation-api)

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!
