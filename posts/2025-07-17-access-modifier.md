---
title: "Access Modifier"
date: '2025-07-17'
---

접근제어자와 OOP에 대한 주관적인 생각이 많이 포함되어 있습니다.

예를 들어 Spring Boot 애플리케이션에서 ServiceInterface, ServiceImpl로 분리하여 코드를 작성했을 때 Spring Bean으로 관리된다면, 어떠한 모든 곳에서 ServiceImpl를 참조하려면 고수준 모듈인 ServiceInterface를 참조하는 것이 올바르다. (DI, DIP) 

이는 `어떠한 코드에서도 저수준 모듈인 ServiceImpl을 참조하면 안된다.` 라는 말이다. 

OOP를 기반으로 설계된 언어에는 `접근 제어자`라는 개념이 존재한다. 이는 리소스의 접근을 제한하는 키워드, 로직으로 OOP의 여러 원칙들을 이루는데에 도움을 준다.

그러므로 ServiceImpl의 접근제어자는 private로 명시해야 코드의 무결성, 가독성을 지킬 수 있다는 것이다. <br/> 
왜 그럴까?

일단 리소스(ServiceImpl)가 public으로 되어있을 때 생가는 문제는 다음과 같다.
1. 비즈니스 로직에서 ServiceImpl 참조 가능성 (DIP 위반)
2. public 리소스로 선언되어 가독성 저하
3. 

ServiceImpl을 사용하게 되는 클라이언트는 다음과 같다.
1. 비즈니스 로직(개발자 코드)
2. 프레임워크(Spring Container)

무결성, 가독성, 

하지만, 구현부의 접근제어자를 private로 설정할 시에는 `Test 작성의 어려움`이 존재한다. 