---
title: "Bounded Context vs Sub Domain"
date: '2025-08-01'
---

Bounded Context는 특정 비즈니스 규칙이 적용되는 경계이다. 

주문 관리 시스템을 만든다고 가정했을 때 주문 처리 Sub Domain이 존재하고 이 비즈니스 도메인을 구현하기 위해 주문 Bounded Context를 구현할 수 있다.
- 주문 Bounded Context에는 주문, 주문 상품과 같은 여러 모델이 정의된다.

주로 Sub Domain은 Problem Space, Bounded Context를 Solution Space으로 두어 1:n 매핑으로 구현하게 된다.

- Sub Domain: 오로지 비즈니스 영역에 대한 분리
- Bounded Context: 비즈니스 영역을 효율적으로 분리해 SW를 구현하기 위한 규칙, 모듈 