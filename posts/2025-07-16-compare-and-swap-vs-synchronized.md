---
title: "Compare And Swap VS. Synchronized"
date: '2025-07-16'
---

CompareAndSwap(이하 CAS)은 CPU 수준의 원자적 연산으로 `현재 값이 특정 값일 경우에 다른 값으로 변경하라` 라는 작업을 수행합니다. 





Synchronized 연산은 synchronized, end-synchronized의 상태를 가지며 각각 뮤텍스 가져오기, 뮤텍스 해제 작업입니다. 