let openExercisesFromCard = false;

export function setOpenExercises(flag) {
  openExercisesFromCard = !!flag;
}

export function getOpenExercises() {
  return openExercisesFromCard;
}
