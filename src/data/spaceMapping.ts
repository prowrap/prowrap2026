export type SpaceKey =
  | 'home'
  | 'work'
  | 'kitchen'
  | 'door'
  | 'window'
  | 'furniture'
  | 'entrance';

export const spaceLabels: Record<SpaceKey, string> = {
  home: '주거 공간',
  work: '사무 공간',
  kitchen: '주방',
  door: '방문·문',
  window: '샷시·창호',
  furniture: '가구',
  entrance: '현관',
};

export const filterOrder: SpaceKey[] = [
  'home',
  'work',
  'kitchen',
  'door',
  'window',
  'furniture',
  'entrance',
];

const SPACE_KEYS = new Set<SpaceKey>([
  'home',
  'work',
  'kitchen',
  'door',
  'window',
  'furniture',
  'entrance',
]);

export function getCategoriesForPath(path: string): SpaceKey[] {
  const result: SpaceKey[] = [];

  const folderMatch = path.match(/\/gallery\/([^/]+)\//);
  if (folderMatch) {
    const folderName = folderMatch[1];
    if (SPACE_KEYS.has(folderName as SpaceKey)) {
      result.push(folderName as SpaceKey);
    } else if (folderName === 'door-entrance') {
      result.push('door', 'entrance');
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
