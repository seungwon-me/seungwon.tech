---
title: "Wrapper Class"
date: '2024-05-03'
---

## 래퍼 클래스란?

기본형 타입의 데이터를 객체로 포장해준 클래스이다.

데이터를 컬렉션에 저장하거나, 메서드의 매개변수로 전달하는 경우에 사용된다.

### 사용 예

- int → Integer
- char → Character

`List<Integer>`

java.util 패키지의 **클래스는 객체만 처리하여** 기본 타입을 사용할 수 없다.

```java
Integer a = 100;
Integer b = 100;

System.out.println(a == b);
```

결과 : true

```java
Integer a = 1000;
Integer b = 1000;

System.out.println(a == b);
```

결과 : false

Integer 클래스 내에는 -128에서 127 사이의 숫자가 캐시가 되어있어 해당 코드의 Integer 100의 참조는 동일한 주소를 가르켜 true를 반환한다.

동등 연산자를 사용하면 주소값을 비교하기 때문에 데이터(value)를 비교하려면 Object.equals() 메서드를 사용해야한다.