---
title: "Reactive Streams"
date: '2024-05-27'
---

리액티브 프로그래밍을 표준화한 명세이다.

- 논 블로킹, 백프레셔로 비동기 스트림 처리
- 리액티브 프로그래밍을 가능하게 하는 최소한의 인터페이스, 메서드, 프로토콜 셋 정의.
- JVM 기반 언어 및 JS로 구현되는 중립적인 접근 방식 목표
- 다중 전송 스트림(TCP, UDP, HTTP 및 WebSockets) 지원

## 인터페이스

- publisher
    
    구독자에게 받은 요청에 대한 응답 요소 스트림 제공.
    
    모든 구독자에게 서비스 제공 가능.
    
- subscriber
    
    이벤트 스트림 수신자, 구독은 다음과 같은 2단계 과정이다.
    
    1. Publisher.subscribe(구독자) 호출
    2. Subscription.request(long) 호출
    
    구독이 완료되면 onNext 메서드를 사용해 알림 처리를 할 수 있다. onComplete는 알림의 끝
    
- subscription
    
    publisher와 subscriber의 연결을 나타내고, request를 사용해 많은 데이터 요청, cancle을 사용해 알림 구독 취소를 할 수 있다.
    

## 구현체

- RxJava
- Project Reactor
- Akka Streams
- Vert.x
- ReactiveX
- Flow API