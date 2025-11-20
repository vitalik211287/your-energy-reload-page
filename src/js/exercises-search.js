// import iziToast from 'izitoast';
// import { loadExercisesList } from './exercises-list.js';

// export function initExercisesSearch() {
//   const searchForm = document.querySelector('.js-exercises-search');
//   const searchInput = document.querySelector('.exercises__search-input');

//   if (!searchForm || !searchInput) return;

//   searchForm.addEventListener('submit', async e => {
//     e.preventDefault();

//     const query = searchInput.value.trim();

//     if (!query) {
//       iziToast.warning({
//         title: 'Увага',
//         message: 'Введіть пошуковий запит',
//         position: 'topRight',
//       });
//       return;
//     }

//     // перезавантажуємо список з keyword
//     await loadExercisesList({ page: 1, keyword: query });
//   });
// }


import iziToast from 'izitoast';
import { loadExercisesList } from './exercises-list.js';

export function initExercisesSearch() {
  const searchForm = document.querySelector('.js-exercises-search');
  const searchInput = document.querySelector('.exercises__search-input');

  if (!searchForm || !searchInput) return;

  searchForm.addEventListener('submit', async e => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      iziToast.warning({
        title: 'Увага',
        message: 'Введіть пошуковий запит',
        position: 'topRight',
      });
      return;
    }

    // запускаємо ПЕРЕЗАВАНТАЖЕННЯ СПИСКУ з keyword
    loadExercisesList({ page: 1, keyword: query });
  });
}

