const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 8000;

// Load files
const formBlade = fs.readFileSync(path.join(__dirname, 'resources/views/form.blade.php'), 'utf8');
const tileBlade = fs.readFileSync(path.join(__dirname, 'resources/views/components/form-fields/tile.blade.php'), 'utf8');

// Compile tile component
function getTileHtml(type, label, category) {
  let html = tileBlade;
  
  // Clean up blade comments
  html = html.replace(/\{\{--[\s\S]*?--\}\}/g, '');
  
  // Replace attributes
  html = html.replace(/\{\{\s*\$type\s*\}\}/g, type);
  html = html.replace(/\{\{\s*\$category\s*\}\}/g, category);
  html = html.replace(/\{\{\s*\$label\s*\}\}/g, label);
  
  // Extract correct case block
  const caseRegex = new RegExp(`@case\\('${type}'\\)([\\s\\S]*?)@break`, 'i');
  const match = html.match(caseRegex);
  let svg = '';
  if (match) {
    svg = match[1].trim();
  }
  
  // Replace the entire @switch block with the specific SVG
  const switchRegex = /@switch\(\$type\)[\s\S]*?@endswitch/;
  html = html.replace(switchRegex, svg);
  
  // Remove @props
  html = html.replace(/@props\([\s\S]*?\)/, '');
  
  return html;
}

const groups = {
  'Basic Fields': [
    { type: 'text-input', label: 'Text Input', category: 'basic' },
    { type: 'textarea', label: 'Text Area', category: 'basic' },
    { type: 'number-input', label: 'Number Input', category: 'basic' },
    { type: 'email-input', label: 'Email Input', category: 'basic' },
    { type: 'phone-input', label: 'Phone Input', category: 'basic' },
  ],
  'Selection': [
    { type: 'dropdown', label: 'Dropdown', category: 'selection' },
    { type: 'radio-buttons', label: 'Radio Buttons', category: 'selection' },
    { type: 'checkboxes', label: 'Checkboxes', category: 'selection' },
  ],
  'Advanced': [
    { type: 'date-picker', label: 'Date Picker', category: 'advanced' },
    { type: 'file-upload', label: 'File Upload', category: 'advanced' },
  ],
  'Layout': [
    { type: 'title', label: 'Title', category: 'layout' },
    { type: 'description', label: 'Description', category: 'layout' },
    { type: 'new-line', label: 'New Line', category: 'layout' },
    { type: 'page-break', label: 'Page Break', category: 'layout' },
    { type: 'hidden-field', label: 'Hidden Field', category: 'layout' },
  ],
  'Location': [
    { type: 'state', label: 'State', category: 'location' },
    { type: 'city', label: 'City', category: 'location' },
    { type: 'state-city', label: 'State & City', category: 'location' },
  ]
};

// Render form
function renderForm() {
  let html = formBlade;
  
  // Clean up blade comments
  html = html.replace(/\{\{--[\s\S]*?--\}\}/g, '');
  
  // Simple replacements
  html = html.replace(/\{\{\s*str_replace\('_', '-', app\(\)->getLocale\(\)\)\s*\}\}/g, 'en-US');
  html = html.replace(/\{\{\s*csrf_token\(\)\s*\}\}/g, 'mock-csrf-token');
  html = html.replace(/\{\{\s*\$title\s*\?\?\s*['"]Form Builder['"]\s*\}\}/g, 'Form');
  html = html.replace(/\{\{\s*asset\('css\/form-builder\.css'\)\s*\}\}/g, '/css/form-builder.css');
  html = html.replace(/\{\{\s*asset\('js\/form-builder\.js'\)\s*\}\}/g, '/js/form-builder.js');
  
  // Replace the @php section and loop with static HTML
  const phpRegex = /@php[\s\S]*?@endphp[\s\S]*?@foreach\s*\(\s*\$fieldTypeGroups[\s\S]*?@endforeach[\s\S]*?@endforeach/;
  
  let groupsHtml = '';
  for (const [groupName, fields] of Object.entries(groups)) {
    const slug = groupName.toLowerCase().replace(/\s+/g, '-');
    groupsHtml += `
    <div class="fb-palette-group" data-category="${slug}">
      <div class="fb-palette-group-label" aria-label="${groupName} fields">${groupName}</div>
      <div class="fb-palette-grid">`;
    
    for (const f of fields) {
      groupsHtml += getTileHtml(f.type, f.label, f.category);
    }
    
    groupsHtml += `
      </div>
    </div>`;
  }
  
  html = html.replace(phpRegex, groupsHtml);
  
  return html;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  try {
    const compiled = renderForm();
    res.send(compiled);
  } catch (err) {
    res.status(500).send(err.stack);
  }
});

app.listen(PORT, () => {
  console.log(`Local Development Server running at http://127.0.0.1:${PORT}`);
});
