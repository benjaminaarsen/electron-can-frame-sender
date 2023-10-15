function getTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === null) {
    return 'light';
  }
  return theme;
}

export default getTheme;
