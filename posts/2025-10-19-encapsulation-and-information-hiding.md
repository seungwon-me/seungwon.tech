---
title: "Encapsulation And Information Hiding"
date: '2025-10-19'
---

대부분의 Encapsulation의 목표는 Information Hiding이다. 

하지만, 모든 Encapsulation의 목표가 Information Hiding이라고 단정지을 수는 없다.

---

Encapsulation에 대해 알아보면 `캡슐화`로 객체의 상태와 행동이 함께 encapsulate되어 완전한 객체로 동작한다는 것이다. 

그러면 encapsulate되었다는 건 무엇일까? 내가 캡슐을 떠올렸을 때 바로 생각나는 것은 알약이다. 

알약의 경우엔 약사가 내가 알지 못하는 가루들을 혼합하여, 나에게 완전한 상태의 약을 제공한다.

이부분에서 encapsulate가 되었다고 표현할 수 있다. 내가 모르는 `가루들을 혼합`하여 캡슐 형태의 완전한 약을 제공하였다.
**이 과정의 결과**가 캡슐화다.

처방된 알약의 껍데기가 투명하면 어떨까? 어느 경우에는 투명한 알약을 처방 받을 때가 있다. 

이제는 알약 내부의 가루들을 내가 직접 관찰할 수 있다. 완전한 약이지만 달라진 것은 내부가 훤히 보인다는 것이다.

Information Hiding이 지켜지지 않은 것이다. 의료 지식과 상관 없이, 정확하게 따지면 알약의 내부는 Hiding이 가능한 Information이다. 
알약 내부를 내가 관찰할 수 있다는 것은 Information Hiding이 깨진 것이다.

이번에는 알약 두 개를 분해해서 나만의 약을 제조하려고 한다. 내가 알약을 처음 분해 해봤을 때, 알약 내부의 가루가 사방팔방으로 날라갔다.

완전한 알약으로 내가 다시 만들 수 있을까? 거의 불가능하다.
이게 바로 Encapsulation이 깨진 것이다. 정확하게는 `내가 알약을 분해했다.` 이 시점부터 Encapsulation가 깨졌다는 걸 알 수 있다.

Encapsulation이 되었다면, 알약은 분해 불가능한 상태여야한다.

### [요약]
* Encapsulation은 완전한 객체를 만드는데 집중한다.
* Information Hiding은 외부에서 알 필요 없는 Information을 숨기는데 집중한다.

### [질문]
* Q: 그러면 Information Hiding 없이 Encapsulation이 가능할까요? 
   * A: 투명한 알약과 같이 Information Hiding 없이 Encapsulation은 충분히 가능합니다. 하지만, Information Hiding 없는 Encapsulation은 어떨까 고민해야겠네요. 
