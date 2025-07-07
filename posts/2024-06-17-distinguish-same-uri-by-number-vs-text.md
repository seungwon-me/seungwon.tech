---
title: "Distinguish same URI by number vs. text"
date: '2024-06-17'
---

```
GET : /api/test/1234

GET : /api/test/qwer
```

동일한 uri를 갖는 API이다. 두 개의 api는 각각의 반환값을 갖는다. 어떻게 구현해야할 지 감이 오는가?

```java
@GetMapping("/api/test/{value}")
Integer getInt(@PathVariable Integer value) {
		return 500;
}

@GetMapping("/api/test/{value}")
String getString(@PathVariable String value) {
		return "오마이갓~~!!";
}
```

위와 같이 작성하면 되는 걸까? 안된다..

경로에서는 Integer인지 String인지 알 수 없기 때문에 올바른 매핑을 하지 못한다.

같은 경로라고 인식하게 되어 충돌이 발생하는 것이다~

해결 방법!

```java
@GetMapping("/api/test/{value:[\\d]+}")
Integer getInt(@PathVariable Integer value) {
		return 500;
}

@GetMapping("/api/test/{value:[\\w]+}")
String getString(@PathVariable String value) {
		return "오마이갓~~!!";
}
```

위와 같이 정규표현식을 사용하면 경로에 맞게, 의도한대로 매핑을 해줄 수 있다.