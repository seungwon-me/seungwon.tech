---
title: "Reactive Relational Database Transactions"
date: '2025-09-22'
---

일단 시작하기 전에, 정확하게 한가지 짚고 넘어갈 것이 있다.

트랜잭션 관리는 기술에 **독립적인 패턴**으로 **데이터베이스 관점에서는 명령형과 반응형 트랜잭션이 동일하게 동작**한다.

**하지만, Java 관점에서는 실행 모델과 Context 관리 방식이 크게 달라지며** 명령형에서는 ThreadLocal과 데이터는 `@Transactional` 경계 안에서만 유지되고 메서드 밖으로 나가지 않는다.

반면, 반응형에서는 트랜잭션 상태가 subscriber context에 바인딩되고, **데이터가 스트리밍되며**`@Transactional` **메서드 경계 밖으로 흘러나갈 수 있다.**

---

**imperative transactions Vs. reactive transactions**

**Imperative Transactions**

스프링의 AOP 기반 `@Transactional`에서는 **트랜잭션 상태와 리소스(Context)가** ThreadLocal에 **바인딩**된다.

즉, 동일 스레드 내에서 모든 트랜잭션 작업이 수행될 것을 보장한다.

데이터 경계 관점에서는 트랜잭션이 진행되는 동안의 데이터는 `@Transactional` 메서드 내부에 머물며 외부로 탈출하지 않는다.

**Reactive Transactions**

트랜잭션 **Context 바인딩**이 ThreadLocal이 아닌 subscriber context에 바인딩을 한다. 각 **reactive sequence**는 독립된 Context를 갖고 서로 격리된다. 이게 명령형과의 **첫 번째 큰 차이**이다.

두 번째는 **데이터가** `@Transactional` **메서드 경계 밖으로 스트리밍될 수 있다**는 점이다.

Publisher는 DB 드라이버가 row를 디코드하는 즉시 요소를 방출하므로, **트랜잭션 활성 중에도 데이터가 흘러나간다.**

`@Transactional`은 **reactive sequence** 내 **마커** 역할에 가깝고, **subscribe 시점과 onComplete 시점의 효과를 관찰**하는 모델로 이해하면 된다.