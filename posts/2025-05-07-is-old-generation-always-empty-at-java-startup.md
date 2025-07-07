---
title: "Is Old Generation always empty at Java startup?"
date: '2025-05-07'
---

자바 프로그램을 처음 실행했을 때, 생성되는 객체들은 대부분 Young Generation의 Eden 영역에 할당되게 된다.

Old Generation은 Young Generation에서 **여러번의 Minor GC를 거치고 살아남은** **오래된 객체가 Promotion되는 영역**이다. 그래서 보통 실행했을 때 애플리케이션 객체로 Old Generation이 채워져 있지 않다.

보통 매우 큰 객체가 생성되면 Young Generation을 거치지 않고, Old Generation으로 할당된다고 한다.

`-XX:PretenureSizeThreshold` 옵션 값보다 큰 객체는 Old Generation에 바로 할당되는 것이 맞다.

하지만, 매우 큰 객체가 할당되는 시점은 **프로그램 실행 후 첫 객체 할당 시점**이고 ‘프로그램을 처음 실행’이라는 시점에서는 아직 할당 전이므로 비어있다고 보는 것으로 보는 것이 맞다.

---

참고 자료: https://bcho.tistory.com/83