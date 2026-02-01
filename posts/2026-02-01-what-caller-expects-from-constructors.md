---
title: "What Does the Caller Expect from Constructors: Object Creation or Complete Object?"
date: '2026-02-01'
---

> 생성자를 호출하는 쪽에서는 "객체 생성"을 기대할까 아니면 "완전한 객체" 생성을 기대할까?

Java와 같은 OOP가 큰 축을 차지하는 언어에서는 계약을 굉장히 중요시여긴다.

이런 언어를 사용한 개발자들은 Deterministic한 결과를 좋아한다. 예를 들어, "new School을 했는데 무조건 School 객체가 나와야한다."와 같은 계약을 정말 중요하게 여긴다. 

또한, interface 키워드를 사용해 클래스 간의 계약을 정의하기도 한다. 

OOP 프로그래밍은 전부 계약으로 이루어져있다. 코드 가독성이 좋은 이유가 Deterministic한 코드를 작성하도록 강제되어 있기 떄문이다.

생성자의 본질적 책임
