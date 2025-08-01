---
title: "Spring Webflux Mono and Flux"
date: '2024-04-22'
---

- 리액터 구성 요소
    - publisher: 발행자, 게시자, 생산자, 방출자 (Flux or Mono)
    - subscriber: 구독자, 소비자
    - emit: 퍼블리셔가 데이터를 내보내는 것
    - sequence: 퍼블리셔가 emit하는 데이터의 연속적인 흐름을 정의해 놓은 것. 연산자 체인 형태로 정의됨
    - subscribe: subscriber가 시퀀스를 구독하는 것
    - dispose: subscriber 시퀀스 구독을 해지하는 것

# Mono

0개 또는 1개 요소의 스트림을 나타냄, 단일 값을 내보내는 리액터 요소 (publisher)

## 사용 예시

### 단일 값 생성

```java
Mono<String> stringMono = Mono.just("아일릿 민주");
```

Mono.just는 주로 이미 생성된 객체를 Mono로 변환할 때 사용된다.

null이 될 수도 있는 데이터는 Mono.justOrEmpty를 사용하면 된다.

### 예외 처리

```java
Mono<Illit> illitMono = findIllitPort.findByName("민주") // Mono<Illit>
													.switchIfEmpty(Mono.error(new UserNotFoundException("민주가 없서요")));
```

switchIfEmpty는 상위 스트림이 Null value를 반환할 때 사용된다.

- 마블 다이어그램 switchIfEmpty


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/2fb22cd6-9e2a-451c-a037-3313d3c4cfed/Untitled.png)
    
    첫번 째 스트림은 empty일 때, 파란색 요소는 not empty일 때를 나타낸다.
    
    구독을 했는데 반환이 empty일 때 (Complete 신호만 있을 때) switchIf Empty 바디 내의 비동기 함수를 구독해 결과를 반환
    
    구독을 했는데 데이터가 있을 때 보이는 거와 같이 내부에 들어오고, 업 스트림의 데이터가 방출되는 것을 알 수 있다.


### 에러 처리

```java
Mono<Illit> illitMono = findIllitPort.findByName("민주") // Mono<Illit>
													.switchIfEmpty(Mono.error(new UserNotFoundException("민주가 없서요")))
													.onErrorMap(e -> e instanceof UserNotFoundException ? e : new TrashException());
```

onErrorMap을 사용해 상위 스트림에서 발생하는 에러를 다른 에러로 맵핑해줄 수 있다.

- 마블 다이어그램


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/fd01e3b9-6fe6-4fbd-a06f-9cb4b6dd5622/Untitled.png)


```java
Mono<Illit> illitMono = findIllitPort.findByName("민주") // Mono<Illit>
													.switchIfEmpty(Mono.error(new UserNotFoundException("민주가 없서요")))
													.onErrorResume(e -> getDefaultIllit()); // 극단적인 예시임. 원래는 switchIfEmpty, defaultIfEmpty를 사용해 처리하는 게 맞음
													
private Mono<Illit> getDefaultIllit() {
		return Mono.just(
            Illit.builder()
                 .name("아일릿")
                 .age("18")
                 .build()
    );
}
```

onErrorResume를 사용해 에러가 발생했을 때 어떤 작업을 수행할 수 있도록 만들어준다.

- 마블 다이어그램


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/feab974d-9c62-4298-84e0-1045eed320d2/Untitled.png)
    
    에러가 발생하면 onErrorResume 바디내의 비동기 함수를 구독해 나온 결과로 새로운 스트림을 발행한다.


### 연산자 사용

```java
Mono<IllitResponse> illitResponse = findIllitPort.findByName("민주") // Mono<Illit>
													.switchIfEmpty(Mono.error(new UserNotFoundException("민주가 없서요")))
													.map(this::toIllitResponse); // Illit to IllitResponse
													
private IllitResponse toIllitResponse(Illit illit) {
		return IllitResponse.of(illit);
}
```

Mono.map 연산자는 동기적인 작업, 다운 스트림에 전달될 value가 변하는 작업을 실행할 때 주로 사용함.
(Mono,Flux를 반환하지 않는 작업)

- 마블 다이어그램


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/7425d754-485c-405e-b606-b0d24fc02b87/Untitled.png)
    
    상위 스트림 요소를 가져와 새로운 Mono를 발행한다.
    
    형태 변환이 없으면 doOnNext와 같은 연산자 사용


```java
Mono<IllitResponse> illitResponse = findIllitPort.findByName("민주") // mono<illit>
													.switchIfEmpty(Mono.error(new UserNotFoundException("민주가 없서요")))
													.flatMap(this::toIllitResponseMono);
													
private **Mono**<IllitResponse> toIllitResponseMono(Illit illit) {
		return Mono.justOrEmpty(IllitResponse.of(illit));
}-
```

Mono.flatMap 연산자는 주로 비동기적인 작업을 실행할 때 사용함. (Mono, Flux를 반환하는 작업)

- 마블 다이어그램


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/0bf9fb18-3bfb-4f03-9958-2aef633eefaf/Untitled.png)
    
    상위 스트림 요소를 가져와 flatMap 바디내의 비동기 함수를 구독해 새 Mono를 발행한다.


```java
public Mono<IllitWithItemResponse> minjuPowerMethod() {
		return findIllitPort.findByName("민주") // Mono<Illit>
									.zipWith(findItemPort.findByName("민주"), (minju, item) -> {
												return new IllitWithItemResponse(minju, item);
									})
}

public Mono<IllitWithItemResponse> minjuPowerMethod() {
		return findIllitPort.findByName("민주") // Mono<Illit>
									.zipWith(findItemPort.findByName("민주")) // Mono<Tuple<Illit, item>>
									.map(tuple -> {
											return new IllitWithItemResponse(tuple.getT1(), tuple.getT2());
									});
}

record IllitWithItemResponse(Illit illit, Item item) {}
```

기본적으로 zipWith을 사용하면 상위 스트림 결과와 zipWith 바디내의 작업이 결합돼 튜플이 반환되지만, (minju, item)과 같이 명시해서 사용할 수 있다.

- 마블 다이어그램


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/b81c65b7-69bf-440b-8ed4-aefaef44cc39/Untitled.png)
    
    업 스트림의 요소와 zipWith 바디 내부에 있는 요소를 병렬로 실행하고 결합시킨다.
    
    여기서 하나의 작업이라도 예외가 발생하면 결합이 되지 않는다.


## Eager & Lazy

### switchIfEmpty

```java
@GetMapping("/test")
public Mono<String> testController() {
    return Mono.justOrEmpty("아일릿 최고입니다.")
            .switchIfEmpty(test());
}

private Mono<String> test() {
    System.out.println("test 호 출");
    return Mono.just("empty입니당");
}
```

`Log : test 호 출, Response : 아일릿 최고입니다.`

switchIfEmpty를 사용할 때는 원래의 Mono(상위 스트림)가 비어 있을 경우에 사용할 대신 사용할 Mono를 제공해 test 메서드가 실행은 되지만(Eager) test에서 반환하는 Mono는 원래의 Mono를 대체할 수 없다.

switchIfEmpty를 사용해 만약 상위 스트림이 empty일 때 다른 로직을 수행할 수 있게 한다.

- 마블 다이어그램 switchIfEmpty
    - 초록색 요소는 empty일 때, 파란색 요소는 not empty일 때를 나타낸다.
    - 구독을 했는데 반환이 empty일 때 (Complete 신호만 있을 때) switchIfEmpty 바디 내의 비동기 함수를 구독해 결과를 반환
    - 구독을 했는데 데이터가 있을 때 보이는 거와 같이 내부에 들어오고, 업 스트림의 데이터가 방출되는 것을 알 수 있다.


### defer

```java
@GetMapping("/test")
public Mono<String> testController() {
    return Mono.justOrEmpty("아일릿 최고입니다.")
            .switchIfEmpty(Mono.*defer*(this::test));
}

private Mono<String> test() {
    System.out.println("test 호 출");
    return Mono.just("empty입니당");
}
```

`Log : , Response : 아일릿 최고입니다.`

defer를 사용해 실행을 구독 시점까지 지연시켜 Lazy하게 처리할 수 있다.

test가 아예 실행이 안됨

- 마블 다이어그램 defer


    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/180fc7f2-eb7c-4688-8b3a-a3310374f447/a83b35e9-2f94-40ff-b381-729460998bb6/Untitled.png)
    
    바디 내의 비동기 함수를 구독해 Mono를 반환 시킨다.
    
    defer 바디 밖에 구독이 있는데 이게 바로 구독이 된 시점에만 defer 바디를 실행할 수 있게 해준다. (Lazy)


[Mono switchIfEmpty() is always called](https://stackoverflow.com/questions/54373920/mono-switchifempty-is-always-called)

# Flux

0개에서 n개 요소의 스트림을 나타냄, 여러 개의 값을 내보낼 수 있는 리액터 요소 (publisher)

## 사용 예시

### 스트리밍 데이터

```java
Flux<Integer> streamInteger = Flux.range(1, 10);
```

### 연산자 사용

```java
Flux<IllitResponse> illitResponseFlux = findIllitPort.findAll().map(this::toIllitResponse)
```

### Mono와의 결합

```java
Mono<Illit> illitMono = findIllitPort.findByName("민주");
Flux<Item> itemFlux = illitMono.flatMap(findItemPort::findByIllit);

Mono<IllitWithItemResponse> illitResponseMono = illitMono.zipWith(itemFlux.collectList(),
    (illit, item) -> {
        return toIllitWithItemResponse(illit, item);
    })
																			  
private IllitWithItemResponse toIllitWithItemResponse(Illit illit, List<Item> item) {
		return new IllitWithItemResponse(illit, item)
}
																			  
record IllitWithItemResponse(Illit illit, List<Item> item) {}
```

### filter vs filterWhen

filterWhen은 비동기 작업

filter는 동기 작업