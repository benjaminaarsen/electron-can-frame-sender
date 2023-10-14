/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function loadSettings(): Object | null {
  const userData = app.getPath('userData');
  try {
    const settings = fs.readFileSync(`${userData}/settings.json`, 'utf-8');

    const res = JSON.parse(settings);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
