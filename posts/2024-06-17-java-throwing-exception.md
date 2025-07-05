---
title: "Throwing Exception"
date: '2024-06-17'
---

자바를 넘어서 모든 SW의 예외 처리는 매우 중요하다. 
이를 통해 개발자는 예상치 못한 오류를 적절하게 해결할 수 있어 해당 SW의 품질을 보장할 수 있는 그런 작업이다.

자바 프로그래밍 내에서의 예외 처리를 이해해보자.

## Exception이란?

자바 프로그래밍 내에서의 예외는 런타임 환경에서 발생하여, 프로그램이 정상적인 진행을 하지 못하게 하는 사건 즉 시스템은 올바르게 이루어져 있지만, 개발자의 로직의 오류를 말한다. 
보통 0으로 나누기, null인 객체에 접근, 존재하지 않는 파일에 접근 등의 예외 상황이 있다.

## Throw statement
자바를 사용해 개발 또는 학습을 진행하였다면, throw, throws 등의 구문. 키워드를 본 적이 있을 것이다.

예를 들면 이런 식이다.
```java
void method1() throws InterruptedException {
		Thread.sleep(5000L);
		
		throw new RuntimeException();
} // 극단적인 예시.
```
이 파트에선 throw. 메서드 바디 내에서 예외를 발생. 혹은 던지는 것을 학습할 것이다.

자바에서 throw 구문을 사용해 예외를 발생시키는 것은 간단하다. 

```java
throw ThrowableObject; 
```

ThrowableObject은 자바의 모든 예외에 대한 기본 클래스인 Throwable를 확장하는 클래스의 인스턴스이어야 한다.

뭐 예를 들면 많이들 알고 있는 RuntimeException이라던가 예외들이 throw 구문 뒤에 위치할 수 있다.

## **Checked.’ Unchecked Exception**

Checked Exception은 개발자가 무조건 처리해야하는 컴파일 시점에서 발생하는 오류이다.

예로 들자면. Thread.sleep 메서드를 사용하고 싶을 때 일반 적인 메서드 블록에 작성하면 빨간 줄이 생기는 모습을 본 적이 있을 것이다.

해당 에러를 확인하면. Unhandled exception: ..InterruptedException을 확인 할 수 있는데.

InterruptedException를 핸들링 해줘야한다고 한다. 왜 그럴까? 

```java
public static void sleep(long millis) **throws InterruptedException** {
    ...
}
```

sleep 메서드의 구현을 보니 **throws InterruptedException**이 작성되어 있는 걸 볼 수 있다.

아! throws는 전염되는 구나! 그렇다. .

throws를 사용한 건 메서드 블록이 해당 예외를 발생시킬 수 있다고 작성한 것이고,

왜 명시를 해야하는 걸까?
InterruptedException은 checked exception으로 외부의 리소스, 서비스와 상호작용해야할 때 잠재적인 예외 상황을 기호화해서 예측할 수 없게 실패할 수 있는 오류 처리를 해야하기 때문이다. 

Unchecked Exception은 개발자의 예외 처리가 필수가 아니고, 런타임 시점에서 발생할 수 있는 예외이다. 

주로 코드의 결함이나, 논리적 문제에서 발생한다. 

예를 들면 

- 유효한 범위가 아닌 배열 인덱스에 접근하였을 때 (ArrayIndexOutOfBoundsException)
- null인 객체에 접근을 했을 때 (NullPointerException)

발생하는 예외이다. 

## Spring ControllerAdvice

ControllerAdvice 어노테이션을 자세히 알아보지는 않을 것이다. 

그저 독자들이 주로 스프링 부트를 사용해 애플리케이션을 개발하고 있을텐데, 전역적으로 예외를 잡아주는 ControllerAdvice를 사용할 거라 생각했다. 

그렇다면 본인은 Custom Exception을 직접 비즈니스에 맞게 작성하여 사용하고 있는가?

## 정말 잘 사용하고 있을까?

비즈니스 로직이 커지면 예외 상황은 더 늘어날 수 밖에 없다. 하지만 예외 처리를 할 때 생기는 비용을 생각해본 적이 있나? 

예외 생성 비용은 비싸다. 예외 발생 회수가 커질 수록 문제가 생길 수도 있다.

예외 생성 비용에 가장 영향을 미치는 요소는 trace로 예외 발생 경로이다. 

이를 해결하기 위해 stack trace를 갖지 않도록 설정할 수 있는데,

```java
@Override
public synchronized Throwable fillInStackTrace() {
  return this;
}
```

위와 같이 fillInStackTrace 메서드를 아무 stack trace를 갖지 않도록 override할 수 있다.

또 위와 같이 생성했다면 static final 필드에 미리 예외를 캐싱해두고 사용하면 비용을 더 줄일 수 있을 것이다.