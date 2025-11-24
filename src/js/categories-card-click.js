import { loadExercisesList } from './exercises-list';
import { resetExercisesSearch } from './exercises-search';
import { setOpenExercises } from './state.js';

export function handleCategoryCardClick(item) {
  return function (e) {
    e.preventDefault();

    // const categoriesSection = document.getElementById('cards-box');
    // categoriesSection.classList.add('hidden');

    // const exercisesSection = document.getElementById('exercises');
    // exercisesSection.classList.remove('hidden');

    // const equipmentBox = document.getElementById('equipment-box');
    // equipmentBox.classList.add('hidden');

    setOpenExercises(true);
    resetExercisesSearch();

    const TYPE_MAP = {
      Muscles: 'muscles',
      'Body parts': 'body-parts',
      Equipment: 'equipment',
    };
    const type = TYPE_MAP[item.filter] || 'body-parts';

    loadExercisesList({
      page: 1,
      type,
      filter: item.name.toLowerCase(),
      keyword: '',
    });

    // const url = new URL(window.location.href);
    // url.searchParams.set('type', type);
    // url.searchParams.set('filter', item.name.toLowerCase());
    // url.searchParams.delete('keyword'); // очистити keyword
    // window.history.pushState({}, '', url);
  };
}
