'use strict';

/* ============================================================
   FORM BUILDER — Core JavaScript
   FormCraft UI | SortableJS-powered drag-and-drop builder
   ============================================================ */

// ─── Field Type Definitions ────────────────────────────────
const FIELD_TYPES = {
  'text-input': {
    label: 'Text Input', category: 'basic',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h10M12 9v6"/></svg>`,
    defaultConfig: { label: 'Text Input', placeholder: 'Enter text...', required: false, cssClass: '', minChars: '', maxChars: '', defaultValue: '' }
  },
  'textarea': {
    label: 'Text Area', category: 'basic',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>`,
    defaultConfig: { label: 'Text Area', placeholder: 'Enter your message...', required: false, cssClass: '', minChars: '', maxChars: '' }
  },
  'number-input': {
    label: 'Number Input', category: 'basic',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M9 9v6m0 0h3m-3 0H6M15 9h3l-1.5 3 1.5 3h-3"/></svg>`,
    defaultConfig: { label: 'Number Input', placeholder: '0', required: false, cssClass: '', min: '', max: '', defaultValue: '' }
  },
  'email-input': {
    label: 'Email Input', category: 'basic',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
    defaultConfig: { label: 'Email Input', placeholder: 'you@example.com', required: false, cssClass: '', defaultValue: '' }
  },
  'phone-input': {
    label: 'Phone Input', category: 'basic',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012.09 4.18 2 2 0 014.07 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    defaultConfig: { label: 'Phone Input', placeholder: '+1 (555) 000-0000', required: false, cssClass: '', defaultValue: '' }
  },
  'dropdown': {
    label: 'Dropdown', category: 'selection',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="2"/><polyline points="9 11 12 14 15 11"/></svg>`,
    defaultConfig: { label: 'Dropdown', placeholder: 'Select an option', required: false, cssClass: '', options: ['Option 1', 'Option 2', 'Option 3'] }
  },
  'radio-buttons': {
    label: 'Radio Buttons', category: 'selection',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`,
    defaultConfig: { label: 'Radio Buttons', required: false, cssClass: '', options: ['Option 1', 'Option 2', 'Option 3'] }
  },
  'checkboxes': {
    label: 'Checkboxes', category: 'selection',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 12 11 14 15 10"/></svg>`,
    defaultConfig: { label: 'Checkboxes', required: false, cssClass: '', options: ['Option 1', 'Option 2', 'Option 3'] }
  },
  'date-picker': {
    label: 'Date Picker', category: 'advanced',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    defaultConfig: { label: 'Date Picker', required: false, cssClass: '', defaultValue: '' }
  },
  'file-upload': {
    label: 'File Upload', category: 'advanced',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    defaultConfig: { label: 'File Upload', required: false, cssClass: '' }
  },
  'title': {
    label: 'Title', category: 'layout',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h8M4 18h12"/></svg>`,
    defaultConfig: { label: 'Title', cssClass: '', content: 'Section Title' }
  },
  'description': {
    label: 'Description', category: 'layout',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h12M4 18h8"/></svg>`,
    defaultConfig: { label: 'Description', cssClass: '', content: 'Add a description for this section...' }
  },
  'new-line': {
    label: 'New Line', category: 'layout',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
    defaultConfig: { cssClass: '' }
  },
  'page-break': {
    label: 'Page Break', category: 'layout',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="4 2"/></svg>`,
    defaultConfig: { cssClass: '' }
  },
  'hidden-field': {
    label: 'Hidden Field', category: 'layout',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
    defaultConfig: { label: 'Hidden Field', cssClass: '', defaultValue: '' }
  },
  'state': {
    label: 'State', category: 'location',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    defaultConfig: { label: 'State', required: false, cssClass: '' }
  },
  'city': {
    label: 'City', category: 'location',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10l9-7 9 7M5 21V10m14 11V10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/></svg>`,
    defaultConfig: { label: 'City', required: false, cssClass: '' }
  },
  'state-city': {
    label: 'State & City', category: 'location',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    defaultConfig: { label: 'State & City', required: false, cssClass: '' }
  }
};

const STORAGE_KEY = 'fb_form_state_v2';
const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

// ─── State Manager ─────────────────────────────────────────
class FormBuilderState {
  constructor() {
    this.fields = [];
    this.formTitle = 'Untitled Form';
    this.submissionUrl = '/submit';
    this.undoStack = [];
    this.redoStack = [];
  }

  snapshot() {
    const snap = JSON.stringify({ fields: this.fields, formTitle: this.formTitle, submissionUrl: this.submissionUrl });
    this.undoStack.push(snap);
    this.redoStack = [];
    if (this.undoStack.length > 60) this.undoStack.shift();
  }

  undo() {
    if (!this.undoStack.length) return false;
    this.redoStack.push(JSON.stringify({ fields: this.fields, formTitle: this.formTitle, submissionUrl: this.submissionUrl }));
    const prev = JSON.parse(this.undoStack.pop());
    this.fields = prev.fields;
    this.formTitle = prev.formTitle;
    this.submissionUrl = prev.submissionUrl;
    return true;
  }

  redo() {
    if (!this.redoStack.length) return false;
    this.undoStack.push(JSON.stringify({ fields: this.fields, formTitle: this.formTitle, submissionUrl: this.submissionUrl }));
    const next = JSON.parse(this.redoStack.pop());
    this.fields = next.fields;
    this.formTitle = next.formTitle;
    this.submissionUrl = next.submissionUrl;
    return true;
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fields: this.fields, formTitle: this.formTitle, submissionUrl: this.submissionUrl }));
      this._updateSaveStatus();
    } catch (e) {}
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      this.fields = data.fields || [];
      this.formTitle = data.formTitle || 'Untitled Form';
      this.submissionUrl = data.submissionUrl || '/submit';
      return true;
    } catch (e) { return false; }
  }

  _updateSaveStatus() {
    const el = document.getElementById('fb-save-status');
    if (!el) return;
    el.textContent = 'Saved';
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => { el.textContent = 'Auto-saved'; }, 800);
  }
}

// ─── Form Builder Class ────────────────────────────────────
class FormBuilder {
  constructor() {
    this.state = new FormBuilderState();
    this.selectedFieldId = null;
    this.currentPaletteTab = 'add-fields';
    this.previewMode = false;
    this.fieldCounter = 0;

    this.init();
  }

  init() {
    if (this.state.load()) {
      this.fieldCounter = this.state.fields.reduce((max, f) => {
        const n = parseInt((f.id || '').replace('field_', ''), 10) || 0;
        return Math.max(max, n);
      }, 0);
    }
    this.initSortable();
    this.bindEvents();
    this.renderCanvas();
    this.syncHeaderInputs();
    this.initPaletteSearch();
  }

  generateId() { return `field_${++this.fieldCounter}`; }

  // ─── Drag & Drop ────────────────────────────────────────
  initSortable() {
    const canvasEl = document.getElementById('fb-canvas-fields');
    if (!canvasEl || typeof Sortable === 'undefined') return;

    // Init on ALL palette grids (each category group)
    document.querySelectorAll('.fb-palette-grid').forEach(grid => {
      Sortable.create(grid, {
        group: { name: 'formfields', pull: 'clone', put: false },
        sort: false,
        animation: 150,
        ghostClass: 'fb-tile-ghost',
        chosenClass: 'fb-tile-chosen',
        dragClass: 'fb-tile-dragging',
        onStart: () => {
          document.getElementById('fb-canvas-drop-zone').classList.add('fb-dragover-active');
        },
        onEnd: () => {
          document.getElementById('fb-canvas-drop-zone').classList.remove('fb-dragover-active');
        }
      });
    });

    // Canvas: sort + accept drops from palette
    Sortable.create(canvasEl, {
      group: { name: 'formfields', pull: false, put: true },
      animation: 220,
      handle: '.fb-drag-handle',
      ghostClass: 'fb-card-ghost',
      chosenClass: 'fb-card-chosen',
      dragClass: 'fb-card-dragging',
      onAdd: (evt) => {
        const type = evt.item.dataset.fieldType;
        const index = evt.newIndex;
        evt.item.parentNode.removeChild(evt.item);
        this.addField(type, index);
      },
      onUpdate: (evt) => {
        this.moveField(evt.oldIndex, evt.newIndex);
      },
      onOver: () => {
        document.getElementById('fb-canvas-drop-zone').classList.add('fb-dragover-active');
      },
      onUnchoose: () => {
        document.getElementById('fb-canvas-drop-zone').classList.remove('fb-dragover-active');
      }
    });
  }

  // ─── Field Operations ────────────────────────────────────
  addField(type, index = -1) {
    const def = FIELD_TYPES[type];
    if (!def) return;

    this.state.snapshot();

    const field = {
      id: this.generateId(),
      type,
      config: JSON.parse(JSON.stringify(def.defaultConfig))
    };
    // Give label a friendly default including a count
    if (field.config.label) {
      const sameType = this.state.fields.filter(f => f.type === type).length;
      if (sameType > 0) field.config.label = `${def.label} ${sameType + 1}`;
    }

    if (index === -1 || index >= this.state.fields.length) {
      this.state.fields.push(field);
    } else {
      this.state.fields.splice(index, 0, field);
    }

    this.state.save();
    this.renderCanvas();
    this.updateFieldCount();
    this.highlightField(field.id);
    this.showToast(`${def.label} added`, 'success');
  }

  moveField(oldIndex, newIndex) {
    if (oldIndex === newIndex) return;
    this.state.snapshot();
    const [moved] = this.state.fields.splice(oldIndex, 1);
    this.state.fields.splice(newIndex, 0, moved);
    this.state.save();
    // Re-init sortable after render
    this.renderCanvas();
  }

  editField(id) {
    this.selectedFieldId = id;
    this.switchPaletteTab('field-options');
    this.renderOptionsPanel();
    document.querySelectorAll('.fb-field-card').forEach(c => c.classList.remove('fb-card-selected'));
    const card = document.getElementById(`card_${id}`);
    if (card) { card.classList.add('fb-card-selected'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  }

  duplicateField(id) {
    const field = this.state.fields.find(f => f.id === id);
    if (!field) return;
    this.state.snapshot();

    const copy = { id: this.generateId(), type: field.type, config: JSON.parse(JSON.stringify(field.config)) };
    const idx = this.state.fields.findIndex(f => f.id === id);
    this.state.fields.splice(idx + 1, 0, copy);

    this.state.save();
    this.renderCanvas();
    this.updateFieldCount();
    this.highlightField(copy.id);
    this.showToast('Field duplicated', 'success');
  }

  deleteField(id) { this.showDeleteConfirm(id); }

  confirmDelete(id) {
    const field = this.state.fields.find(f => f.id === id);
    if (!field) return;
    this.state.snapshot();
    this.state.fields = this.state.fields.filter(f => f.id !== id);

    if (this.selectedFieldId === id) {
      this.selectedFieldId = null;
      this.switchPaletteTab('add-fields');
    }
    this.state.save();
    this.renderCanvas();
    this.updateFieldCount();
    this.showToast('Field removed', 'info');
  }

  updateFieldConfig(key, value) {
    if (!this.selectedFieldId) return;
    const field = this.state.fields.find(f => f.id === this.selectedFieldId);
    if (!field) return;
    field.config[key] = value;
    this.state.save();
    this.updateCardPreview(field);
  }

  updateFieldCount() {
    const el = document.getElementById('fb-field-count');
    if (el) {
      const n = this.state.fields.length;
      el.textContent = `${n} field${n !== 1 ? 's' : ''}`;
    }
  }

  // ─── Canvas Rendering ────────────────────────────────────
  renderCanvas() {
    const container = document.getElementById('fb-canvas-fields');
    const emptyState = document.getElementById('fb-empty-state');
    if (!container) return;

    if (this.state.fields.length === 0) {
      emptyState && (emptyState.style.display = 'flex');
      container.innerHTML = '';
    } else {
      emptyState && (emptyState.style.display = 'none');
      container.innerHTML = this.state.fields.map(f => this.getFieldCardHTML(f)).join('');
    }

    if (this.selectedFieldId) {
      const card = document.getElementById(`card_${this.selectedFieldId}`);
      if (card) card.classList.add('fb-card-selected');
    }

    this.bindCardActions();
    this.updateFieldCount();
  }

  getFieldCardHTML(field) {
    const def = FIELD_TYPES[field.type];
    if (!def) return '';
    const label = field.config.label || def.label;
    const isRequired = field.config.required;

    return `
<div class="fb-field-card" id="card_${field.id}" data-field-id="${field.id}" data-type="${field.type}">
  <div class="fb-card-header">
    <div class="fb-drag-handle" title="Drag to reorder">
      <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor">
        <circle cx="3" cy="3" r="1.5"/><circle cx="9" cy="3" r="1.5"/>
        <circle cx="3" cy="9" r="1.5"/><circle cx="9" cy="9" r="1.5"/>
        <circle cx="3" cy="15" r="1.5"/><circle cx="9" cy="15" r="1.5"/>
      </svg>
    </div>
    <div class="fb-card-title-area">
      <span class="fb-card-type-icon">${def.icon}</span>
      <span class="fb-card-field-label">${this.escHtml(label)}</span>
      <span class="fb-required-badge" style="display:${isRequired ? 'inline-flex' : 'none'}">Required</span>
    </div>
    <div class="fb-card-actions">
      <button class="fb-action-btn fb-edit-btn" data-id="${field.id}" title="Edit field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="fb-action-btn fb-duplicate-btn" data-id="${field.id}" title="Duplicate field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      </button>
      <button class="fb-action-btn fb-delete-btn" data-id="${field.id}" title="Delete field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </button>
    </div>
  </div>
  <div class="fb-field-preview">
    ${this.getFieldPreviewHTML(field)}
  </div>
</div>`;
  }

  getFieldPreviewHTML(field) {
    const c = field.config;
    const ph = this.escHtml(c.placeholder || '');
    const dv = this.escHtml(c.defaultValue || '');

    switch (field.type) {
      case 'text-input':
        return `<input type="text" class="fb-preview-input" placeholder="${ph}" value="${dv}" disabled>`;
      case 'textarea':
        return `<textarea class="fb-preview-textarea" placeholder="${ph}" disabled>${dv}</textarea>`;
      case 'number-input':
        return `<input type="number" class="fb-preview-input" placeholder="${ph || '0'}" value="${dv}" disabled>`;
      case 'email-input':
        return `<input type="email" class="fb-preview-input" placeholder="${ph || 'you@example.com'}" value="${dv}" disabled>`;
      case 'phone-input':
        return `<input type="tel" class="fb-preview-input" placeholder="${ph || '+1 (555) 000-0000'}" disabled>`;
      case 'dropdown': {
        const opts = (c.options || []).map(o => `<option>${this.escHtml(o)}</option>`).join('');
        return `<select class="fb-preview-select" disabled><option value="" disabled selected>${this.escHtml(c.placeholder || 'Select an option')}</option>${opts}</select>`;
      }
      case 'radio-buttons':
        return `<div class="fb-preview-radios">${(c.options || []).map((o, i) =>
          `<label class="fb-preview-radio-item"><input type="radio" name="pr_${field.id}" disabled> <span>${this.escHtml(o)}</span></label>`).join('')}</div>`;
      case 'checkboxes':
        return `<div class="fb-preview-checks">${(c.options || []).map(o =>
          `<label class="fb-preview-check-item"><input type="checkbox" disabled> <span>${this.escHtml(o)}</span></label>`).join('')}</div>`;
      case 'date-picker':
        return `<input type="date" class="fb-preview-input" disabled>`;
      case 'file-upload':
        return `<div class="fb-preview-file"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><span>Click to upload or drag &amp; drop</span></div>`;
      case 'title':
        return `<h2 class="fb-preview-title">${this.escHtml(c.content || 'Section Title')}</h2>`;
      case 'description':
        return `<p class="fb-preview-description">${this.escHtml(c.content || 'Add a description here...')}</p>`;
      case 'new-line':
        return `<hr class="fb-preview-hr">`;
      case 'page-break':
        return `<div class="fb-preview-page-break">— Page Break —</div>`;
      case 'hidden-field':
        return `<div class="fb-preview-hidden"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg> <span>Hidden value: <code>${this.escHtml(c.defaultValue || '(empty)')}</code></span></div>`;
      case 'state':
        return `<select class="fb-preview-select" disabled><option>Select State</option><option>California</option><option>New York</option><option>Texas</option></select>`;
      case 'city':
        return `<select class="fb-preview-select" disabled><option>Select City</option><option>Los Angeles</option><option>New York City</option><option>Houston</option></select>`;
      case 'state-city':
        return `<div class="fb-preview-row"><select class="fb-preview-select" disabled><option>Select State</option></select><select class="fb-preview-select" disabled><option>Select City</option></select></div>`;
      default:
        return `<input type="text" class="fb-preview-input" disabled>`;
    }
  }

  updateCardPreview(field) {
    const card = document.getElementById(`card_${field.id}`);
    if (!card) return;
    const labelEl = card.querySelector('.fb-card-field-label');
    if (labelEl) labelEl.textContent = field.config.label || FIELD_TYPES[field.type]?.label || '';
    const badge = card.querySelector('.fb-required-badge');
    if (badge) badge.style.display = field.config.required ? 'inline-flex' : 'none';
    const preview = card.querySelector('.fb-field-preview');
    if (preview) preview.innerHTML = this.getFieldPreviewHTML(field);
  }

  highlightField(id) {
    setTimeout(() => {
      const card = document.getElementById(`card_${id}`);
      if (card) {
        card.classList.add('fb-card-highlight');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => card.classList.remove('fb-card-highlight'), 1600);
      }
    }, 60);
  }

  bindCardActions() {
    document.querySelectorAll('.fb-edit-btn').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); this.editField(btn.dataset.id); }));
    document.querySelectorAll('.fb-duplicate-btn').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); this.duplicateField(btn.dataset.id); }));
    document.querySelectorAll('.fb-delete-btn').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); this.deleteField(btn.dataset.id); }));
  }

  // ─── Options Panel ───────────────────────────────────────
  renderOptionsPanel() {
    const field = this.state.fields.find(f => f.id === this.selectedFieldId);
    const container = document.getElementById('panel-field-options');
    if (!container) return;

    if (!field) {
      container.innerHTML = `
      <div class="fb-options-empty">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <p>Click the <strong>edit icon</strong> on any canvas field to configure it.</p>
      </div>`;
      return;
    }

    const def = FIELD_TYPES[field.type];
    const c = field.config;

    const hasPlaceholder = ['text-input','textarea','number-input','email-input','phone-input'].includes(field.type);
    const hasMinMax      = ['text-input','textarea'].includes(field.type);
    const hasOptions     = ['dropdown','radio-buttons','checkboxes'].includes(field.type);
    const hasRequired    = !['new-line','page-break'].includes(field.type);
    const hasDefaultVal  = ['text-input','number-input','email-input','hidden-field'].includes(field.type);
    const hasContent     = ['title','description'].includes(field.type);

    let optionsListHTML = '';
    if (hasOptions) {
      const opts = c.options || [];
      optionsListHTML = `
      <div class="fb-option-group">
        <label class="fb-option-label">Options</label>
        <div class="fb-options-list" id="opt-list-${field.id}">
          ${opts.map((o, i) => `
          <div class="fb-option-row-item" data-index="${i}">
            <div class="fb-option-drag-handle">⠿</div>
            <input type="text" class="fb-option-row-input" value="${this.escHtml(o)}" data-index="${i}" placeholder="Option ${i+1}">
            <button class="fb-option-remove-btn" data-index="${i}" title="Remove">×</button>
          </div>`).join('')}
        </div>
        <button class="fb-add-option-btn" id="add-opt-${field.id}">+ Add Option</button>
      </div>`;
    }

    container.innerHTML = `
<div class="fb-options-wrapper">
  <div class="fb-options-field-header">
    <div class="fb-options-field-icon">${def.icon}</div>
    <div>
      <div class="fb-options-field-type">${def.label}</div>
      <div class="fb-options-field-id">ID: ${field.id}</div>
    </div>
  </div>

  <div class="fb-options-form">

    <div class="fb-option-group">
      <label class="fb-option-label">Label</label>
      <input type="text" class="fb-option-input" value="${this.escHtml(c.label || '')}" data-config="label" placeholder="Field label">
    </div>

    ${hasPlaceholder ? `
    <div class="fb-option-group">
      <label class="fb-option-label">Placeholder</label>
      <input type="text" class="fb-option-input" value="${this.escHtml(c.placeholder || '')}" data-config="placeholder" placeholder="Placeholder text">
    </div>` : ''}

    ${hasContent ? `
    <div class="fb-option-group">
      <label class="fb-option-label">Content</label>
      <textarea class="fb-option-textarea" data-config="content" placeholder="Content...">${this.escHtml(c.content || '')}</textarea>
    </div>` : ''}

    ${hasMinMax ? `
    <div class="fb-option-row">
      <div class="fb-option-group">
        <label class="fb-option-label">Min Chars</label>
        <input type="number" class="fb-option-input" value="${c.minChars || ''}" data-config="minChars" placeholder="0" min="0">
      </div>
      <div class="fb-option-group">
        <label class="fb-option-label">Max Chars</label>
        <input type="number" class="fb-option-input" value="${c.maxChars || ''}" data-config="maxChars" placeholder="∞" min="0">
      </div>
    </div>` : ''}

    ${optionsListHTML}

    ${hasRequired ? `
    <div class="fb-option-group">
      <div class="fb-toggle-row">
        <div>
          <div class="fb-option-label">Required Field</div>
          <div class="fb-option-hint">Mark as required for form submission</div>
        </div>
        <label class="fb-toggle-switch">
          <input type="checkbox" ${c.required ? 'checked' : ''} data-config="required">
          <span class="fb-toggle-slider"></span>
        </label>
      </div>
    </div>` : ''}

    <div class="fb-option-group">
      <label class="fb-option-label">CSS Class</label>
      <input type="text" class="fb-option-input" value="${this.escHtml(c.cssClass || '')}" data-config="cssClass" placeholder="e.g. my-custom-class">
    </div>

    ${hasDefaultVal ? `
    <div class="fb-option-group">
      <label class="fb-option-label">Default Value</label>
      <input type="text" class="fb-option-input" value="${this.escHtml(c.defaultValue || '')}" data-config="defaultValue" placeholder="Default value">
    </div>` : ''}

  </div>

  <div class="fb-options-danger">
    <button class="fb-remove-element-btn" data-id="${field.id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      Remove Element
    </button>
  </div>
</div>`;

    this.bindOptionsPanelEvents(field);
  }

  bindOptionsPanelEvents(field) {
    const container = document.getElementById('panel-field-options');
    if (!container || !field) return;

    // All config inputs
    container.querySelectorAll('[data-config]').forEach(input => {
      const ev = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(ev, () => {
        const key = input.dataset.config;
        const val = input.type === 'checkbox' ? input.checked : input.value;
        this.updateFieldConfig(key, val);
      });
    });

    // Add option button
    const addOptBtn = container.querySelector('.fb-add-option-btn');
    if (addOptBtn) {
      addOptBtn.addEventListener('click', () => {
        field.config.options = field.config.options || [];
        field.config.options.push(`Option ${field.config.options.length + 1}`);
        this.state.save();
        this.renderOptionsPanel();
        this.updateCardPreview(field);
      });
    }

    // Option row inputs (live update)
    container.querySelectorAll('.fb-option-row-input').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.dataset.index, 10);
        if (!isNaN(idx)) {
          field.config.options[idx] = input.value;
          this.state.save();
          this.updateCardPreview(field);
        }
      });
    });

    // Remove option buttons
    container.querySelectorAll('.fb-option-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        if (!isNaN(idx)) {
          field.config.options.splice(idx, 1);
          this.state.save();
          this.renderOptionsPanel();
          this.updateCardPreview(field);
        }
      });
    });

    // Remove element (danger)
    const removeBtn = container.querySelector('.fb-remove-element-btn');
    if (removeBtn) removeBtn.addEventListener('click', () => this.deleteField(removeBtn.dataset.id));
  }

  // ─── Tabs ────────────────────────────────────────────────
  switchPaletteTab(tab) {
    this.currentPaletteTab = tab;
    document.querySelectorAll('.fb-panel-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    const addPanel = document.getElementById('panel-add-fields');
    const optPanel = document.getElementById('panel-field-options');
    if (addPanel) addPanel.style.display = tab === 'add-fields' ? 'block' : 'none';
    if (optPanel) optPanel.style.display = tab === 'field-options' ? 'block' : 'none';
  }

  // ─── Palette Search ──────────────────────────────────────
  initPaletteSearch() {
    const searchInput = document.getElementById('fb-palette-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.fb-palette-tile').forEach(tile => {
        const label = (tile.dataset.label || '').toLowerCase();
        const type  = (tile.dataset.fieldType || '').toLowerCase();
        tile.classList.toggle('fb-tile-hidden', q !== '' && !label.includes(q) && !type.includes(q));
      });
      // Hide group headers if all tiles hidden
      document.querySelectorAll('.fb-palette-group').forEach(group => {
        const tiles = group.querySelectorAll('.fb-palette-tile');
        const anyVisible = [...tiles].some(t => !t.classList.contains('fb-tile-hidden'));
        group.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  // ─── Preview Mode ────────────────────────────────────────
  togglePreview() {
    this.previewMode = !this.previewMode;
    const modal = document.getElementById('fb-preview-modal');
    const btn   = document.getElementById('fb-preview-toggle');
    if (!modal) return;

    if (this.previewMode) {
      modal.innerHTML = this.buildPreviewHTML();
      modal.classList.add('active');
      if (btn) { btn.classList.add('active'); btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Close Preview`; }
    } else {
      modal.classList.remove('active');
      if (btn) { btn.classList.remove('active'); btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Preview`; }
    }
  }

  buildPreviewHTML() {
    const stateOptions = US_STATES.map(s => `<option value="${s}">${s}</option>`).join('');
    const fieldsHTML = this.state.fields.map(field => {
      const c   = field.config;
      const lbl = c.label || FIELD_TYPES[field.type]?.label || '';
      const req = c.required;
      const cls = this.escHtml(c.cssClass || '');

      if (field.type === 'new-line')    return '<hr class="fb-preview-modal-hr">';
      if (field.type === 'page-break')  return '<div class="fb-preview-modal-page-break">— Page Break —</div>';
      if (field.type === 'title')       return `<h2 class="fb-preview-modal-title ${cls}">${this.escHtml(c.content || lbl)}</h2>`;
      if (field.type === 'description') return `<p class="fb-preview-modal-desc ${cls}">${this.escHtml(c.content || '')}</p>`;
      if (field.type === 'hidden-field') return `<input type="hidden" name="${field.id}" value="${this.escHtml(c.defaultValue || '')}">`;

      const labelTag = `<label class="fb-preview-modal-label">${this.escHtml(lbl)}${req ? '<span class="required-star">*</span>' : ''}</label>`;
      let inp = '';
      const ph  = this.escHtml(c.placeholder || '');
      const dv  = this.escHtml(c.defaultValue || '');
      const r   = req ? 'required' : '';

      switch (field.type) {
        case 'text-input':
          inp = `<input type="text" class="fb-preview-modal-input ${cls}" placeholder="${ph}" value="${dv}" ${c.minChars ? `minlength="${c.minChars}"` : ''} ${c.maxChars ? `maxlength="${c.maxChars}"` : ''} ${r}>`;
          break;
        case 'textarea':
          inp = `<textarea class="fb-preview-modal-textarea ${cls}" placeholder="${ph}" ${r}>${dv}</textarea>`;
          break;
        case 'number-input':
          inp = `<input type="number" class="fb-preview-modal-input ${cls}" placeholder="${ph}" value="${dv}" ${r}>`;
          break;
        case 'email-input':
          inp = `<input type="email" class="fb-preview-modal-input ${cls}" placeholder="${ph || 'you@example.com'}" value="${dv}" ${r}>`;
          break;
        case 'phone-input':
          inp = `<input type="tel" class="fb-preview-modal-input ${cls}" placeholder="${ph || '+1 (555) 000-0000'}" ${r}>`;
          break;
        case 'dropdown': {
          const opts = (c.options || []).map(o => `<option value="${this.escHtml(o)}">${this.escHtml(o)}</option>`).join('');
          inp = `<select class="fb-preview-modal-select ${cls}" ${r}><option value="" disabled selected>${this.escHtml(c.placeholder || 'Select an option')}</option>${opts}</select>`;
          break;
        }
        case 'radio-buttons':
          inp = `<div class="fb-preview-modal-radios">${(c.options || []).map(o =>
            `<label class="fb-preview-modal-radio-item"><input type="radio" name="${field.id}" ${r}> ${this.escHtml(o)}</label>`).join('')}</div>`;
          break;
        case 'checkboxes':
          inp = `<div class="fb-preview-modal-checks">${(c.options || []).map(o =>
            `<label class="fb-preview-modal-check-item"><input type="checkbox"> ${this.escHtml(o)}</label>`).join('')}</div>`;
          break;
        case 'date-picker':
          inp = `<input type="date" class="fb-preview-modal-input ${cls}" ${r}>`;
          break;
        case 'file-upload':
          inp = `<input type="file" class="fb-preview-modal-file ${cls}" ${r}>`;
          break;
        case 'state':
          inp = `<select class="fb-preview-modal-select ${cls}" ${r}><option value="">Select State</option>${stateOptions}</select>`;
          break;
        case 'city':
          inp = `<select class="fb-preview-modal-select ${cls}" ${r}><option value="">Select City</option><option>Los Angeles</option><option>New York City</option><option>Chicago</option><option>Houston</option><option>Phoenix</option><option>Philadelphia</option><option>San Antonio</option><option>San Diego</option></select>`;
          break;
        case 'state-city':
          inp = `<div class="fb-preview-modal-row">
            <div class="fb-preview-modal-col"><label class="fb-preview-modal-label-sm">State</label><select class="fb-preview-modal-select" ${r}><option value="">Select State</option>${stateOptions}</select></div>
            <div class="fb-preview-modal-col"><label class="fb-preview-modal-label-sm">City</label><select class="fb-preview-modal-select" ${r}><option value="">Select City</option><option>Los Angeles</option><option>New York City</option><option>Chicago</option><option>Houston</option></select></div>
          </div>`;
          break;
        default:
          inp = `<input type="text" class="fb-preview-modal-input ${cls}" ${r}>`;
      }

      return `<div class="fb-preview-modal-field">${labelTag}${inp}</div>`;
    }).join('');

    return `
<div class="fb-preview-modal-overlay" onclick="window.fb.togglePreview()"></div>
<div class="fb-preview-modal-box">
  <div class="fb-preview-modal-header">
    <h2>${this.escHtml(this.state.formTitle || 'Untitled Form')}</h2>
    <button class="fb-preview-modal-close" onclick="window.fb.togglePreview()">✕</button>
  </div>
  <div class="fb-preview-modal-body">
    <form class="fb-preview-modal-form" onsubmit="event.preventDefault(); window.fb.showToast('Form submitted! (Preview mode — no data sent)', 'success')">
      ${fieldsHTML || '<p class="fb-preview-empty">No fields added yet. Go back and add some fields.</p>'}
      ${this.state.fields.length > 0 ? '<button type="submit" class="fb-preview-submit-btn">Submit Form</button>' : ''}
    </form>
  </div>
</div>`;
  }

  // ─── JSON Schema ─────────────────────────────────────────
  buildJSON() {
    return {
      title: this.state.formTitle,
      submissionUrl: this.state.submissionUrl,
      createdAt: new Date().toISOString(),
      fieldCount: this.state.fields.length,
      fields: this.state.fields.map(f => ({
        id: f.id,
        type: f.type,
        ...f.config
      }))
    };
  }

  onNext() {
    if (this.state.fields.length === 0) {
      this.showToast('Add at least one field before submitting.', 'warning');
      return;
    }
    const json = this.buildJSON();
    const jsonStr = JSON.stringify(json, null, 2);
    console.log('📋 FormCraft — Form Schema JSON:', json);
    this.showJsonModal(jsonStr);
  }

  showJsonModal(jsonStr) {
    document.getElementById('fb-json-modal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'fb-json-modal';
    modal.className = 'fb-json-modal';
    modal.innerHTML = `
<div class="fb-json-modal-overlay" onclick="document.getElementById('fb-json-modal').remove()"></div>
<div class="fb-json-modal-box">
  <div class="fb-json-modal-header">
    <h3>📋 Form Schema JSON</h3>
    <div class="fb-json-modal-actions">
      <button class="fb-copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('fb-json-content').textContent).then(()=>window.fb.showToast('Copied to clipboard!','success'))">Copy JSON</button>
      <button class="fb-json-close-btn" onclick="document.getElementById('fb-json-modal').remove()">✕</button>
    </div>
  </div>
  <div class="fb-json-modal-body">
    <pre id="fb-json-content"><code>${this.escHtml(jsonStr)}</code></pre>
  </div>
</div>`;
    document.body.appendChild(modal);
  }

  // ─── Toast Notifications ─────────────────────────────────
  showToast(message, type = 'info') {
    const container = document.getElementById('fb-toast-container');
    if (!container) return;

    const icons = { success: '✓', info: 'i', warning: '!', error: '✕' };
    const toast = document.createElement('div');
    toast.className = `fb-toast fb-toast-${type}`;
    toast.innerHTML = `<span class="fb-toast-icon">${icons[type] || 'i'}</span><span class="fb-toast-msg">${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('fb-toast-show')); });
    setTimeout(() => {
      toast.classList.remove('fb-toast-show');
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }

  showDeleteConfirm(id) {
    const field = this.state.fields.find(f => f.id === id);
    if (!field) return;
    const label = field.config.label || FIELD_TYPES[field.type]?.label || 'this field';
    const container = document.getElementById('fb-toast-container');

    container.querySelectorAll('.fb-toast-confirm').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = 'fb-toast fb-toast-confirm fb-toast-show';
    toast.innerHTML = `
<span class="fb-toast-icon">🗑</span>
<span class="fb-toast-msg">Remove "<strong>${this.escHtml(label)}</strong>"?</span>
<div class="fb-toast-actions">
  <button class="fb-toast-confirm-yes" onclick="window.fb._doDelete('${id}')">Remove</button>
  <button class="fb-toast-confirm-no" onclick="this.closest('.fb-toast').remove()">Cancel</button>
</div>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.remove('fb-toast-show'); setTimeout(() => toast.remove(), 350); }, 6000);
  }

  _doDelete(id) {
    document.querySelectorAll('.fb-toast-confirm').forEach(t => t.remove());
    this.confirmDelete(id);
  }

  // ─── Header Sync ─────────────────────────────────────────
  syncHeaderInputs() {
    const titleInput   = document.getElementById('fb-form-title');
    const urlInput     = document.getElementById('fb-form-url');
    const titleCounter = document.getElementById('fb-title-counter');

    if (titleInput) {
      titleInput.value = this.state.formTitle;
      if (titleCounter) titleCounter.textContent = `${titleInput.value.length}/200`;
      titleInput.addEventListener('input', () => {
        const val = titleInput.value.slice(0, 200);
        titleInput.value = val;
        this.state.formTitle = val;
        if (titleCounter) titleCounter.textContent = `${val.length}/200`;
        this.state.save();
      });
    }
    if (urlInput) {
      urlInput.value = this.state.submissionUrl;
      urlInput.addEventListener('input', () => {
        this.state.submissionUrl = urlInput.value;
        this.state.save();
      });
    }
  }

  // ─── Global Events ───────────────────────────────────────
  bindEvents() {
    // Palette sub-tabs
    document.querySelectorAll('.fb-panel-tab').forEach(tab =>
      tab.addEventListener('click', () => this.switchPaletteTab(tab.dataset.tab)));

    // Main tabs (Form Editor / Settings) — Settings tab is non-functional per spec
    document.querySelectorAll('.fb-main-tab').forEach(tab =>
      tab.addEventListener('click', () => {
        document.querySelectorAll('.fb-main-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }));

    // Click-to-add tiles as alternative to drag
    document.querySelectorAll('.fb-palette-tile').forEach(tile =>
      tile.addEventListener('click', () => {
        const type = tile.dataset.fieldType;
        if (type) this.addField(type);
      }));

    // Footer buttons
    document.getElementById('fb-next')?.addEventListener('click', () => this.onNext());
    document.getElementById('fb-cancel')?.addEventListener('click', () => {
      if (this.state.fields.length === 0) return;
      if (confirm('Clear all fields? This action cannot be undone.')) {
        this.state.snapshot();
        this.state.fields = [];
        this.selectedFieldId = null;
        this.state.save();
        this.renderCanvas();
        this.switchPaletteTab('add-fields');
        this.showToast('Form cleared', 'info');
      }
    });
    document.getElementById('fb-preview-toggle')?.addEventListener('click', () => this.togglePreview());

    // Header undo/redo buttons
    document.getElementById('fb-undo-btn')?.addEventListener('click', () => this._undo());
    document.getElementById('fb-redo-btn')?.addEventListener('click', () => this._redo());

    // Click on canvas background to deselect
    document.getElementById('fb-canvas-drop-zone')?.addEventListener('click', e => {
      if (e.target === e.currentTarget || e.target.classList.contains('fb-canvas-fields')) this.deselectAll();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', e => this.handleKeyboard(e));
  }

  _undo() { if (this.state.undo()) { this.renderCanvas(); this.syncHeaderInputs(); this.showToast('Undone', 'info'); } }
  _redo() { if (this.state.redo()) { this.renderCanvas(); this.syncHeaderInputs(); this.showToast('Redone', 'info'); } }

  deselectAll() {
    this.selectedFieldId = null;
    document.querySelectorAll('.fb-field-card').forEach(c => c.classList.remove('fb-card-selected'));
    if (this.currentPaletteTab === 'field-options') this.switchPaletteTab('add-fields');
  }

  handleKeyboard(e) {
    const inInput = ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName);
    if (inInput) { if (e.key === 'Escape') e.target.blur(); return; }

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); this._undo(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) { e.preventDefault(); this._redo(); return; }
    if (e.key === 'Escape') {
      this.deselectAll();
      if (this.previewMode) this.togglePreview();
      document.getElementById('fb-json-modal')?.remove();
    }
    if (e.key === 'Delete' && this.selectedFieldId) this.deleteField(this.selectedFieldId);
  }

  // ─── Utilities ───────────────────────────────────────────
  escHtml(str) {
    if (typeof str !== 'string') str = String(str ?? '');
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }
}

// ─── Bootstrap ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.fb = new FormBuilder();
});
