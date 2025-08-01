---
title: "Setter DI vs Constructor DI"
date: '2024-05-30'
---

### Setter DI

```java
public class Illit {
		private LovelyMinjuService service;
		
		public void Illit(LovelyMinjuService service) {
				this.service = service;
		}
		...
}
```

클래스가 인스턴스화된 후 클래스의 setter 메서드에 의존성을 전달

- 의존성이 런타임 중에 변경될 수도 있어 클래스를 다른 컨텍스트에서 재사용 가능

### Constructor DI

```java
public class Illit {
		private final LovelyMinjuService service;
		
		public Illit(LovelyMinjuService service) {
				this.service = service;
		}
		...
}
```

해당 클래스가 인스턴스화될 때 의존성이 클래스 생성자에 전달된다.

- 불변성
- 항상 완전히 초기화된 상태

뭐가 좋다고 말할 수 없다. 

필수적 의존성이고, 불변해야할 땐 생성자, 선택적 의존성이면 setter를 사용할 수 있을 것 같다.

이 두가지 방법을 혼합하여 사용할 수 있으니, 잘 사용해야한다.