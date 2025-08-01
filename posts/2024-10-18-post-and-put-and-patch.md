---
title: "POST vs PUT vs PATCH"
date: '2024-10-18'
---

### POST vs PUT(PATCH)

> POST 메서드는 URI로 식별되는 리소스 컬렉션에 데이터를 추가하는 동작을 의미한다.
>

> PUT 메서드는 URI로 식별되는 기존 리소스를 다른 리소스로 변경하는 동작을 의미한다.
>

두 메서드의 차이는 API 엔드포인트를 통해 더욱 쉽게 이해할 수 있다.

```bash
# POST
/api/users

# PUT, PATCH
/api/users/1
```

POST는 사용자 자체를 추가할 때 사용되고, PUT은 특정 사용자를 변경할 때 사용된다.

### PUT vs PATCH

> PATCH 메서드는 URI로 식별되는 리소스를 부분적으로 변경하는 동작을 의미한다.
>

두 메서드의 차이는 PUT은 리소스를 치환하거나, 새로 작성하는 메서드이고,

PATCH는 기존 리소스의 부분적인 수정을 하는 메서드이다.

두 메서드의 차이는 API 엔드포인트를 통해 더욱 쉽게 이해할 수 있다.

```bash
# PUT
curl -X PUT /api/users/1 -d '{ "name": "seung won", "age": 19, "email": "seungwon@seungwon.com" }'

# PATCH
curl -X PATCH /api/users/1 -d '{ "age": 19 }'
```

PUT은 URI로 특정 리소스를 식별하지 못했을 때 새 리소스를 추가한다.

PATCH는 굳이 전체 리소스 내용을 담아서 보낼 필요가 없다.