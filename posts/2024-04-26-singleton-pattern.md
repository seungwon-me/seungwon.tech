---
title: "Singleton Pattern"
date: '2024-04-26'
---

클래스의 인스턴스가 여러번 호출되더라도 단 1개만 생성되게 하는 디자인 패턴

```java
public class UserNotFoundException extends CustomException {
    public static final CustomException EXCEPTION
            = new UserNotFoundException();

    private UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
```

위의 코드와 같이 static 영역에 객체를 생성해두고, 생성자에 private으로 new 생성을 하지 못하게 막는다.

- 최초 한번의 new 연산자를 통해서 static 메모리 영역을 사용해 메모리 누수를 막는다.

## **싱글톤 컨테이너**

스프링 컨테이너는 빈을 싱글톤으로 관리한다.