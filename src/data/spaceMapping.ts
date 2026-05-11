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

const LEGACY_SPACE_MAP: Record<string, SpaceKey> = {
  work: 'commercial',
  film: 'set',
  film_studio: 'set',
  'film studio': 'set',
  kitchen: 'detail',
  door: 'detail',
  window: 'detail',
  furniture: 'detail',
  entrance: 'detail',
  'door-entrance': 'detail',
};

export function normalizeSpaceKey(value: string): SpaceKey | null {
  const key = value.trim();

  if (SPACE_KEYS.has(key as SpaceKey)) {
    return key as SpaceKey;
  }

  return LEGACY_SPACE_MAP[key] ?? null;
}

export function normalizeSpaceKeys(values: string[]): SpaceKey[] {
  const result: SpaceKey[] = [];

  values.forEach((value) => {
    const key = normalizeSpaceKey(value);

    if (key && !result.includes(key)) {
      result.push(key);
    }
  });

  return result;
}

export function getCategoriesForPath(path: string): SpaceKey[] {
  const result: SpaceKey[] = [];

  const folderMatch = path.match(/\/gallery\/([^/]+)\//);

  if (folderMatch) {
    const key = normalizeSpaceKey(folderMatch[1]);

    if (key && !result.includes(key)) {
      result.push(key);
    }
  }

  const file = path.split(/[\\/]/).pop() ?? '';
  const tagRegex = /@([a-z_-]+)/g;

  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(file)) !== null) {
    const key = normalizeSpaceKey(match[1]);

    if (key && !result.includes(key)) {
      result.push(key);
    }
  }

  return result;
}

export function stripCategorySuffix(baseName: string): string {
  return baseName.replace(/@[a-z_-]+/g, '');
}
