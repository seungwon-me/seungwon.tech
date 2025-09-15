---
title: "Domain Primitive"
date: '2025-09-15'
---

Domain Primitive는 특정 도메인의 행위를 보유하는 가장 작은 단위이다.

하나의 값을 wrapping하고, 스스로 검증 가능하며, 행위를 보유하는 Value Object이다.

String userName, Long userId를 UserName userName, UserId userId로 승격하는 것이다.
그냥 승격만 하는 것이 아니고, 도메인의 행위, 컨텍스트가 캡슐화되어야한다.

이렇게 보면, Value Object와 다를 게 없어보인다. 하지만, Domain Primitive는 정밀하게 정의된 하나의 도메인 개념, 도메인의 가장 작은 단위이다.

더 작은 단위로 Value Object를 구성하면, 디버깅에 효과적이게 적용되고 협업에 유용하다.

int/str 값을 Wrapping 하여 추가의 오버헤드는 발생할 수밖에 없다. 코틀린에서는 @JvmInLine value class 라는 굉장히 멋진 기능을 제공하여, Wrapping으로 인한 오버헤드를 없앨 수 있다.

1. 인터페이스가 명확해진다.

    ```java
    User register(String name, Integer age, String phoneNumber, String address);
    ```

   이랬던 함수의 프로토타입이 아래와 같이 파라미터의 혼동을 전부 제거한다.

    ```java
    User register(Name name, Age age, PhoneNumber phoneNumber, Address address);
    ```

   이제 다른 곳에서 register 함수를 실행 시키는 것은 전부 신뢰할 수 있는 작업이라고 볼 수 있다.

   또한, name String이 age Integer가 유효한지는 객체 내부에서 검사하게 된다.

2. 컨텍스트 명시

    ```java
    void pay(User A, User B, BigDecimal money);
    ```

   해당 pay 함수는 통화 변동/국경 간 결제로 확장 시 즉시 버그가 된다.

   아래와 같이 Money Domain Primitive로 바꾸면 완벽하게 캡슐화되어 변경에 영향을 많이 미치지 않고 객체 본인이 스스로 의도대로 작동한다.

   객체 본인 스스로 작동하게 하는 것이 객체에 컨텍스트를 넣는 것이다.

    ```java
    enum Currency { KRW, USD, EUR... }
    
    record Money(
    		BigDecimal amount,
    		Currency currency
    ) {
      public Money(BigDecimal amount, Currency currency) {
        if (amount == null || currency == null) throw new IllegalArgumentException("money: null");
        if (amount.scale() > 2) throw new IllegalArgumentException("money: scale");
        this.amount = amount.stripTrailingZeros();
        this.currency = currency;
      }
      
      public Money add(Money other) {
        ensureSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
      }
      
      private void ensureSameCurrency(Money other) {
        if (this.currency != other.currency) throw new IllegalArgumentException("currency mismatch");
      }
    }
    
    void pay(User from, User to, Money money);
    ```

3. 다객체 행위를 캡슐화

   Application Service에 흩어져있던 **값에 대한 행위**들을 캡슐화하여 Application Service에서는 **행위의 조합**만 다루게 해준다.


Domain Primitive는 Value Object와 다르게 의미, 행위, 유효성을 무조건 함께 다뤄야한다.

Money의 예제에서는 property가 2개이지만, 나는 FCC처럼 하나의 값만 가지는 것이 이상적이라고 생각한다.