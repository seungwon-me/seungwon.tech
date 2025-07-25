---
title: "光 Hikari Connection Pool"
date: '2025-07-15'
---

HikariCP는 Lightweight JDBC Connection Pooling Framework이다. 

`Zero-Overhead`, `Lock-Free`, `Lightweight`의 특징을 가지며, 현재 Spring Boot의 기본 Conecction Pool이다.

## 내부 구현 
HikariCP는 State로 크게 사용 가능한 Connection(STATE_NOT_IN_USE)과 사용 불가능한 Connection(STATE_IN_USE)으로 나뉘게 된다. HikariCP에서는 State를 PoolEntry를 통해 관리하고 PoolEntry가 구현하는 IConcurrentBagEntry의 명세는 다음과 같다. 

```java
public interface IConcurrentBagEntry {
    int STATE_NOT_IN_USE = 0; // Idle Connection
    int STATE_IN_USE = 1;     // Active Connection
    int STATE_REMOVED = -1;
    int STATE_RESERVED = -2;

    boolean compareAndSet(int expectState, int newState);
    void setState(int newState);
    int getState();
}
```
사용자가 요청하여 Connection이 할당되는 과정은 다음과 같다. 
1. 사용 가능한 Connection 찾기
    ```java
    public class ConcurrentBag<T extends IConcurrentBagEntry> implements AutoCloseable {
        private static final Logger LOGGER = LoggerFactory.getLogger(ConcurrentBag.class);

        private final CopyOnWriteArrayList<T> sharedList;
        private final boolean useWeakThreadLocals;

        private final ThreadLocal<List<Object>> threadLocalList;
        private final IBagStateListener listener;
        private final AtomicInteger waiters;
        private volatile boolean closed;

        private final SynchronousQueue<T> handoffQueue;
        ...
    }
    ```
    - concurrentBag.borrow() 메서드를 호출하여 ThreadLocal -> sharedList를 순서대로 확인한다.
2. compareAndSet 연산을 통해 STATE_NOT_IN_USE -> STATE_IN_USE 상태 전환
3. Proxy로 PoolEntry 애플리케이션에 최종 반환 

각 요청은 Connection을 점유하기 때문에 요청 처리 과정 동안 Connection을 블로킹하게 된다. 이런 구현으로 인해 Connection Pool의 크기가 작거나 요청 수가 많아지면 대기 시간이 길어지게 된다.



HikariCP가 Connection을 반환하는데는 ThreadLocal, ShardList, CAS 연산 ThreadLocal을 사용해 처리를 분산(락 존재 X)시키고 ShardList에 락을 걸지 않고 CAS(CompareAndSwap) 연산을 통해



```java
public class HikariDataSource {
   /** {@inheritDoc} */
   @Override
   public Connection getConnection() throws SQLException
   {
      if (isClosed()) {
         throw new SQLException("HikariDataSource " + this + " has been closed.");
      }

      if (fastPathPool != null) {
         return fastPathPool.getConnection();
      }

      // See http://en.wikipedia.org/wiki/Double-checked_locking#Usage_in_Java
      HikariPool result = pool;
      if (result == null) {
         synchronized (this) {
            result = pool;
            if (result == null) {
               validate();
               LOGGER.info("{} - Starting...", getPoolName());
               try {
                  pool = result = new HikariPool(this);
                  this.seal();
               }
               catch (PoolInitializationException pie) {
                  if (pie.getCause() instanceof SQLException) {
                     throw (SQLException) pie.getCause();
                  }
                  else {
                     throw pie;
                  }
               }
               LOGGER.info("{} - Start completed.", getPoolName());
            }
         }
      }
   }
}
```
더블 락킹 기법 volatile + synchronized


### HouseKeeper


github: https://github.com/brettwooldridge/HikariCP