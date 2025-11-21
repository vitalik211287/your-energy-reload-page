const tabsContainer = document.querySelector('[data-filters-tabs]');
const searchBox = document.querySelector('.filters__search');
const subtitle = document.querySelector('.filters__subtitle');

if (tabsContainer) {
  tabsContainer.addEventListener('click', e => {
    const btn = e.target.closest('.filters__tab');
    if (!btn) return;

    tabsContainer.querySelectorAll('.filters__tab').forEach(tab => {
      const isActive = tab === btn;
      tab.classList.toggle('filters__tab--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const filter = btn.dataset.filter;

    if (filter === 'bodypart') {
      searchBox.classList.remove('hidden');
      subtitle.textContent = ' / Waist';
    } else {
      searchBox.classList.add('hidden');
      subtitle.textContent = '';
    }
  });
}


// filters-tabs.js
// const tabsContainer = document.querySelector('[data-filters-tabs]');
// const searchBox = document.querySelector('.filters__search');
// const subtitle = document.querySelector('.filters__subtitle');

// // ✅ Експортована функція для активації табу ззовні (з Categories)
// export function activateFiltersTab(filterKey, subtitleValue = '') {
//   if (!tabsContainer) return;

//   const btn = tabsContainer.querySelector(`[data-filter="${filterKey}"]`);
//   if (!btn) return;

//   // робимо активним потрібний таб
//   tabsContainer.querySelectorAll('.filters__tab').forEach(tab => {
//     const isActive = tab === btn;
//     tab.classList.toggle('filters__tab--active', isActive);
//     tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
//   });

//   // запускаємо ту саму логіку, що була в твоєму if
//   if (filterKey === 'bodypart') {
//     searchBox.classList.remove('hidden');
//     subtitle.textContent = ` / ${subtitleValue || 'Waist'}`;
//   } else {
//     searchBox.classList.add('hidden');
//     subtitle.textContent = '';
//   }
// }

// // ✅ Твій старий listener — залишаємо, але використовуємо функцію
// if (tabsContainer) {
//   tabsContainer.addEventListener('click', e => {
//     const btn = e.target.closest('.filters__tab');
//     if (!btn) return;

//     const filterKey = btn.dataset.filter;
//     activateFiltersTab(filterKey);
//   });
// }
