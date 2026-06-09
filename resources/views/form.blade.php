<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="FormCraft — A visual drag-and-drop form builder. Create, configure, and export HTML forms as JSON.">

    <title>{{ $title ?? 'Form Builder' }} — FormCraft</title>

    {{-- Google Fonts: Inter --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    {{-- Form Builder Styles --}}
    <link href="{{ asset('css/form-builder.css') }}" rel="stylesheet">
</head>
<body class="fb-body">

{{-- ============================================================
     HEADER BAR
     ============================================================ --}}
<header class="fb-header" role="banner">

    {{-- Brand --}}
    <div class="fb-header-brand">
        <div class="fb-brand-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M8 8h8M8 12h5M8 16h8"/>
            </svg>
        </div>
        <div>
            <div class="fb-brand-name">FormCraft</div>
            <div class="fb-brand-sub">Builder</div>
        </div>
    </div>

    {{-- Form info: title + URL --}}
    <div class="fb-header-form-info">
        <div class="fb-title-wrapper">
            <input type="text"
                   id="fb-form-title"
                   class="fb-title-input"
                   placeholder="Untitled Form"
                   maxlength="200"
                   aria-label="Form title (max 200 characters)">
            <span id="fb-title-counter" class="fb-title-counter" aria-live="polite">0/200</span>
        </div>
        <div class="fb-url-row">
            <span class="fb-url-label">Submission URL:</span>
            <input type="text"
                   id="fb-form-url"
                   class="fb-url-input"
                   value="/submit"
                   placeholder="/api/form"
                   aria-label="Form submission URL">
        </div>
    </div>

    {{-- Main editor tabs --}}
    <nav class="fb-main-tabs" role="tablist" aria-label="Editor views">
        <button class="fb-main-tab active"
                data-tab="editor"
                role="tab"
                aria-selected="true"
                id="main-tab-editor">Form Editor</button>
        <button class="fb-main-tab"
                data-tab="settings"
                role="tab"
                aria-selected="false"
                id="main-tab-settings">Settings</button>
    </nav>

    {{-- Header right: undo/redo + shortcut hint --}}
    <div class="fb-header-right">
        <span class="fb-shortcut-badge">Ctrl+Z Undo</span>
        <button class="fb-undo-btn" id="fb-undo-btn" title="Undo (Ctrl+Z)" aria-label="Undo">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
            </svg>
        </button>
        <button class="fb-redo-btn" id="fb-redo-btn" title="Redo (Ctrl+Y)" aria-label="Redo">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13"/>
            </svg>
        </button>
    </div>

</header>

{{-- ============================================================
     MAIN WORKSPACE
     ============================================================ --}}
<main class="fb-workspace" role="main">

    {{-- ── LEFT: DROP CANVAS ────────────────────────────────── --}}
    <section class="fb-canvas-panel" aria-label="Form canvas">

        <div class="fb-canvas-panel-topbar">
            <span class="fb-canvas-panel-title">Canvas</span>
            <span class="fb-field-count-badge" id="fb-field-count" aria-live="polite">0 fields</span>
        </div>

        <div class="fb-canvas-scroll">
            <div class="fb-drop-zone"
                 id="fb-canvas-drop-zone"
                 role="region"
                 aria-label="Drop zone — drag fields here">

                {{-- Empty state (shown until first field is added) --}}
                <div class="fb-empty-state" id="fb-empty-state" aria-live="polite">
                    <div class="fb-empty-icon" aria-hidden="true">
                        <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="4" y="12" width="40" height="28" rx="4"/>
                            <path d="M16 8h16M24 20v12M18 26l6-6 6 6"/>
                        </svg>
                    </div>
                    <h3 class="fb-empty-title">Start Building Your Form</h3>
                    <p class="fb-empty-subtitle">Drag elements from the right panel to build your form, or click any tile to add it instantly.</p>
                    <div class="fb-empty-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        Drag from the right panel
                    </div>
                </div>

                {{-- SortableJS canvas target --}}
                <div id="fb-canvas-fields" class="fb-canvas-fields" role="list" aria-label="Placed form fields"></div>

            </div>{{-- /drop-zone --}}
        </div>{{-- /canvas-scroll --}}

    </section>{{-- /canvas-panel --}}

    {{-- ── RIGHT: PALETTE / OPTIONS PANEL ─────────────────── --}}
    <aside class="fb-palette-panel" role="complementary" aria-label="Field palette and options">

        {{-- Panel sub-tabs --}}
        <div class="fb-panel-tabs" role="tablist" aria-label="Right panel views">

            <button class="fb-panel-tab active"
                    data-tab="add-fields"
                    role="tab"
                    aria-selected="true"
                    aria-controls="panel-add-fields"
                    id="panel-tab-add">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Add Fields
            </button>

            <button class="fb-panel-tab"
                    data-tab="field-options"
                    role="tab"
                    aria-selected="false"
                    aria-controls="panel-field-options"
                    id="panel-tab-options">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2m0 18v-2m7.07-2.07l-1.41-1.41M4.93 19.07l1.41-1.41M22 12h-2M4 12H2"/>
                </svg>
                Field Options
            </button>

        </div>{{-- /panel-tabs --}}


        {{-- ── ADD FIELDS PANEL ─────────────────────────── --}}
        <div id="panel-add-fields" class="fb-panel-content" role="tabpanel" aria-labelledby="panel-tab-add">

            {{-- Search --}}
            <div class="fb-palette-search">
                <input type="search"
                       id="fb-palette-search"
                       class="fb-search-input"
                       placeholder="Search field types..."
                       aria-label="Search field types"
                       autocomplete="off">
            </div>

            {{-- Grouped field type tiles (rendered by Blade component) --}}
            @php
            $fieldTypeGroups = [
                'Basic Fields' => [
                    ['type' => 'text-input',   'label' => 'Text Input',   'category' => 'basic'],
                    ['type' => 'textarea',      'label' => 'Text Area',    'category' => 'basic'],
                    ['type' => 'number-input',  'label' => 'Number Input', 'category' => 'basic'],
                    ['type' => 'email-input',   'label' => 'Email Input',  'category' => 'basic'],
                    ['type' => 'phone-input',   'label' => 'Phone Input',  'category' => 'basic'],
                ],
                'Selection' => [
                    ['type' => 'dropdown',      'label' => 'Dropdown',       'category' => 'selection'],
                    ['type' => 'radio-buttons', 'label' => 'Radio Buttons',  'category' => 'selection'],
                    ['type' => 'checkboxes',    'label' => 'Checkboxes',     'category' => 'selection'],
                ],
                'Advanced' => [
                    ['type' => 'date-picker',   'label' => 'Date Picker',   'category' => 'advanced'],
                    ['type' => 'file-upload',   'label' => 'File Upload',   'category' => 'advanced'],
                ],
                'Layout' => [
                    ['type' => 'title',         'label' => 'Title',         'category' => 'layout'],
                    ['type' => 'description',   'label' => 'Description',   'category' => 'layout'],
                    ['type' => 'new-line',      'label' => 'New Line',      'category' => 'layout'],
                    ['type' => 'page-break',    'label' => 'Page Break',    'category' => 'layout'],
                    ['type' => 'hidden-field',  'label' => 'Hidden Field',  'category' => 'layout'],
                ],
                'Location' => [
                    ['type' => 'state',         'label' => 'State',         'category' => 'location'],
                    ['type' => 'city',          'label' => 'City',          'category' => 'location'],
                    ['type' => 'state-city',    'label' => 'State & City',  'category' => 'location'],
                ],
            ];
            @endphp

            @foreach ($fieldTypeGroups as $groupName => $groupFields)
            <div class="fb-palette-group" data-category="{{ Str::slug($groupName) }}">
                <div class="fb-palette-group-label" aria-label="{{ $groupName }} fields">{{ $groupName }}</div>
                <div class="fb-palette-grid">
                    @foreach ($groupFields as $field)
                        <x-form-fields.tile
                            :type="$field['type']"
                            :label="$field['label']"
                            :category="$field['category']"
                        />
                    @endforeach
                </div>
            </div>
            @endforeach

        </div>{{-- /panel-add-fields --}}


        {{-- ── FIELD OPTIONS PANEL ──────────────────────── --}}
        <div id="panel-field-options"
             class="fb-panel-content"
             role="tabpanel"
             aria-labelledby="panel-tab-options"
             style="display:none">

            <div class="fb-options-empty">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <p>Click the <strong>edit icon ✏</strong> on any canvas field to configure its properties.</p>
            </div>

        </div>{{-- /panel-field-options --}}

    </aside>{{-- /palette-panel --}}

</main>{{-- /workspace --}}


{{-- ============================================================
     FOOTER
     ============================================================ --}}
<footer class="fb-footer" role="contentinfo">

    <div class="fb-footer-left">
        <button id="fb-cancel"
                class="fb-btn fb-btn-outline"
                aria-label="Clear form">Cancel</button>
    </div>

    <div class="fb-footer-center">
        <div class="fb-save-dot" aria-hidden="true"></div>
        <span id="fb-save-status">Auto-saved</span>
    </div>

    <div class="fb-footer-right">
        <button id="fb-preview-toggle"
                class="fb-btn fb-btn-ghost"
                aria-label="Toggle live preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
            Preview
        </button>

        <button id="fb-next"
                class="fb-btn fb-btn-primary"
                aria-label="Generate JSON schema">
            Next
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </button>
    </div>

</footer>


{{-- ============================================================
     MODALS & OVERLAYS
     ============================================================ --}}

{{-- Toast container --}}
<div id="fb-toast-container" class="fb-toast-container" role="status" aria-live="polite" aria-atomic="false"></div>

{{-- Preview modal (populated by JS) --}}
<div id="fb-preview-modal" class="fb-preview-modal" role="dialog" aria-modal="true" aria-label="Form preview"></div>


{{-- ============================================================
     SCRIPTS
     ============================================================ --}}

{{-- SortableJS CDN --}}
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.3/Sortable.min.js"></script>

{{-- Form Builder application --}}
<script src="{{ asset('js/form-builder.js') }}"></script>

</body>
</html>