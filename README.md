# Hotel Botánico - Sitio Web Oficial

Sitio web premium del único hotel 4 estrellas en Caucasia, Bajo Cauca, Antioquia, Colombia.

## 🏨 Sobre el Proyecto

Este es el sitio web oficial del Hotel Botánico, desarrollado con las mejores prácticas de desarrollo web moderno, optimizado para SEO, accesibilidad y rendimiento.

## 🛠️ Stack Tecnológico

- **Framework**: Astro 4.x
- **Estilos**: TailwindCSS 3.x
- **Tipografías**: Google Fonts (Playfair Display + Inter)
- **Gestor de paquetes**: Yarn

## 🎨 Características

- ✅ Diseño premium y minimalista
- ✅ Totalmente responsive (mobile-first)
- ✅ Optimizado para SEO (metadatos, OG tags, JSON-LD schema)
- ✅ Accesibilidad AA (WCAG 2.1)
- ✅ Core Web Vitals optimizados
- ✅ Imágenes optimizadas (WebP, lazy loading)
- ✅ Integración con sistema de reservas Cloudbeds

## 📁 Estructura del Proyecto

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CTAButton.astro
│   │   ├── RoomCard.astro
│   │   ├── ServiceCard.astro
│   │   └── TestimonialSection.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── habitaciones.astro
│       ├── mito.astro
│       ├── galeria.astro
│       └── contacto.astro
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
└── package.json
```

## 🚀 Comandos

| Comando        | Acción                                               |
| :------------- | :--------------------------------------------------- |
| `yarn install` | Instala las dependencias                             |
| `yarn dev`     | Inicia el servidor de desarrollo en `localhost:4321` |
| `yarn build`   | Construye el sitio para producción en `./dist/`      |
| `yarn preview` | Vista previa de la build antes de desplegar          |

## 🎨 Paleta de Colores

- **Beige Premium**: `#EBE2DB`
- **Café Claro**: `#A48D75`
- **Verde Oliva**: `#615A40`
- **Negro Suave**: `#111111`
- **Blanco**: `#FFFFFF`

## 📦 Instalación y Desarrollo

1. **Instalar dependencias**:

```bash
yarn install
```

2. **Iniciar servidor de desarrollo**:

```bash
yarn dev
```

3. **Abrir navegador**:
   Visita `http://localhost:4321`

## 🚢 Despliegue

El sitio está optimizado para ser desplegado en:

- Vercel
- Netlify
- Cloudflare Pages
- Cualquier servidor estático

```bash
# Construir para producción
yarn build

# El resultado estará en ./dist/
```

## 🔍 SEO

El sitio incluye:

- Metadatos optimizados para cada página
- Open Graph tags para redes sociales
- Twitter Cards
- JSON-LD Schema markup para hoteles
- Sitemap.xml (generado automáticamente)
- robots.txt

## ♿ Accesibilidad

- Cumple con WCAG 2.1 nivel AA
- Navegación por teclado
- Textos alternativos en imágenes
- Contraste de colores adecuado
- Headings semánticos
- ARIA labels cuando es necesario

## 📱 Responsive

Diseñado mobile-first con breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📄 Licencia

© 2025 Hotel Botánico. Todos los derechos reservados.

## 📞 Contacto

- **Email**: recepcion@botanicohotelcaucasia.com
- **Teléfono**: +57 312 209 4960
- **Facebook**: https://www.facebook.com/profile.php?id=61561591002819
- **Instagram**: https://www.instagram.com/botanicohotelcaucasia
- **Ubicación**: Caucasia, Bajo Cauca, Antioquia, Colombia

---

Desarrollado con ❤️ para ofrecer la mejor experiencia digital.
