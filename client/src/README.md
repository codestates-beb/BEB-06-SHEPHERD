About은 메인페이지에 맵과 함께 렌더되기 때문에 컴포넌트로

TransactionDetail을 컴포넌트화해서 DashBoard랑 Transaction 페이지에 랜더

StandardJS 설치 방법

절대경로:
jsconfig.json < client 폴더에 만들고
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
추가 그런데 이렇게 하면 변경 파일이 1만개가 나옴 방법이 맞는지

DashBoard에서
꼭 보여줘야하는 목록: 
트렌잭션 디테일, 트랜스퍼 디테일 
이외 보여줘서 ux를 올릴 수 있을만한 항목이 있는지?


페이지별 필요한 컴포넌트
Header component : Login component

contact page : 
Header, Footer

Main :
Header, Footer, Map, About

DashBoard page :
Header, Footer, TransactionDetail, TransferDetail, MakeTransfer

Transaction :
Header, Footer, TransactionDetail

트랜잭션 페이지를 대쉬보드에서 보여주게끔 하는 방법은?