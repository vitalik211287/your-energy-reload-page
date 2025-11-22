import { getFavorites, removeFavorite } from './favorites-btn.js';
import { YourEnergyAPI } from './api.js';
import { REFS } from './constants.js';
import { renderExercisesList } from '../js/exercises-list';

const api = new YourEnergyAPI();

function renderEmptyMessage() {
  const container = document.querySelector('.favorites-wrapper');
  if (!container) return;

  const existingList = container.querySelector('.favorites-list');
  if (existingList) {
    existingList.remove();
  }

  const existingEmpty = container.querySelector('.favorites-empty');
  if (existingEmpty) {
    existingEmpty.remove();
  }

  const emptyDiv = document.createElement('div');
  emptyDiv.className = 'favorites-empty';
  emptyDiv.innerHTML = `
    <p>It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p>
  `;

  container.appendChild(emptyDiv);
}

async function loadFavoritesData(ids) {
  try {
    const exercise = await api.getExerciseById(ids);
    if (exercise) return exercise;
  } catch (err) {
    console.error(`Failed to load exercise ${ids}`, err);
  }
}

async function renderFavorites(arr) {
  const container = document.querySelector('.favorites-wrapper');
  if (!container) return;

  const emptyDiv = container.querySelector('.favorites-empty');
  if (emptyDiv) {
    emptyDiv.remove();
  }

  let listEl = container.querySelector('.favorites-list');
  if (!listEl) {
    listEl = document.createElement('ul');
    listEl.className = 'favorites favorites-list';
    container.appendChild(listEl);
  }

  const listFavoritesExcecises = [];

  if (Array.isArray(arr) && arr.length > 0) {
    try {
      const promises = arr.map(it => loadFavoritesData(it.trim()));
      const results = await Promise.all(promises);

      results.forEach(data => {
        if (data) {
          listFavoritesExcecises.push(data);
        }
      });
    } catch (error) {
      console.error('Error loading:', error);
    }
  }

  renderExercisesList(listEl, listFavoritesExcecises, true);

  listEl.addEventListener(
    'click',
    event => {
      const deleteBtn = event.target.closest('.favorites-delete-btn');
      if (deleteBtn) {
        const idToRemove = deleteBtn.dataset.id;
        if (idToRemove) {
          removeFavorite(idToRemove);
          startRenderFavorites();
        }
      }
    },
    { once: true }
  );
}

export function startRenderFavorites() {
  const favorites = getFavorites();
  favorites.length ? renderFavorites(favorites) : renderEmptyMessage();
}

startRenderFavorites();
