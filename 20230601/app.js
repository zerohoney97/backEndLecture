// 오늘은 도메인이랑 https 설정까지 진행 할 예정 Nginx

// nvm 노드 버전 매니저
// nodejs 설치하고 다른 버전으로 설치할때
// 삭제하고 다시 설치할 필요없이
// 버전 관리가 편하다.
// 원하는 버전을 설치받고 바로 스위치 가능

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

// 소스 파일 적용
// source ~/.bashrc

// 전체 목록 확인
// nvm list-remote

// 인스턴스에 v4주소는 우리가 인스턴스를 실행하거나 다시 실행하면
// 동적으로 ip주소가 할당 된다.
// 예)ec2-13-125-251-30.ap-northeast-2.compute.amazonaws.com

// 도메인을 연결을 이 v4로 연결 해 놓았는데
// 이 주소가 바뀌면 연결이 끊기겠죠?...
// 그러면 안되니까.. 탄력적 ip를 설정을 하면 고정 아이피를 할당 받을 수 있다.

// Nginx를 사용해서 프록시 설정

// 프록시는 말 그대로 대신
// 통신을 할 때 중간에서 대신 통신을 해주는 역할을 해준다.
// 중계역할을 해주는 것이 프록시 서버
// 클라이언트와 서버 사이에 중계 서버

// 클라이언트는 프록시 서버를 서버로 알고있다.
// 서버는 프록시 서버를 클라이언트라고 알고있다.

// 서버의 위치에 따라서 포워드 프록시 리버스 프록시로 구분되는데

// 리버스 프록시는 프록시 서버가 서버의 앞에 위치하고 클라이언트가 서버에 요청을 하면
// 리버스 프록시가 호출되고 리버스 프록시는 서버에게 요청해서 응답을 받고 클라이언트한테 전송
// 클라이언트가 서버에 직접 요청하느느게 아니고 프록시 서버가 요청을 받고 서버로 요청해서
// 서버의 응답을 받게된다.(서버를 감춰준다==== 보안 좋음)
// Nginx를 사용해서 리버스 프록시를 만들어 보자.

// 클라이언트 => 인터넷=>프록시 서버=> 서버
// 서버 => 프록시 서버=> 인터넷=>클라이언트

// aws 인스턴스 접속하고
// nginx설치

// sudo apt install nginx

// nginx 시작
// sudo service nginx start

// nginx 상태 확인
// sudo service nginx status

// nginx 종료
// sudo service nginx stop

// 웹사이트 호스팅을 할 때 설정에 대한 값이
// default 파일이 생성이됩니다.
// cd /etc/nginx/sites-enabled

// default 파일은 가상 호스트 설정 파일
// 설정파일 수정

// location / {
//     # First attempt to serve request as file, then
//     # as directory, then fall back to displaying a 404.
//     #try_files $uri $uri/ =404;

//     proxy_set_header HOST $host;
//     proxy_pass http://127.0.0.1:8080;
//     proxy_redirect off;
// }

// proxy_set_header 부분은 요청이 들어온 브라우저의 host내용을 넘겨준다는 뜻
// proxy_pass 80으로 포트를 듣고 들어온 요청을 8080포트로 전달하겠다는 뜻
// proxy_redirect off는 SPA일 경우 redirect 없애겠다는 위미 spa가 아니면 굳이 써줄 필요는 없다.
// spa 싱글페이지 어플리케이션만!

// 설정파일을 수정했으면
// 설정 파일이 정상적인지 확인을 먼저 해주자
// 문법에 오류가 있는지 체크
// sudo nginx -t

// 이제 재실행
// sudo service nginx restart

// 탄력적 ip주소를 도메인으로 교체하자.

// 가비아에서 도메인을 구입해서 사용할 예정

// 이 도메인을 사용해서 탄력적 아이피로 요청이 갈 수 있게

// aws Route 53을 사용할 것
// 호스팅영역 클릭해서 도메인 입력한 후에 호스팅 영역 생성

// 상세정보를 보면 레코드
// DNS레코드는 도메인의 이름과 관련된 정보를 나타내는 데이터

// NS(Name Server)는 인터넷에서 도메인을 ip주소로 변환하는 역할을 담당
// 도메인을 입력하면 NS에게 도메인 ip주소를 요청한다.
// 그래서 웹사이트에 접근을 할 수 있게 해준다.

// 레코드 추가
// A레코드 : 도메인 이름을 v4주소로 매핑
// A레코드에 탄력적 아이피를 값으로 작성

// CNAME 레코드: 서브 도메인으로 설정
// www.'도메인' 으로 접속 했을 때 '도메인' 으로 이동하게 해줌

// https 로 보안이슈 해결
// 검증된 사이트라는 것이고
// https요청할 때 인증서를 발급받아서 인증을 요청을 하는데
// https 설정
// 배포한 서버에 https를 설정해서 보안 이슈를 해결
// 인증서를 발급받을곳은 무료로 인증서를 3개월짜리를 발급해주는 곳이 있는데
// 3개월마다 재발급받아서 무제한으로 무료 이용
// 모질라라는 곳에서

// certboot이라는 친구를 사용해서 https를 간편하게 설정 할 수 있다.
// 3개월마다 우리가 직접 인증서를 재발급 받을 필요가 없이
// 알아서 3개월마다 재발급 받고 우리 메일로 알려줌.
// nginx랑도 호환이 되는 갓 라이브러리=>간단하게 인증서 발급 및 갱신이 가능하다.

// sudo snap install core

// certboot 실행파일에 링크 설정
// sudo ln -s /snap/bin/certboot/user/bin/certboot
// nginx관련 certboot 실행
// sudo certbot --nginx

// nginx에 default파일을 수정
// 수정을 한 뒤 server_name 도메인;
// 다시 home/ubuntu로 돌아가서
// 문법 오류 확인

// 3개월 마다 재발급을 해야하나?...
// sudo certbot renew <= 입력시 3개월마다 재발급됨

// 인증서 재발급 신청 시뮬레이션 돌려보기
// sudo certbot renew --dry-run
