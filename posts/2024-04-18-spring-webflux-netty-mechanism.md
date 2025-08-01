---
title: "Spring Webflux Netty Mechanism"
date: '2024-04-17'
---

### 1. 요청 전송

요청이 웹 애플리케이션(WebFlux)에 전송되면, 작업이 생성되고 작업을 처리하기 위해 채널이 생성

### 2. 이벤트 큐로 이동 및 처리

Event Loop에서 처리를 받기 위해 Event Queue로 이동

이 이벤트 큐에 작업이 이미 있다면 생성된 요청은 순서대로 처리

### 3. Blocking 작업 처리

Event Queue에 task 1(Blocking I/O)과 task 2 순서로 있다고 할때 task 1이 Event Loop를 점유하게 되면 차단되기 때문에 task 1을 다른 스레드에서 처리

병렬 스레드를 통해 처리한 후 다시 Event Queue로 돌아가고, Event Loop에 할당