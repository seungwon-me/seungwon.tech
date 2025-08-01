---
title: "ConnectableFlux"
date: '2024-04-23'
---

여러 구독자 간에 단일 스트림을 공유하고 모두가 동일한 요소 시퀀스를 수신하도록 보장

Flux.publish 를 사용해 만들 수 있다.

```java
ConnectableFlux<Notification> broadcastNotifications() { 

    return Flux.interval(Duration.ofSeconds(1))
               .map(this::generateNotification)
               .publish();
}
```

```java
ConnectableFlux<Notification> connectableFlux = broadcastNotifications();
connectableFlux.connect();

connectableFlux.subscribe(this::sendNotificationToClientA);
connectableFlux.subscribe(this::sendNotificationToClientB);
```

실시간이 필요한 애플리케이션에서 사용된다.