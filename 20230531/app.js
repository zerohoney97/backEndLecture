// 웹 서비르를 개발하고 완료되면 배포를 해서 사용자에게 소프트웨어를 전달 해야 하는데
// 배포를 하기 위해 필요한게 제 3자가 접속 할 수 있는 서버 컴퓨터가 필요하다.
// 365일 내내 24시간 켜져 있어야 하는데

// 서버 컴퓨터를 대여해주는 호스팅 업체를 통해 배포를 진행한다.
// 호스팅에는 두가지로 나뉘는데 (서버 호스팅)(웹 호스팅)
// 서버 호스팅은 : 무리 서버를 단독으로 임대 및 구매
// 웹 호스팅: 서버의 일부 공간을 임대하는 개념 (컴퓨터를 잘게 쪼갠 거라고 보면 됨)
// 웹 호스팅의 장점 서버나 인프라 구축이 필요없고 비용이 저렴하다는 장점
// 단점은 웹 호스팅은 자원이 한정적 단독 서버에 비해 사용량이 제한적이라는 단점

// 웹 호스팅 업체중 하나인 AWS 통해서 서버를 배포 할 것

// IaaS: 컴퓨터 자원만 제공하는 형태 (AWS) Infrastructure as a service
// PaaS: 헤로쿠 등 넷플리파이 등등 기존 환경에서 서비스를 올려주는 형태

// 인스턴스 만들기 전에 오른쪽 상단에 리전 확인 서버컴퓨터 가깝게 설정

// 인스턴스의 사용 운영체제 선택 => ubuntu 프리티어

// 키페어 잘 보관 해놓자 혹시나 전달해야 할 경우 저장매체 사용 USB 등

// ssh TCP 프로토콜 포트 범위 22 기본으로 가지고 있는 디폴트 포트라고 생각하면된다.
// 인스턴스에 접근을 하기 위해서

// 보안 그룹 설정 HTTP,HTTPS,MYSQL

// 업데이트
// sudo apt-get update
// sudo apt-get install mysql-server

// 데이터 베이스 세팅
// 우리가 사용할 데이터 베이스 하나 만들어보자
// 쿼리문 그대로 사용해서 만들자
// CREATE database 이름;

// 데이터 베이스 확인
// show databases;

// 데이터 베이스를 사용할 때 우리가 사용할 유저를 만들어주자
// 사용할 유저 생성
// CREATE USER 이름 @% identified by 비밀번호
// CREATE USER 'root'@'%' IDENTIFIED BY 'q1w2e3R$';

// 권한 설정
// GRANT ALL ON 데이터베이스 이름. * TO 유저이름@%
// GRANT ALL ON zero. * TO 'root'@'%';

// 권환 확인
// SHOW GRANTS FOR 유저이름;

// 외부애서 인스턴스의 mysql에 접속을 해보자

// sudo service mysql restart

// 보안 그룹에 mysql을 허용 해놓고 이미.
// mysql 외부 접근 허용
// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;

// 파일을 열고 i 눌러서 수정모드 진입
// esc풀고
// :wq! :저장후 종료
// :q! 종료
// :w! 강제 저장

// 프로젝트 설치 받자
// git에 올린 프로젝트를 설치


// 포트 포워딩을 해서 80 http로 접속 했을 때 8080포트로 재 매핑 시켜주자
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000;

// 포트 포워딩 확인 명령어
// sudo iptables -t nat -L --line-numbers

// 포트 포워딩 삭제 명령어
// sudo iptables -t nat -D PREROUTING 인덱스 번호

// 그리고 서버대기가 종료 되는데
// 백그라운드에서 서버를 대기시켜서 계속 동작하게
// pm2 설치
// npm i pm2
// pacakge.json 부분에서 실행 스크립트 명령어를 node app.js로 실행했을 텐데
// pm2 start app.js로 수정
// 서버가 종료되어도 백그라운드에서 노드 서버 실행
// 서버 종료는 npx pm2 kill:종료
// 리스트 확인 npx pm2 list:리스트

