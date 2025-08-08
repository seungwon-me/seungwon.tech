---
title: "Domain Model Validation and Application Validation"
date: '2025-08-08'
---

Spring Boot를 처음 배우고 개발할 때에는 `"비밀번호에 특수문자가 들어갔나?"`, `"대문자가 포함되어 있나?"` 이런 유효성 검사가 무조건 Controller 단에서 진행되어야 하는 줄 알았습니다.

선배들의 코드에서는 대부분 Controller 단에서 Spring Validation 어노테이션을 사용해 유효성 검사를 진행했고, 
주변 친구들도 전부 이런 방식으로 하길래 이렇게 하는 거구나를 머리속에서 못 박아뒀었습니다.

프로젝트 경험이 꽤 생기고 단순한 CRUD 노동에 익숙해졌을 때 `Controller에 있는 유효성 검사는 비즈니스 로직이 아닌가?` 라는 의문이 들고 Controller-Service-Repository 패턴에 대해 고민해보았습니다.

* Controller에서의 책임은 최종 사용자(주로 Frontend)를 위해 API를 제공하는 것.
* Service에서의 책임은 비즈니스 로직..? Controller와 Repository를 연결 시켜주는 것...?
* Repository에서의 책임은 데이터베이스와 통신하는 것.

분명 여러 번 코드를 짜고 공부했던 개념인데, Service의 책임만 모호했습니다. 

`굳이 Controller와 Service, Repository로 나눈 이유가 있을까? Controller, Repository면 충분하고도 남는데...`

찾아보니 Service 레이어가 없다면 비즈니스 로직이 Controller나 Repository에 섞여 들어가 역할이 모호해진다고 합니다. 
단순 저장 삭제 밖에 없는 CRUD만을 구축했었던 저는 아무튼 이해한 척 넘어갔습니다. (분명 Controller-Repository가 더 명확한데 ㅎㅎ..)

이제 본론으로 돌아가면, 유효성 검사라는 건 값이 어떤 규칙에 알맞은지를 알기 위한 명확한 비즈니스 로직이였습니다. 

분명 비즈니스 로직은 Service 레이어에 두라고 배웠던 거 같은데 왜 Controller에 있지?라고 의문을 가지는 게 당연합니다.

이런 유효성 검사를 **Application Validation**이라고 하고 Application Validation 관점에서는 `비즈니스 로직이 실행되기 전에 차단하자.`입니다. 

Spring Validation을 사용한 Controller 단의 유효성 검사가 주로 Application Validation에 속하고, 애플리케이션이 처리할 수 있는 최소한의 형식과 문법을 지켰는지를 검사한다고 합니다.

Controller 레이어에 유효성 검사를 둘 수 있으면 Service, Repository 레이어에도 똑같이 둘 수 있다는 건데 이를 주로 **Domain Validation**이라고 합니다.

Domain Validation은 비즈니스 규칙을 검사하는 것입니다.  `"존재하는 이메일인가?"`, `"주문 가능한 상품 수량인가?"`와 같은 데이터와 관련된 유효성 검사가 주로 포함됩니다. 

`"비밀번호에 특수문자가 들어갔나?"`, `"대문자가 포함되어 있나?"`와 같은 형식을 검사하는 유효성 검사도 당연히 포함될 수 있구요.

Domain Validation은 Service, Repository에 존재해야한다가 아닌 `Domain Model 자체에서 검증을 해야한다.`입니다.

Application Validation과 Domain Validation은 함께 적용할 수 있습니다. 하지만, Spring Validation 어노테이션으로는 복잡한 검증도 못할 뿐더러 중복 코드가 발생합니다. 

이를 해결하기 위해 Domain Primitive를 적용할 수 있는데, 값과 유효성 검사가 Wrapping된 Domain Primitive 객체를 우선적으로 사용하고 사용자에게 전달 받는 request 객체에 적용하여, Application Validation과 Domain Validation을 효율적으로 함께 적용할 수 있습니다.