import { MoonFill, SunFill } from 'react-bootstrap-icons';

function ThemeIcon({ mode }: { mode: string }) {
  if (mode === 'light') {
    return <MoonFill />;
  }
  return <SunFill />;
}

export default ThemeIcon;
