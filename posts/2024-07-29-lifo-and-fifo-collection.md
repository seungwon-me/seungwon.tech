---
title: "LIFO and FIFO Collection"
date: '2024-07-29'
---

- LIFO
    
    Stack
    
    ```java
    public class Stack<E> extends Vector<E> {...}
    
    public class Vector<E>
        extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
    {...}
    ```
    
    동적 배열 및 동기화된 여러 메서드를 지원하는 Vector를 확장하는 Stack 클래스 
    
    - 스택 자료구조에 맞게 푸시, 팝 피크 등의 여러 메서드를 지원함.
    
    ```java
    Stack<String> stack = new Stack<>();
    ```
    
    Deque (Java 6 이후)
    
    ```java
    public class ArrayDeque<E> extends AbstractCollection<E>
                               implements Deque<E>, Cloneable, Serializable
    {...}
    ```
    
    stack
    
    ```java
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(1);
    stack.pop();
    ```
    
- FIFO
    
    ```java
    Queue<Integer> q = new LinkedList<>();
    ```
    
    주로 아래의 클래스를 사용함.
    
    ```java
    public class LinkedList<E>
        extends AbstractSequentialList<E>
        implements List<E>, Deque<E>, Cloneable, java.io.Serializable
    {
    ```
    
    | Queue | Offer | Peak | Poll | Remove | Size | Structure |
    | --- | --- | --- | --- | --- | --- | --- |
    | PriorityQueue | O(log n) | O(1) | O(log n) | O(n) | O(1) | Priority Heap |
    | LinkedList | O(1) | O(1) | O(1) | O(1) | O(1) | Array |
    | ArrayDeque | O(1) | O(1) | O(1) | O(n) | O(1) | Linked List |
    | ConcurrentLinkedQueue | O(1) | O(1) | O(1) | O(n) | O(n) | Linked List |
    | ArrayBlockingQueue | O(1) | O(1) | O(1) | O(n) | O(1) | Array |
    | PriorityBlockingQueue | O(log n) | O(1) | O(log n) | O(n) | O(1) | Priority Heap |
    | SynchronousQueue | O(1) | O(1) | O(1) | O(n) | O(1) | None |
    | DelayQueue | O(log n) | O(1) | O(log n) | O(n) | O(1) | Priority Heap |
    | LinkedBlockingQueue | O(1) | O(1) | O(1) | O(n) | O(1) | Linked List |