---
title: "Spring Webflux"
date: '2023-09-19'
---

비동기 non-blocking 웹 프레임워크

기존의 Spring MVC는 Servlet API를 기반으로 했지만, 
Spring WebFlux는 Servlet API를 사용하지 않고 Reactive Streams와 그 구현체인 Reactor를 기반으로 한 새로운 HTTP API로 구현된다.

- Mono : 0 ~ 1 개의 신호 (이벤트)를 갖는 Publisher
- Flux : 0 ~ n 개의 신호 (이벤트)를 갖는 Publisher

```java
Flux<String> flux = Flux.just("김승원");
flux.map(i -> "김승원" + i);
flux.subscribe(System.out::println);
```
이 코드를 실행 시키면 `김승원김승원`이 출력되지 않고, `김승원`이 출력된다.

이유는 위의 코드를 실행시키게 된다면 flux.map(i -> "김승원" + i); 코드에서 중간 Publisher가 만들어져 새로운 Flux 신호가 된다. 

그러므로 flux.subscribe(sout); 코드에선 첫 줄에 Flux 신호를 구독해 `김승원`이 출력된다.

원하는 의도대로 수정한 코드  
```java
Flux<String> flux = Flux.just("김승원"); // --김승원-|-->
Flux<String> flux2 = flux.map(i -> "김승원" + i); // --김승원김승원-|-->
flux2.subscribe(sout);
```

```java
Flux<String> flux = Flux.just("김승원");
flux.subscribe(i -> sout("김승원" + i));
```
