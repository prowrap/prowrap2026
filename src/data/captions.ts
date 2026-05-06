export const brandMap: Record<string, string> = {
  Hyundai: '현대Bodaq',
  LX: 'LX하우시스',
  Younglim: '영림',
  Yelim: '예림',
  Hansol: '한솔홈데코',
  Samsung: '삼성',
  Unknown: '',
};

export function getBaseName(path: string): string {
  const file = path.split(/[\\/]/).pop() ?? path;
  return file.replace(/\.[a-zA-Z0-9]+$/, '');
}

function extractCaptionPart(baseName: string): string {
  let part = baseName.replace(/^[^_]+_/, '');
  part = part.replace(/_\d+(?:_\d+)?$/, '');
  return part;
}

export function getGroupId(path: string): string {
  const base = getBaseName(path);
  const match = base.match(/_(\d+)(?:_\d+)?$/);
  return match ? match[1] : base;
}

export function formatCaption(rawName: string): string {
  if (!rawName) return '';

  let captionPart = extractCaptionPart(rawName);

  if (captionPart === 'Unknown') return '';

  let result = captionPart.replace(/_/g, ' ');

  result = result.replace(
    /(^|[\s+·])(Hyundai|LX|Younglim|Yelim|Hansol|Samsung)(?=\s|$)/g,
    (_, sep, brand) => sep + (brandMap[brand] ?? brand)
  );

  return result.trim();
}
