---
title: "Compare And Swap VS. Synchronized"
date: '2025-07-16'
---

CompareAndSwap(이하 CAS)은 CPU 수준의 원자적 연산으로 `현재 값이 특정 값일 경우에 다른 값으로 변경하라` 라는 작업을 수행한다.

Synchronized 연산은 synchronized, end-synchronized의 상태를 가지며 각각 뮤텍스 가져오기, 뮤텍스 해제 작업이다.

CAS은 단일 리소스에 대한 동기화가 필요할 때 유리하고, synchronized는 블록 전체에 대한 동기화가 필요할 때 사용된다.

Java에서 Atomic 클래스(AtomicInteger, AtomicLong..)를 사용해 단일 리소스에 동기화(내부 CAS 연산)를 할 수 있고, synchronized를 사용해 여러 리소스에 동기화를 적용할 수 있다.

단일 리소스가 아닌 여러 리소스에 동기화가 필요한 상황에서는 무조건적으로 synchronized가 유리하다.

**CAS** 
* Non-blocking, Optimistic Locking

**synchronized**
* Blocking, Pessimistic Locking