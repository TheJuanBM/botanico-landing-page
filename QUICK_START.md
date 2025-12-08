# 🚀 Inicio Rápido - Hotel Botánico

## Pasos para poner en marcha el proyecto

### 1️⃣ Instalar Dependencias

```bash
yarn install
```

Si no tienes Yarn instalado, primero instálalo:

```bash
npm install -g yarn
```

### 2️⃣ Configurar Variables de Entorno (Opcional)

Copia el archivo `.env.example` a `.env` y actualiza los valores:

```bash
cp .env.example .env
```

Edita `.env` con tu información real:

- Teléfonos de contacto
- Correos electrónicos
- URLs de redes sociales
- Etc.

### 3️⃣ Iniciar Servidor de Desarrollo

```bash
yarn dev
```

El sitio estará disponible en: **http://localhost:4321**

### 4️⃣ Construir para Producción

```bash
yarn build
```

Los archivos optimizados estarán en la carpeta `dist/`

### 5️⃣ Vista Previa de Producción

```bash
yarn preview
```

---

## 📋 Checklist Antes de Producción

- [ ] Actualizar información de contacto real en:
  - `/src/components/Footer.astro`
  - `/src/pages/contacto.astro`
- [ ] Reemplazar placeholders de imágenes con fotos reales del hotel

- [ ] Agregar integración de Google Maps real en páginas de contacto y ubicación

- [ ] Configurar Google Analytics o herramienta de análisis (opcional)

- [ ] Probar sistema de reservas de Cloudbeds

- [ ] Verificar URLs de redes sociales

- [ ] Probar formulario de contacto

- [ ] Ejecutar Lighthouse para verificar:
  - Performance > 90
  - Accessibility > 95
  - SEO > 95

---

## 🎨 Personalización

### Colores

Edita `tailwind.config.cjs` para cambiar la paleta de colores.

### Tipografías

Edita `src/layouts/Layout.astro` para cambiar las fuentes de Google Fonts.

### Contenido

Actualiza los archivos en `src/pages/` para modificar el contenido de cada página.

---

## 📞 Soporte

Si tienes alguna pregunta o problema, revisa el archivo `README.md` para más detalles.

---

¡Listo para lanzar! 🎉
