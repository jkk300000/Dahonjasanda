# 🏠 다혼자산다 (Dahonjasanda)
> **1인 가구를 위한 종합 생활 정보 플랫폼**

![Project Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.9-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

## 📋 프로젝트 개요

**다혼자산다**는 현대 사회의 증가하는 1인 가구를 대상으로 한 종합 생활 정보 제공 플랫폼입니다. 금융, 부동산, 취미, 커뮤니티 등 1인 가구에게 필요한 다양한 정보를 한 곳에서 제공하여 삶의 질 향상에 기여합니다.

### 🎯 프로젝트 목표
- 1인 가구의 경제적 자립 지원 (금융 정보 제공)
- 안정적인 주거 환경 조성 (부동산 청약 정보)
- 건강한 취미 생활 지원 (동식물 키우기 정보)
- 소통과 네트워킹 기회 제공 (소모임, 커뮤니티)

## 🚀 주요 기능

### 💰 금융 서비스
- **예적금 상품 비교**: 최고 금리 상품 추천 및 상세 정보 제공
- **대출 정보**: 주택담보대출, 전세자금대출, 신용대출 상품 비교
- **주식 정보**: 실시간 주식 시세, 뉴스, 포트폴리오 관리
- **내 자산 관리**: 개인 자산 현황 추적 및 관리

### 🏘️ 부동산 서비스
- **청약 정보**: 공공데이터 포털 연동 부동산 청약 정보 제공
- **청약 맵**: 카카오맵 API를 활용한 지역별 청약 정보 시각화
- **청약 캘린더**: 청약 일정 관리 및 알림
- **부동산 게시판**: 청약 관련 정보 공유 커뮤니티

### 🌱 취미 & 라이프스타일
- **식물 키우기**: 식물 정보, 관리법, 커뮤니티
- **반려동물**: 동물 정보, 케어 가이드, 반려 게시판
- **소모임**: 관심사별 모임 생성 및 참여
- **일반 커뮤니티**: 자유 게시판을 통한 정보 공유

## 🛠️ 기술 스택

### Backend
- **Java 17**: 메인 개발 언어
- **Spring Boot 3.1.9**: 웹 애플리케이션 프레임워크
- **Spring Security**: 인증 및 보안
- **Spring Data JPA**: 데이터 접근 계층
- **MySQL**: 관계형 데이터베이스
- **Gradle**: 빌드 도구

### Frontend
- **React 18.2.0**: 사용자 인터페이스 라이브러리
- **Next.js 13.5.6**: React 기반 풀스택 프레임워크
- **Material-UI (MUI)**: UI 컴포넌트 라이브러리
- **Bootstrap 5.3.3**: CSS 프레임워크
- **SCSS**: CSS 전처리기
- **Axios**: HTTP 클라이언트

### External APIs
- **카카오맵 API**: 지도 서비스
- **공공데이터 포털**: 부동산 청약 정보
- **금융감독원 API**: 금융 상품 정보

## 📁 프로젝트 구조

```
dahonjasanda-main/
├── dahonjasanda-back/          # Spring Boot 백엔드
│   ├── src/main/java/
│   │   └── com/multi/dahon/
│   │       ├── finance/        # 금융 서비스
│   │       ├── housing/        # 부동산 서비스
│   │       ├── stock/          # 주식 서비스
│   │       ├── plant/          # 식물 서비스
│   │       ├── animal/         # 동물 서비스
│   │       ├── party/          # 소모임 서비스
│   │       └── member/         # 회원 관리
│   └── src/main/resources/
├── dahonjasanda-db/            # 데이터베이스 모듈
│   └── src/main/java/
│       └── com/multi/dahon/
│           └── finance/        # 금융 데이터 모델
└── dahonjasanda-front/         # React 프론트엔드
    ├── pages/                  # Next.js 페이지
    │   ├── deposit/           # 예적금 페이지
    │   ├── loan/              # 대출 페이지
    │   ├── stock/             # 주식 페이지
    │   ├── housing/           # 부동산 페이지
    │   ├── plant/             # 식물 페이지
    │   ├── animal/            # 동물 페이지
    │   └── party/             # 소모임 페이지
    ├── components/            # 재사용 가능한 컴포넌트
    └── layouts/               # 페이지 레이아웃
```

## 🎨 주요 구현 기능

### 1. 부동산 청약 맵 (본인 담당 구현 항목)
- **카카오맵 API 연동**: 지역별 청약 정보 시각화
- **다중 검색 기능**: 지역, 청약 유형, 검색어 기반 필터링
- **공공데이터 파싱**: 부동산 청약 정보 수집 및 저장


### 2. 금융 상품 비교 시스템
- **예적금 상품**: 금리별 정렬 및 상세 정보 제공
- **대출 상품**: 조건별 비교 및 추천 시스템
- **주식 포트폴리오**: 개인 자산 관리 및 수익률 추적

### 3. 커뮤니티 기능
- **게시판 시스템**: CRUD 기능을 갖춘 게시판
- **소모임 관리**: 모임 생성, 참여, 관리 기능
- **파일 업로드**: 이미지 및 문서 첨부 기능

## 🔧 설치 및 실행

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Gradle 7+

### Backend 실행
```bash
cd dahonjasanda-back
./gradlew bootRun
```

### Frontend 실행
```bash
cd dahonjasanda-front
npm install
npm run dev
```

### Database 설정
```sql
-- MySQL 데이터베이스 생성
CREATE DATABASE training;
USE training;

-- 스키마 및 테이블 생성
-- (dahonjasanda-db/파이널 금융 db.sql 실행)
```

## 📊 프로젝트 성과

- **개발 기간**: 2024.2.4 ~ 2024.3.25 (약 7주)
- **팀 구성**: 6인 풀스택 개발
- **기술 도전**: Spring Boot 3.x, React 18, Next.js 13 최신 기술 스택 활용
- **API 연동**: 공공데이터 포털, 카카오맵 API 등 외부 서비스 통합
- **데이터베이스 설계**: 20+ 테이블을 포함한 복합적인 스키마 설계

## 🎯 핵심 기술 역량

### Backend Development
- **Spring Boot**: RESTful API 설계 및 구현
- **Spring Security**: JWT 기반 인증 시스템
- **JPA/Hibernate**: 객체-관계 매핑 및 쿼리 최적화
- **MySQL**: 복잡한 관계형 데이터베이스 설계

### Frontend Development
- **React/Next.js**: 컴포넌트 기반 UI 개발
- **Material-UI**: 반응형 디자인 구현
- **State Management**: React Hooks를 활용한 상태 관리
- **API Integration**: Axios를 통한 백엔드 연동

### DevOps & Tools
- **Gradle**: 빌드 자동화 및 의존성 관리
- **Git**: 버전 관리 및 협업
- **Eclipse/VS Code**: IDE 활용





---

**다혼자산다** - 1인 가구의 더 나은 삶을 위한 종합 정보 플랫폼
