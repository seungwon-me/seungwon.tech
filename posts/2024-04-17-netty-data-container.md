---
title: "Netty Data Container"
date: '2024-04-17'
---

### **ByteBuf**
자바 NIO의 ByteBuffer를 편리하게 사용할 수 있게 기능을 제공하는 API
- Java NIO Buffer Class
- readerIndex와 writerIndex로 읽기, 쓰기 작업을 구분한다.

https://parkhyeokjin.github.io/netty/2019/12/29/netty-chap3.html

### Pooling

메모리 할당과 해제를 효율적으로 관리하기 위한 기법 (**ByteBuf** 재사용)

객체가 필요할 때마다 새로 생성하는 대신 미리 할당된 객체를 재사용한다.

`PooledByteBufAllocator.DEFAULT`

### **Reference Counting**

객체의 참조 수를 계산하여 객체가 더 이상 사용되지 않을 때 자동으로 메모리를 해제하는 메커니즘

- 객체의 생명주기 관리 (여러 곳에서 참조될 때, 사용되지 않을 때)
- GC와 달리 실시간으로 객체를 판단해 메모리 누수 방지 가능

### JVM에서의 Netty **Reference Counting**

JVM은 네티의 참조 카운팅을 인식하지 못해 직접 관리 해주어야한다.

→ 참조 수가 0이 되어도 GC 대상이 아니다.

### Codec

Coder Decoden