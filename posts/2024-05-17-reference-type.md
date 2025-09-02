---
title: "Reference Type"
date: '2024-05-17'
---

프로그램이 객체 생명 주기를 효과적으로 관리할 수 있는 객체 참조 유형 4가지를 정리합니다

## Strong

강한 참조 타입. 가장 일반적으로 사용되는 참조 타입이다. 

- 해당 Strong 참조가 있는 객체는 GC의 대상이 되지 않는다.

```java
Object strongReference = new Object();
```

메모리 공간이 부족하다 해도, 회수를 하지 않는다.

GC의 대상이 되게 하려면

- 참조 X

```java
public void test() {
    Object strongReference = new Object();
}
```

해당 메서드 블록이 실행되고 메서드 스택이 종료된다면, 참조된 객체가 0이므로 해당 객체는 재활용될 것이다.

하지만 이 내용은 지역 변수에만 해당하는 내용이라 인스턴스 변수의 Strong 참조일 경우 GC의 대상이 되게하려면 `strongReference`객체를 null로 설정하는 방법이 있다.

## Soft

소프트 참조만 있는 경우 GC는 메모리 공간이 충분할 때엔 해당 객체를 회수하지 않는다.

```java
// Strong reference
String strongReference = new String("abc");
// Soft references
String str = new String("abc");
SoftReference<String> softReference = new SoftReference<String>(str);
```

JVM 메모리가 부족할 때 소프트 참조 개체는 회수된다. 

메모리가 부족하면 JVM은 먼저 해당 객체 참조를 null로 설정 후 GC의 대상이 되도록 한다.

탐색한 웹 페이지를 찾거나 뒤로 가기를 할 때 사용될 수 있다.

## Weak

약한 참조만 있는 객체가 발견되면 현재 메모리 공간이 충분한지 여부에 관계없이 해당 객체의 메모리가 회수한다. 

하지만, GC는 스레드 우선순위가 낮아 해당 객체를 빨리 찾지 못할 수 있다.

```java
String str = new String("abc");
WeakReference<String> weakReference = new WeakReference<>(str);
```

```java
String str = new String("abc");
WeakReference<String> weakReference = new WeakReference<>(str);
String strongReference = weakReference.get();
```

위와 같이 약한 객체를 강한 객체로 변경할 수 있다.

## Phantom

해당 참조는 객체의 생명 주기를 결정하지 않는다.

→ GC가 해당 객체를 보기에 참조가 없는 것 처럼 보인다.