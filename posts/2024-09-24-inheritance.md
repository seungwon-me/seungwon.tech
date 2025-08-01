---
title: "Inheritance"
date: '2024-09-24'
---

**상속**
is-a 관계로, 상위 객체를 확장하는 개념이다. 다형성을 배우려면 상속의 개념은 필수이다.

상속은 프로그래밍을 하며 많이 사용해 봐야 잘 이해할 수 있다.

## 예시

Animal - Rabbit 관계

토끼는 동물이란 집합의 부분 집합으로 포함될 수 있다.

왜? 토끼가 동물의 상태, 특성을 갖고 있기 때문이다.

## 코드

```java
class Animal {...}

class Rabbit extends Animal {...}

// ---

interface Animal {...}

class Rabbit implements Animal {...}
```