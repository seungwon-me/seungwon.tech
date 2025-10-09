---
title: "Event Sourcing"
date: '2025-10-04'
---

상태를 변경 시킨 이벤트를 Sequence of Events로 저장하는 패턴

State-Oriented Persistence(CRUD)와 Event-Oriented Persistence의 차이
- State-Oriented Persistence: 현재 상태를 저장
- Event-Oriented Persistence: 상태를 변경 시킨 이벤트를 저장

Event-Oriented는 데이터가 '어떻게' 변경되었는지 저장한다.

## Conceptual Foundation
* Event: 과거에 일어난 Fact로 Immutable이다.
* Command: 시스템의 상태 변경을 유발하려는 Intent로 성공할 수도, 실패할 수도 있다.
* Aggregate: 트랜잭션 일관성의 단위로 커맨드를 처리하고 이벤트를 생성하는 주체이다.
* Event Store: 이벤트를 저장하는 저장소로 Append-Only이다.
* Projection: 이벤트를 기반으로 현재 상태를 계산하는 과정으로 Eventual Consistency를 준수해야한다.