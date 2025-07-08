---
title: "Comparator"
date: '2024-05-12'
---

## Comparator로 정렬하기

자바 List, Collection API에는 기본적으로 sort 메서드가 포함되어있다.

이번엔 다양한 요구사항에 대응할 수 있는 정렬을 수행할 수 있게 Comparator를 구현 후 comparator 객체를 이용해 기본 sort의 파라미터화 해서 sort 메서드 동작을 커스텀해보자!

```java
@FunctionalInterface
public interface Comparator<T> {
		int compare(T o1, T o2);
...
}
```

Comparator의 compare 메서드를 사용하여 구현해보겠다.

```java
record User(String name, Integer age) {}

myList.sort((User obj1, User obj2) -> obj1.age().compareTo(obj2.age()));
```

이렇게 간단하게 구현하여 User 객체 안의 age를 비교하여 정렬을 할 수 있다.

형식을 추론하여

```java
record User(String name, Integer age) {}

myList.sort((obj1, obj2) -> obj1.age().compareTo(obj2.age()));
```

로 코드를 개선할 수 있다.

## 비교적 어려운 정렬

```java
@Getter
public class Content {
    private String index;
    private String title;
    private String detail;

}
```

```java
    private static final Comparator<Content> customComparator = (c1, c2) -> {
        if (c1 == null && c2 == null) {
            return 0;
        } else if (c1 == null) {
            return -1;
        } else if (c2 == null) {
            return 1;
        }

        String[] index1 = c1.getIndex().split("\\.");
        String[] index2 = c2.getIndex().split("\\.");

        for (int i = 0; i < Math.max(index1.length, index2.length); i++) {
            int part1 = i < index1.length ? Integer.parseInt(index1[i]) : 0;
            int part2 = i < index2.length ? Integer.parseInt(index2[i]) : 0;

            if (part1 != part2) {
                return part1 - part2;
            }
        }

        return 0;
    };
```

**대마위키**의 코드 중 하나이다. 

위 코드에서 직접 Comparator 객체를 람다 표현식을 사용하여 생성 후 sort 메서드의 파라미터화 하여 정렬을 하고 있는 로직이다.

요구사항이 목차의 인덱스 값은 String으로 되어있고 숫자 사이에 점을 사용하여 나타내는 것*(예 1.1.2, 2.3)*을 
정렬하는 것이였다.

먼저 1.1.1을 . 을 기준으로 문자열을 분리하여 배열에 저장하고 그 배열을 for문, if문을 사용하여 비교하는 Comparator 객체이다.

### 예시

- 객체1 `index1` = `"1.2.3"`
- 객체2 `index2` = `"1.2.4"`

일 때 인덱스를 분리하면 `[1, 2, 3]`과 `[1, 2, 4]`이 된다.

1.2 부분은 같으므로 패스한다. 마지막 부분에서 3, 4로 차이가 나는데 

3 - 4 = -1을 반환하여 객체1이 객체2 앞에 가게된다. 
이 정렬에서는 양수와 음수 0으로 구분하여 객체끼리의 정렬이 완료된다.