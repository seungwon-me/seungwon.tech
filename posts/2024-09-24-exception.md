---
title: "Exception"
date: '2024-09-24'
---

## 예외가 없는 언어는 존재하지 않는다.

말그대로 예외가 존재하지 않는 언어는 절대 없다. 

예외는 말그대로 프로그램 동작 중 프로그래머가 생각하지 못한 예외적인 상황이다. 

예를 들면 a, b 덧셈 함수에 1, 2를 대입했을 때 3이 아닌 상황이 예외 상황이다.

그런 예외를 처리하는 방법은 try.catch만 존재하는 게 아니다. 

예외적인 상황이 발생한다면 값을 일정한 값으로 변경하거나 다른 코드 구문을 실행하는 것도 예외 처리 방법 중 하나이다.

## Error VS Exception

오류는 시스템 레벨에서 비정상적인 상황이 발생했을 때,

예외는 프로그래머의 로직에서 발생하는 것이다. 

## 자바에서의 Exception

### Checked Exception

- 반드시 예외를 처리해야한다. (try’catch, throws 로 무조건 처리해야한다.)
- 컴파일러가 처리(try-catch, throws)를 강제
- Spring 기본 정책에서는 Checked Exception이 롤백 대상이 아님(설정으로 변경 가능)
- IOException 등..

### Unchecked Exception

- 예외 처리가 강제가 아님
- 컴파일러가 처리 강제를 하지 않음
- Spring 기본 정책에서는 RuntimeException/Error가 롤백 대상
- NullPointerException 등..