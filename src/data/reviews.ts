/**
 * reviews.ts
 * 원본 prowrap.html의 .review-card에서 추출한 실제 시공 후기 데이터
 */

export interface Review {
  id: number;
  body: string;
  author: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    body: "처음 인테리어필름 시공이라 걱정이 많았는데, 자재랑 색상 설명을 차분하게 해주셔서 결정하는 데 도움이 됐습니다. 작업 끝나고 주변 정리까지 해주셔서 편했어요.",
    author: "파주 롯데캐슬 거주 고객",
  },
  {
    id: 2,
    body: "매장 문짝이랑 카운터만 부분 시공했는데 티 안 나게 잘 맞춰주셨습니다. 일정이 자주 바뀌었는데도 시간 맞춰주셔서 감사했습니다.",
    author: "인천 카페 운영 고객",
  },
  {
    id: 3,
    body: "기존 필름이 들떠서 보기가 싫었는데, 어디까지 살리고 어디를 새로 해야 하는지 솔직하게 설명해주셔서 불필요한 비용이 안 들어갔습니다. 시공 후 한 달 정도 지났는데 아직까지 문제 없습니다.",
    author: "덕양구 오피스텔 거주 고객",
  },
];
