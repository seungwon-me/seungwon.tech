---
title: "ForkJoinPool"
date: '2024-04-30'
---

## ForkJoinPool이란? 
Fork/Join 프레임워크 기반으로 작업을 병렬로 실행하고 작업을 더 작은 하위 작업으로 나누고, 최종 결과로 결합하는 ForkJoinTask를 위한 스레드 풀이다. (ExecutorService 구현)

## Work stealing algo

작업을 마친 작업자 스레드가 다른 스레드에서 보류 중인 작업을 훔칠 수 있는 전략 

- 병렬 실행에서는 작업이 여러 프로세서/코어로 나누어지는데 idle 상태가 되면 오버헤드 발생으로 다른 프로세서의 오버로드된 대기열(작업 대기열)에서 작업을 할당 받아야한다.

# Fork/Join

## Fork

작업을 분할/분해

- 작업을 스레드 풀의 작업 큐에 넣는다.
- 비동기 메서드

## Join

풀 작업의 결과를 결합

- 동기 메서드

# 예제

```java
public class Main {
    public static void main(String[] args) {
        long[] numbers = new long[1_000_000];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = i;
        }

        ForkJoinPool pool = new ForkJoinPool();
        Task task = new Task(numbers, 0, numbers.length);
        long result = pool.invoke(task);
        System.out.println("Sum: " + result);

        pool.shutdown();
    }
}
```

```java
public class Task extends RecursiveTask<Long> {
    private final long[] numbers;
    private int start;
    private int end;

    public Task(long[] numbers, int start, int end) {
        this.numbers = numbers;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        int length = end - start;

        if (length <= 100) {
            long sum = 0;

            for (int i = start; i < end; i++) {
                sum += numbers[i];
            }
            return sum;
        }
        int middle = start + length / 2;
        Task leftTask = new Task(numbers, start, middle);
        Task rightTask = new Task(numbers, middle, end);

        leftTask.**fork**();
        Long rightResult = rightTask.compute();
        Long leftResult = leftTask.**join**();

        return leftResult + rightResult;
    }
}
```