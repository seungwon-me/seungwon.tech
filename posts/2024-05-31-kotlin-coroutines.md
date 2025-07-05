---
title: "Coroutines"
date: '2024-05-31'
---

코틀린 진영에서의 자바 가상 스레드와 같은 경량 동시성 모델 

## 왜 코루틴을 사용해야 하는가?

코틀린에서 비동기 프로그래밍을 하기 위해?(맞다)

비동기식 코드를 동기 방식으로 작성하기 위해(맞다) ⇒ 콜백지옥이 이제 없음(행복?)

- 코틀린 코루틴에선 콜백 스타일의 코드가 아닌 명령형 프로그래밍 스타일이다.

코루틴도 가상 스레드 처럼 OS 스레드에 직접 매핑되지 않고 *continuations*이라는 객체를 사용해 ULT에서 매핑이 이루어진다. (경량 스레드)

⇒ 코루틴 간 전환(CS)에서는 OS가 다른 스레드의 컨텍스트를 로드할 필요가 없지만 참조를 *continuations* 객체로 전환해야한다.

## 비동기라면서 왜 반응형 프로그래밍을 안 함?

반응형 프로그래밍에서의 코드를 작성하고 유지하려면 더욱 비용이 커지고, 복잡해진다.

- 대부분 FP 스타일로 작성되어 처음엔 보기 쉽겠지만, `subscribeOn`과 같이 실행 흐름을 다른 스레드로 넘겨 버리는 함수가 존재해 실행 흐름을 판단하기 어려울 것이고, 다 다른 스레드에서 작동된다면 당연히 예외 추적도 힘들 것이다.

## Suspend 키워드?

suspend 키워드는 코루틴에서 빠지면 안되는 기능이다. 

해당 키워드를 메서드(함수)에 붙이게 된다면 해당 함수는 코루틴이라고 명시를 해줄 수 있고, 일시 중지를 할 수 있는 메서드라고 표시를 한다. 

⇒ 일시 중지하고 언젠간? 재시작

```kotlin
suspend fun minjuIsComing() {
  logger.info("민주가 오고 있어요!") // 함수 시작 point
  delay(500L) // delay(timeMillis: Long) // 함수 중단 point
  logger.info("민주가 도착했어요!") // 함수 재개 point
}
```

minjuIsComing 코루틴이 실행될 때 delay 기능에서 일시 중지하고, 다시 재개를 한다.

해당 메커니즘을 자세히 소개하겠다.

suspending 된 함수는 전체 문맥(context)가 `Continuation<T>`에 저장된다. 
Continuation 객체에는 함수의 변수 및 매개변수의 모든 상태, 실행이 중단된 지점(**label**)이 저장이 된다. 

코틀린 컴파일러는 중지된 함수를 아래와 같이 재구성한다.

```kotlin
suspend fun minjuIsComing()

fun minjuIsComing(continuation: Continuation<*>): Any 
```

? 컴파일러 녀석이 왜 변환 값까지 바꾸나요.

`suspend`함수가 일시 중지되면 함수 값을 반환할 수 없다. 

하지만, 함수가 일시 중지되었음을 표시하는 값(`COROUTINE_SUSPENDED`)을 반환해야하기 때문에 반환 값이 바뀌는 것이다.

파라미터로 받는 continuation 객체에 해당 함수의 정보를 저장하기 위해 래핑을 한 번한다.

래핑을 해 생긴 continuation 객체의 이름은 `MinjuIsComingContinuation`이다.

- ****정지 함수를 호출할 때마다 continuation 객체를 새 함수로 래핑을 한다.

실행 정보를 저장하는 필드 label은 해당 함수가 처음 시작되면 0이고, 만약 0이라면 중단 함수를 만날 때까지 실행하다가 중단 함수(delay)를 만나 label은 1이 되고, 중단 함수를 실행 시키게 된다.

delay 함수가 `COROUTINE_SUSPENDED`를 반환하게 되면 해당 코루틴은 중지된 것으로 판단된다. 

## Dispatcher

coroutine에서 Thread에 코루틴을 전달하는 스케줄러 역할을 한다. 

# Structured Concurrency

## Coroutine **S**cope

coroutineScope는 구조적 동시성을 구현한다. 

- 상위 코루틴이 취소되면 하위 코루틴도 취소
- 하위 코루틴이 예외를 발생시키면 상위 코루틴도 중지

coroutineScope는 실행이 끝날 때까지 이전 코루틴의 실행을 일시 중단하는 새로운 코루틴을 생성한다. 

```kotlin
suspend fun minjuRoutine() {
    coroutineScope {
        minjuIsComing()
    }
    coroutineScope {
        minjuIsGoing()
    }
}

suspend fun minjuIsComing() {
    log.info("민주가 오고 있어요!")
    delay(500L)
    log.info("민주가 도착했어요!")
}

suspend fun minjuIsGoing() {
    log.info("민주가 가고 있어요ㅜㅜ")
    delay(1000L)
    log.info("민주가 가버렸어요ㅜㅜ")
}
```

```
17:23:26.285 [main] INFO **MainLogger** - start
17:23:26.378 [**main**] INFO Example - 민주가 오고 있어요!
17:23:27.013 [kotlinx.coroutines.DefaultExecutor] INFO Example - 민주가 도착했어요!
17:23:27.031 [kotlinx.coroutines.DefaultExecutor] INFO Example - 민주가 가고 있어요ㅜㅜ
17:23:28.041 [kotlinx.coroutines.DefaultExecutor] INFO Example - 민주가 가버렸어요ㅜㅜ
17:23:28.056 [kotlinx.coroutines.**DefaultExecutor**] INFO **MainLogger** - end
```

실행은 순전히 순차적이다. 하지만 런타임은 두 개의 서로 다른 스레드를 사용해 전체 프로세스를 실행한다.

코루틴에서 중단이 되었다 다시 재개할 때 중단 되었던 스레드에서 다시 시작한다는 보장이 없다.

⇒ 재개할 시엔 다른 스레드에서 실행될 수 있다.

## Coroutine Builder

코루틴을 생성할 수 있다.

### **Launch** Builder

특정 코드를 실행하지만, 그 결과값이 필요없을 때 사용된다.

```kotlin
suspend fun minjuRoutine() {
    coroutineScope {
        launch {
            minjuIsComing()
        }
        launch {
            minjuIsGoing()
        }
    }
}
```

```
18:44:54.289 [main] INFO MainLogger - start
18:44:54.856 [DefaultDispatcher-worker-1] INFO Example - 민주가 오고 있어요!
18:44:54.961 [DefaultDispatcher-worker-2] INFO Example - 민주가 가고 있어요ㅜㅜ
18:44:55.554 [DefaultDispatcher-worker-2] INFO Example - 민주가 도착했어요!
18:44:56.042 [DefaultDispatcher-worker-2] INFO Example - 민주가 가버렸어요ㅜㅜ
18:44:56.043 [DefaultDispatcher-worker-2] INFO MainLogger - end
```

위의 실행 결과 처럼 하나의 스코프 안에서 두 개의 코루틴을 동시에 실행한다. 두 개의 worker 스레드를 이용하여 처리한 것을 볼 수 있다.

- 두 코루틴은 동일한 범위의 하위 항목이므로 두 코루틴 모두 실행이 끝날 때까지 기다린 후 반환

**GlobalScope**

GlobalScope를 사용해 구조적 동시성 사용을 피할 수 있다. 

```kotlin
suspend fun minjuRoutineGlobal() {
    GlobalScope.launch {
        minjuIsComing()
    }
    GlobalScope.launch {
        minjuIsGoing()
    }
    Thread.sleep(1500L)
}
```

```
18:56:07.017 [main] INFO MainLogger - start
18:56:07.409 [DefaultDispatcher-worker-1] INFO Example - 민주가 가고 있어요ㅜㅜ
18:56:07.409 [DefaultDispatcher-worker-3] INFO Example - 민주가 오고 있어요!
18:56:07.947 [DefaultDispatcher-worker-1] INFO Example - 민주가 도착했어요!
18:56:08.448 [DefaultDispatcher-worker-1] INFO Example - 민주가 가버렸어요ㅜㅜ
18:56:08.908 [main] INFO MainLogger - end
```

하지만, 이 경우엔 코루틴 실행이 끝날 때까지 약간의 대기 시간을 추가 해야한다.
(delay(1500L) 또는Thread.sleep(1500L)..)

- 부모-자식 관계를 강제하지 않는 빈 코루틴 범위와 같다.

**Job**

launch 함수를 사용하면 Job을 반환한다.

- Job은 **코루틴에 대한 핸들러이다.**
- 이를 사용하여 코루틴 실행을 취소하거나 완료될 때까지 기다릴 수 있다.

```kotlin
suspend fun minjuRoutineJob() {
    coroutineScope {
        val minjuIsComingJob: Job = launch {
            minjuIsComing()
        }
        val  minjuIsGoingJob: Job = launch {
             minjuIsGoing()
        }
        minjuIsComingJob.join()
        minjuIsGoingJob.join()
        launch {
            minjuStartAndEnd()
        }
    }
}
```

```
19:07:23.041 [main] INFO MainLogger - start
19:07:23.530 [DefaultDispatcher-worker-1] INFO Example - 민주가 오고 있어요!
19:07:23.548 [DefaultDispatcher-worker-2] INFO Example - 민주가 가고 있어요ㅜㅜ
19:07:24.145 [DefaultDispatcher-worker-1] INFO Example - 민주가 도착했어요!
19:07:24.627 [DefaultDispatcher-worker-1] INFO Example - 민주가 가버렸어요ㅜㅜ
19:07:24.648 [DefaultDispatcher-worker-2] INFO Example - 민주가 시작했어요!
19:07:25.163 [DefaultDispatcher-worker-2] INFO Example - 민주가 끝났어요!
19:07:25.164 [DefaultDispatcher-worker-2] INFO MainLogger - end
```

스코프 내의 3개의 코루틴이 동시에 실행될 것 같지만 아니다.

로그를 확인해 보면 minjuStartAndEnd는 나머지 두 개의 코루틴이 끝나고서야 실행되는 것을 확인할 수 있다.

이것이 구조적 동시성이다.

위의 코드에선 Job 객체를 통해 Join을 해주어 구조적 동시성을 달성했지만, 우리는 코드를 어떻게 바꿔야할 지 알고 있다

```kotlin
suspend fun minjuRoutineJob() {
    coroutineScope {
        coroutineScope {
            launch {
                minjuIsComing()
            }
            launch {
                minjuIsGoing()
            }
        }
        launch {
            minjuStartAndEnd()
        }
    }
}
```

```
19:14:55.673 [main] INFO MainLogger - start
19:14:55.854 [DefaultDispatcher-worker-1] INFO Example - 민주가 오고 있어요!
19:14:55.861 [DefaultDispatcher-worker-2] INFO Example - 민주가 가고 있어요ㅜㅜ
19:14:56.412 [DefaultDispatcher-worker-2] INFO Example - 민주가 도착했어요!
19:14:56.906 [DefaultDispatcher-worker-2] INFO Example - 민주가 가버렸어요ㅜㅜ
19:14:56.911 [DefaultDispatcher-worker-2] INFO Example - 민주가 시작했어요!
19:14:57.413 [DefaultDispatcher-worker-2] INFO Example - 민주가 끝났어요!
19:14:57.413 [DefaultDispatcher-worker-2] INFO MainLogger - end
```

coroutineScope를 사용해 같은 결과를 얻을 수 있다. 

### **Async Builder**

코루틴 실행에서 결과 값을 반환해야할 때 사용한다. 

```kotlin
suspend fun minju(): String {
    log.info("민주 생성 중~~")
    delay(500L)
    log.info("생성 완료!")
    return "민주"
}

suspend fun findMinju(): Int {
    log.info("민주 찾는 중~~")
    delay(1000L)
    log.info("찾았습니다!")
    return 511
}

suspend fun minjuRoutineAsync() {
    coroutineScope {
        val minju: Deferred<String> = async {
            minju()
        }
        val findMinju: Deferred<Int> = async {
            findMinju()
        }
        log.info("${minju.await()}를 ${findMinju.await()}일 만에 찾았습니다!")
    }
}
```

```
20:30:35.294 [main] INFO MainLogger - start
20:30:35.459 [DefaultDispatcher-worker-1] INFO Example - 민주 생성 중~~
20:30:35.476 [DefaultDispatcher-worker-2] INFO Example - 민주 찾는 중~~
20:30:36.004 [DefaultDispatcher-worker-1] INFO Example - 생성 완료!
20:30:36.499 [DefaultDispatcher-worker-1] INFO Example - 찾았습니다!
20:30:36.501 [DefaultDispatcher-worker-1] INFO Example - 민주를 511일 만에 찾았습니다!
20:30:36.501 [DefaultDispatcher-worker-1] INFO MainLogger - end
```

Deferred 변수에 async 실행 결과를 저장하고, await을 통해 값을 가져온다.(기다린다)

# Cancellation

코루틴 실행을 취소해보자

```kotlin
suspend fun cancelMinjuRoutine() {
    coroutineScope { 
        val minjuJob: Job = launch {
            minjuIsComing()
        }
        launch {
            delay(400L)
            minjuJob.cancel()
            minjuJob.join()
            log.info("민주가 사라졌어요..")
        }
    }
}
```

```
16:49:58.741 [main] INFO MainLogger - start
16:49:59.027 [DefaultDispatcher-worker-1] INFO Example - 민주가 오고 있어요!
16:49:59.483 [DefaultDispatcher-worker-1] INFO Example - 민주가 사라졌어요..
16:49:59.484 [DefaultDispatcher-worker-1] INFO MainLogger - end
```

민주가 오다가 사라져버린다.. 이 얼마나 안타까운 일인가;;

Job 또는 Deferred 클래스에서 cancel 함수를 구현해 코루틴을 취소할 수 있다. 

하지만 코루틴의 실행을 취소 시키려면 일시 중지(delay)가 무조건 필요하다. 

단순히 cancel만 사용하게 된다면, 해당 코루틴은 **즉시 중지되지 않고,** 계속 실행될 수 있다. 

- cancel 함수는 **취소 중**이라는 상태를 나타낸다.

이런 실행 취소 신호(CancellationException)를 보내 감지를 해야하는데, 일시 중지 상태에서 해당 코루틴이 취소된 것을 알 수 있다.

cancel-join은 일반적인 패턴이라 Job.cancelAndJoin()을 통해 결합된 함수를 사용할 수 있다. 

코루틴의 취소는 하위 코루틴까지 전파가 된다(코드는 따로 안 줄거임)

⇒ 코루틴을 취소하면 모든 자식이 암시적으로 취소가 됌 

 

# Coroutine Context

상위 코루틴으로부터 하위 코루틴에게 전달된 정보를 저장하여 내부적으로 구조적 동시성을 달성하는 방법

- CoroutineScope는 Coroutine context 참조를 유지한다.

⇒ 자식까지 전염된다.

```kotlin
suspend fun minjuRoutineContext() {
    coroutineScope {
        launch(CoroutineName("아일릿-민주") + Dispatchers.Default) {
            log.info("Hello, Minju!")
        }
    }
}
```

```
17:05:15.688 [DefaultDispatcher-worker-1 @**아일릿-민주**#1] INFO Example - Hello, Minju!
```

해당 로그에서 코루틴이 지정된 이름으로 생성되고, 실행되는 것을 확인할 수 있다.

```kotlin
suspend fun minjuRoutineContext() {
    coroutineScope {
        launch(CoroutineName("아일릿-민주") + Dispatchers.Default) {
            log.info("Hello, Minju!")
            launch {
                log.info("Lovely Minju!")
            }
        }
    }
}
```

```
17:09:45.482 [main] INFO MainLogger - start
17:09:45.699 [DefaultDispatcher-worker-1 **@아일릿-민주#1**] INFO Example - Hello, Minju!
17:09:45.711 [DefaultDispatcher-worker-2 **@아일릿-민주#2**] INFO Example - Lovely Minju!
17:09:45.712 [DefaultDispatcher-worker-2 **@아일릿-민주#2**] INFO MainLogger - end
```

하위 코루틴까지 Context Name이 전염(전달)되는 것을 확인할 수 있다.