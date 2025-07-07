---
title: "Why Generational ZGC splits Heap into Young/Old Generations"
date: '2025-05-07'
---

> “Non-generational ZGC **has to scan the whole heap to find garbage**, and compact the whole heap to reclaim space. This can be inefficient, especially if a lot of garbage can be found by only looking at a small part of the heap.”
> 
> 
> **JEP 439 -** https://openjdk.org/jeps/439
> 

Non-Generational ZGC는 전체 힙을 대상으로 GC 작업을 수행해야 했기 때문에, Generational GC에 비해 **더 많은 CPU 및 메모리 리소스를 소모**한다.

이를 해결하기 위해 Generational ZGC에서는 Young/Old Generation으로 나누게 된다.

> "The Z Garbage Collector (ZGC) was initially released as a non-generational GC. This means it does not distinguish between young and old objects during a collection cycle. Non-generational GCs generally suffer from lower throughput and require more memory and CPU, compared to generational GCs that can take advantage of the weak generational hypothesis (i.e. that most objects die young)."
> 
> 
> **JEP 439 -** https://openjdk.org/jeps/439
> 

---

참고 자료:
https://openjdk.org/jeps/439