---
title: "Why can't we use Record classes as JPA entities?"
date: '2024-05-10'
---

Record 객체는 불변이여서 상속이 불가능하다. 하지만,
JPA는 엔티티 객체의 프록시 객체를 생성하는데 이 프록시 객체는 원본 엔티티 객체를 상속받은 객체이므로. 
JPA 엔티티로 record를 사용할 수 없다.