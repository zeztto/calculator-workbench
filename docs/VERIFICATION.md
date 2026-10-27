# 검증 기록

검증일: 2026-10-28. 환경: macOS, Node.js 26.8.1, npm 11.19.0. 고정 source edition 1.1.0의 local production build를 검증했습니다. 원격 CI, 공개 GitHub readback, 외부 hosting 배포는 이 기록에 포함하지 않습니다.

## 자동 검사

| 검사 | 결과 | 범위 |
| --- | --- | --- |
| `npm ci --ignore-scripts --no-audit --no-fund` | 통과 | committed lockfile 설치 경로 |
| `npm run typecheck` | 통과 | `src` TypeScript |
| `npm test` | 93/93 통과, 9 files | 기존 83개 + 공개 edition 회귀 10개 |
| `npm run build` | 통과 | Vite production bundle |
| `npm audit --audit-level=moderate` 및 JSON audit | 0건 | 확인 당시 npm advisory DB 기준 |
| Gitleaks 8.30.1, 기본 rule·100% redaction | 0건 | 공개 source directory, 기존 private Git history 미포함 |

원본 테스트 중 정밀도 25개는 mathjs 직접 호출을 검사합니다. 이 결과만으로 hook·button·전체 UI의 정밀도를 보장하지 않습니다. hook 20개, trig 변환 28개, 기존 component 9개와 smoke 1개, 추가 회귀 10개는 별도로 실행했습니다.

회귀 10개는 수정 전 실패를 재현했습니다. 6개는 같은 함수 중첩·역함수 제곱 우선순위·공백·Enter 기록 중복·미구현 버튼 노출을 검사하며, 4개는 각 모드에서 focused button의 native Enter 동작을 보존하는 검사입니다.

빌드에는 500 kB 초과 chunk 경고가 남습니다. JavaScript bundle은 약 895 kB이며 경고를 숨기지 않았습니다.

## 실제 브라우저

Ego Lite에서 `npm run preview`의 local production bundle을 열고 키보드·click으로 대표 경로를 확인했습니다.

- 단순: `2+3` Enter 결과 5, 한 번의 Enter에 기록 1개, 위/아래 기록 탐색, M+·MR 메모리, 잘못된 수식의 한국어 오류 기록
- 공학: DEG `sin(30)`, RAD `sin(pi/2)`, SHIFT 역삼각함수 입력, 9 중첩 계산, 같은 함수 중첩, 역삼각함수 제곱, `0.1+0.2`의 실제 number 결과
- 확장: 삼각함수 버튼, 2nd 역함수 버튼, DEG/RAD, 음수 prefix 및 계산
- 고급: 지수, 삼각함수·DEG/RAD, 통계 탭의 mean 버튼·결과, 고급 탭의 det 버튼·결과, 복소수
- 기본 M+ 및 세 공학 모드의 각도 버튼에 focus를 두고 Enter로 native activation되는 동작

## 화면 크기

각 설정은 같은 browser round 안에서 적용하고 `innerWidth`, `innerHeight`, `scrollWidth`와 PNG의 실제 pixel 크기를 함께 확인했습니다. 생성된 CSS/JavaScript bundle이 최종 build의 asset 이름과 일치하는 상태에서 확인했습니다.

| 크기 | 화면 | Runtime | PNG | 가로 overflow |
| --- | --- | --- | --- | --- |
| 1440×900 | 단순 | 일치 | 일치 | 없음 |
| 1024×768 | 공학 | 일치 | 일치 | 없음 |
| 390×844 | 확장 | 일치 | 일치 | 없음 |
| 360×800 | 고급 | 일치 | 일치 | 없음 |

360×800에서는 네 모드를 각각 추가 확인했습니다. 제목 문장부호, 한국어 단어 경계(`keep-all`), 수식 input의 focus, 흰색 canvas와 가로 overflow를 확인했습니다. 계산기 전체는 세로 scroll로 접근합니다. 함수명, DEG/RAD, SHIFT, 메모리 표기 등 계산기 용어는 유지하며 영어 장식 문구와 emoji는 사용하지 않습니다.

중간 캡처에서 파일명과 실제 viewport 크기가 다른 문제를 발견했습니다. 해당 캡처는 근거로 사용하지 않고 runtime 크기 및 PNG 치수가 일치하는 최종 캡처로 대체했습니다.

## 경계

모든 mathjs 함수와 모든 입력 조합, 외부 기기의 기능 동일성, 저장 지속성, 원격 배포를 검증한 것은 아닙니다. 수치·state의 동작 한계는 README에 명시했습니다. npm advisory DB와 외부 문서 URL의 상태는 이후 바뀔 수 있습니다.
