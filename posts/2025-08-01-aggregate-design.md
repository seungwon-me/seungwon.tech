---
title: "Aggregate Design"
date: '2025-08-01'
---

Aggregate는 Entity와 Value Object의 응집도 높은 모음으로, 여러 Rich Domain Model를 묶어서 관리하는 개념이다.

Aggregate의 핵심 키워드는 Aggregate Root, Consistency Boundary이다.

Aggregate Root는 Aggregate의 대장 Entity다. 외부에서 Aggregate를 접근할 때는 무조건 이 Root Entity를 통해 접근하게 된다. (캡슐화)

Consistency Boundary는 일관성 경계로 Aggregate는 데이터 변경 시 함께 처리되는 일관성 단위로 Aggregate의 역할이다.
일관성의 경계를 명확하게 하는 것이 Aggregate로 Aggregate 안에서는 비즈니스 규칙이 꺠지면 안된다.

---
https://blog.naver.com/clotho95/140162870601