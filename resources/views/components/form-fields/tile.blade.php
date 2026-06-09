{{--
    Form Field Palette Tile Component
    Usage: <x-form-fields.tile type="text-input" label="Text Input" category="basic" />
    Props:
        $type     — field type slug  (e.g. 'text-input')
        $label    — human-readable label
        $category — 'basic' | 'selection' | 'advanced' | 'layout' | 'location'
--}}
@props([
    'type'     => 'text-input',
    'label'    => 'Field',
    'category' => 'basic',
])

<div class="fb-palette-tile"
     draggable="true"
     data-field-type="{{ $type }}"
     data-category="{{ $category }}"
     data-label="{{ $label }}"
     id="tile-{{ $type }}"
     title="Drag to add {{ $label }} — or click">

    <div class="fb-tile-icon">
        @switch($type)

            {{-- Basic Fields --}}
            @case('text-input')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="7" width="18" height="10" rx="2"/>
                    <path d="M7 12h10M12 9v6"/>
                </svg>
                @break

            @case('textarea')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M7 8h10M7 12h10M7 16h6"/>
                </svg>
                @break

            @case('number-input')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="7" width="18" height="10" rx="2"/>
                    <text x="7" y="15.5" font-size="8" fill="currentColor" stroke="none" font-weight="700">#</text>
                </svg>
                @break

            @case('email-input')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 7 10-7"/>
                </svg>
                @break

            @case('phone-input')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012.09 4.18 2 2 0 014.07 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                @break

            {{-- Selection Fields --}}
            @case('dropdown')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="7" width="18" height="10" rx="2"/>
                    <polyline points="9 11 12 14 15 11"/>
                </svg>
                @break

            @case('radio-buttons')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="9"/>
                    <circle cx="12" cy="12" r="4"/>
                </svg>
                @break

            @case('checkboxes')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <polyline points="9 12 11 14 15 10"/>
                </svg>
                @break

            {{-- Advanced Fields --}}
            @case('date-picker')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                @break

            @case('file-upload')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                @break

            {{-- Layout Fields --}}
            @case('title')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 6h16M4 12h8M4 18h12"/>
                </svg>
                @break

            @case('description')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 6h16M4 10h16M4 14h12M4 18h8"/>
                </svg>
                @break

            @case('new-line')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="7" x2="21" y2="7" stroke-dasharray="3 3"/>
                    <line x1="3" y1="17" x2="21" y2="17" stroke-dasharray="3 3"/>
                </svg>
                @break

            @case('page-break')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="3 2"/>
                    <polyline points="8 9 12 5 16 9"/>
                </svg>
                @break

            @case('hidden-field')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                @break

            {{-- Location Fields --}}
            @case('state')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                @break

            @case('city')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 21h18M3 10l9-7 9 7M5 21V10m14 11V10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
                </svg>
                @break

            @case('state-city')
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                @break

            @default
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="7" width="18" height="10" rx="2"/>
                </svg>
        @endswitch
    </div>

    <div class="fb-tile-label">{{ $label }}</div>
</div>
