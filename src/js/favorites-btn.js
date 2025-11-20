const FAVORITES_KEY = 'favorites';

function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFavorites(favoritesArray) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
}

function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(item => item.id === id);
}

function addFavorite(exerciseObj) {
  const favorites = getFavorites();
  favorites.push(exerciseObj);
  saveFavorites(favorites);
}

function removeFavorite(id) {
  const favorites = getFavorites();
  const updated = favorites.filter(item => item.id !== id);
  saveFavorites(updated);
}

const currentExercise = {};

// References (modal button)
// The button will be found during initFavoritesBtn()

const refs = {
  favoriteBtnElement: null,
};

// Initialize Favorites button

function initFavoritesBtn(exercise) {
  refs.favoriteBtnElement = document.querySelector('.favorites-btn');

  if (!refs.favoriteBtnElement) return;

  Object.assign(currentExercise, exercise);

  if (isFavorite(exercise.id)) {
    refs.favoriteBtnElement.textContent = 'Remove from favorites';
  } else {
    refs.favoriteBtnElement.textContent = 'Add to favorites';
  }

  refs.favoriteBtnElement.onclick = () => {
    if (isFavorite(exercise.id)) {
      removeFavorite(exercise.id);
      refs.favoriteBtnElement.textContent = 'Add to favorites';
    } else {
      addFavorite(exercise);
      refs.favoriteBtnElement.textContent = 'Remove from favorites';
    }
  };
}

const testExercise = {
  id: 'test123',
  name: 'Push Ups',
  gifUrl: 'https://example.com/pushups.gif',
  target: 'chest',
  bodyPart: 'upper arms',
  equipment: 'body weight',
};

initFavoritesBtn(testExercise);

export {
  getFavorites,
  saveFavorites,
  isFavorite,
  addFavorite,
  removeFavorite,
  refs,
  currentExercise,
  initFavoritesBtn,
};
