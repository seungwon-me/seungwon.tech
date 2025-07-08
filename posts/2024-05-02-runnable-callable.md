---
title: "Runnable & Callable"
date: '2024-05-02'
---

# **Runnable**

```java
@FunctionalInterface
public interface Runnable {
    void run();
}
```

결과를 반환하지 않는 작업(연산)을 나타내는 인터페이스 

병렬 처리(스레드)에 대한 기본 클래스이다.

new Thread에 파라미터로 전달해(일급 객체라서 그럼) 새로운 스레드에서 실행 가능

```java
Runnable runnable = () -> System.out.println("하하 인생!");

Thread thread = new Thread(runnable);
thread.start();
```

# **Callable**

```java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}

```

결과를 반환하고, 예외가 발생할 수 있는 연산을 하는 함수형 인터페이스 

ExecutorService를 사용해 병렬 작업 가능하다.

```java
Callable<String> callable = () -> "인생 ㅋㅋ";

ExecutorService executorService = Executors.newSingleThreadExecutor();
Future<String> future = executorService.submit(callable);
System.out.println(future.get());

executorService.close();
```