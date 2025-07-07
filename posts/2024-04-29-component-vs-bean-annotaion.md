---
title: "Spring @Component vs @Bean"
date: '2024-04-29'
---

## @Component

- 클래스 레벨에서 작성
- @ComponentScan에 대상으로 자동 빈 등록됨
- 주로 서비스, 레포지토리 클래스에 사용

```java
@Component
public class IllitService() {}
```

## @Bean

- 메서드 레벨에서 작성
- @Configuration이 선언된 클래스 내의 메서드에서 사용되고 수동 빈 등록임
- 주로 외부 라이브러리 객체를 빈 등록할 때 사용

```java
@Configuration
public class IllitConfig() {
		@Bean
		public ForeignIllitService foreignIllitService() {
				return new ForeignIllitService();
		} 
}
```