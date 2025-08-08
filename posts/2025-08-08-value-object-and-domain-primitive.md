---
title: "Value Object and Domain Primitive"
date: '2025-08-08'
---

Value Object는 값들의 묶음이고 Domain Primitive는 하나의 값을 wrapping하여 도메인 규칙을 포함한 불변 값이다.

주로 Value Object에 Domain Primitive가 포함된다고 생각하면 된다.

```java
// value object
record User(
    Email email,
    Name name,
    Age age
) {}

// domain primitive
record Age(
    int value
) {
    
    Age {
        if (!isValidAge(value)) {
            throw new Exception();
        }
    }

    // `20~30살 가입 가능` 도메인 규칙
    private static final int MIN = 20;
    private static final int MAX = 30;
    
    private static boolean isValidAge(int value) {
        return value >= MIN && value <= MAX;
    }
}
```

Domain Primitive를 정의하고 여러 Bounded Context에서 공유해서 사용할 떄에는 Context Mapping 전략(Shared Kernel)을 고민해봐야한다.

공유해서 사용했을 때는 중복 정의를 피하고, 일관성을 유지할 수 있지만, Age를 사용하는 다른 Bounded Context에서는 위의 `20~30살 가입 가능` 도메인 규칙이 없을 수 있다.

자바에서는 Record 클래스를 사용해 값을 wrapping 했지만, 코틀린에서는 `@JvmInline value class` 키워드를 제공하여 코드에서는 Wrappging 되어있지만, JVM 수준에서는 primitive 값으로 인식하는 기능(JVM 수준에서 객체 할당 제거)을 제공해준다.

```kotlin
@JvmInLine
value class Age(
    val age: Int
) {
    
    init {
        if (isValidAge(age)) {
            throw Exception()
        }
    }
    
    companion object {
        const val MIN: Int = 20
        const val MAX: Int = 30
        
        fun isValidAge(value: Int): Boolean {
            return value >= MIN && value <= MAX
        }
    }
}
```