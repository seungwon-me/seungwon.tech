---
title: "What Does the Caller Expect from Constructors: Object Creation or Complete Object?"
date: '2026-02-01'
---

> 생성자를 호출하는 쪽에서는 "객체 생성"을 기대할까 아니면 "완전한 객체" 생성을 기대할까?

Java와 같은 OOP가 큰 축을 차지하는 언어에서는 계약을 굉장히 중요시여긴다.

이런 언어를 사용한 개발자들은 Deterministic한 결과를 좋아한다. 예를 들어, "new School을 했는데 무조건 School 객체가 나와야한다."와 같은 계약을 정말 중요하게 여긴다. 

또한, interface 키워드를 사용해 클래스 간의 계약을 정의하기도 한다. 

OOP 프로그래밍은 전부 계약으로 이루어져있다. 코드 가독성이 좋은 이유가 Deterministic한 코드를 작성하도록 강제되어 있기 떄문이다.

예를들어, 옆자리 개발자가 이런 코드를 작성했다고 생각해보자. 

```java
class School {
  private String name;

  School(String name) {
    this.name = name;
  }

  String getName() {
    return name.trim().toUpperCase();
  }
}
```

생성자의 파라미터는 Non-Deterministic한 값이다. 현재 코드에서는 Null이 들어왔을 때 getName()을 호출하면 NPE가 발생한다.

getName()에서 NPE를 막으려면 아래와 같은 코드를 작성할 수 있을 것이다.

```java
String getName() {
  if (name == null)
    return "";

  return name.trim().toUpperCase();
}

또는

String getName() {
  if (name == null)
    throw new RuntimeException();

  return name.trim().toUpperCase();
}
```

메서드 레벨에서 클래스 필드의 검증 로직이 추가된다면, 올바른걸까? 

name 필드를 사용하는 다른 메서드가 추가되면 검증 로직이 또 필요할 것이다.
그리고, 메서드 레벨에서 검증을 한다는 것은 오로지 호출자에 의한 절차, 방어적 프로그래밍이다.



생성자의 본질적 책임
