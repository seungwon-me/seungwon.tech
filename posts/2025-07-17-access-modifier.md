---
title: "Access Modifier"
date: '2025-07-17'
---

Spring Boot 애플리케이션에서 ServiceInterface, ServiceImpl로 분리하여 코드를 작성했을 때 <br/>
ServiceImpl이 Spring Bean으로 관리된다면, ServiceImpl를 참조하려는 모든 곳에서는  고수준 모듈인 ServiceInterface를 참조하는 것이 올바르다. (DI, DIP) 

이는 `어떠한 코드에서도 저수준 모듈인 ServiceImpl을 참조하면 안된다.` 라는 의미로 SOLID 원칙의 DIP를 준수하는 방법이다.

OOP를 기반으로 설계된 대부분의 언어(Java, Kotlin..)에는 접근 제어자(Access Modifier)라는 개념이 존재한다. 
이는 특정 리소스의 접근을 제한하는 키워드, 로직으로 OOP의 여러 원칙들을 이루는데에 도움을 준다.

많은 사람들의 동의하는 OOP의 SOLID 원칙에서는 DIP를 설명한다. DIP는 저수준 모듈이 아닌 고수준 모듈을 참조해야하는 원칙으로 
인터페이스 프로그래밍을 통해 이뤄낼 수 있다.

DIP에서 고수준 모듈을 참조해야하면, 저수준 모듈에는 접근을 제어할 수 있다. 
저수준 모듈에는 private, package-private과 같은 접근제어자를 사용하는 것이 코드의 무결성, 가독성을 지킬 수 있는 방법이다. <br/>

일단 저수준 모듈(ServiceImpl)이 public 접근 제어자로 되어있을 때 생기는 문제는 다음과 같다.
1. 비즈니스 로직에서 ServiceImpl 참조 가능성 (DIP 위반)
2. public 리소스로 선언되어 가독성 저하 (실제 사용 범위를 알 수 없다)

PoLP와 같이 리소스의 접근 범위를 최소로 설정하는 게 올바르다.