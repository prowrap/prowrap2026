/**
 * Gallery 마이그레이션 스크립트
 * 기존 파일명 기반 갤러리 → JSON 컬렉션 방식으로 변환
 */

import { readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const GALLERY_ROOT = 'src/assets/gallery';
const OUTPUT_DIR  = 'src/data/gallery';

mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── 브랜드 매핑 ──────────────────────────────────────────────
const brandMap = {
  Hyundai : '현대Bodaq',
  LX      : 'LX하우시스',
  Younglim: '영림',
  Yelim   : '예림',
  Hansol  : '한솔홈데코',
  Samsung : '삼성',
  Unknown : '',
};

// ─── 폴더 → 공간 키 매핑 ────────────────────────────────────
const folderToSections = {
  home           : ['home'],
  work           : ['work'],
  kitchen        : ['kitchen'],
  door           : ['door'],
  'door-entrance': ['door', 'entrance'],
  entrance       : ['entrance'],
  furniture      : ['furniture'],
  window         : ['window'],
};

// ─── 헬퍼 함수 ──────────────────────────────────────────────

/** 파일명 → 사람이 읽을 수 있는 캡션 */
function extractCaption(base) {
  // 앞의 공간 접두사 제거 (e.g. "furniture_")
  let part = base.replace(/^[^_]+_/, '');
  // 뒤의 그룹번호 제거 (e.g. "_29" or "_29_5")
  part = part.replace(/_\d+(?:_\d+)?$/, '');
  // 언더스코어 → 공백
  let result = part.replace(/_/g, ' ');
  // 브랜드명 한국어로 치환
  for (const [eng, kor] of Object.entries(brandMap)) {
    result = result.replace(new RegExp(`(?:^|(?<= ))${eng}(?= |$)`, 'g'), kor);
  }
  return result.trim();
}

/** 파일명 → 정렬용 숫자 (그룹번호 * 1000 + 서브번호) */
function extractOrder(base) {
  const m = base.match(/_(\d+)(?:_(\d+))?$/);
  if (!m) return 99999;
  return parseInt(m[1]) * 1000 + (m[2] ? parseInt(m[2]) : 0);
}

// ─── 모든 이미지 수집 ────────────────────────────────────────
const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;
const items = [];

for (const folder of readdirSync(GALLERY_ROOT, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  const folderName = folder.name;
  const sections   = folderToSections[folderName] ?? [folderName];
  const folderPath = join(GALLERY_ROOT, folderName);

  for (const file of readdirSync(folderPath)) {
    if (!IMAGE_EXT.test(file)) continue;

    const base    = file.replace(IMAGE_EXT, '');
    const caption = extractCaption(base);
    const order   = extractOrder(base);
    const imagePath = `/src/assets/gallery/${folderName}/${file}`;

    items.push({ imagePath, sections, caption, order });
  }
}

// ─── 정렬: 순서번호 → 파일명 알파벳 순 ──────────────────────
items.sort((a, b) => a.order - b.order || a.imagePath.localeCompare(b.imagePath));

// ─── JSON 파일 출력 ──────────────────────────────────────────
for (let i = 0; i < items.length; i++) {
  const { imagePath, sections, caption, order } = items[i];
  const data = { image: imagePath, sections, caption, order };
  const filename = `${String(i + 1).padStart('3', '0')}.json`;
  writeFileSync(join(OUTPUT_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
}

console.log(`✅  ${items.length}개 JSON 파일 생성 완료 → ${OUTPUT_DIR}/`);
