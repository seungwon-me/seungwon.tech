---
title: "AutoCloseable"
date: '2024-04-30'
---

# try-with-resources

일부의 리소스에 액세스를 시도하는 try문

```java
try (FileInputStream fileInputStream = new FileInputStream("...")) {...}
```

하지만 자바 7 이전에는 try를 사용해서 리소스에 액세스할 땐 해당 scope의 리소스를 .close 해줘야했다.

```java
FileInputStream fileInputStream = null;

try {
    fileInputStream = new FileInputStream("...");
    ...
} finally {
    if (fileInputStream != null) {
        fileInputStream.close();
    }
}
```

하지만 try-with-resources를 사용하면 명시를 안 해도 자동 close가 된다!

→ AutoCloseable을 구현한 리소스를 사용

# AutoCloseable

```java
public interface AutoCloseable {
    void close() throws Exception;
}
```

`java.lang` 패키지의 인터페이스 

## ExecutorService

```java
@Override
default void close() {
    boolean terminated = isTerminated();
    if (!terminated) {
        shutdown();
        boolean interrupted = false;
        while (!terminated) {
            try {
                terminated = awaitTermination(1L, TimeUnit.DAYS);
            } catch (InterruptedException e) {
                if (!interrupted) {
                    shutdownNow();
                    interrupted = true;
                }
            }
        }
        if (interrupted) {
            Thread.currentThread().interrupt();
        }
    }
}
```