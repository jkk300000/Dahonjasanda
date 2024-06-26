# 다혼자산다.

'240329_1팀_다혼자산다_포트폴리오.pptx' p1 ~ p 14, p25, p28, p29 참고

### 프로젝트 기간

2024.2.4 ~ 2024.3.25 

### 프로젝트 소개

1인가구를 위한 생활 및 경제 정보 제공 사이트

### 프로젝트 내용 및 핵심 기능

1. 대상: 1인 가구

2. 기획 의도: 현대 사회는 1인 가구가 큰 비중을 차지하고 있으므로, 1인 가구에 필요한 금융, 취미 등의 정보를 제공하여 삶의 질을 높이고자 함

3. 핵심 기능: 금융(주식, 예적금), 부동산, 동식물(취미), 레저 정보 제공

### 사용언어 및 기술

JAVA 17, MYSQL, JPA, SPRINGBOOT, REACT, MUI, TOMCAT, ECLIPSE, VSCODE 등

### OPEN API 

KAKAOMAP API, 공공데이터 포털 부동산 청약 정보 등

### 프로젝트 내 역할

프론트/백엔드/DB

### 프로젝트 내 구현 기능

1. '부동산맵' 페이지 프론트/백엔드 기능 구현(카테고리별 검색, 검색어 기반 검색),
                  
2. 부동산 청약 정보 API 파싱 및 SQL 작성
                  
3. 부동산맵 구현(카카오맵 API)
                 

###### 작성 코드

dahonjasanda-front/pages/hosuing/housingMap

java/com/multi/dahon/houisng/controller/HousingRestController.java

java/com/multi/dahon/houisng/model/repository/HosuingInfoByTypeRespository.java

java/com/multi/dahon/houisng/model/repository/HosuingInfoRespository.java

java/com/multi/dahon/houisng/model/service/HosuingInfoService.java

java/com/multi/dahon/houisng/model/service/HosuingInfoByTypeService.java

java/com/multi/dahon/houisng/model/HosuingInfoByTypeJPA.java

java/com/multi/dahon/houisng/model/HosuingInfoJPA.java

java/com/multi/dahon/houisng/model/HousingMapPram.java
                    
                    


### 프로젝트 리뷰 : 

제가 맡았던 부분은 부동산 청약 정보를 지도로 제공하는 페이지입니다. 

1. 공공데이터 포털에서 파싱한 부동산 청약 정보를 가지고 부동산맵에서 지역별, 검색어 기반 검색이 가능하게 했습니다. 이 과정에서 selectbox를 사용한 다중 파라미터를 전달하는 방법을 배울 수 있었습니다. 체크박스가 아닌 셀렉트 박스로 여러 개의 파라미터를 전달하려면 프론트 페이지와 서버의 파라미터 이름이 같아야 하고, 프론트 페이지에서 초기에 셀렉트 박스를 선택하지 않았을 시 서버에 NULL이 전달되도록 했습니다. 프론트 화면에서 선택할 수 있는 카테고리는 3개이며 검색어 기반 검색 기능이 있으므로 총 4가지의 검색 기능이 있는데, 프론트 화면에서 서버로 여러 파라미터를 전달 시 이를 고려하여 경우에 수에 맞게 IF문을 작성했습니다.   
                    
2. 부동산맵을 처음 실행했을 때, 모든 부동산 청약 데이터가 맵에 나타나도록 했습니다. 

3. 부동산 맵에서 검색 후 검색 결과에 따라 부동산맵에 데이터를 표시합니다. 예를 들어 검색 결과가 없는 경우, 부동산맵에는 아무 데이터도 표시하지 않습니다.  


### 프로젝트를 통해 느낀점 :

공공데이터 포털에서 부동산 청약데이터를 받아서 이 데이터를 활용하여 프로젝트를 진행했습니다. 해당 데이터의 구조를 파악하고 이에 맞게 테이블을 설계했는데, 이 부분에서 조금 어려움이 있었습니다. 예를 들어 부동산 청약데이터는 총 10개의 데이터 테이블을 가지고 있는데, `청약 정보:평형별 청약 정보`로 구성되어 있어 총 5개의 데이터 구조로 볼 수 있었습니다. 이 부분을 청약 정보, 평형별 청약 정보 두 개의 테이블로 구성했습니다. 또, 데이터 파싱 후에 실제 데이터 중 NULL 값인 경우가 많았는데, 이 부분을 해결하지 못해 아쉬웠습니다. 
프론트 페이지는 리액트로 구성했습니다. 그런데 여기에 카카오맵 API를 적용하는 것이 어려웠습니다. 카카오맵 API는 따로 리액트 버전의 코드를 제공하지 않았고, 자바스크립트 코드만을 제공했습니다. 처음 카카오맵을 프론트에 실행시켜야 했는데, 리액트 코드가 없어 검색 및 CHATGPT 등 다양한 방법을 통해 문제를 해결했습니다. 카카오맵 API를 불러오는 APP KEY 및 카카오맵을 로드하는 코드를 useEffect 내에 적용하고 실제 카카오맵의 정보는 따로 함수를 만들어 앞의 useEffect 내에 적용하여 이 문제를 해결했습니다. 카카오맵에 청약 데이터의 주소 값을 전달하고 이를 좌표로 전환하여 카카오맵에 마커를 표시하는 기능을 만들었는데, 이 부분 또한 useEffect를 활용하였습니다. 이를 통해 상태 값을 관리하는 useEffect와 useState에 대해 조금 이해할 수 있었습니다. 

백엔드는 RESTful로 작성했는데, jsp와는 다르게 ResponseEntity 객체를 사용하여 프론트에 데이터를 전달 후 상태 값을 리턴하도록 했습니다. 이외에는 중간 프로젝트와 비슷한 코드로 진행했습니다.

DB는 JPA를 사용했는데, JPA는 자동으로 테이블을 생성해주다보니 만약 기존에 생성했던 테이블과 충돌이 날 때 이를 해결하는 데 어려움이 있었습니다. JPA 설정을 validate로 해놓았을 경우에 기존에 생성된 테이블과 차이점이 발생하면 jpa 오류가 발생하는데, 이를 해결하는 데 어려움이 있었습니다.
또, jpa는 카멜케이스 사용 시 언더바 규칙을 사용하여 테이블을 생성하는데, 이에 대해 어떻게 규칙을 정해야 할지 어려움을 겪었고, 이에 대한 해결책을 찾지는 못했습니다.

중간 프로젝트에 비해 한 가지 기능에만 집중하여 개발하게 되었습니다. 한 가지 기능만을 만드는 데도 계속 예상하지 못한 오류가 발생하고, 기능을 완성한 후에도 버그가 발생하여 이를 수정하는데 시간을 많이 사용했습니다. 이 경험을 통해 하나의 기능을 만드는 데에도 상세한 계획 및 테스트 요건을 설정하여 이를 점검해야 한다는 점을 깨달았습니다. 

