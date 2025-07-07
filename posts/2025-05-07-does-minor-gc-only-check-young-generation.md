---
title: "Does Minor GC only check Young Generation?"
date: '2025-05-07'
---

**Minor GC의 주 작업 공간은 Young Generation**이 맞다. 

Minor GC의 역할은 Young Generation(이하 YG)에 있는 객체들 중 더 이상 참조되지 않는 객체들을 식별하고 메모리를 회수하는 작업을 수행한다.

하지만, Minor GC가 Old Generation(이하 OG)을 스캔하는 경우가 존재한다. 

OG에 있는 객체가 YG에 있는 객체를 참조하고 있을 때(정확하게는 write operation이 기록될 때) 참조하는 YG 객체가 Minor GC의 대상이 되면 안된다. 

만약, YG만 검사하게 되면 OG 객체가 참조하고 있는 YG 객체가 메모리 회수 대상이 될 수 있다.

이를 해결하기 위해 JVM에서는 OG 객체의 메모리 영역을 **Card Table에 Dirty 상태로 표시**하고 **Dirty Card를 Minor GC의 GC Root에 포함**시킨다. 

Minor GC에서 OG 객체가 YG 객체를 참조하고 있는 지 확인하고, YG 객체를 활성 상태로 두어 메모리 회수 대상에서 제외할 수 있다.

---

Remembered Set, Card Table, Write Barrier