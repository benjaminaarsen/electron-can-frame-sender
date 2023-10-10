function getTheme() {
  if (document.documentElement.getAttribute('data-bs-theme') === null) {
    return 'light';
  }
  return document.documentElement.getAttribute('data-bs-theme') === 'light'
    ? 'light'
    : 'dark';
}

export default getTheme;
