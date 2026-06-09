# FormCraft — Drag-and-Drop Form Builder

A fully-functional drag-and-drop Form Builder UI built within a Laravel project as part of a front-end developer assignment. Built with Laravel Blade components, vanilla CSS, and SortableJS.

---

## Live Demo

Run locally with `php artisan serve` — see setup below.

---

## Setup Steps

### Prerequisites
- PHP 8.0+
- Composer
- A web server or PHP built-in server

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/pawanshekhawat/Edunet-Assignment.git
cd Edunet-Assignment

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Start the server
php artisan serve
```

Then open **http://127.0.0.1:8000** in your browser.

> **Note:** No database setup is required. The Form Builder is entirely client-side — no backend calls are made.

---

## Features

### Core Form Builder
- **Drag-and-drop** from the right palette onto the left canvas
- **Click-to-add** tiles as an alternative to dragging
- **Drag to reorder** placed fields using the handle icon
- **Edit** any field via the options panel (live preview updates)
- **Duplicate** a field with all config preserved
- **Delete** with inline confirmation toast

### Field Types (18 total)
| Category | Fields |
|---|---|
| Basic | Text Input, Text Area, Number Input, Email Input, Phone Input |
| Selection | Dropdown, Radio Buttons, Checkboxes |
| Advanced | Date Picker, File Upload |
| Layout | Title, Description, New Line, Page Break, Hidden Field |
| Location | State, City, State & City Combined |

### Field Configuration
- Label (all fields)
- Placeholder text (Text, Number, Email, Phone, Textarea)
- Min / Max characters (Text Input, Text Area)
- Options list with add/remove rows (Dropdown, Radio, Checkboxes)
- Required toggle (all applicable fields)
- CSS Class (all fields)
- Default value (Text, Number, Email, Hidden Field)
- Content (Title, Description)
- Remove Element (danger button)

### Bonus Features ✅
| Feature | Implementation |
|---|---|
| **Undo / Redo** | `Ctrl+Z` / `Ctrl+Y` — 60-step history stack |
| **Form Preview Mode** | Toggle renders a live, interactive HTML form in a modal |
| **LocalStorage Persistence** | Auto-saves on every change, restores on page refresh |
| **Delete Confirmation** | Slide-in toast with Remove/Cancel actions |
| **Drag-over Visual Feedback** | Blue border + purple tint on canvas during drag |

---

## Drag-and-Drop Library — SortableJS

**Library chosen:** [SortableJS](https://sortablejs.github.io/Sortable/) v1.15.3 (CDN)

**Rationale:**
- **Zero build-step dependency** — loaded via CDN, no npm install or webpack bundling required. This project uses Laravel Mix but the form builder adds no new npm packages.
- **Handles both use cases** in one library: palette→canvas (clone mode) and within-canvas reordering (sort mode).
- **Proven at scale** — 28k+ GitHub stars, used in Vue Draggable, Shopify, and others.
- **Excellent touch support** — works on tablets out of the box.
- **Highly configurable** — `group`, `handle`, `ghostClass`, `animation` options give full visual control.

**Alternatives considered:**
- `interact.js` — lower-level, requires more boilerplate for clone-drop behavior.
- Native HTML5 DnD API — inconsistent browser support, poor touch behavior, harder to implement smooth reordering.
- `react-dnd` / `dnd-kit` — require React; overkill for a Blade-based project.

---

## Architecture & Assumptions

### Architecture
```
resources/views/
├── form.blade.php                  ← Standalone form builder page (no admin layout)
└── components/
    └── form-fields/
        └── tile.blade.php          ← Blade component: renders each palette tile with SVG icon

public/
├── css/form-builder.css            ← Complete premium design system (CSS variables, tokens)
└── js/form-builder.js              ← FormBuilderState + FormBuilder classes
```

**`FormBuilderState`** — Manages:
- `fields[]` array (ordered field configs)
- Undo/redo stacks (JSON snapshots)
- LocalStorage persistence

**`FormBuilder`** — Manages:
- SortableJS initialization (palette clone mode + canvas sort mode)
- DOM rendering (`renderCanvas`, `getFieldCardHTML`, `getFieldPreviewHTML`)
- Field CRUD operations
- Options panel (live config updates)
- Preview modal, JSON modal, toast notifications
- Keyboard shortcuts

### Assumptions
1. The Form Builder is the only page in this project — `routes/web.php` routes `/` to `GuestController@interviewAssessment` → `form.blade.php`.
2. `form.blade.php` is a **standalone HTML page** (does not extend `layouts.admin`) to allow a clean, purpose-built Form Builder interface.
3. No API calls are needed — all state is client-side with localStorage persistence.
4. Tailwind CSS was **not** added (requires build step); custom CSS was used instead, which is equally valid per assignment spec ("Tailwind CSS or CSS Modules").
5. The "Settings" tab is present in the UI but non-functional per assignment specification ("Only the Form Editor tab needs to be functional").
6. The "Next" button shows the JSON schema in a modal and also logs it to the browser console.

---

## Sample JSON Output

> Output produced by clicking the **Next** button after building a sample form.

```json
{
  "title": "Contact Us",
  "submissionUrl": "/api/contact",
  "createdAt": "2026-06-09T08:00:00.000Z",
  "fieldCount": 6,
  "fields": [
    {
      "id": "field_1",
      "type": "title",
      "label": "Title",
      "cssClass": "",
      "content": "Get in Touch"
    },
    {
      "id": "field_2",
      "type": "text-input",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true,
      "cssClass": "",
      "minChars": "2",
      "maxChars": "100",
      "defaultValue": ""
    },
    {
      "id": "field_3",
      "type": "email-input",
      "label": "Email Address",
      "placeholder": "you@example.com",
      "required": true,
      "cssClass": "",
      "defaultValue": ""
    },
    {
      "id": "field_4",
      "type": "phone-input",
      "label": "Phone Number",
      "placeholder": "+1 (555) 000-0000",
      "required": false,
      "cssClass": "",
      "defaultValue": ""
    },
    {
      "id": "field_5",
      "type": "dropdown",
      "label": "Subject",
      "placeholder": "Select a subject",
      "required": true,
      "cssClass": "",
      "options": ["General Inquiry", "Technical Support", "Billing", "Partnership"]
    },
    {
      "id": "field_6",
      "type": "textarea",
      "label": "Message",
      "placeholder": "Write your message here...",
      "required": true,
      "cssClass": "",
      "minChars": "20",
      "maxChars": "1000"
    }
  ]
}
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Z` | Undo last action |
| `Ctrl+Y` | Redo |
| `Delete` | Delete selected field |
| `Escape` | Deselect field / close modal |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 8/9 (PHP) |
| Templating | Laravel Blade + Blade Components |
| Drag & Drop | SortableJS v1.15.3 (CDN) |
| Styling | Vanilla CSS (CSS custom properties) |
| Font | Inter (Google Fonts) |
| State | Vanilla JS ES6 Classes |
| Persistence | Browser localStorage |

---

## Repository

**GitHub:** https://github.com/pawanshekhawat/Edunet-Assignment
