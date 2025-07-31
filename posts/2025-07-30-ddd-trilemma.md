---
title: "DDD Trilemma"
date: '2025-07-30'
---

DDD Trilemma는 **도메인 모델 순수성, 도메인 모델 완전성, 성능**이 세가지를 모두 만족할 수 없다를 설명한다.

CAP 정리와 매우 비슷하며, 도메인 모델링의 CAP 정리라고도 불린다.

### 도메인 모델 순수성 Domain Model Purity
도메인 모델 순수성은 도메인 모델이 외부 모듈과 결합되지 않고 순수한 상태를 의미한다.
* 도메인 모델이 데이터베이스, 외부 API와의 상호작용이 존재하지 않음
* 비즈니스 로직이 기술과 완전히 분리

### 도메인 모델 완정성 Domain Model Completeness
도메인 모델 완정성은 도메인 모델 안에 비즈니스 로직, 도메인 규칙이 다 포함되어 있는 것을 의미한다.
* 컨트롤러, 서비스 계층에 비즈니스 로직이 누출되지 않음

### 성능 Performance
성능은 애플리케이션이 효율적으로 응답하는 지를 의미한다. 
* 캐싱, 데이터베이스 인덱싱과 같은 최적화 기법을 사용

---

* 접근법 1: Purity + Completeness
    ``` java
    public class User : Entity {
        public Result ChangeEmail(string newEmail, User[] allUsers) {
            if (Company.IsEmailCorporate(newEmail) == false)
                return Result.Failure("Incorrect email domain");

            bool emailIsTaken = allUsers.Any(x => x.email == newEmail && x != this);
            if (emailIsTaken)
                return Result.Failure("이메일이 이미 사용중입니다.");

            this.email = newEmail;
            return Result.Success();
        }
    }
    ```
  * Purity: 도메인 모델에 외부 의존성 x
  * Completeness: 비즈니스 로직이 전부 도메인 모델에 포함
  * Performance: 모든 사용자를 메모리에 로드해야 함

* 접근법 2: Completeness + Performance
    ``` java
    public class User : Entity {
        public Result ChangeEmail(string newEmail, User[] allUsers) {
            if (Company.IsEmailCorporate(newEmail) == false)
                return Result.Failure("Incorrect email domain");

            User existingUser = repository.getByEmail(newEmail);
            if (existingUser != null && existingUser != this)
                return Result.Failure("이메일이 이미 사용중입니다");

            this.email = newEmail;
            return Result.Success();
        }
    }
    ```
  * Purity: 리포지토리 의존성 주입
  * Completeness: 비즈니스 로직이 전부 도메인 모델에 포함
  * Performance: 효율적인 데이터베이스 쿼리

* 접근법 3: Purity + Performance
    ```java
    // 도메인 모델
    public class User : Entity {
        public Result changeEmail(string newEmail) {
            if (Company.IsEmailCorporate(newEmail) == false)
                return Result.Failure();
    
            Email = newEmail;
            return Result.Success();
        }
    }
    
    // 컨트롤러
    public class UserController {
        public string changeEmail(int userId, string newEmail) {
            User existingUser = _userRepository.getByEmail(newEmail);
            if (existingUser != null && existingUser.id != userId)
                return "이메일이 이미 사용중입니다.";
    
            User user = _userRepository.getById(userId);
    
            Result result = user.changeEmail(newEmail);
            if (result.isFailure)
                return result.Error;
    
            _userRepository.save(user);
            return "OK";
        }
    }
    ```
  * Purity: 도메인 모델에 외부 의존성 x
  * Completeness: 비즈니스 로직이 컨트롤러로 분산
  * Performance: 효율적인 데이터베이스 쿼리

---
https://enterprisecraftsmanship.com/posts/domain-model-purity-completeness/