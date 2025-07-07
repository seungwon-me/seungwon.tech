---
title: "Reason HotSpot VM GC splits Heap into Young and Old Generations"
date: '2025-05-06'
---

## Weak Generational Hypothesis(이하 WGH)

생성되는 대부분의 객체가 금방 사용되지 않고 버려지며, 오래 살아남는 객체는 극히 일부라는 특성

1. **대부분의 객체는 생성된 지 얼마 되지 않아 접근 불가능 상태**가 된다.
2. **오래된 객체에서 젊은 객체로의 참조**는 **매우 적게 발생**한다.

![***Typical Distribution for Lifetimes of Objects***](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/img/jsgct_dt_003_alc_vs_srvng.png)

***Typical Distribution for Lifetimes of Objects***

모든 객체를 동일한 방식으로 처리하는 것보다 **객체의 Age**에 따라 다른 방식으로 처리하는 것이 GC 효율에 유리

왜 유리할까?

→ GC는 사용하지 않는 객체를 찾기 위한 메커니즘으로, 더욱 빠르게 메모리를 찾는 것이 목표dlek.

→ 근데 매번 GC 때마다 모든 객체를 스캔? 활발히 사용하는 객체도 매번 검사?

WGH 가설을 참고하면 오래된 객체, 젊은 객체는 따로 관리하면 더욱 효율적이란 걸 알 수 있다.

YG는 빈번하게 GC가 발생하고, OG는 훨씬 덜 발생한다. == 전체적인 GC 부담이 줄어든다.

---

참고자료:

https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html