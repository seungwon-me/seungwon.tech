---
title: "Predicate"
date: '2024-05-12'
---

boolean 조건을 정의할 수 있는 함수 인터페이스

- 대표적으로 스트림 filter 같은 곳에 쓰인다. (이거 말고도 엄청 많이 쓰인다.)

```java
@FunctionalInterface
public interface Predicate<T> {
		boolean test(T t);
		...
}
```

predicate 인터페이스의 test 메서드를 사용해 조건의 참 거짓을 반환 받을 수 있다.

### negate

기존 predicate 객체를 반전 시킬 수 있다.

### or and

두 개의 predicate를 조합 시켜 더욱 디테일한 조건을 만들 수 있다.

### 예시

```java
public static void main(String[] args) {
      Predicate<String> predicate = (String s) -> s.startsWith("A");

      System.out.println("ABC : " + predicate.test("ABC"));
      System.out.println("BBC : " + predicate.test("BBC"));
      System.out.println("AAA : " + predicate.test("AAA"));

//        ABC : true
//        BBC : false
//        AAA : true
}
```

위의 코드에서는 파라미터로 문자열을 받아 해당 문자열이 ‘A’ 로 시작되는 지 검사하는 코드이다.