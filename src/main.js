import 'izitoast/dist/css/iziToast.min.css';
import './js/quote-of-the-day.js';
import { cancelLoader } from './js/loader.js';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cancelLoader();
  });
} else {
  cancelLoader();
}
