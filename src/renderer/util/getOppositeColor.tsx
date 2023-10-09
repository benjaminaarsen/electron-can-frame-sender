import getTheme from './getTheme';

function getOppositeColor() {
  return getTheme() === 'light' ? 'dark' : 'light';
}

export default getOppositeColor;
