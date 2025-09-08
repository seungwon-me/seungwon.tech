---
title: "N+1 problem Fact Check"
date: '2025-09-05'
---

**두 줄 요약**
* N+1 문제가 생긴다 == "나는 도메인을 제대로 모델링하지 못했습니다"
* “N+1은 JPA의 대표적인 성능 문제?” <- ORM의 정상 작동인데? (그저 Leaky Abstraction)

---

N+1은 “1개의 초기 쿼리(N개 결과) + N개의 추가 쿼리가 실행”를 의미합니다.

Fetch Join, 어노테이션으로 같이 조회, 쿼리 최적화 옵션을 통해 N+1 문제를 해결할 수 있다네요.. (우와 멋지다..)

**Fact 1.** N+1은 ORM의 정상 동작
* N+1 동작으로 인해 성능 문제가 발생할 순 있지만, N+1은 ORM의 정상 동작이다.
* "성능 문제"라고 부르는 것 자체가 잘못된 프레임.

**Fact 2.** Lazy Loading의 존재 이유 == 높은 결합도
* Lazy Loading이 "필요하다"는 것은 잘못된 설계. (Aggregate가 너무 큰 것)
* 올바른 Aggregate라면 전체를 Eager Loading해도 부담 없어야한다.

**Fact 3.** 제대로 된 Aggregate라면 한 번의 쿼리로 충분
* Spring Data는 Aggregate와 상호작용하는 것이 핵심.
* N+1이 발생한다 == Aggregate 경계가 이상한 것.

결론 : N+1 문제가 발생하면 이상한 거다. 축하합니다! tech debt를 얻으셨습니다.