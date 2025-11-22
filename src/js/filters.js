import { loadExercisesList } from './exercises-list.js';
const tabsContainer = document.querySelector('[data-filters-tabs]');
const searchBox = document.querySelector('.filters__search');
const subtitle = document.querySelector('.filters__subtitle');

const isDesktop = () => window.matchMedia('(min-width: 1440px)').matches;

// ✅ універсальна функція оновлення UI
function updateUIForFilter(filter, subtitleValue = '') {
  if (!searchBox || !subtitle) return;

  const desktop = isDesktop();

  if (filter === 'bodypart') {
    // якщо прийшло значення з Categories — показуємо його,
    // інакше лишаємо дефолт Waist
    subtitle.textContent = ` / ${subtitleValue || 'Waist'}`;

    // 👉 ДОБАВЛЕНО: рендер ексесайзів
    if (typeof renderExercises === 'function') {
      renderExercises(window.exercisesList || []);
    }

    if (desktop) {
      searchBox.classList.add('filters__search--visible');
    } else {
      searchBox.classList.add('filters__search--visible');
    }
  } else {
    subtitle.textContent = '';
    searchBox.classList.remove('filters__search--visible');
  }
}

// ✅ ЕКСПОРТ: те, що викликає Categories
export function activateFiltersTab(filterKey, subtitleValue = '') {
  if (!tabsContainer) return;

  const btn = tabsContainer.querySelector(`[data-filter="${filterKey}"]`);
  if (!btn) return;

  const categoriesBox = document.getElementById('cards-box');
  const exercisesBox = document.getElementById('exercises');
  const equipmentBox = document.getElementById('equipment-box');

  if (categoriesBox) categoriesBox.classList.add('hidden');
  if (exercisesBox) exercisesBox.classList.add('hidden');
  if (equipmentBox) equipmentBox.classList.add('hidden');

  const url = new URL(window.location.href);

  if (filterKey === 'muscles') {
    if (categoriesBox) categoriesBox.classList.remove('hidden');
    url.searchParams.delete('filter');
    url.searchParams.delete('type');
  } else if (filterKey === 'equipment') {
    if (equipmentBox) equipmentBox.classList.remove('hidden');
    url.searchParams.delete('filter');
    url.searchParams.delete('type');
  } else if (filterKey === 'bodypart') {
    if (exercisesBox) exercisesBox.classList.remove('hidden');
    url.searchParams.set('type', 'body-parts');
    if (subtitleValue) {
      url.searchParams.set('filter', subtitleValue.toLowerCase());
    } else {
      url.searchParams.delete('filter');
      // Завантажуємо список, якщо це просто клік по табу
      loadExercisesList({ page: 1 });
    }
  }
  window.history.pushState({}, '', url);

  tabsContainer.querySelectorAll('.filters__tab').forEach(tab => {
    const isActive = tab === btn;
    tab.classList.toggle('filters__tab--active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  updateUIForFilter(filterKey, subtitleValue);
}
if (tabsContainer && searchBox && subtitle) {
  tabsContainer.addEventListener('click', e => {
    const btn = e.target.closest('.filters__tab');
    if (!btn) return;

    // subtitleValue тут не передаємо — буде дефолтний Waist
    activateFiltersTab(btn.dataset.filter);
  });

  // ініціалізація при завантаженні
  const activeBtn = tabsContainer.querySelector('.filters__tab--active');
  if (activeBtn) {
    updateUIForFilter(activeBtn.dataset.filter);
  }
}

// === Логика крестика очистки ===
const searchInput = document.querySelector('.filters__input');
const clearBtn = document.querySelector('.filters__clear-btn');

if (searchInput && clearBtn) {
  const toggleClear = () => {
    if (searchInput.value.trim()) {
      clearBtn.classList.add('filters__clear-btn--visible');
    } else {
      clearBtn.classList.remove('filters__clear-btn--visible');
    }
  };

  searchInput.addEventListener('input', toggleClear);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    toggleClear();
  });

  toggleClear();
}
