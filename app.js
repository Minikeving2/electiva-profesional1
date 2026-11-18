/**
 * Portal Académico: Modelos de Transformación Empresarial
 * Universidad Simón Bolívar
 * Lógica de navegación por vistas (Sidebar Doc Layout) y estado interactivo
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebarNav();
  initTimeline();
  initChecklist();
  initAccordion();
  initMobileDrawer();
  initResourceManager();
  initAdminAuth();
  initAmbientCanvas();
});

/* -------------------------------------------------------------
 * 1. SIDEBAR & VIEW SWITCHER
 * ------------------------------------------------------------- */
function initSidebarNav() {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  const views = document.querySelectorAll('.view-panel');
  const breadcrumb = document.getElementById('breadcrumb-current');

  function switchView(targetId) {
    // Deactivate all
    navBtns.forEach(btn => btn.classList.remove('active'));
    views.forEach(v => v.classList.remove('active'));

    const activeBtn = document.querySelector(`.nav-item-btn[data-target="${targetId}"]`);
    const activeView = document.getElementById(targetId);

    if (activeBtn && activeView) {
      activeBtn.classList.add('active');
      activeView.classList.add('active');
      window.location.hash = targetId;

      if (breadcrumb) {
        breadcrumb.textContent = activeBtn.querySelector('.nav-label')?.textContent || '';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Close mobile drawer if open
      const sidebar = document.querySelector('.app-sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      switchView(target);
    });
  });

  // Flow buttons (Next / Prev)
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.goto;
      switchView(target);
    });
  });

  // Direct pill jump to checklist
  const pillJump = document.getElementById('sidebar-pill-checklist');
  if (pillJump) {
    pillJump.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('view-checklist');
    });
  }

  // Initial Hash or default
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchView(hash);
  } else {
    switchView('view-resumen');
  }

  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && document.getElementById(currentHash)) {
      switchView(currentHash);
    }
  });
}

/* -------------------------------------------------------------
 * 2. MOBILE DRAWER TOGGLE
 * ------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.app-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

/* -------------------------------------------------------------
 * 3. THEME TOGGLE (Dark / Light)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('usb_mte_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('usb_mte_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* -------------------------------------------------------------
 * 4. VIDEO TIMELINE (0:00 - 7:00 MIN)
 * ------------------------------------------------------------- */
const timelineData = [
  {
    time: "0:00 – 1:00",
    name: "EL PASADO",
    title: "El Punto de Partida Histórico",
    desc: "Presentar la situación de la empresa antes de la transformación: modelo de negocio tradicional, quiénes eran sus clientes, cómo operaban sus procesos y cuál era su forma histórica de generar valor.",
    tip: "💡 Tip: Enfóquense en el modelo tradicional y la cultura operativa del periodo seleccionado en el Taller 3."
  },
  {
    time: "1:00 – 2:00",
    name: "EL PUNTO DE QUIEBRE",
    title: "La Amenaza u Oportunidad Inminente",
    desc: "Exponer con claridad el problema, necesidad, cambio de mercado o ventana de oportunidad que amenazaba su competitividad si no tomaban medidas estratégicas inmediatas.",
    tip: "💡 Tip: Sustenten el quiebre con datos históricos verificables (balances, prensa, reportes sectoriales)."
  },
  {
    time: "2:00 – 3:45",
    name: "LA PROPUESTA",
    title: "La Solución como Consultores Externos",
    desc: "Plantear con precisión qué transformarían y cómo: metodología, herramientas conceptuales e intervención planificada asumiendo el rol de consultores contratados.",
    tip: "💡 Tip: Dejen muy claro el «QUÉ» y el «CÓMO». Debe ser una solución innovadora y estructurada."
  },
  {
    time: "3:45 – 5:30",
    name: "LA JUSTIFICACIÓN",
    title: "Fundamentación y Ejes de la Transformación",
    desc: "Explicar por qué es transformación digital/empresarial y NO solo tecnología. Desarrollar el impacto articulado en los 6 ejes: Tecnología, Procesos, Personas, Clientes, Estrategia y Creación de Valor.",
    tip: "💡 Tip: Representa el 40% del peso en la rúbrica (análisis y aplicación conceptual)."
  },
  {
    time: "5:30 – 7:00",
    name: "EL FUTURO PROYECTADO",
    title: "La Empresa Transformada & Cierre Ejecutivo",
    desc: "Mostrar cómo luciría la empresa tras implementar exitosamente su propuesta: nueva propuesta de valor, capacidades habilitadas, sostenibilidad futura y cierre formal dirigido a la junta.",
    tip: "💡 Tip: Regla obligatoria de duración: el video debe cerrar entre 5:00 y 7:00 min exactos."
  }
];

function initTimeline() {
  const segments = document.querySelectorAll('.t-clean-seg');
  const badge = document.getElementById('vt-badge');
  const title = document.getElementById('vt-title');
  const body = document.getElementById('vt-body');
  const tip = document.getElementById('vt-tip');

  segments.forEach((seg, index) => {
    seg.addEventListener('click', () => {
      segments.forEach(s => s.classList.remove('active'));
      seg.classList.add('active');

      const data = timelineData[index];
      if (data && badge && title && body && tip) {
        badge.textContent = data.time;
        title.textContent = `${data.name}: ${data.title}`;
        body.textContent = data.desc;
        tip.textContent = data.tip;
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. SIMULADOR DE RÚBRICA (CALCULADORA DE NOTA)
 * ------------------------------------------------------------- */
function initRubricSimulator() {
  const weights = {
    c1: 0.15, // Investigación y evidencia
    c2: 0.15, // Contexto empresarial
    c3: 0.20, // Análisis de transformación
    c4: 0.15, // Aplicación conceptual
    c5: 0.20, // Propuesta de transformación
    c6: 0.10, // Comunicación y creatividad
    c7: 0.05  // Trabajo en equipo y dominio
  };

  const sliders = document.querySelectorAll('.sim-range-input');
  
  function calculateScore() {
    let total = 0;
    sliders.forEach(slider => {
      const id = slider.dataset.crit;
      const val = parseFloat(slider.value) || 0;
      const weight = weights[id] || 0;
      
      const labelVal = document.getElementById(`lbl-${id}`);
      if (labelVal) {
        labelVal.textContent = val.toFixed(1);
      }
      total += val * weight;
    });

    const totalEl = document.getElementById('sim-final-score');
    const labelEl = document.getElementById('sim-level-text');

    if (totalEl) {
      totalEl.textContent = total.toFixed(2);
    }
    if (labelEl) {
      if (total >= 4.5) {
        labelEl.textContent = '🌟 Nivel Sobresaliente (Excelente dominio)';
        labelEl.style.color = '#86efac';
      } else if (total >= 3.8) {
        labelEl.textContent = '👍 Nivel Bueno (Cumplimiento sólido)';
        labelEl.style.color = '#fef08a';
      } else if (total >= 3.0) {
        labelEl.textContent = '⚠️ Nivel Aceptable (Requiere reforzar)';
        labelEl.style.color = '#fdba74';
      } else {
        labelEl.textContent = '❌ Nivel Insuficiente (Revisar rúbrica)';
        labelEl.style.color = '#fca5a5';
      }
    }
  }

  sliders.forEach(slider => {
    slider.addEventListener('input', calculateScore);
  });

  calculateScore();
}

/* -------------------------------------------------------------
 * 6. CHECKLIST INTERACTIVO (CON PERSISTENCIA LOCAL)
 * ------------------------------------------------------------- */
const STORAGE_KEY = 'usb_mte_clean_checklist';

function initChecklist() {
  const rows = document.querySelectorAll('.clean-check-item');
  const resetBtn = document.getElementById('btn-clean-reset');
  const checkAllBtn = document.getElementById('btn-clean-checkall');
  
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  rows.forEach((row, index) => {
    if (savedState[index]) {
      row.classList.add('checked');
      const box = row.querySelector('.clean-box');
      if (box) box.textContent = '✓';
    }

    row.addEventListener('click', () => {
      const isChecked = row.classList.toggle('checked');
      const box = row.querySelector('.clean-box');
      if (box) box.textContent = isChecked ? '✓' : '';
      
      savedState[index] = isChecked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      updateProgress();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      rows.forEach((row, index) => {
        row.classList.remove('checked');
        const box = row.querySelector('.clean-box');
        if (box) box.textContent = '';
        savedState[index] = false;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      updateProgress();
      showToast('Checklist reiniciado');
    });
  }

  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      rows.forEach((row, index) => {
        row.classList.add('checked');
        const box = row.querySelector('.clean-box');
        if (box) box.textContent = '✓';
        savedState[index] = true;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      updateProgress();
      showToast('¡Todos los puntos marcados!');
    });
  }

  updateProgress();
}

function updateProgress() {
  const rows = document.querySelectorAll('.clean-check-item');
  const checked = document.querySelectorAll('.clean-check-item.checked');
  const total = rows.length;
  const count = checked.length;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  const donut = document.getElementById('donut-progress');
  const pctText = document.getElementById('donut-pct-text');
  const countText = document.getElementById('donut-count-text');
  const sidebarCount = document.getElementById('sidebar-checklist-counter');
  const navBadge = document.getElementById('nav-checklist-badge');

  if (donut) donut.style.setProperty('--progress', pct);
  if (pctText) pctText.textContent = `${pct}%`;
  if (countText) countText.textContent = `${count} de ${total} completados`;
  if (sidebarCount) sidebarCount.textContent = `${count}/${total}`;
  if (navBadge) navBadge.textContent = `${count}/${total}`;
}

/* -------------------------------------------------------------
 * 7. ACCORDION (10 PUNTOS DE LA PROPUESTA ESCRITA)
 * ------------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.acc-clean-row');
  items.forEach(item => {
    const head = item.querySelector('.acc-clean-head');
    if (head) {
      head.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* -------------------------------------------------------------
 * 8. PRINT / PDF HANDLER
 * ------------------------------------------------------------- */
function printDocument() {
  window.print();
}

/* -------------------------------------------------------------
 * 9. TOAST NOTIFICATION
 * ------------------------------------------------------------- */
let toastTimer;
function showToast(msg) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* -------------------------------------------------------------
 * 10. GESTIÓN DOCENTE Y RECURSOS DESCARGABLES (INDEXEDDB)
 * ------------------------------------------------------------- */
let currentAdminModule = 1;
let selectedUploadFile = null;
let dbInstance = null;

// Semilla predeterminada de archivos de apoyo
const DEFAULT_RESOURCES = [
  {
    id: 'seed-mod1-docx',
    moduleId: 1,
    title: 'Estructura Oficial del Guión Audiovisual y Línea de Tiempo',
    filename: 'Proyecto_Integrador_Pasado_Presente_Futuro_Modelos_Transformacion_Empresarial.docx',
    size: 87685,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'Plantilla de Trabajo',
    desc: 'Documento base con la pauta audiovisual de 5 a 7 minutos, momentos cronológicos y modelo analítico del primer corte.',
    date: '2026-11-11',
    url: 'assets/Proyecto_Integrador_Pasado_Presente_Futuro_Modelos_Transformacion_Empresarial.docx',
    isDefault: true
  },
  {
    id: 'seed-mod1-pdf',
    moduleId: 1,
    title: 'Guía de Diagnóstico Empresarial y Análisis del Pasado',
    filename: 'Proyecto_Integrador_MTE.pdf',
    size: 5018541,
    type: 'application/pdf',
    category: 'Guía Metodológica',
    desc: 'Marco orientador para investigar antecedentes organizacionales y estructurar las causas del cambio.',
    date: '2026-11-11',
    url: 'assets/Proyecto_Integrador_MTE.pdf',
    isDefault: true
  },
  {
    id: 'seed-mod2-docx',
    moduleId: 2,
    title: 'Matriz de Diagnóstico de Realidad y Profundización Operativa',
    filename: 'Matriz_Diagnostico_Realidad_Corte2.docx',
    size: 87685,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'Plantilla de Trabajo',
    desc: 'Herramienta para evaluar procesos, tecnología, personas y la madurez del modelo de negocio (10 a 15 min).',
    date: '2026-11-11',
    url: 'assets/Proyecto_Integrador_Pasado_Presente_Futuro_Modelos_Transformacion_Empresarial.docx',
    isDefault: true
  },
  {
    id: 'seed-mod3-docx',
    moduleId: 3,
    title: 'Modelo de Propuesta de Transformación Estratégica Futura',
    filename: 'Modelo_Propuesta_Estrategica_Corte3.docx',
    size: 87685,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'Guía Metodológica',
    desc: 'Marco prospectivo para sustentar la viabilidad económica, disrupción e impacto a largo plazo (15 a 20 min).',
    date: '2026-11-11',
    url: 'assets/Proyecto_Integrador_Pasado_Presente_Futuro_Modelos_Transformacion_Empresarial.docx',
    isDefault: true
  }
];

function openResourceDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      console.warn('IndexedDB no soportado, operando en modo local.');
      resolve(null);
      return;
    }
    const req = indexedDB.open('MTE_Portal_DB', 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('resources')) {
        const store = db.createObjectStore('resources', { keyPath: 'id' });
        store.createIndex('moduleId', 'moduleId', { unique: false });
      }
    };
    req.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    req.onerror = () => {
      console.error('Error abriendo IndexedDB');
      resolve(null);
    };
  });
}

function getAllResourcesFromDB() {
  return new Promise((resolve) => {
    if (!dbInstance) {
      const stored = localStorage.getItem('MTE_CUSTOM_RESOURCES');
      const custom = stored ? JSON.parse(stored) : [];
      resolve([...DEFAULT_RESOURCES, ...custom]);
      return;
    }
    const tx = dbInstance.transaction('resources', 'readonly');
    const store = tx.objectStore('resources');
    const req = store.getAll();
    req.onsuccess = () => {
      const dbItems = req.result || [];
      const merged = [...DEFAULT_RESOURCES, ...dbItems];
      resolve(merged);
    };
    req.onerror = () => {
      resolve(DEFAULT_RESOURCES);
    };
  });
}

function saveResourceToDB(resource) {
  return new Promise((resolve, reject) => {
    if (!dbInstance) {
      try {
        const stored = localStorage.getItem('MTE_CUSTOM_RESOURCES');
        const custom = stored ? JSON.parse(stored) : [];
        custom.push({ ...resource, blob: null });
        localStorage.setItem('MTE_CUSTOM_RESOURCES', JSON.stringify(custom));
        resolve();
      } catch (e) {
        reject(e);
      }
      return;
    }
    const tx = dbInstance.transaction('resources', 'readwrite');
    const store = tx.objectStore('resources');
    const req = store.put(resource);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e);
  });
}

function deleteResourceFromDB(id) {
  return new Promise((resolve) => {
    const isDef = DEFAULT_RESOURCES.some(r => r.id === id);
    if (isDef) {
      const idx = DEFAULT_RESOURCES.findIndex(r => r.id === id);
      if (idx !== -1) DEFAULT_RESOURCES.splice(idx, 1);
      resolve();
      return;
    }
    if (!dbInstance) {
      const stored = localStorage.getItem('MTE_CUSTOM_RESOURCES');
      if (stored) {
        let custom = JSON.parse(stored);
        custom = custom.filter(r => r.id !== id);
        localStorage.setItem('MTE_CUSTOM_RESOURCES', JSON.stringify(custom));
      }
      resolve();
      return;
    }
    const tx = dbInstance.transaction('resources', 'readwrite');
    const store = tx.objectStore('resources');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => resolve();
  });
}

function getResourceById(id) {
  return new Promise((resolve) => {
    const def = DEFAULT_RESOURCES.find(r => r.id === id);
    if (def) {
      resolve(def);
      return;
    }
    if (!dbInstance) {
      const stored = localStorage.getItem('MTE_CUSTOM_RESOURCES');
      const custom = stored ? JSON.parse(stored) : [];
      resolve(custom.find(r => r.id === id) || null);
      return;
    }
    const tx = dbInstance.transaction('resources', 'readonly');
    const store = tx.objectStore('resources');
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = 1;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getFileMetaInfo(filename) {
  const ext = (filename.split('.').pop() || '').toLowerCase();
  let typeClass = 'default';
  let icon = '📄';

  if (['docx', 'doc'].includes(ext)) {
    typeClass = 'docx';
    icon = '📝';
  } else if (ext === 'pdf') {
    typeClass = 'pdf';
    icon = '📕';
  } else if (['xlsx', 'xls', 'csv'].includes(ext)) {
    typeClass = 'xlsx';
    icon = '📊';
  } else if (['pptx', 'ppt'].includes(ext)) {
    typeClass = 'pptx';
    icon = '📽️';
  } else if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
    typeClass = 'zip';
    icon = '📦';
  } else if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
    typeClass = 'img';
    icon = '🖼️';
  }

  return { ext: ext.toUpperCase(), typeClass, icon };
}

window.downloadResourceItem = async function(id) {
  const resource = await getResourceById(id);
  if (!resource) {
    showToast('Archivo no encontrado.');
    return;
  }

  if (resource.blob) {
    const blobUrl = URL.createObjectURL(resource.blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = resource.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    showToast(`⬇️ Descargando ${resource.filename}`);
  } else if (resource.url) {
    const a = document.createElement('a');
    a.href = resource.url;
    a.download = resource.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`⬇️ Descargando ${resource.filename}`);
  } else {
    showToast('El archivo no tiene contenido asociado.');
  }
};

window.deleteResourceItem = async function(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este archivo del portal?')) {
    return;
  }
  await deleteResourceFromDB(id);
  showToast('🗑️ Archivo eliminado correctamente');
  await renderAdminModuleView(currentAdminModule);
  await renderStudentModuleViews();
};

async function renderAdminModuleView(modNum) {
  const all = await getAllResourcesFromDB();
  const moduleResources = all.filter(r => Number(r.moduleId) === Number(modNum));

  const titleEl = document.getElementById('admin-module-current-title');
  const descEl = document.getElementById('admin-module-current-desc');
  const badgeEl = document.getElementById('admin-module-badge');
  const countEl = document.getElementById('admin-file-count');
  const listEl = document.getElementById('admin-files-list');

  const modNames = {
    1: { title: 'Archivos de Apoyo · Módulo 1 (Corte 1: Pasado)', desc: 'Documentos, rúbricas y guías para el video inicial de 5 a 7 min.', badge: 'Módulo 1: Pasado', badgeClass: 'green' },
    2: { title: 'Archivos de Apoyo · Módulo 2 (Corte 2: Presente)', desc: 'Profundización holística, investigación del caso y video de 10 a 15 min.', badge: 'Módulo 2: Presente', badgeClass: 'blue' },
    3: { title: 'Archivos de Apoyo · Módulo 3 (Corte 3: Futuro)', desc: 'Propuesta prospectiva de transformación estratégica y video de 15 a 20 min.', badge: 'Módulo 3: Futuro', badgeClass: 'gold' }
  };

  const currentInfo = modNames[modNum] || modNames[1];
  if (titleEl) titleEl.textContent = currentInfo.title;
  if (descEl) descEl.textContent = currentInfo.desc;
  if (badgeEl) {
    badgeEl.textContent = currentInfo.badge;
    badgeEl.className = `support-badge ${currentInfo.badgeClass}`;
  }
  if (countEl) countEl.textContent = `${moduleResources.length} ${moduleResources.length === 1 ? 'archivo' : 'archivos'}`;

  if (!listEl) return;

  if (moduleResources.length === 0) {
    listEl.innerHTML = `
      <div class="empty-support-notice">
        <span>📭 No hay archivos publicados en este módulo todavía. Adjunta el primero arriba.</span>
      </div>
    `;
    return;
  }

  listEl.innerHTML = moduleResources.map(res => {
    const meta = getFileMetaInfo(res.filename);
    return `
      <div class="admin-file-row">
        <div class="admin-file-left">
          <div class="file-type-avatar ${meta.typeClass}">
            ${meta.icon}
          </div>
          <div class="admin-file-meta-col">
            <div class="admin-file-title" title="${res.title}">${res.title}</div>
            <div class="admin-file-sub-row">
              <span class="support-category-pill">${res.category || 'Apoyo'}</span>
              <span>·</span>
              <span>${res.filename}</span>
              <span>·</span>
              <span>${formatBytes(res.size)}</span>
              <span>·</span>
              <span>${res.date || 'Reciente'}</span>
            </div>
          </div>
        </div>
        <div class="admin-file-actions">
          <button type="button" class="btn-action-icon" onclick="downloadResourceItem('${res.id}')" title="Probar descarga">
            <span>⬇️</span>
            <span>Descargar</span>
          </button>
          <button type="button" class="btn-action-icon danger" onclick="deleteResourceItem('${res.id}')" title="Eliminar archivo">
            <span>🗑️</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function renderStudentModuleViews() {
  const all = await getAllResourcesFromDB();

  [1, 2, 3].forEach(modNum => {
    const listEl = document.getElementById(`files-list-student-${modNum}`);
    if (!listEl) return;

    const moduleResources = all.filter(r => Number(r.moduleId) === Number(modNum));

    if (moduleResources.length === 0) {
      listEl.innerHTML = `
        <div class="empty-support-notice">
          <span>El docente aún no ha publicado archivos complementarios para este corte.</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = moduleResources.map(res => {
      const meta = getFileMetaInfo(res.filename);
      return `
        <div class="support-file-card">
          <div class="support-file-header">
            <div class="file-type-avatar ${meta.typeClass}">
              ${meta.icon}
            </div>
            <div class="support-file-info">
              <div class="support-file-name">${res.title}</div>
              <div class="support-file-desc">${res.desc || 'Material de apoyo publicado por el docente titular.'}</div>
              <div class="support-file-meta-row">
                <span class="support-category-pill">${res.category || 'Recurso'}</span>
                <span>${meta.ext}</span>
                <span>·</span>
                <span>${formatBytes(res.size)}</span>
              </div>
            </div>
          </div>
          <button type="button" class="support-file-download-btn" onclick="downloadResourceItem('${res.id}')">
            <span>⬇️</span>
            <span>Descargar Material</span>
          </button>
        </div>
      `;
    }).join('');
  });
}

async function initResourceManager() {
  await openResourceDB();

  // Tab switching inside Admin View
  const tabs = document.querySelectorAll('.admin-module-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentAdminModule = Number(tab.dataset.mod || 1);
      renderAdminModuleView(currentAdminModule);
    });
  });

  // Dropzone file selection
  const dropzone = document.getElementById('admin-dropzone');
  const fileInput = document.getElementById('admin-file-input');
  const previewBox = document.getElementById('selected-file-preview');
  const previewName = document.getElementById('preview-filename');
  const previewSize = document.getElementById('preview-filesize');
  const clearFileBtn = document.getElementById('btn-clear-selected-file');
  const titleInput = document.getElementById('admin-file-title');

  function handleFileSelected(file) {
    if (!file) return;
    selectedUploadFile = file;
    if (previewBox) previewBox.style.display = 'inline-flex';
    if (previewName) previewName.textContent = file.name;
    if (previewSize) previewSize.textContent = formatBytes(file.size);
    if (titleInput && !titleInput.value) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[_|-]/g, ' ');
      titleInput.value = nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
    }
  }

  function clearSelectedFile() {
    selectedUploadFile = null;
    if (fileInput) fileInput.value = '';
    if (previewBox) previewBox.style.display = 'none';
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#btn-clear-selected-file')) return;
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFileSelected(fileInput.files[0]);
      }
    });

    if (clearFileBtn) {
      clearFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearSelectedFile();
      });
    }
  }

  // Handle Form Submission
  const form = document.getElementById('admin-upload-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!selectedUploadFile) {
        alert('Por favor selecciona o arrastra un archivo para adjuntar.');
        return;
      }

      const title = document.getElementById('admin-file-title').value.trim();
      const category = document.getElementById('admin-file-category').value;
      const desc = document.getElementById('admin-file-desc').value.trim();

      const newId = 'upload_' + Date.now();
      const today = new Date().toISOString().split('T')[0];

      const resourceObj = {
        id: newId,
        moduleId: currentAdminModule,
        title: title,
        filename: selectedUploadFile.name,
        size: selectedUploadFile.size,
        type: selectedUploadFile.type || 'application/octet-stream',
        category: category,
        desc: desc || `Archivo adjuntado por el docente para el Módulo ${currentAdminModule}.`,
        date: today,
        blob: selectedUploadFile,
        isDefault: false
      };

      try {
        await saveResourceToDB(resourceObj);
        showToast(`✅ Archivo "${title}" publicado en Módulo ${currentAdminModule}`);
        form.reset();
        clearSelectedFile();
        await renderAdminModuleView(currentAdminModule);
        await renderStudentModuleViews();
      } catch (err) {
        console.error(err);
        alert('Hubo un problema guardando el archivo. Intenta nuevamente.');
      }
    });
  }

  // Initial renders
  await renderAdminModuleView(currentAdminModule);
  await renderStudentModuleViews();
}

/* -------------------------------------------------------------
 * 10.B AUTENTICACIÓN ESTÁTICA DEL PANEL DOCENTE (LOGIN)
 * ------------------------------------------------------------- */
function initAdminAuth() {
  const authGate = document.getElementById('admin-auth-gate');
  const contentArea = document.getElementById('admin-content-area');
  const loginForm = document.getElementById('admin-login-form');
  const userInput = document.getElementById('admin-user-input');
  const passInput = document.getElementById('admin-pass-input');
  const errorMsg = document.getElementById('admin-auth-error');
  const logoutBtn = document.getElementById('btn-admin-logout');

  if (!authGate || !contentArea) return;

  // Credenciales estáticas autorizadas: único usuario 'admin' con clave no obvia
  const validUser = 'admin';
  const validPass = 'UsbAdmin#2026';

  function updateAuthState() {
    const isLogged = sessionStorage.getItem('ova_admin_logged') === 'true';
    if (isLogged) {
      authGate.style.display = 'none';
      contentArea.style.display = 'block';
      if (typeof renderAdminModuleView === 'function') {
        renderAdminModuleView(currentAdminModule);
      }
    } else {
      authGate.style.display = 'block';
      contentArea.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
    }
  }

  // Manejo de envío de credenciales
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = (userInput?.value || '').trim().toLowerCase();
      const p = (passInput?.value || '').trim();

      if (u === validUser && p === validPass) {
        sessionStorage.setItem('ova_admin_logged', 'true');
        if (errorMsg) errorMsg.style.display = 'none';
        updateAuthState();
        showToast('🔓 ¡Acceso autorizado! Bienvenido al Panel de Administración.');
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (passInput) passInput.value = '';
        passInput?.focus();
      }
    });
  }

  // Manejo de cierre de sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('ova_admin_logged');
      if (userInput) userInput.value = '';
      if (passInput) passInput.value = '';
      updateAuthState();
      showToast('🔒 Sesión docente finalizada.');
    });
  }

  // Estado inicial al cargar
  updateAuthState();
}

/* -------------------------------------------------------------
 * 11. LIENZO DINÁMICO DE FONDO (CANVAS 60FPS CON MODOS)
 * ------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Animación ambiental de fondo: Red de Sistemas y Transformación
  const MODES = [
    { id: 'network', label: 'Red de Sistemas' },
    { id: 'aurora', label: 'Aurora Difusa' },
    { id: 'bokeh', label: 'Partículas Bokeh' }
  ];

  let currentModeIndex = 0;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initParticles();
  }

  // --- 1. Inicialización de Nodos y Partículas (Red de Sistemas) ---
  const particles = [];
  const PARTICLE_COUNT = 48;

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2.2 + 1.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.03
      });
    }
  }

  // --- 2. Inicialización de Partículas Bokeh ---
  const bokehParticles = [];
  const BOKEH_COUNT = 36;
  for (let i = 0; i < BOKEH_COUNT; i++) {
    bokehParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.3 + Math.random() * 0.6), // Flotación ascendente suave
      size: Math.random() * 60 + 20,
      alpha: Math.random() * 0.35 + 0.15,
      hue: Math.random() > 0.5 ? 'emerald' : 'mint'
    });
  }

  window.addEventListener('resize', resize);
  resize();

  // Seguimiento suave de mouse
  let mouseX = width * 0.7;
  let mouseY = height * 0.4;
  let curMouseX = mouseX;
  let curMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  let time = 0;

  // Control de transición suave y progresiva del tema (LERP a 60fps)
  let initialDark = document.documentElement.getAttribute('data-theme') === 'dark' ? 1 : 0;
  let themeProgress = initialDark; // 0 = Modo Claro, 1 = Modo Oscuro

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpRgba(r1, g1, b1, a1, r2, g2, b2, a2, t) {
    const r = Math.round(lerp(r1, r2, t));
    const g = Math.round(lerp(g1, g2, t));
    const b = Math.round(lerp(b1, b2, t));
    const a = +(lerp(a1, a2, t)).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function render() {
    time += 0.016;

    // Transición suave y continua del tema (~0.5s de duración)
    const targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 1 : 0;
    themeProgress += (targetTheme - themeProgress) * 0.055;

    // LERP del cursor
    curMouseX += (mouseX - curMouseX) * 0.06;
    curMouseY += (mouseY - curMouseY) * 0.06;

    ctx.clearRect(0, 0, width, height);

    // 1. Base del fondo con transición de color fluida
    const bg0 = lerpRgba(248, 253, 250, 1, 9, 14, 11, 1, themeProgress);
    const bg1 = lerpRgba(255, 255, 255, 1, 11, 20, 15, 1, themeProgress);
    const bg2 = lerpRgba(240, 250, 244, 1, 9, 14, 11, 1, themeProgress);

    const baseGrad = ctx.createLinearGradient(0, 0, width, height);
    baseGrad.addColorStop(0, bg0);
    baseGrad.addColorStop(0.5, bg1);
    baseGrad.addColorStop(1, bg2);
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    const activeMode = MODES[currentModeIndex].id;

    if (activeMode === 'network') {
      renderNetworkMode(themeProgress);
    } else if (activeMode === 'aurora') {
      renderAuroraMode(themeProgress);
    } else if (activeMode === 'bokeh') {
      renderBokehMode(themeProgress);
    }

    requestAnimationFrame(render);
  }

  // =========================================================
  // MODO 1: RED DE SISTEMAS & TRANSFORMACIÓN (CONSTELACIÓN TECH)
  // =========================================================
  function renderNetworkMode(tp) {
    // 1. Piscinas de luz ambiental difusa que orbitan suavemente en el fondo
    const orb1X = width * 0.8 + Math.cos(time * 0.7) * 110;
    const orb1Y = height * 0.25 + Math.sin(time * 0.5) * 90;
    const g1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 380);
    g1.addColorStop(0, lerpRgba(9, 132, 59, 0.35, 9, 132, 59, 0.42, tp));
    g1.addColorStop(0.5, lerpRgba(16, 168, 78, 0.18, 9, 132, 59, 0.14, tp));
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.arc(orb1X, orb1Y, 380, 0, Math.PI * 2);
    ctx.fill();

    const orb2X = width * 0.2 + Math.sin(time * 0.6) * 120;
    const orb2Y = height * 0.65 + Math.cos(time * 0.5) * 100;
    const g2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 400);
    g2.addColorStop(0, lerpRgba(52, 211, 153, 0.38, 16, 168, 78, 0.32, tp));
    g2.addColorStop(0.5, lerpRgba(9, 132, 59, 0.16, 9, 132, 59, 0.1, tp));
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(orb2X, orb2Y, 400, 0, Math.PI * 2);
    ctx.fill();

    // 2. Conexiones entre nodos cercanos con transición suave de color
    const maxDist = 145;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const ratio = 1 - dist / maxDist;
          const a1 = ratio * 0.28;
          const a2 = ratio * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = lerpRgba(9, 132, 59, a1, 52, 211, 153, a2, tp);
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // 3. Dibujo de nodos interactivos
    particles.forEach(p => {
      // Movimiento autónomo
      p.x += p.vx;
      p.y += p.vy;

      // Rebote suave en bordes
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Interacción con cursor (repulsión elástica sutil)
      const cdx = p.x - curMouseX;
      const cdy = p.y - curMouseY;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cdist < 130 && cdist > 0) {
        const force = (130 - cdist) / 130;
        p.x += (cdx / cdist) * force * 1.5;
        p.y += (cdy / cdist) * force * 1.5;
      }

      p.pulse += p.pulseSpeed;
      const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

      // Halo sutil alrededor de cada nodo con transición de color
      const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius * 3.5);
      haloGrad.addColorStop(0, lerpRgba(9, 132, 59, 0.38, 52, 211, 153, 0.45, tp));
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Punto central con transición de color
      ctx.fillStyle = lerpRgba(9, 132, 59, 1, 74, 222, 128, 1, tp);
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // =========================================================
  // MODO 2: AURORA DIFUSA FLUIDA (METABLOBS ORGÁNICOS SUAVES)
  // =========================================================
  function renderAuroraMode(tp) {
    const blobs = [
      {
        x: width * 0.75 + Math.cos(time * 0.8) * (width * 0.16),
        y: height * 0.28 + Math.sin(time * 0.6) * (height * 0.14),
        r: Math.min(width, height) * 0.45,
        cLight: [9, 132, 59, 0.35],
        cDark: [9, 132, 59, 0.42]
      },
      {
        x: width * 0.25 + Math.sin(time * 0.7) * (width * 0.15),
        y: height * 0.68 + Math.cos(time * 0.5) * (height * 0.16),
        r: Math.min(width, height) * 0.48,
        cLight: [52, 211, 153, 0.4],
        cDark: [16, 168, 78, 0.35]
      },
      {
        x: width * 0.5 + Math.cos(time * 0.5) * (width * 0.2),
        y: height * 0.45 + Math.sin(time * 0.9) * (height * 0.12),
        r: Math.min(width, height) * 0.4,
        cLight: [187, 247, 208, 0.6],
        cDark: [74, 222, 128, 0.22]
      },
      {
        x: curMouseX,
        y: curMouseY,
        r: 280,
        cLight: [9, 132, 59, 0.25],
        cDark: [16, 185, 129, 0.28]
      }
    ];

    blobs.forEach(b => {
      const g = ctx.createRadialGradient(b.x, b.y, 10, b.x, b.y, b.r);
      const topCol = lerpRgba(b.cLight[0], b.cLight[1], b.cLight[2], b.cLight[3], b.cDark[0], b.cDark[1], b.cDark[2], b.cDark[3], tp);
      const midCol = lerpRgba(b.cLight[0], b.cLight[1], b.cLight[2], b.cLight[3] * 0.3, b.cDark[0], b.cDark[1], b.cDark[2], b.cDark[3] * 0.3, tp);
      g.addColorStop(0, topCol);
      g.addColorStop(0.55, midCol);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // =========================================================
  // MODO 3: PARTÍCULAS BOKEH DE LUZ AMBIENTAL
  // =========================================================
  function renderBokehMode(tp) {
    const centerGlow = ctx.createRadialGradient(width * 0.5, height * 0.5, 50, width * 0.5, height * 0.5, width * 0.6);
    centerGlow.addColorStop(0, lerpRgba(187, 247, 208, 0.45, 9, 132, 59, 0.25, tp));
    centerGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, width, height);

    bokehParticles.forEach(bp => {
      bp.x += bp.vx;
      bp.y += bp.vy;

      if (bp.y < -bp.size) {
        bp.y = height + bp.size;
        bp.x = Math.random() * width;
      }
      if (bp.x < -bp.size) bp.x = width + bp.size;
      if (bp.x > width + bp.size) bp.x = -bp.size;

      const bg = ctx.createRadialGradient(bp.x, bp.y, 0, bp.x, bp.y, bp.size);
      const cLight = bp.hue === 'emerald' ? [9, 132, 59] : [52, 211, 153];
      const cDark = bp.hue === 'emerald' ? [16, 168, 78] : [74, 222, 128];

      const c0 = lerpRgba(cLight[0], cLight[1], cLight[2], bp.alpha, cDark[0], cDark[1], cDark[2], bp.alpha, tp);
      const c1 = lerpRgba(cLight[0], cLight[1], cLight[2], bp.alpha * 0.25, cDark[0], cDark[1], cDark[2], bp.alpha * 0.25, tp);

      bg.addColorStop(0, c0);
      bg.addColorStop(0.6, c1);
      bg.addColorStop(1, 'transparent');

      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  requestAnimationFrame(render);
}
