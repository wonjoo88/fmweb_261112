# reve-fbr 인수인계서

작성일 2026-11-12. 이 폴더(`/Users/wonjoo/reve/fmweb_261112`)에서 새 세션을 열면 이 파일부터 읽고 "지금 할 일"의 1번부터 시작한다.

- 상세 문서(결정 근거, 대안 비교, API 흐름도): https://claude.ai/artifact/XK5YHEizXDFK9wy1q66XeJ
- 기존 시스템 저장소(읽기 전용 참고, 수정 금지): `/Users/wonjoo/reve/fmweb` (브랜치 Release-0.24.0)

## 1. 무엇을 만드는가

`fmweb`(해외 직구 WMS/풀필먼트 관리자 SPA)을 새 스택으로 다시 만든다. 백엔드 API 계약은 그대로다. UI, 주석, 도메인 용어는 한국어다.

기존 fmweb은 React 18.2 + CRA 5 + MUI 5 + MUI X Premium 5.17.26이라 React 19로 올릴 수 없다. Premium 의존이 좁고 제품이 조회 중심이어서 무료 스택으로 새로 만들기로 했다. 기존 fmweb은 운영을 유지한다.

## 2. 확정된 결정

| 항목 | 결정 |
|---|---|
| 프로젝트명 / 위치 | reve-fbr / `/Users/wonjoo/reve/fmweb_261112` |
| 패키지 매니저 | yarn (1.22.x). package-lock.json을 만들지 않는다 |
| 프레임워크 | React 19, Vite 8, TypeScript 6.0.3 고정 |
| 스타일 | Tailwind CSS 4 (`@tailwindcss/vite`) |
| UI | shadcn/ui (소스 복사 방식) |
| 그리드 | TanStack Table + shadcn Table + TanStack Virtual을 묶은 공용 DataGrid 래퍼 1개 |
| 상세 보기 | shadcn Sheet (오른쪽 drawer). Drawer 컴포넌트는 모바일용이라 쓰지 않는다 |
| 서버 데이터 | TanStack Query |
| 전역 상태 | zustand + persist. Redux는 쓰지 않는다 |
| 날짜 | date-fns + @date-fns/tz. luxon은 쓰지 않는다 |
| 라우터 | react-router 8. react-router-dom은 설치하지 않는다 |
| 폼 | react-hook-form + zod, 숫자 입력은 react-number-format |
| HTTP | axios |
| 유료 의존 | 없음 |

## 3. 버전 (npm 확인: 2026-10-23, 일부 2026-11-12)

| 패키지 | 버전 |
|---|---|
| react, react-dom | 19.3.1 |
| vite / @vitejs/plugin-react | 8.3.5 / 6.1.2 |
| typescript | 6.0.3 (7.x 금지: typescript-eslint가 6.1 미만만 지원) |
| tailwindcss, @tailwindcss/vite | 4.3.3 |
| shadcn CLI / radix-ui / lucide-react | 4.22.1 / 1.8.1 / 1.61.0 |
| @tanstack/react-table / react-virtual / react-query | 9.3.1 / 3.14.22 / 5.107.1 |
| zustand | 5.1.0 |
| react-hook-form / zod / @hookform/resolvers | 7.90.0 / 4.6.7 / 6.0.0 |
| react-number-format | 5.4.5 |
| react-router | 8.5.1 |
| axios | 1.20.0 |
| date-fns / @date-fns/tz | 4.4.0 / 1.5.0 |

설치 시점의 최신 버전을 쓰되 TypeScript만 6.0.3으로 고정한다. Vite 8에서 플러그인 문제가 나면 vite 7.3.7 + plugin-react 5.x로 내린다.

## 4. 지금 할 일

아직 프로젝트 생성 전이다. 이 폴더에는 이 파일과 빈 git 저장소(.git)만 있다. 아래 명령은 검증 전이므로 실패하면 원인을 확인하고 고친다.

1. 프로젝트 생성. 폴더가 비어 있지 않다고 물으면 "Ignore files and continue"를 고른다.
   ```bash
   cd /Users/wonjoo/reve/fmweb_261112 && yarn create vite . --template react-ts
   yarn
   ```
   생성 후 `package.json`의 `name`을 `reve-fbr`로 바꾼다(폴더명에서 따온 이름이 들어간다).
2. TypeScript 고정, Tailwind 설치.
   ```bash
   yarn add -D -E typescript@6.0.3
   yarn add -D tailwindcss @tailwindcss/vite @types/node
   ```
3. 설정 수정 (shadcn init 전에 필수).
   - `vite.config.ts`: `tailwindcss()` 플러그인 추가, `resolve.alias`에 `'@': path.resolve(__dirname, './src')`
   - `tsconfig.json`, `tsconfig.app.json`의 compilerOptions: `"baseUrl": "."`, `"paths": { "@/*": ["./src/*"] }`
   - `src/index.css`: 내용을 지우고 `@import "tailwindcss";`
4. shadcn 초기화 (테마 Neutral 또는 Slate)와 컴포넌트 추가. 레지스트리에 없는 이름이 있으면 빼고 다시 실행한다.
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button input input-group field button-group select combobox calendar date-picker sheet dialog alert-dialog toast spinner progress empty skeleton table pagination tabs card item badge separator scroll-area tooltip breadcrumb sidebar dropdown-menu checkbox switch label chart
   ```
5. 라이브러리 설치.
   ```bash
   yarn add react-router @tanstack/react-table @tanstack/react-virtual @tanstack/react-query zustand react-hook-form zod @hookform/resolvers react-number-format date-fns @date-fns/tz axios lucide-react serve
   ```
6. 환경 변수. `.env.development`에 `VITE_API_URL=http://localhost:8181`, `.env.production`에 운영 URL(기존 fmweb의 `.env.production` 값 참고). `.gitignore`에 두 파일을 넣는다. 코드에서는 `import.meta.env.VITE_API_URL`.
7. `yarn dev`, `yarn build` 통과 확인 후 첫 커밋. 저장소는 이미 초기화돼 있으므로 `git init`은 하지 않는다.
8. 이 파일의 5~8장을 요약해 `CLAUDE.md`를 만든다.
9. 구현 순서: API 계층 → 전역 뼈대(라우터, 스토어, 다이얼로그, 날짜 헬퍼) → DataGrid 래퍼와 Sheet 상세 → 공용 검색 박스 → 대표 페이지 3개 → 나머지 34개 → 배포.
   - 대표 페이지: `orderStatus`(조회 목록), `productInventory`(상세 Sheet), `vendorRateSettingRegNormal`(그룹핑 + 편집 + 업로드)

## 5. 기존 시스템 요약

37개 페이지, 44개 라우트.

| 구분 | 수 | 그리드 사용 |
|---|---|---|
| 조회·현황 | 27 | 공용 Grid 래퍼. 서버 페이지네이션, 체크박스 선택, 상세 패널 |
| 등록 Reg | 8 | 1~3단계 row grouping 전체 펼침 + 숫자 컬럼 2개 편집. 7개는 파일 업로드로 시작 |
| 기타 | 2 | login, index(대시보드 차트) |

Reg 페이지 흐름은 "엑셀 업로드 → 그룹별 검수 → 틀린 숫자 보정 → 제출"이다. 값이 비었거나 유효하지 않으면 빨간색으로 표시한다.

## 6. 그리드 설계

모든 페이지는 DataGrid 래퍼만 쓴다. 페이지는 TanStack 타입을 직접 import하지 않고 자체 컬럼 스펙을 넘긴다.

- 컬럼 스펙: `{ field, title, width = 300, align = 'center', type: 'string' | 'number' | 'date' | 'datetime', format?, render?, editable?, hidden? }`
- props: `columns`, `rows`, `totalCount`, `page`, `pageSize`, `onPageChange`, `onPageSizeChange`, `getRowId`(idx 우선, 없으면 id), `onRowClick`, `selectable`, `isRowSelectable`, `onSelectionChange`, `groupBy`, `defaultExpanded`, `onCellChange(rowId, field, value)`, `footer`
- 페이지 크기 옵션 100·200·300·500, 기본 300
- 정렬과 필터는 서버로 넘긴다(manualPagination, manualSorting). 그리드 안 필터 UI는 만들지 않는다
- 행 가상화는 TanStack Virtual, 행 높이 고정
- 컬럼 숨김은 columnVisibility + Dropdown Menu, 페이지별 영속화
- 선택은 페이지 이동 시 초기화
- 그룹핑은 getGroupedRowModel + getExpandedRowModel, 초기 expanded true
- 편집은 editable 셀만 Input으로 렌더, blur 또는 Enter에 onCellChange
- 합계는 footer에 number 컬럼 sum
- 빈 데이터는 Empty, 로딩은 Skeleton

상세 Sheet: side right, 너비 `sm:max-w-2xl` 이상, 기본 모달. 내용은 기본 정보(라벨·값 2열), 상품 목록(prodList), 유통기한별 재고(expiredList)에 합계 footer.

## 7. 그대로 지켜야 하는 백엔드 계약

기존 구현은 `fmweb/src/hook/useAjax.ts`에 있다.

- Base URL을 자동으로 앞에 붙인다. 호출부는 `/wmsmap` 같은 상대 경로만 쓴다
- 401이면 `POST /auth/token`에 `{ refreshToken }`을 보내 갱신하고 같은 요청을 1회 재시도한다. 실패하면 로그아웃. 동시에 여러 401이 나도 갱신 요청은 1회만 나가야 한다
- status 500 + errorCode 분기
  - `1006` 로그인 실패, `1009` 현재 비밀번호 오류, `1050` WMS 권한: 전용 다이얼로그
  - `1018`, `1023`: 다이얼로그 없이 호출자에게 전달(중복 등록 인라인 처리)
  - 그 외: 메시지 뒤에 `[코드]`를 붙여 다이얼로그
- 파일 다운로드는 blob, 업로드는 multipart
- 기존의 1.5초 중복 요청 억제는 구현하지 않는다. TanStack Query가 같은 key의 동시 요청을 합치고, 등록 버튼은 mutation의 isPending으로 비활성화한다

새 구현: Axios 인스턴스 + 인터셉터, 조회는 useQuery, 변경은 useMutation, 변경 후 invalidateQueries, 전역 스피너는 useIsFetching/useIsMutating.

## 8. 상태, 권한, 시간, 검증

상태
- zustand(영속화): 로그인 사용자(email, name, auth{code, value}, accessToken, refreshToken, utc 분 단위 오프셋), 페이지별 검색어 26종(`fmweb/src/store/searchSlice.ts`의 ITermsXxx)
- zustand(비영속): 그리드 선택 행, OK/YesNo 다이얼로그
- TanStack Query: 공유 코드 목록(사용자 권한, WMS, 국가, 타임존)
- 로그아웃 시 검색어 전체 초기화, Query 캐시 비우기

권한
- AUTH_LV1~LV9, value 1~9, 낮을수록 높은 권한. 접근 = `user.auth.value <= AUTH_LVn.value`
- isAuthControl = value < 7 (편집 가능 vs 읽기 전용)
- 메뉴 헬퍼 6종: isAuthWmsMenu, isAuthClientMenu, isAuthCompanyMenu, isAuthUserMenu, isAuthSkuMenu, isAuthInvoiceMenu. 정의는 `fmweb/src/hook/useCommon.ts`
- 권한 없는 라우트는 등록하지 않고 `*` 폴백이 Login으로 보낸다

시간
- 백엔드 타임스탬프는 UTC 초 단위. 표시할 때 사용자 utc 오프셋(분)을 더한다
- 기존 luxon 헬퍼(toFormat, toDateFormat, toDateTimeFormat, toUTC, toCalcDayUTC)를 date-fns로 다시 작성한다. 변환은 한 파일에 모으고 음수·양수 오프셋과 자정 경계를 단위 테스트로 고정한다
- 검색 기간 변환 패턴은 `fmweb/src/pages/index.tsx` 참고

검증과 포맷
- validationXxx 규칙을 zod 스키마로 옮기고, 실패는 Field 인라인 에러로 표시
- toCamma(천 단위 콤마), toOptions({idx, name} → {label, value})는 그대로 옮긴다

## 9. 컴포넌트 대응

| 기존 | shadcn |
|---|---|
| RvTextField, Input | Input, Input Group, Field |
| RvButton, RvIconButton | Button, Button Group |
| SelectBox | Select, Native Select |
| SearchBoxWms, SearchBoxUser | Combobox |
| DatePickerBox 계열 5종 | Date Picker, Calendar (범위는 range 모드) |
| RvDrawer, 상세 패널 | Sheet |
| OkDialog, YesNoDialog | Alert Dialog (전역 1회 마운트, 훅으로 호출) |
| PdfViewDialog 등 | Dialog |
| Progress | Spinner, Progress |
| NotData | Empty |
| RvBreadcrumbs, Header | Breadcrumb, Sidebar, Dropdown Menu |
| SectionLayout, SubSection, Portlet | Card, Separator, Tabs |
| DonutChart, 그래프류 | Chart |
| QtyNumber | react-number-format |

## 10. 배포

`yarn build`가 `dist/`를 만든다. 기존 fmweb의 `Dockerfile`과 `ecosystem.config.js`를 가져와 build 폴더만 dist로 바꾼다(`COPY ./dist ./dist`, `yarn serve -s dist`). pm2-runtime 방식은 유지한다. 이미지 빌드 전에 먼저 `yarn build`를 실행한다.

## 11. 아직 정하지 않은 것

| 항목 | 권장 |
|---|---|
| 그리드 정렬 | 서버 정렬. 백엔드가 sort 파라미터를 지원하는지 확인 필요 |
| 상세 Sheet 동작 | 모달 기본. 피드백 후 `modal={false}` 또는 Resizable 분할 검토 |
| 이식 완료 기준 | 미정. 같은 백엔드를 쓰므로 메뉴 단위 단계 전환 가능 |

## 12. 관례

- 커밋 메시지는 Jira 티켓 접두사: `(RIG-130) <한국어 설명>`
- 페이지는 기본 컴포넌트와 `URL` 상수를 함께 export하고 라우터에 등록한다
- 사용자에게 보이는 문자열과 주석은 한국어

## 13. 기존 저장소에서 먼저 읽을 파일

- `fmweb/CLAUDE.md`
- `fmweb/src/hook/useAjax.ts`, `fmweb/src/hook/useCommon.ts`
- `fmweb/src/components/Grid.tsx`, `SearchBox.tsx`, `RvNewSubSearch.tsx`
- `fmweb/src/store/searchSlice.ts`, `userSlice.ts`, `codeSlice.ts`
- `fmweb/src/constants.ts`, `fmweb/src/App.tsx`
- `fmweb/src/pages/orderStatus.tsx`, `productInventory.tsx`, `vendorRateSettingRegNormal.tsx`
- `fmweb/Dockerfile`, `fmweb/ecosystem.config.js`
