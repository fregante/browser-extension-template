import { getSettings } from './options-storage.js';

// Create template button with Claude's style
function createTemplateButton() {
  const button = document.createElement('button');
  button.className = `inline-flex items-center justify-center relative shrink-0 ring-offset-2 
    ring-offset-bg-300 ring-accent-main-100 focus-visible:outline-none focus-visible:ring-1 
    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none 
    max-w-full min-w-0 pl-1.5 pr-1 h-7 ml-0.5 mr-1 hover:bg-bg-200 hover:border-border-400 
    border-0.5 text-sm rounded-md border-transparent transition text-text-500 hover:text-text-200`;
  button.setAttribute('data-testid', 'template-selector-dropdown');

  const innerDiv = document.createElement('div');
  innerDiv.className = 'inline-flex items-center min-w-0';
  innerDiv.setAttribute('data-state', 'closed');

  // Template icon (using a document icon as an example)
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  icon.setAttribute('width', '16');
  icon.setAttribute('height', '16');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('class', 'mr-1 -translate-y-px');
  icon.innerHTML = `
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
    </path>
  `;

  const text = document.createElement('span');
  text.className = 'flex-1 truncate -translate-y-px font-tiempos mr-px';
  text.textContent = 'Choose templates';

  // Dropdown arrow icon
  const arrowIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrowIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  arrowIcon.setAttribute('width', '12');
  arrowIcon.setAttribute('height', '12');
  arrowIcon.setAttribute('fill', 'currentColor');
  arrowIcon.setAttribute('viewBox', '0 0 256 256');
  arrowIcon.setAttribute('class', 'text-text-500/80 ml-1 shrink-0');
  arrowIcon.innerHTML = `
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z">
    </path>
  `;

  innerDiv.appendChild(icon);
  innerDiv.appendChild(text);
  innerDiv.appendChild(arrowIcon);
  button.appendChild(innerDiv);

  return button;
}

// Create template dropdown
async function createTemplateDropdown(templates) {
  const dropdown = document.createElement('div');
  dropdown.className = 'absolute top-full right-0 mt-1 w-64 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50';
  dropdown.innerHTML = templates.map((template, index) => `
    <div class="template-item p-3 hover:bg-gray-50 cursor-pointer" data-index="${index}">
      <div class="font-medium text-sm mb-1">${template.title}</div>
      <div class="text-xs text-gray-500 line-clamp-2">${template.content}</div>
    </div>
  `).join('');
  return dropdown;
}

// Create and show dropdown with templates
async function createDropdownContent() {
  // Get templates from storage using getSettings
  const settings = await getSettings();
  const templates = settings.templates || [];

  const dropdown = document.createElement('div');
  dropdown.setAttribute('data-side', 'top');
  dropdown.setAttribute('data-align', 'center');
  dropdown.setAttribute('role', 'menu');
  dropdown.setAttribute('aria-orientation', 'vertical');
  dropdown.setAttribute('data-state', 'open');
  dropdown.setAttribute('tabindex', '-1');
  dropdown.className = `
    z-50 bg-bg-200 border-0.5 border-border-300 backdrop-blur-xl rounded-lg
    min-w-[8rem] overflow-hidden p-1 text-text-200 shadow-element
    !bg-bg-200 !rounded-xl w-64 sm:w-[28rem] !z-30
  `;

  // Add header and templates
  dropdown.innerHTML = `
    <div class="sm:flex justify-between items-center flex-1 text-xs font-medium text-text-300 px-1.5 pt-1 pb-1.5 min-h-5">
      <div class="translate-y-[0.5px]">Choose a template</div>
    </div>
    <div class="grid sm:grid-cols-2 mt-0.5 pb-1 px-1">
      <div class="min-h-0">
        <div class="
          overflow-x-visible overflow-y-auto scroll-pb-6 min-h-[0px]
          [scrollbar-color:hsl(var(--text-500))]
          scroll-smooth overscroll-contain
          [&::-webkit-scrollbar]:w-[0.25rem]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-[1em]
          [&::-webkit-scrollbar-thumb]:bg-text-500/80
          pr-1 sm:mr-1 pb-1 min-h-40 max-h-64
        ">
          ${templates.map((template, index) => `
            <div role="menuitem" class="py-1 px-2 rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,_1fr)_auto] gap-2 items-center outline-none select-none pr-0 mb-0.5 line-clamp-2 leading-tight hover:bg-bg-300" tabindex="-1" data-template-index="${index}">
              <div class="flex items-center justify-between">
                <div class="flex-1 text-wrap line-clamp-2">${template.title}</div>
              </div>
            </div>
          `).join('')}
          ${templates.length === 0 ? `
            <div class="py-1 px-2 text-text-300 text-sm">
              No templates found
            </div>
          ` : ''}
        </div>
        <div role="menuitem" data-testid="template-selector-open-modal" class="py-1 px-2 rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,_1fr)_auto] gap-2 items-center outline-none select-none bg-transparent border border-border-300 hover:!bg-accent-main-100 hover:!text-oncolor-100 hover:!border-transparent transition mr-1 sm:mr-3 ml-1 mb-1 mt-1 !rounded-lg text-center text-sm font-medium" tabindex="-1">Create & Edit Templates</div>
      </div>
    </div>
  `;

  // Add click event listeners for templates
  const templateItems = dropdown.querySelectorAll('[data-template-index]');
  templateItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.templateIndex, 10);
      const template = templates[index];

      // Find ProseMirror editor
      const editor = document.querySelector('.ProseMirror');
      if (editor) {
        // Clear existing content if it's empty
        const isEmpty = editor.querySelector('.is-editor-empty');
        if (isEmpty) {
          editor.innerHTML = '';
        }

        // Create paragraph element
        const p = document.createElement('p');
        p.textContent = template.content;
        
        // Insert the paragraph
        editor.appendChild(p);
        
        // Focus the editor
        editor.focus();

        // Place cursor at the end
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(p);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Remove dropdown
      const dropdownToRemove = document.querySelector('[data-template-dropdown-wrapper]');
      if (dropdownToRemove) {
        dropdownToRemove.remove();
      }
    });
  });

  // Add click event listener for settings button
  const settingsButton = dropdown.querySelector('[data-testid="template-selector-open-modal"]');
  settingsButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openOptions' });
    dropdownWrapper.remove();
  });

  return dropdown;
}

// Initialize template button
async function initializeTemplateButton() {
  // 3.5 Sonnet を含むボタンを探す
  const sonnetButton = await waitForElement('button[data-testid="model-selector-dropdown"]');
  if (!sonnetButton) {
    console.error('Could not find Sonnet button');
    return;
  }

  // 最も上位のボタンの親要素を探す
  const targetContainer = sonnetButton.parentElement;
  if (!targetContainer) {
    console.error('Could not find target container');
    return;
  }

  // 既存のテンプレートボタンをチェック
  if (targetContainer.querySelector('[data-testid="template-selector-dropdown"]')) {
    return;
  }

  // Create wrapper div for template button
  const templateWrapper = document.createElement('div');
  templateWrapper.className = 'flex items-center min-w-0 max-w-full';

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'min-w-24';
  innerWrapper.setAttribute('type', 'button');
  innerWrapper.setAttribute('data-state', 'closed');
  innerWrapper.style.opacity = '1';

  // Create and add template button
  const templateButton = createTemplateButton();
  
  // Add click event listener
  templateButton.addEventListener('click', async (event) => {
    console.log('templateButton clicked');
    event.stopPropagation();
    
    // Check for existing dropdown
    const existingDropdown = document.querySelector('[data-template-dropdown-wrapper]');
    if (existingDropdown) {
      existingDropdown.remove();
      return;
    }

    // Create and show dropdown
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.setAttribute('data-radix-popper-content-wrapper', '');
    dropdownWrapper.setAttribute('data-template-dropdown-wrapper', '');
    dropdownWrapper.setAttribute('dir', 'ltr');
    dropdownWrapper.style.cssText = `
      position: fixed;
      left: 0px;
      top: 0px;
      min-width: max-content;
      will-change: transform;
      z-index: 30;
      --radix-popper-transform-origin: 50% 265px;
      opacity: 0;
    `;

    const dropdown = await createDropdownContent();
    dropdownWrapper.appendChild(dropdown);
    document.body.appendChild(dropdownWrapper);

    // Now calculate position
    const buttonRect = templateButton.getBoundingClientRect();
    const dropdownHeight = dropdown.offsetHeight;
    dropdownWrapper.style.transform = `translate(${buttonRect.left}px, ${buttonRect.top - dropdownHeight - 4}px)`;
    dropdownWrapper.style.opacity = '1';

    // Close dropdown when clicking outside
    const closeDropdown = (e) => {
      if (!dropdown.contains(e.target) && !templateButton.contains(e.target)) {
        dropdownWrapper.remove();
        document.removeEventListener('click', closeDropdown);
      }
    };
    
    document.addEventListener('click', closeDropdown);
  });

  innerWrapper.appendChild(templateButton);
  templateWrapper.appendChild(innerWrapper);

  // Add to the end of the target container
  targetContainer.appendChild(templateWrapper);

  console.log('Template button initialized and added to:', targetContainer);
}

// Wait for page to be fully loaded and ready
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function checkElement() {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      if (Date.now() - startTime >= timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        return;
      }

      requestAnimationFrame(checkElement);
    }

    checkElement();
  });
}

// Initialize when page is ready
async function initialize() {
  try {
    // Wait for the style button to be present in DOM
    await waitForElement('[data-testid="style-selector-dropdown"]');
    
    // Wait a bit more to ensure all dynamic content is loaded
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Initialize the template button
    await initializeTemplateButton();
  } catch (error) {
    console.error('Failed to initialize template button:', error);
  }
}

// Start initialization when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Also watch for navigation changes (for SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    initialize();
  }
}).observe(document, { subtree: true, childList: true });

function setContent(editorView, content) {
  editorView.dispatch(
    editorView.state.tr.replaceWith(
      0,
      editorView.state.doc.content.size,
      editorView.state.schema.text(content)
    )
  );
}