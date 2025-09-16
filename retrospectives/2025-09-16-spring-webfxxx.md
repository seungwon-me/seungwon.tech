---
title: 'Spring WebFxxx'
date: '2025-09-16'
---

나는 Spring Webflux를 정말 열심히 공부했다. 
그리고 나는 Spring Webflux가 싫다. 싫어하는 이유는 적지 않겠다.

그래도, 내가 Spring Webflux를 공부하면서 느꼈던 장점은

- Mono, Flux와 같은 Publisher는 Monad라서 계산의 문맥을 타입으로 표현할 수 있는 게 제일 실용적이였다.

“정확히 말하자면 무엇을 할지 미리 정하고, 언제 실행할지는 나중에 결정할 수 있어야한다.” 이게 가장 큰 장점이였다. 

Mono를 발행하고선, 구독을 하지 않으면 동작하지 않는다. ← 이것 자체로 Method의 Flow를 미리 구체화할 수 있는 것이다.

그래서 Reactor 기반의 Webflux를 사용하다가, Kotlin Coroutine 기반의 Webflux를 사용했을 때 굉장히 불편한 점이 많았다. scope를 확실하게 적용할 수 잇는 건 Coroutine의 장점이긴 했다.

또 내가 느꼈던, Webflux의 장점은 코드의 품질을 더 생각해볼 수 있는 점이다. 

Webflux를 사용하면 코드 복잡성이 마구마구 올라 더 이상 코드를 알아볼 수 없을 지경이 되어버린다. 

괜히 적용했다고 많이 생각했다. 난 바보가 맞다.

나는 닌자가 아니니 다른 사람이 이해할 수 있도록 Method Chaining의 Depth를 통일한다던가 Application Service의 로직을 최소화 해야했다. 

로직은 도메인 모델로, Application Service에서는 행위의 조합만을 다룰 수 있도록.

선언적인 코드를 작성하다가, 명령형 프로그래밍을 하면 이질감을 많이 느끼는 것 같다.
