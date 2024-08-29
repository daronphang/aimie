import moment from 'moment';
import { Buffer } from 'buffer';
import { HashMap } from '@core/models/core.model';
import { Router } from '@angular/router';

export const getBaseUrl = (router: Router) => {
  // exclude fragments and query parameters
  const urlTree = router.parseUrl(router.url);
  urlTree.queryParams = {};
  urlTree.fragment = null;
  return urlTree.toString();
};

export const urlJoin = (...args: unknown[]) => {
  /*
    Concats an array of strings into url format i.e. /hello/world/some/url.
    If string containing http is provided, need to provide the base DNS i.e. http://server.com
  */
  let joinedUrl = '';
  for (const arg of args) {
    let subUrl = String(arg).trim();
    subUrl = subUrl.replace(/^\//, '').replace(/\/$/, '');
    joinedUrl += `/${subUrl}`;
  }
  if (joinedUrl.includes('http')) {
    joinedUrl = joinedUrl.replace(/^\//, '');
  }
  return joinedUrl;
};

export function separateStringByDelimiter(input: string, delimiter: RegExp) {
  let result = input.split(delimiter);
  result = result.map(v => v.trim()).filter(v => v);
  return result;
}

export function separateCamelCase(input: string, delimiter: string) {
  let result = '';
  const regex = /[A-Z]/;
  for (const s of input) {
    if (s.match(regex)) {
      result += `${delimiter}${s.toLowerCase()}`;
    } else {
      result += s;
    }
  }
  return result;
}

export function generateHtmlId(...inputs: unknown[]) {
  const foo: string[] = [];
  inputs.forEach(v => {
    foo.push(separateCamelCase(String(v).toLowerCase(), '-'));
  });
  return foo.join('-');
}

export function formatDate(v: Date) {
  return moment(v).format('YYYY-MM-DD HH:MM:SS');
}

export function chunk(array: unknown[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i = i + size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

export function capitalizeFirstLetter(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export function formatToCurrency(v: number) {
  return (Math.round(v * 100) / 100).toFixed(2);
}

export function trimTextWithEllipsis(text: string, charCount: number) {
  if (text.length <= charCount) return text;
  return text.substring(0, charCount - 2) + '...';
}

export function dataUrlToFile(dataUrl: string, filename: string): File | undefined {
  /*
   * Converts a dataUrl base64 image string into a File byte array
   * dataUrl example:
   * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACLCAYAAABRGWr/AAAAAXNSR0IA...etc
   */
  const arr = dataUrl.split(',');
  if (arr.length < 2) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], 'base64');
  return new File([buff], filename, { type: mime });
}

export function resetSortOrderOfArray(arr: unknown[], stepSize: number, sortKey: string) {
  arr.forEach((row, idx) => {
    const temp = row as HashMap;
    temp[sortKey] = idx * stepSize;
  });
}

export function rgbaToHex(rgba: string, forceRemoveAlpha = false) {
  return (
    '#' +
    rgba
      .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((string, index) => !forceRemoveAlpha || index !== 3)
      .map(string => parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map(number => number.toString(16)) // Converts numbers to hex
      .map(string => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
      .join('')
  );
}

export function getRandomColor() {
  const defaultColors: HashMap = {
    aqua: '#00ffff',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    blue: '#0000ff',
    brown: '#a52a2a',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkviolet: '#9400d3',
    fuchsia: '#ff00ff',
    gold: '#ffd700',
    green: '#008000',
    indigo: '#4b0082',
    khaki: '#f0e68c',
    lime: '#00ff00',
    magenta: '#ff00ff',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    orange: '#ffa500',
    pink: '#AA336A',
    purple: '#800080',
    violet: '#800080',
    red: '#ff0000',
    silver: '#c0c0c0',
  };

  const keys = Object.keys(defaultColors);
  const idx = Math.floor(Math.random() * (keys.length - 1));
  return defaultColors[keys[idx]];
}

export type ViewportDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export function getViewportDevice(): ViewportDevice {
  const x = document.documentElement.clientWidth;
  if (x <= 425) return 'mobile';
  else if (x <= 768) return 'tablet';
  else if (x <= 1024) return 'laptop';
  return 'desktop';
}
