---
title: "ParallelFlux"
date: '2024-04-23'
---

병렬 flux

```java
Flux.fromIterable(illits)
		.parallel(3) // 작업을 3개의 레일로 나누기
		.runOn(Schedulers.newParallel("아일릿 최고 - ", 3)) // 지정된 3개의 스레드
		.subscribe(i -> logger.info("next {}", i));
		
```

Flux.parallel를 사용해 Flux를 ParallelFlux로 만들어버린다.
- 작업을 레일 단위로 나누는데 라운드 로빈 방식을 사용해 나눈다.

ParallelFlux.runOn을 사용해 다중 스레드를 사용하는 스케줄러에 전달해줘야 병렬로 처리 가능하다.

- 위 코드는 3개의 스레드를 사용하는 parallel 스케줄러에 전달해 동시에 3개의 레일로부터 오는 작업을 처리