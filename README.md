# Portal Web: Modelos de Transformación Empresarial
## Universidad Simón Bolívar · Programa de Ingeniería de Sistemas

Este proyecto web ha sido diseñado como una guía interactiva, moderna, minimalista y completa para los estudiantes de la asignatura **Modelos de Transformación Empresarial**, a cargo del docente **M.Sc. I.S. Alvaro Salamanca Landínez**.

### 🎨 Identidad Visual Institucional
Construido respetando fielmente el **Manual de Imagen e Identidad Corporativa (2018)** de la Universidad Simón Bolívar:
- **Color Verde Oficial Unisimón:** `#09843B` (CMYK: 86%, 22%, 97%, 7% | RGB: 9, 132, 59).
- **Tipografías:** *Palatino Linotype / Cinzel* para títulos institucionales y *Inter / Helvetica / Arial* para textos, métricas y lectura digital ágil.
- **Sello Institucional:** Acreditación Institucional de Alta Calidad (Resolución 23095 MEN) y lema *"Tu Universidad"*.
- **Iconografía Oficial:** Logotipo vectorizado transparente y badge del programa de sistemas/transformación tecnológica.

---

### 🚀 Características y Secciones Interactivas
1. **Hero Académico:** Datos del curso, docente, badges del programa y la frase orientadora del proyecto integrador.
2. **Sub-Nav Sticky (Acceso Rápido):** Navegación fluida e intuitiva entre todas las secciones de la página.
3. **¿Qué vamos a construir? (Fundamento & Principio de Evolución):** Explicación clara de que el caso empresarial es único durante los 3 cortes.
4. **La Lógica de los 3 Momentos:**
   - **PASADO (Corte 1):** Rol consultor antes del cambio (Video 5-7 min + Documento).
   - **PRESENTE (Corte 2):** Rol analista que contrasta la realidad (Video 10-15 min).
   - **FUTURO (Corte 3):** Rol consultor estratégico del futuro (15-20 min).
   - **Matriz Comparativa de Progresión:** Análisis, Conceptos, Creatividad, Tiempos y Roles.
5. **Primer Parcial en Detalle:**
   - **Regla Esencial:** Tarjetas comparativas interactivas de *Hecho Real* vs. *Análisis* vs. *Propuesta*.
   - **Las 5 Preguntas Fundamentales** explicadas con claridad.
   - **Los 10 Componentes Obligatorios de la Propuesta Escrita** en acordeón interactivo.
6. **Estructura Audiovisual Minuto a Minuto:**
   - Visualizador interactivo de los **7 minutos** (0:00 - 1:00, 1:00 - 2:00, 2:00 - 3:45, 3:45 - 5:30, 5:30 - 7:00).
   - Alerta visible sobre la regla obligatoria de duración (mínimo 5 min, máximo 7 min).
   - Guía de estilos creativos («tipo TikTok»: pitch ejecutivo, noticiero, crisis, documental, etc.).
7. **Perfil de Competencias:** Las 10 habilidades profesionales a forjar durante el proyecto.
8. **Rúbrica Oficial & Simulador de Nota:**
   - Tabla oficial con los 7 criterios y porcentajes (15%, 15%, 20%, 15%, 20%, 10%, 5%).
   - **Calculadora interactiva en vivo** con sliders para que los estudiantes simulen su autoevaluación.
9. **Las 8 Reglas de Oro:** Normas metodológicas y éticas del proyecto integrador (uso de IA, sustentación con fuentes, dominio del equipo).
10. **Checklist Interactivo del Primer Parcial:**
    - 10 puntos de control con guardado automático en `localStorage` del navegador.
    - Barra circular de progreso porcentual y contador de avance.
11. **Modo Claro / Oscuro & Modo Imprimir (PDF):** Conmutador de tema visual y estilos optimizados para impresión o guardado en PDF (`window.print()`).

---

### 📂 Archivos del Proyecto
- `index.html`: Estructura semántica, accesible y completa de la web.
- `styles.css`: Sistema de diseño moderno, variables CSS, paleta institucional y diseño 100% responsivo.
- `app.js`: Lógica interactiva (simulador de rúbrica, checklist persistente, timeline dinámico, acordeones y temas).
- `assets/`:
  - `logo_unisimon_trans.png`: Logotipo oficial horizontal de alta resolución con fondo transparente.
  - `logo_unisimon.png`: Logotipo oficial para fondos claros e impresión.
  - `image1.png`: Badge oficial de la asignatura (nube, candado, pantalla de código `</> π`, wifi).

---

### 💻 Cómo Abrir la Página
Simplemente abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Safari, Firefox, Edge) o ejecuta un servidor local:
```bash
cd /Users/kevingarcia/.gemini/antigravity/scratch/transformacion-empresarial-web
# Con python (opcional):
python3 -m http.server 8080
```
Y visita `http://localhost:8080` en tu navegador.
