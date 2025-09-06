---
title: "Functor, Monad in Functional Programming Fact Check"
date: '2025-09-06'
---

**Fact 0.** 나는 Functor, Monad 잘 모른다. (이건 진짜 FACT)
 * 사실 잘 알고 싶지도 않다. 모르고 싶다.

**Fact 1.** Map 메서드가 있다고 Functor가 아니다.
* Map에 Side Effect (Mutation)을 발생시키는 코드가 있다면, Functor Law 위반
* Functor Laws가 지켜지고 있는 지 확인해야한다.

**Fact 2.** 자바에는 Monad가 없다.
* Monad Laws를 지키지 못하는 것들이 대부분…
    * Left Identity
    * Right Identity
    * Associativity
* 많이들 좋아하시는 Optional도 자바 메커니즘과 null-safety를 우선하여 Monad Laws를 위반한다.
* 자바는 Side Effect를 많이 허용하여 완전한 Monad가 아니다.

**Fact 3.** Monad는 문맥을 표현한다는 것이 핵심.
* 뭐 데이터를 pure한 함수를 통해 처리하고 Side Effect를 없애는 것도 중요하겠지만, 백엔드 Java 개발자인 나로서는 계산의 문맥을 타입으로 표현할 수 있는 게 제일 실용적이였다.
* Monad는 무엇을 할지 정하고, 언제 실행할지는 나중에 결정할 수 있어야한다.

어렵다. Functional Programming을 조금이라도 찍먹하려고 하면, 어려운 수학 함수가 나와 정말정말 무섭다.

내가 어디서 이 개념을 사용해 기여를 할 수 있을 지는 더 고민해봐야겠다.
