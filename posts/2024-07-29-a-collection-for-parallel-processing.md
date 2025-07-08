---
title: "A collection for parallel processing"
date: '2024-07-29'
---

- 동시성
    
    여러 작업이 동시에 실행되는 것처럼 보이게 하는 개념이다.
    실제로는 컨텍스트 스위칭이 일어나 동시에 실행되는 것처럼 보이게 한다.
    
    core 1 p1——cs p2 ——cs p1——cs p2——
    
- 병렬성
    
    다중 코어 시스템에서 여러 작업이 실제로 동시에 실행되는 개념이다.
    
    간단하게 그림으로 표현하자면,
    
    core 1 —————————————————\ 종료
    
    core 2 ——————————\ 종료
    

동시성과 병렬성에 대해 알았으면 책에서 소개하는 ConcurrentXXXX는 Concurruncy. 동시성을 말한다는 것을 알 수 있다. 

아 병렬 처리였으면 ParrallelXXXX이였겠지 jdk 개발자 

당연히 해당 컬렉션은 동시성을 지원하는 컬렉션이다. (뭐 몇 개의 작업은 병렬 처리인 경우도 있음. 구현에 따라 다름

각 컬렉션이 가진 잠금 메커니즘을 통해 하나의 프로세스가 접근할 때(구조적 수정일 수도 있음. 구현에 따라 다름)

근데 왜 ConcurrentHashMap을 병렬 처리라고 했을까?

락 스트라이핑을 통해 병렬 처리를 할 수도 있는 컬렉션이라서 그런 것 같다. 하지만,

**완전한** 병렬 처리를 지원 안하는, 그것도 jdk 개발자들이 ConcurrentXXXX란 이름으로 작성한 컬렉션이 병렬 처리를 위한 컬렉션이라고 할 수 있나?

뭐; 제목을 병렬 처리도 할 수 있다라고 해석할 수도 있겠지만, 해당 생각은 제목을 “병렬 처리도 할 수 있다”라고 바꿔서 생각한 거지 해당 “병렬 처리를 위한 컬렉션”이라는 제목에 벗어나는 내용이다.

제목을 "병렬 처리를 위한 컬렉션"이라고 정의하는 것은 부정확하고, 정확한 제목은 
"**동시성을 관리하는 컬렉션**으로, 특정 상황에서 병렬 처리의 이점을 얻을 수 있는 구조를 가진 컬렉션”이 될 수 있다.

이 컬렉션들의 주요 목적은 동시성 문제를 해결하는 것이며, 병렬 처리 능력은 부가적인 특성이다. 

이제 진짜 컬렉션에서 병럴 처리를 하는 방법을 알아보자

- Stream API (parrallelStream) 사용
- Spliterator 사용
- …

해당 컬렉션을 Stream이라는 펑터로 확장해서 쓰는 것은 컬렉션으로만 병렬 처리를 하는 것에 벗어나는 내용이기 때문에 대부분의 컬렉션에서 지원해주는 Spliterator 사용해서 병렬 처리를 해보겠다. 

```java
List<Integer> numbers = new ArrayList<>();
IntStream.range(1, 1_000_000)
        .forEach(numbers::add);

```

위의 코드를 사용해 백만개의 숫자를 numbers 리스트에 저장한다.

```java
Spliterator<Integer> spliterator = numbers.spliterator();
```

해당 컬렉션에서 spliterator 메서드를 사용해서 Spliterator를 가져온다. 

```java
AtomicInteger sum = new AtomicInteger(0);

StreamSupport.stream(spliterator, true)
        .peek(n -> System.out.println("Thread " + Thread.currentThread().getName() + " processing: " + n))
        .filter(n -> n % 2 == 0)
        .forEach(sum::addAndGet);
```

값을 Tread-safe하게 더하기 위해 AtomicInteger 변수를 생성하여 병렬로 값을 더한다. 

filter 바디를 보면 알 수 있듯이 우리가 만들 것은 2의 배수를 더하는 것이다.

StreamSupport.stream를 간단히 말해주자면, spliterator를 소스로 스트림을 생성하고 병렬 스트림(true)으로 하면 내부적으로 ForkJoinPool를 사용해 병렬 처리를 한다. 

```java
System.out.println("병렬 처리 결과: " + sum.get());

int currentSum = numbers.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(Integer::intValue)
                .sum();

System.out.println("예상 결과: " + currentSum);
System.out.println("결과 일치? " + (sum.get() == currentSum));
```

해당 코드를 사용해 해당 결과를 가져와 순차 실행을 해서 나온 값과 비교한다.

- 소스 코드
    
    ```java
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Spliterator;
    import java.util.concurrent.atomic.AtomicInteger;
    import java.util.stream.IntStream;
    import java.util.stream.StreamSupport;
    
    public class ParallelProcessingExample {
        public static void main(String[] args) {
            List<Integer> numbers = new ArrayList<>();
            IntStream.range(1, 1_000_000)
                    .forEach(numbers::add);
    
            Spliterator<Integer> spliterator = numbers.spliterator();
    
            AtomicInteger sum = new AtomicInteger(0);
    
            StreamSupport.stream(spliterator, true)
                    .peek(n -> System.out.println("Thread " + Thread.currentThread().getName() + " processing: " + n))
                    .filter(n -> n % 2 == 0)
                    .forEach(sum::addAndGet);
    
            System.out.println("병렬 처리 결과: " + sum.get());
    
            int expectedSum = numbers.stream()
                    .filter(n -> n % 2 == 0)
                    .mapToInt(Integer::intValue)
                    .sum();
    
            System.out.println("예상 결과: " + expectedSum);
            System.out.println("결과 일치? " + (sum.get() == expectedSum));
        }
    }
    ```
    

결과의 일부분을 확인해보면

```java
Thread ForkJoinPool.commonPool-worker-1 processing: 811531
Thread ForkJoinPool.commonPool-worker-2 processing: 867252
```

서로 다른 스레드에서 실행되는 것을 확인할 수 있다.