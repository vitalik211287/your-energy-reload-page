import 'izitoast/dist/css/iziToast.min.css';
import './js/quote-of-the-day.js';
import { initExercisesTabs } from './js/exercises-tabs.js';
import { initExercisesList } from './js/exercises-list.js';
import { renderPagination} from './js/categories.js';
import { initExercisesSearch } from './js/exercises-search.js';

initExercisesTabs();
initExercisesList();
renderPagination();
initExercisesSearch();
