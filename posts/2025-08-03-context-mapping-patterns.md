---
title: "Context Mapping Patterns"
date: '2025-08-03'
---

Context Mapping은 서로 다른 Bounded Context 간의 관계를 정의하는 방법이다.

https://github.com/ddd-crew/context-mapping 레포지토리에서 Context Mapping의 여러 전략을 소개한다.

### Open Host Service
특정 Bounded Context(업스트림)가 다른 Bounded Context(다운스트림)에게 기능을 표준화하여 제공하는 방식
- 다수의 다운스트림 Bounded Context가 존재할 때

### Conformist
다운스트림 Bounded Context가 업스트림 Bounded Context에 강하게 의존하여 모델을 그대로 사용하는 방식

### ACL (Anti-Corruption Layer)
업스트림 Bounded Context의 복잡한 모델을 다운스트림 Bounded Context에 맞게 변환시켜주는 다운스트림 앞단 레이어
- Conformist 방식에서는 업스트림의 복잡성이 그대로 다운스트림에 전달되는데 ACL을 사용하면 복잡성 전파를 막을 수 있다.

### Shared Kernal
여러 Bounded Context가 비즈니스 모델의 스키마를 공유하는 방식
- 결합도가 높은 방식으로 최소의 Bounded Context로 유지하는 것이 좋다.

### Partnership
여러 Bounded Context가 함께 도메인 모델을 개발하는 방식
- 결합도가 높아 함께 변경되어야하는 Bounded Context일 경우 유리하다.

### Customer / Supplier Development 
다운스트림의 Bounded Context의 요구사항이 업스트림 Bounded Context 개발 과정에 반영되는 방식 

### Published Language
Bounded Context 간의 통신을 위해 Published Language(JSON, XML, OpenAPI, 프로토콜 등)를 사용하는 방식

### Separate Ways
두 Bounded Context의 상호작용이 필요 없어 독립적으로 분리해서 개발하는 방식

### Big Ball Of Mud
Bounded Context 간의 경계가 모호하고, 로직이 뒤죽박죽 섞여서 아무도 전체 시스템을 이해하거나 수정하기 어려워지는 안티 패턴

---

https://github.com/ddd-crew/context-mapping