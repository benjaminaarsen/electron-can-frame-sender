import { MoonFill, SunFill } from 'react-bootstrap-icons';
import React from 'react';

function ThemeIcon({ mode }: { mode: string }) {
  if (mode === 'light') {
    return <MoonFill />;
  }
  return <SunFill />;
}

export default ThemeIcon;
