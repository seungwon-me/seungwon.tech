---
title: "Why Non-Generational ZGC doesn't split Heap into Young/Old Generations"
date: '2025-05-07'
---

**ZGC의 목표:** STW 최소화 및 대용량 힙 처리

**최우선 목표:** 힙 크기나 라이브셋 크기에 상관없이 수 밀리초 이내의 짧고 일관된 일시 정지 시간을 제공하는 것.

Young/Old Generation으로 명확히 나누지 않은 이유는 최우선 목표를 이루기 위함으로 짐작된다. 

힙을 단일 공간으로 보고 **STW 시간을 일관되도록** 하기 위함이다.

좀 더 쉽게 자세히 설명하면, Young/Old Generation으로 영역을 나누면 Young Generation에서 GC가 많이 발생하고, Old Generation에서는 **적게 발생**한다.(Weak Generational Hypothesis)

이럴 경우 Old Generation에서 발생하는 **GC는 상대적으로 긴 STW 시간**을 갖는다. 

---

참고 자료:ㄴ
https://openjdk.org/jeps/333