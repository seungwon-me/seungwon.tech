---
title: "Spring Stereotype Annotation"
date: '2024-05-02'
---

구현 수준이 아니라 형식 또는 메서드의 역할을 나타내는 어노테이션 타입

- 스프링 컨테이너가 스프링 관리 컴포넌트로 식별하게 해주는 단순한 마커
    
    계층을 나눠서 표시할 때 편리함
    

```java
package org.springframework.**stereotype**;
...

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Indexed
public @interface Component {
	String value() default "";

}
```

주로 사용되는 Service, Repository, Component 같은 어노테이션이 스테레오 타입이다.