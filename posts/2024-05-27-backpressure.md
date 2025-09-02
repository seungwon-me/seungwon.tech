---
title: "Backpressure"
date: '2024-05-27'
---

데이터 공급자(퍼블리셔)와 구독자 사이의 데이터 흐름을 조절하는 메커니즘

Subscriber가 **처리할 수 있는 만큼의 데이터**만 Publisher가 전송하도록 하여, 
Subscriber가 **과부하 상태에 빠지는 것을 방지**

## 사용

1. 구독자가 처리할 수 있는 데이터 양 만큼을 공급자에게 emit 요청한다.
2. 공급자가 emit한 데이터를 구독자가 처리할 수 있는 만큼 처리한 후,
다시 emit 요청을 한다.

### 전략

- IGNORE : Backpressure 사용 안 함
- ERROR : Downstream으로 전달할 데이터가 버퍼에 가득 찰 경우, Exception을 발생
- DROP : Downstream으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기하는 먼저 emit된 데이터부터 Drop
- LATEST : Downstream으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기하는 가장 최근에(나중에) emit된 데이터부터 버퍼에 저장
- BUFFER : 모든 데이터를 버퍼에 저장

동기식 처리에선 동일한 스레드에서 생산과 소비를 모두 수행하여 Backpressure가 필요없이 하나하나 처리한다.