---
title: "A collection with enhanced search capabilities"
date: '2024-07-29'
---

- TreeMap은 컬렉션 프레임워크의 Map 인터페이스의 구현체 중 하나로,
    
    ```java
    public class TreeMap<K,V>
        extends AbstractMap<K,V>
        implements NavigableMap<K,V>, Cloneable, java.io.Serializable
    { ... }
    
    public abstract class AbstractMap<K,V> implements Map<K,V> {...}
    public interface NavigableMap<K,V> extends SortedMap<K,V> {...}
    ```
    
    SortMap을 확장하는 NavigableMap 인터페이스를 구현하고 있으니 당연히 해당 TreeMap은 정렬된 맵이다
    
    ```java
    static final class Entry<K,V> implements Map.Entry<K,V> { // *2409 line*
            K key;
            V value;
            Entry<K,V> left;
            Entry<K,V> right;
            Entry<K,V> parent;
            boolean color = BLACK;
    ...
    }
    ```
    
    TreeMap의 소스코드를 확인해보면 해당 Map의 노드는 Entry라는 이름이다. 
    
    - 각 노드는 키, 값, 왼쪽 자식, 오른쪽 자식, 부모 노드에 대한 참조, 그리고 색상 정보를 포함함.
    
    해당 노드를 살펴보면 TreeMap 클래스는 레드 블랙 트리를 기반으로 구현되어 있다고 알 수 있다!
    
    레드 블랙 트리 기반이니 당연히 검색, 삽입, 삭제가 O(log *n*)란 걸 추측할 수 있따
    
    데이터 삽입 과정에서 `fixAfterInsertion` 를 사용해 
    
    ```java
    private void fixAfterInsertion(Entry<K,V> x) {
            x.color = RED;
    
            while (x != null && x != root && x.parent.color == RED) {
                if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
                    Entry<K,V> y = rightOf(parentOf(parentOf(x)));
                    if (colorOf(y) == RED) {
                        setColor(parentOf(x), BLACK);
                        setColor(y, BLACK);
                        setColor(parentOf(parentOf(x)), RED);
                        x = parentOf(parentOf(x));
                    } else {
                        if (x == rightOf(parentOf(x))) {
                            x = parentOf(x);
                            rotateLeft(x);
                        }
                        setColor(parentOf(x), BLACK);
                        setColor(parentOf(parentOf(x)), RED);
                        rotateRight(parentOf(parentOf(x)));
                    }
                } else {
                    Entry<K,V> y = leftOf(parentOf(parentOf(x)));
                    if (colorOf(y) == RED) {
                        setColor(parentOf(x), BLACK);
                        setColor(y, BLACK);
                        setColor(parentOf(parentOf(x)), RED);
                        x = parentOf(parentOf(x));
                    } else {
                        if (x == leftOf(parentOf(x))) {
                            x = parentOf(x);
                            rotateRight(x);
                        }
                        setColor(parentOf(x), BLACK);
                        setColor(parentOf(parentOf(x)), RED);
                        rotateLeft(parentOf(parentOf(x)));
                    }
                }
            }
            root.color = BLACK;
        }
    ```
    
    삽입 후 해당 메서드를 사용해 노드들을 레드 블랙 트리의 특성에 맞게 유지하는 것을 확인할 수 있다.
    
    ```java
    public V put(K key, V value) {
    	...
    	addEntry(key, value, parent, cmp < 0);
    }
    private void addEntry(K key, V value, Entry<K, V> parent, boolean addToLeft) {
        ...
        **fixAfterInsertion(e);**
        ...
    }
    ```
    
    하지만 해당 맵 구현은 여러 스레드가 동시에 맵에 액세스하고 스레드 중 적어도 하나가 맵을 구조적으로 수정하는 경우 외부에서 동기화 메커니즘을 작성해줘야한다. ConcurrentModificationException
    
    특이하게도 Cloneable, Serializable 인터페이스를 상속받은 걸 볼 수 있는데 해당 인터페이스에 들어가보면
    
    아무런 메서드와 필드가 존재하지 않는다. 
    
    왜 그러냐면 해당 인터페이스는 marker interface이기 때문이다. 
    
    marker interface는 그저 표시하기 위한 인터페이스로 위의 인터페이스들은 “~이 가능한”의 표시 용도로 사용된다.
    
    Serializable 인터페이스를 구현하면 JVM에서 해당 객체를 저장 등의 기능을 쓰게 해준다.
    
    Cloneable 인터페이스는 해당 인스턴스의 필드를 복사할 수 있게 해준다.
    
    해당 클래스에선 아래의 clone 메서드를 사용해 인스턴스를 복사할 수 있다는 표기로 사용한다. 
    
    ```java
    public Object clone() {
        TreeSet<E> clone;
        try {
            clone = (TreeSet<E>) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError(e);
        }
    
        clone.m = new TreeMap<>(m);
        return clone;
    }
    ```
    
- TreeSet은 컬렉션 프레임워크의 Set 인터페이스의 구현체 중 하나로,
    
    ```java
    public class TreeSet<E> extends AbstractSet<E>
        implements NavigableSet<E>, Cloneable, java.io.Serializable
    {...}
    
    public abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {...}
    public interface NavigableSet<E> extends SortedSet<E> {...}
    ```
    
    SortSet을 확장하는 NavigableSet를 구현하기 때문에 당연히 해당 TreeSet은 정렬된 Set 구현체이다.
    
    내부적으로 TreeMap을 사용해서 구현이 되어있다.
    
    TreeSet을 만드려면 키 값만 받는데 내부적으로 TreeMap을 사용하기 때문에 value 값이 필요하다.
    
    ⇒ Set 자료구조의 중복을 피하는 특성을 구현한 것.
    
    무슨 값을 넣을까? 
    
    ```java
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
    
    public boolean add(E e) {
        return m.put(e, PRESENT)==null;
    }
    ```
    
    바로 더미 값이다;;
    
    특정 범위의 값만 조회하고 싶다면,
    
    ```java
    public NavigableSet<E> subSet(E fromElement, boolean fromInclusive,
                                  E toElement,   boolean toInclusive) {
        return new TreeSet<>(m.subMap(fromElement, fromInclusive,
                                       toElement,   toInclusive));
    }
    ```
    
    subSet 메서드를 사용해 특정 범위의 원소만을 포함하는 뷰를 생성할 수 있다. 
    
    예제 
    
    ```java
    public static void main(String[] args) {
        var treeSet = new TreeSet<String>();
    
        IntStream.range(0, 10)
                    .forEach(i -> treeSet.add("set" + i));
    
        IntStream.range(0, 10)
                .forEach(i -> treeSet.add("set" + i));
    
        for (String value : treeSet) {
            System.out.println(value);
        }
    }
    ```
    
    ```java
    // 출력
    set0
    set1
    set2
    set3
    set4
    set5
    set6
    set7
    set8
    set9
    ```
    
    출력을 보면 Set 자료구조의 특성대로 중복이 되지 않는 걸 볼 수 있다. 
    
    예제 2
    
    ```java
    var subSet = treeSet.subSet("set3", "set7");
    
    for (String value : subSet) {
        System.out.println(value);
    }
    ```
    
    ```java
    // 출력
    set3
    set4
    set5
    set6
    ```
    
    주어진 범위의 첫 번째 요소를 포함하지만, 두 번째 요소는 포함하지 않는 하위 집합을 반환하는 걸 보니 올바르게 작동한다.