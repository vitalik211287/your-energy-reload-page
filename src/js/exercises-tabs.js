// export function initExercisesTabs() {
//   const tabs = document.querySelectorAll('.exercises__tab');

//   tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//       tabs.forEach(t => t.classList.remove('exercises__tab--active'));
//       tab.classList.add('exercises__tab--active');
//     });
//   });
// }




// src/js/exercises-tabs.js
// import { loadExercisesList } from './exercises-list.js';

// export function initExercisesTabs() {
//   const tabsContainer = document.querySelector('.js-exercises-tabs');
//   if (!tabsContainer) return;

//   const tabs = tabsContainer.querySelectorAll('.exercises__tab');
//   const searchInput = document.querySelector('.exercises__search-input');

//   tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//       // 1. міняємо активний таб
//       tabs.forEach(t => t.classList.remove('exercises__tab--active'));
//       tab.classList.add('exercises__tab--active');

//       // 2. можемо враховувати поточний пошуковий запит, якщо є
//       const keyword = searchInput ? searchInput.value.trim() : '';

//       // 3. тягнемо нові вправи під цей таб
//       loadExercisesList({ page: 1, keyword });
//     });
//   });
// }

import { loadExercisesList } from './exercises-list.js';

export function initExercisesTabs() {
  const tabsContainer = document.querySelector('.js-exercises-tabs');
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll('.exercises__tab');
  const searchInput = document.querySelector('.exercises__search-input');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. перемикаємо активний таб
      tabs.forEach(t => t.classList.remove('exercises__tab--active'));
      tab.classList.add('exercises__tab--active');

      // 2. якщо був введений пошук — передаємо keyword
      const keyword = searchInput ? searchInput.value.trim() : '';

      // 3. завантажуємо список строго з { page: 1 }
      loadExercisesList({ page: 1, keyword });
    });
  });
}
