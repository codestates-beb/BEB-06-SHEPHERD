# BEB-06-STEEL-TRACKER
철강 유통망에 블록체인 기술을 접목하여, 유통 현황을 지속적으로 검토할 수 있는 모니터링 시스템을 개발하고자 함.

현재 배포 이전 개발 단계입니다.
웹 및 API 서버를 테스트하려는 분들께서는 아래 사용법을 숙지해주세요.

# 필요 프레임워크
- Ganache
- Truffle
- Web3

# 사용법
1. 하단의 니모닉 코드로 로컬 가나슈 네트워크를 생성합니다.
2. 컨트랙트 폴더에 있는 truffle config 파일을 가나슈와 연결합니다.

```
debris test rival fatigue grant document strategy fortune payment cheap absorb wide
```

3. contract 폴더에 들어가서 npm install한 뒤 npx truffle migrate를 실행합니다.
4. 터미널이나 가나슈에서 생성된 컨트랙트 주소를 찾은 뒤 server 폴더의 .env파일에 삽입합니다. 
5. 포항 계정으로 로그인을 하고 Postman을 사용하여 post로 tx/sendAll 을 실행시켜 포항 계정으로 코인을 받아 옵니다
