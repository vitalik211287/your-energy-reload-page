import { loadExercisesList } from './exercises-list.js';

const tabsContainer = document.querySelector('[data-filters-tabs]');
const searchBox = document.querySelector('.filters__search');
const subtitle = document.querySelector('.filters__subtitle');

const isDesktop = () => window.matchMedia('(min-width: 1440px)').matches;

// ✅ універсальна функція оновлення UI (subtitle + search)
function updateUIForFilter(filter, subtitleValue = '') {
  if (!searchBox || !subtitle) return;

  if (filter === 'bodypart') {
    // якщо прийшло значення з Categories — показуємо його,
    // інакше лишаємо дефолт Waist
    subtitle.textContent = ` / ${subtitleValue || 'Waist'}`;
    searchBox.classList.add('filters__search--visible');
  } else {
    subtitle.textContent = '';
    searchBox.classList.remove('filters__search--visible');
  }
}

// ✅ ЕКСПОРТ: те, що викликає Categories або клік по табах
export function activateFiltersTab(filterKey, subtitleValue = '') {
  if (!tabsContainer) return;

  const btn = tabsContainer.querySelector(`[data-filter="${filterKey}"]`);
  if (!btn) return;

  const categories = document.getElementById('cards-box');
  const exercises = document.getElementById('exercises');
  if (!categories || !exercises) return;

  if (filterKey === 'muscles' || filterKey === 'equipment') {
    // ✅ показуємо категорії
    categories.classList.remove('hidden');
    exercises.classList.add('hidden');

    // ✅ чистимо subtitle
    subtitle.textContent = '';

    // ✅ чистимо/оновлюємо URL
    const url = new URL(window.location.href);
    url.searchParams.delete('filter');
    url.searchParams.set('type', filterKey); // muscles або equipment
    window.history.pushState({}, '', url);

  } else if (filterKey === 'bodypart') {
    // ✅ показуємо EXERCISES
    categories.classList.add('hidden');
    exercises.classList.remove('hidden');

    // ✅ оновлюємо URL під формат exercises-list.js
    const url = new URL(window.location.href);
    url.searchParams.set('type', 'body-parts');

    if (subtitleValue) {
      // прийшли з Categories — filter вже правильний,
      // тут НЕ робимо loadExercisesList, бо Categories вже його викликає
      url.searchParams.set('filter', subtitleValue.toLowerCase());
    } else {
      // клік по табу — хай exercises-list візьме дефолт waist
      url.searchParams.delete('filter');

      // ✅ і тільки тут робимо запит
      loadExercisesList({ page: 1 });
    }

    window.history.pushState({}, '', url);
  }

  // ✅ активуємо таби
  tabsContainer.querySelectorAll('.filters__tab').forEach(tab => {
    const isActive = tab === btn;
    tab.classList.toggle('filters__tab--active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // ✅ оновлюємо UI (search + subtitle)
  updateUIForFilter(filterKey, subtitleValue);
}

// ✅ listener для кліків по табах
if (tabsContainer && searchBox && subtitle) {
  tabsContainer.addEventListener('click', e => {
    const btn = e.target.closest('.filters__tab');
    if (!btn) return;

    activateFiltersTab(btn.dataset.filter);
  });

  // ✅ ініціалізація при завантаженні
  const activeBtn = tabsContainer.querySelector('.filters__tab--active');
  if (activeBtn) {
    const activeFilter = activeBtn.dataset.filter;
    updateUIForFilter(activeFilter);

    // якщо при старті активний bodypart і нема filter — вантажимо дефолтні вправи
    const urlParams = new URLSearchParams(window.location.search);
    const hasFilter = urlParams.get('filter');
    if (activeFilter === 'bodypart' && !hasFilter) {
      const categories = document.getElementById('cards-box');
      const exercises = document.getElementById('exercises');
      if (categories && exercises) {
        categories.classList.add('hidden');
        exercises.classList.remove('hidden');
      }
      loadExercisesList({ page: 1 });
    }
  }
}

// === Логіка хрестика очистки ===
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
