export type SpaceKey =
  | 'home'
  | 'commercial'
  | 'set'
  | 'sample'
  | 'detail';

export const spaceLabels: Record<SpaceKey, string> = {
  home: '주거 공간',
  commercial: '상업 공간',
  set: '드라마·영화 세트',
  sample: '필름 샘플',
  detail: '디테일',
};

export const filterOrder: SpaceKey[] = [
  'home',
  'commercial',
  'set',
  'sample',
  'detail',
];

const SPACE_KEYS = new Set<SpaceKey>([
  'home',
  'commercial',
  'set',
  'sample',
  'detail',
]);

export function getCategoriesForPath(path: string): SpaceKey[] {
  const result: SpaceKey[] = [];

  const folderMatch = path.match(/\/gallery\/([^/]+)\//);
  if (folderMatch) {
    const folderName = folderMatch[1];

    if (SPACE_KEYS.has(folderName as SpaceKey)) {
      result.push(folderName as SpaceKey);
    }
  }

  const file = path.split(/[\\/]/).pop() ?? '';
  const tagRegex = /@([a-z]+)/g;

  let m: RegExpExecArray | null;
  while ((m = tagRegex.exec(file)) !== null) {
    const key = m[1] as SpaceKey;

    if (SPACE_KEYS.has(key) && !result.includes(key)) {
      result.push(key);
    }
  }

  return result;
}

export function stripCategorySuffix(baseName: string): string {
  return baseName.replace(/@[a-z]+/g, '');
}
